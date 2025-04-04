import { db } from "@/lib/connection/db";
import { houses } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {id} = await params;
        if(!id) {
            return NextResponse.json({error: "No id given in params for get house by id"}, {status: 400});
        }
        const foundHouse = await db.select().from(houses).where(eq(houses.id, id)).limit(1);
        if(foundHouse.length == 0) {
            return NextResponse.json({error: "No house found with id: ", id}, {status: 404});
        }
        return NextResponse.json(foundHouse[0]);
    } catch(err) {
        return NextResponse.json({error: "Error in Get house by id", err}, {status: 500});
    }
}