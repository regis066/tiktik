import { allPostsQuery } from "@/utils/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {


    const query = allPostsQuery();
    return NextResponse.json({ name: "Posts request" });
}