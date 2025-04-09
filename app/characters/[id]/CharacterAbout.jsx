import HouseCrest from "@/app/components/HouseCrest"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CharacterSkeleton from "@/app/components/CharacterSkeleton"

const CharacterAbout = ({ ch }) => {
    const [altNames, setAltnames] = useState("");
    const placeholder = '/images/hp.png'

    useEffect(() => {
        if (ch.alternate_names?.length >= 0) {
            setAltnames(ch.alternate_names.join(", "));
        }
    }, [ch]);

    return (<>
        <motion.article initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeIn' }} className="p-4 md:p-6 mt-12 flex flex-col items-center gap-4 md:flex-row md:items-start border border-zinc-500 rounded-2xl shadow-md shadow-zinc-600 text-zinc-200">
            <div className="m-2">
                <Image
                    alt="character"
                    priority
                    width={300}
                    height={150}
                    src={ch.image || placeholder}
                    className="rounded-2xl border border-zinc-500 shadow-md w-[325px]"
                />
            </div>
            <div className="m-2 text-center md:text-left space-y-2 text-zinc-200">
                <h1 className="text-3xl font-bold">{ch.name}</h1>
                <h4 className="text-lg italic text-zinc-500">
                    {altNames}
                </h4>
                <div className="mt-2 flex justify-center md:justify-start">
                    <HouseCrest house={ch.house} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold border-b border-zinc-600 pb-1 mb-2">About</h3>

                    <p>Birth Year: {ch.yearOfBirth || ""}</p>
                    <p>Ancestry: {ch.ancestry ? ch.ancestry.charAt(0).toUpperCase() + ch.ancestry.slice(1) : "Unknown"}</p>
                    <p>Patronus: {ch.patronus ? ch.patronus.charAt(0).toUpperCase() + ch.patronus.slice(1) : "None"}</p>
                    <p>Wizard: {ch.wizard ? 'Yes' : 'No'}</p>
                    {(ch.wand.wood && ch.wand.core && ch.wand.length)
                        && (<p>Wand: {ch.wand.length}in. - {ch.wand.wood.charAt([0]).toUpperCase() + ch.wand.wood.slice(1)} - {ch.wand.core.charAt([0]).toUpperCase() + ch.wand.core.slice(1)}</p>)}
                </div>
                <div>
                    <h3 className="text-xl font-semibold border-b border-zinc-600 pb-1 mb-2">On Screen</h3>

                    <p>Actor: {ch.actor}</p>
                    <p>Alternate Actors: {Array.isArray(ch.alternate_actors) && ch.alternate_actors.length > 0 ? ch.alternate_actors.join(", ") : "N/A"}</p>
                </div>
            </div>
        </motion.article>
    </>)
}

export default CharacterAbout;