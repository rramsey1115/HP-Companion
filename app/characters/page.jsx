"use client";
import { useEffect, useState } from "react";
import { MainList } from "../components/MainList";
import { useRouter } from "next/navigation";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(0);
    const router = useRouter();

    const getAndSetCharacters = async () => {
        setLoading(true);
        if (filter == 1 || filter == 2) {
            const res = await fetch(`/api/characters?filter=${parseInt(filter)}`);
            const data = await res.json();
            setCharacters(data);
        } else {
            const res = await fetch("/api/characters");
            const data = await res.json();
            setCharacters(data);
        }

        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const handleSelect = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        getAndSetCharacters();
    }, [filter]);

    const handleListClick = (e) => {
        const id = e.currentTarget.id;
        router.push(`/characters/${id}`);
    };

    return (
        <>
            <header className="flex flex-col items-center gap-4 mt-10 mb-6 px-4 sm:px-8">
                <h1 className="text-3xl font-semibold text-center">Characters</h1>
                <select
                    value={filter}
                    onChange={handleSelect}
                    id="filter-dropdown"
                    name="filter-dropdown"
                    className="w-[90%] sm:w-1/2 bg-zinc-800 border border-zinc-600 text-white text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                    <option value={0}>Order By</option>
                    <option value={1}>Last Name A-Z</option>
                    <option value={2}>Last Name Z-A</option>
                </select>
            </header>

            <MainList
                array={characters}
                loading={loading}
                handleListClick={handleListClick}
            />
        </>
    );
};

export default Characters;
