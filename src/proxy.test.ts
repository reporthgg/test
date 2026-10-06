import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { after, before, describe, it } from "node:test";
import {
  getRedirectUrl,
  getRewrittenUrl,
  isRewrite,
  unstable_doesMiddlewareMatch,
} from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "./lib/auth";
import { config, proxy } from "./proxy";

const origin = "https://example.test";
const secret = "proxy-migration-test-secret";
const originalSecret = process.env.AUTH_SECRET;

before(() => {
  process.env.AUTH_SECRET = secret;
});

after(() => {
  if (originalSecret === undefined) {
    delete process.env.AUTH_SECRET;
  } else {
    process.env.AUTH_SECRET = originalSecret;
  }
});

describe("admin session routing", () => {
  for (const pathname of ["/admin", "/admin/tests", "/admin/login/", "/administrator"]) {
    it(`redirects unauthenticated ${pathname} without losing query parameters`, async () => {
      const request = new NextRequest(`${origin}${pathname}?page=2&from=old`);
      const response = await proxy(request);
      const loginPath = pathname.endsWith("/") ? "/admin/login/" : "/admin/login";
      const expected = new URL(`${loginPath}?page=2`, origin);
      expected.searchParams.set("from", pathname);

      assert.equal(response.status, 307);
      assert.equal(getRedirectUrl(response), expected.href);
      assert.equal(response.headers.get("content-type"), null);
      assert.equal(response.headers.get("set-cookie"), null);
      assert.equal(await response.text(), "");
      assert.equal(request.nextUrl.pathname, pathname);
    });
  }

  it("allows the login page without a session", async () => {
    const response = await proxy(new NextRequest(`${origin}/admin/login`));

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-middleware-next"), "1");
    assert.equal(response.headers.get("location"), null);
  });

  it("allows a valid signed session without changing cookies", async () => {
    const token = await createSessionToken("migration-test-admin");
    const response = await proxy(new NextRequest(`${origin}/admin/tests`, {
      headers: { cookie: `${SESSION_COOKIE}=${token}` },
    }));

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-middleware-next"), "1");
    assert.equal(response.headers.get("location"), null);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(await response.text(), "");
  });

  for (const token of ["invalid", "payload.invalid-signature"]) {
    it(`rejects invalid session ${token}`, async () => {
      const response = await proxy(new NextRequest(`${origin}/admin`, {
        headers: { cookie: `${SESSION_COOKIE}=${token}` },
      }));

      assert.equal(response.status, 307);
      assert.equal(getRedirectUrl(response), `${origin}/admin/login?from=%2Fadmin`);
    });
  }

  it("rejects a correctly signed expired session", async () => {
    const payload = Buffer.from(JSON.stringify({
      u: "migration-test-admin",
      exp: Date.now() - 60_000,
    })).toString("base64url");
    const signature = createHmac("sha256", secret).update(payload).digest("base64url");
    const response = await proxy(new NextRequest(`${origin}/admin`, {
      headers: { cookie: `${SESSION_COOKIE}=${payload}.${signature}` },
    }));

    assert.equal(response.status, 307);
    assert.equal(getRedirectUrl(response), `${origin}/admin/login?from=%2Fadmin`);
  });
});

describe("locale rewrites", () => {
  for (const locale of ["kz", "en"]) {
    for (const suffix of ["", "/", "/courses/ielts", "/admin"]) {
      it(`rewrites /${locale}${suffix} and forwards the locale header`, async () => {
        const request = new NextRequest(`${origin}/${locale}${suffix}?campaign=test`, {
          headers: { "x-request-id": "request-123", "x-locale": "ru" },
        });
        const response = await proxy(request);

        assert.equal(response.status, 200);
        assert.equal(isRewrite(response), true);
        assert.equal(getRewrittenUrl(response), `${origin}${suffix || "/"}?campaign=test`);
        assert.equal(response.headers.get("x-middleware-request-x-locale"), locale);
        assert.equal(response.headers.get("x-middleware-request-x-request-id"), "request-123");
        assert.equal(response.headers.get("content-type"), null);
        assert.equal(await response.text(), "");
        assert.equal(request.headers.get("x-locale"), "ru");
        assert.equal(request.nextUrl.pathname, `/${locale}${suffix}`);
      });
    }
  }

  for (const pathname of ["/", "/courses", "/enough", "/ru/courses", "/api/leads"]) {
    it(`leaves ${pathname} unchanged`, async () => {
      const response = await proxy(new NextRequest(`${origin}${pathname}`));

      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-middleware-next"), "1");
      assert.equal(isRewrite(response), false);
      assert.equal(response.headers.get("location"), null);
    });
  }
});

describe("route matcher", () => {
  for (const url of ["/", "/admin", "/admin/login", "/en", "/kz/courses", "/api/leads", "/data.json"]) {
    it(`matches ${url}`, () => {
      assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url }), true);
    });
  }

  for (const url of [
    "/_next/static/chunks/app.js",
    "/_next/image?url=%2Fphoto.png",
    "/favicon.ico",
    "/photo.png",
    "/photo.jpg",
    "/photo.jpeg",
    "/logo.svg",
    "/photo.webp",
    "/icon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ]) {
    it(`excludes ${url}`, () => {
      assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url }), false);
    });
  }
});
