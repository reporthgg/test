import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadToBitrix } from "@/lib/bitrix";

// Поля, которые кладём в отдельные колонки; остальное — в extra (JSON)
const KNOWN = new Set(["name", "phone", "email", "city", "source"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    // «интерес» — первое осмысленное поле формы (курс/страна/экзамен/направление)
    const interest =
      body.course ??
      body.country ??
      body.exam ??
      body.camp ??
      body.program ??
      null;

    // всё, что не попало в отдельные колонки, — в extra
    const extra: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(body)) {
      if (!KNOWN.has(k) && v !== "" && v != null) extra[k] = v;
    }

    await prisma.lead.create({
      data: {
        name: String(name).slice(0, 200),
        phone: String(phone).slice(0, 60),
        email: body.email ? String(body.email).slice(0, 200) : null,
        city: body.city ? String(body.city).slice(0, 120) : null,
        source: body.source ? String(body.source).slice(0, 120) : "site",
        interest: interest ? String(interest).slice(0, 200) : null,
        extra: Object.keys(extra).length ? JSON.stringify(extra) : null,
      },
    });

    // отправляем в Bitrix24 (если настроен вебхук)
    await sendLeadToBitrix({
      name: String(name),
      phone: String(phone),
      email: body.email ?? null,
      source: body.source ?? "site",
      title: `Заявка с сайта: ${name}`,
      comment: [interest && `Интерес: ${interest}`, body.city && `Город: ${body.city}`]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] error:", e);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку" },
      { status: 500 }
    );
  }
}
