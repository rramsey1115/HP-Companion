"use client";
import { MainList } from "@/app/components/MainList";
import { useEffect, useState } from "react";

const Potions = () => {
    const [potions, setPotions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetPotions = async () => {
        const res = await fetch("/api/potions");
        const data = await res.json();
        setPotions(data);
        // set dummy delay to simulate long api call
        setTimeout(() => {
            setLoading(false);
        }, 1200)
    }

    useEffect(() => {
        getAndSetPotions();
    }, []);

    const handleListClick = (e) => {
        console.log("clicked potion", e.currentTarget.id);
    }

    return (
        <>
            <header className="flex flex-col items-center gap-4 mt-10 mb-6 px-4 sm:px-8">

                <h1 className="text-3xl font-semibold text-center">Potions</h1>
            </header>
            <MainList array={potions} loading={loading} handleListClick={handleListClick} />
        </>
    )
}

export default Potions;