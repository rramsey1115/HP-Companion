"use client";
import { useEffect, useState } from "react";

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
        }, 1200)
    }

    useEffect(() => {
        getAndSetBeasts();
    }, []);

    if (loading || beasts.length <= 0) {
        return <h1>...Loading</h1>;
    }

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Beasts</h1>
            </header>
            <section className="border-t-2 border-stone-300 m-1 p-1">
                {beasts.map((potion) => {
                    return (<div
                        key={potion.id}
                        className="cursor-pointer hover:bg-yellow-500 hover:text-black w-3/4"
                    >
                        <h5 className="text-lg font-thin">{potion.name}</h5>
                    </div>);
                })}
            </section>
        </>
    )
}

export default Beasts;