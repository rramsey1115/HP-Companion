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
             <header>
                 <h1 className="text-3xl h-10 my-4">Houses</h1>
             </header>
             <MainList array={houses} loading={loading} handleListClick={handleListClick} />
         </>
     )
}

export default Houses;