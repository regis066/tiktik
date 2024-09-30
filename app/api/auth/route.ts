import { client } from "@/utils/client";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    const user: any = await req.json();
    

    client.createIfNotExists(user).then(() => {
        return NextResponse.json("Login successful");
    });
}