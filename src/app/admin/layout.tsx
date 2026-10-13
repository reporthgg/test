import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hiddenRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GSC Study Admin",
  description: null,
  robots: hiddenRobots,
  openGraph: null,
  twitter: null,
};

export default function AdminLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
