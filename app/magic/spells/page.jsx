"use client";
import { MainList } from "@/app/components/MainList";
import { useEffect, useState } from "react";

const Spells = () => {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetSpells = async () => {
        const res = await fetch("/api/spells");
        const data = await res.json();
        setSpells(data);
        // set dummy delay to simulate long api call
        setTimeout(() => {
            setLoading(false);
        }, 1200)
    }

    useEffect(() => {
        getAndSetSpells();
    }, []);

    const handleListClick = (e) => {
        console.log("clicked potion", e.currentTarget.id);
    }

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Spells</h1>
            </header>
            <MainList array={spells} loading={loading} handleListClick={handleListClick} />
        </>
    )
}

export default Spells;