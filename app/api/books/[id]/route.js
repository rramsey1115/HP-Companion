import { db } from "@/lib/connection/db";
import { books } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "No id found in get book by id" }, { status: 400 });
        }
        const foundBook = await db.select().from(books).where(eq(books.id, id)).limit(1);
        if (foundBook.length == 0) {
            return NextResponse.json({ error: "No book found with given id: ", id }, { status: 404 });
        }
        return NextResponse.json(foundBook[0]);
    } catch (err) {
        return NextResponse.json({ error: "Error in get book by id", err }, { status: 500 });
    }
}