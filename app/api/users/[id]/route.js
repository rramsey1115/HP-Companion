import { db } from "@/lib/connection/db";
import { users } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {id} = await params;
        if(!id) {
            return NextResponse.json({error: "No id given in params for get user by id"}, {status: 400});
        }
        const foundUser = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if(foundUser.length == 0) {
            return NextResponse.json({error: "No user found with id: ", id}, {status: 404});
        }
        return NextResponse.json(foundUser[0]);
    } catch(err) {
        return NextResponse.json({error: "Error in Get user by id", err}, {status: 500});
    }
}