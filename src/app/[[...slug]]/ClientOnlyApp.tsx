"use client";

import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("@/legacy/ClientApp"), { ssr: false });

export default function ClientOnlyApp() {
  return <ClientApp />;
}
