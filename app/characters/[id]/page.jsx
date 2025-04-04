"use client"

import { useEffect, useState } from "react";
const { useParams } = require("next/navigation")

const CharacterDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState({});

    useEffect(() => {
        if(id) {
            setLoading(true);
            getAndSetCharacter(id);
            setTimeout(() => { //set intentional delay to make sure loading ui works
                setLoading(false);
            }, 2000)
        }
    }, [id]);

    const getAndSetCharacter = async (id) => {
        const res = await fetch(`/api/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
    }

    return !character || loading
    ? <p>...Loading</p> 
    :<h1>CharacterDetail for {character?.name}</h1>
}

export default CharacterDetail;