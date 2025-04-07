"use client"
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { useEffect, useState } from "react";
import CharacterAbout from "./CharacterAbout";
import CharacterSkeleton from "@/app/components/CharacterSkeleton";
const { useParams } = require("next/navigation")

const CharacterDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState({});

    useEffect(() => {
        if (id) {
            setLoading(true);
            getAndSetCharacter(id);
            setTimeout(() => { setLoading(false); }, 2000)
        }
    }, [id]);

    const getAndSetCharacter = async (id) => {
        const res = await fetch(`/api/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
    }

    return !character || loading
        ? <CharacterSkeleton />
        : <CharacterAbout ch={character} />
}

export default CharacterDetail;