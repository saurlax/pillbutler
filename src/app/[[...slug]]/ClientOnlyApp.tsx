"use client";

import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("@/client/ClientApp"), { ssr: false });

export default function ClientOnlyApp() {
  return <ClientApp />;
}
