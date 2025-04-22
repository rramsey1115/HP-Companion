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
            <header className="flex flex-col items-center gap-4 mt-10 mb-6 px-4 sm:px-8">
                <h1 className="text-3xl font-semibold text-center">Spells</h1>
            </header>
            <MainList array={spells} loading={loading} handleListClick={handleListClick} />
        </>
    )
}

export default Spells;