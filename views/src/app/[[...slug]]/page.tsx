import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("@/legacy/ClientApp"), { ssr: false });

export default function CatchAllPage() {
  return <ClientApp />;
}
