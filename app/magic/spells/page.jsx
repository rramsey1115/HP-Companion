"use client";
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

    if (loading || spells.length <= 0) {
        return <h1>...Loading</h1>;
    }

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Spells</h1>
            </header>
            <section className="border-t-2 border-stone-300 m-1 p-1">
                {spells.map((potion) => {
                    return (<div
                        key={potion.id}
                        className="cursor-pointer hover:bg-yellow-500 hover:text-black w-3/4"
                    >
                        <h5 className="text-lg font-thin">{potion.name}</h5>
                    </div>);
                })}s
            </section>
        </>
    )
}

export default Spells;