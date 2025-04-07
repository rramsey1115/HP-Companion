"use client"
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { useEffect, useState } from "react";
import CharacterAbout from "./CharacterAbout";
const { useParams } = require("next/navigation")

const CharacterDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState({});

    useEffect(() => {
        if (id) {
            setLoading(true);
            getAndSetCharacter(id);
            setLoading(false);
        }
    }, [id]);

    const getAndSetCharacter = async (id) => {
        const res = await fetch(`/api/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
    }

    return !character || loading
        ? <LoadingSpinner />
        : <CharacterAbout character={character} />
}

export default CharacterDetail;