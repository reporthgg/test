import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <AdminSidebar />
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* мобильная шапка */}
        <header className="md:hidden flex items-center justify-between px-4 h-16 bg-surface/90 backdrop-blur border-b border-border-subtle sticky top-0 z-40">
          <span className="font-extrabold text-primary">GSC Study</span>
          <span className="text-xs uppercase tracking-widest text-on-surface-variant">
            Admin
          </span>
        </header>
        <main className="flex-1 p-4 md:p-8 w-full max-w-[1280px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
