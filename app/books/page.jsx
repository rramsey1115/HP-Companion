"use client";
import { useEffect, useState } from "react";
import { MainList } from "../components/MainList";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetBooks = async () => {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
        // set dummy delay to simulate long api call
        setTimeout(() => {
            setLoading(false);
        }, 1200)
    }

    useEffect(() => {
        getAndSetBooks();
    }, []);

    const handleListClick = (e) => {
        console.log("clicked on book: ", e.currentTarget.id)
    }

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Books</h1>
            </header>
            <MainList array={books} loading={loading} handleListClick={handleListClick} />
        </>
    )
}

export default Books;