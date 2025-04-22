"use client";
import { useEffect, useState } from "react";
import { MainList } from "../components/MainList";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetHouses = async () => {
        const res = await fetch("/api/houses");
        const data = await res.json();
        setHouses(data);
        // set dummy delay to simulate long api call
        setTimeout(() => {
            setLoading(false);
        }, 1200)
    }

    useEffect(() => {
        getAndSetHouses();
    }, []);

    const handleListClick = (e) => {
        console.log("clicked on house:", e.currentTarget.id);
    }

  return (
         <>
             <header className="flex flex-col items-center gap-4 mt-10 mb-6 px-4 sm:px-8">
                 <h1 className="text-3xl font-semibold text-center">Houses</h1>
             </header>
             <MainList array={houses} loading={loading} handleListClick={handleListClick} />
         </>
     )
}

export default Houses;