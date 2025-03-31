"use client"

import { useEffect, useState } from "react";



const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetCharacters = async () => {
      const res = await fetch("http://localhost:3000/api/characters");
      const data = await res.json();
      setCharacters(data);
      setLoading(false);
    };

  useEffect(() => {
    getAndSetCharacters();
  }, []);

  if (loading) {
    return <h1>...Loading</h1>;
  }

  return (
    <>
      <h1>Characters Page</h1>
      <section>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Wizard</td>
              <td>Hogwarts Student</td>
              <td>House</td>
            </tr>
          </thead>
          <tbody>
            {characters.map((char) => {
              return (
                <tr
                  key={char.id}
                  className="cursor-pointer hover:bg-yellow-600 hover:text-black"
                >
                  <td>{char.name}</td>
                  <td>{char.wizard ? "Yes" : "No"}</td>
                  <td>{char.hogwartsstudent ? "Yes" : "No"}</td>
                  <td>{char.house ? char.house : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Characters;
