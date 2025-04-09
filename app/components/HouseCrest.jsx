import Image from "next/image";

const HouseCrest = ({ house }) => {
    const houseLower = house?.toLowerCase();

    const crestMap = {
        gryffindor: "/images/Gryffindor-crest.png",
        hufflepuff: "/images/Hufflepuff-crest.png",
        ravenclaw: "/images/Ravenclaw-crest.png",
        slytherin: "/images/Slytherin-crest.png",
    };

    if (!crestMap[houseLower]) return null;

    return (
        <Image
            width={70}
            height={70}
            src={crestMap[houseLower]}
            alt={`${house} crest`}
            className="m-2 w-[100px]"
        />
    );
};

export default HouseCrest;
