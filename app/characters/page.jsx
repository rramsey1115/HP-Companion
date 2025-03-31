
// function to retrieve data from api
const getCharacters = async () => {
    const response = await fetch("http://localhost:3000/api/characters", {
        method: "GET"
    })
    return response.json();
}

const Characters = async () => {
    const characters = await getCharacters();

    // console.log("characters", characters[2]);

    return (
        <>
            <h1>Characters Page</h1>
        </>
    );
}

export default Characters;