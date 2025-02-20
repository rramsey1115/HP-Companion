import { NextResponse } from "next/server";
import { sql } from "../../lib/connection/db";


export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // if there's a given id in the url
    if (id) {
      const foundBook = await sql`SELECT * FROM books WHERE id = ${id}`;
      if (foundBook.length == 0) {
        return NextResponse.json(
          { error: "No book found with given id" },
          { status: 404 }
        );
      }
      console.log(`book found with id: ${id}`, foundBook);
      return NextResponse.json(foundBook[0]);
    }

    // if no given id, get all books
    const allBooks = await sql`SELECT * FROM books`;
    return NextResponse.json(allBooks);
  } catch (err) {
    console.log(`Error fetching books`, err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
};

