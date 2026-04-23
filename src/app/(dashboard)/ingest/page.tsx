import IngestClient from "./client-ingest";
import { getServerSession } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export default async function IngestPage() {
    const session = await getServerSession();
    const canExtract = Boolean(session.userId);

    return <IngestClient isSovereign={canExtract} />;
}
