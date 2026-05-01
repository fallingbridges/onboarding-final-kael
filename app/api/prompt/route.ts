import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAccess } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = requireAccess(req);
  if (denied) return denied;

  const promptPath = path.join(process.cwd(), "prompt.md");
  try {
    const text = await fs.readFile(promptPath, "utf8");
    return NextResponse.json({ prompt: text });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
