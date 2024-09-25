import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const query = allPostsQuery();
  const data = await client.fetch(query);

  return NextResponse.json(data);
}
