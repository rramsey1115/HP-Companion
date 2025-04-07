"use client"
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
     
        //set 1.5 second delay, just to make sure my loading UI works - faking a long api call basically
        setTimeout(() => {
            setLoading(false);
        }, 1500)
        
    };

    const handleSelect = async (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        getAndSetCharacters();
    }, [filter]);

    const handleListClick = (e) => {
        const id = e.currentTarget.id;
        router.push(`/characters/${id}`)
    }

    return (<>
        <header>
            <h1 className="text-3xl h-10 my-4">Characters</h1>
            <select value={filter} onChange={handleSelect} id="filter-dropdown" name="filter-dropdown" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={0}>Order By</option>
                <option value={1}>Last A-Z</option>
                <option value={2}>Last Z-A</option>
            </select>
        </header>
        <MainList array={characters} loading={loading} handleListClick={handleListClick}/>
    </>);
};

export default Characters;
