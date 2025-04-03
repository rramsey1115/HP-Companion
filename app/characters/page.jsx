"use client"

import { useEffect, useState } from "react";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(0);

    const getAndSetCharacters = async () => {
        setLoading(true);
        if (filter == 1 || filter == 2) {
            // if filter A-Z by last
            const res = await fetch(`/api/characters?filter=${parseInt(filter)}`) 
            const data = await res.json();
            setCharacters(data);
        } else {
            // get all characters in default order
            const res = await fetch("/api/characters");
            const data = await res.json();
            setCharacters(data);
        }
        // whatever res we get from if statements, set to json data
        setLoading(false);
    };

    const handleSelect = async (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        getAndSetCharacters();
    }, [filter]);

    if (loading || characters.length <= 0) {
        return <h1>...Loading</h1>;
    }

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Characters</h1>
                <select value={filter} onChange={handleSelect} id="filter-dropdown" name="filter-dropdown" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={0}>Order By</option>
                    <option value={1}>Last A-Z</option>
                    <option value={2}>Last Z-A</option>
                </select>
            </header>
            <section className="border-t-2 border-stone-300 m-1 p-1">
                {characters.map((char) => {
                    return (<div
                        key={char.id}
                        className="cursor-pointer hover:bg-yellow-500 hover:text-black w-3/4"
                    >
                        <h5 className="text-lg font-thin">{char.name}</h5>
                    </div>);
                })}

            </section>
        </>
    );
};

export default Characters;
