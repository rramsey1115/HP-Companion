import HouseCrest from "@/app/components/HouseCrest"
import { LoadingSpinner } from "@/app/components/LoadingSpinner"
import Image from "next/image"

const CharacterAbout = ({ character }) => {
    console.log(character)
    return !character.id
        ? <LoadingSpinner />
        : (<>
            <header className="mt-12 flex flex-col items-center gap-4 md:flex-row md:items-start">
                <div className="m-2">
                    <Image
                        priority
                        width={200}
                        height={150}
                        src={character.image}
                        alt={character.name}
                        className="rounded-2xl border border-zinc-300 shadow-md md:w-[300px]"
                    />
                </div>
                <div className="m-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold">{character.name}</h1>
                    {character.alternate_names[0] && (
                        <h4 className="text-lg italic text-zinc-600">
                            {character.alternate_names[0]}
                        </h4>
                    )}
                    <div className="mt-2 flex justify-center md:justify-start">
                        <HouseCrest house={character.house} />
                    </div>
                </div>
            </header>

            <section>
                <h3>About</h3>
                <p>Birthday: {character.dateOfBirth}</p>
                <p>Ancestry: {character.ancestry}</p>
            </section>
        </>)
}

export default CharacterAbout