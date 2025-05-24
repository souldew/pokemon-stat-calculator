import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json(
      { error: "Name parameter is required" },
      { status: 400 }
    );
  }
  const filePath = path.join(process.cwd(), "src/data/pokemon.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContents);
  if (!data[name]) {
    return NextResponse.json(
      { error: `No data found for name: ${name}` },
      { status: 404 }
    );
  }
  const ans = data[name];
  return NextResponse.json({ ...ans });
}
