"use client"

import { useEffect, useState } from "react";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(1);

    const getAndSetCharacters = async () => {
        const res = await fetch("/api/characters");
        const data = await res.json();
        
        if(filter == 2) {
            data.sort((a, b) => a.name.split(" ")[1] - b.name.split(" ")[1])
        } else if(filter == 3 ) {
            data.sort((a, b) => b.name.split(" ")[1] - a.name.split(" ")[1])
        } 

        setCharacters(data);
        setLoading(false);
    };

    const handleSelect = async (e) => {
        setLoading(true);
        setFilter(e.target.value);
        await getAndSetCharacters();
        setLoading(false);
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
            <select id="filter-dropdown" name="filter-dropdown" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultChecked>Order By</option>
                <option value={1}>Default</option>
                <option value={2}>Last A-Z</option>
                <option value={3}>Last Z-A</option>
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
