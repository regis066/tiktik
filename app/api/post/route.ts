import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";
import { NextResponse } from "next/server";


export async function GET() {
  const query = allPostsQuery();

  try {
    const data = await client.fetch(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  const document = await req.json();

  try {
    await client.create(document);
    return NextResponse.json({ message: "Video created" }, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 },
    );
  }
}
