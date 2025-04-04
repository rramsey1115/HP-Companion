"use client";
import { useEffect, useState } from "react";
import { MainList } from "../components/MainList";

const Beasts = () => {
    const [beasts, setBeasts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetBeasts = async () => {
        const res = await fetch("/api/beasts");
        const data = await res.json();
        setBeasts(data);
        // set dummy delay to simulate long api call
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    useEffect(() => {
        getAndSetBeasts();
    }, []);

    const handleListClick = (e) => {
        console.log("clicked on beast: ", e.currentTarget.id)
    }

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Beasts</h1>
            </header>
            <MainList array={beasts} loading={loading} handleListClick={handleListClick}/>
        </>
    )
}

export default Beasts;