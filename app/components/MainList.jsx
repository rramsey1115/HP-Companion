// component used to generate main lists of characters, spells, potions, beatss, books, and houses

import { LoadingSpinner } from "./LoadingSpinner";

export const MainList = ({ array, loading, handleListClick }) => {
    return array.length == 0 || loading == true
        ? (<LoadingSpinner />)
        : (<section className="border-t-2 border-stone-300 my-4 p-1">
            {array.map((item) => {
                return (<div
                    key={item.id}
                    id={item.id}
                    className="cursor-pointer hover:bg-yellow-500 hover:text-black w-3/4"
                    onClick={handleListClick}
                >
                    <h5 className="text-lg font-thin">{item.name}</h5>
                </div>);
            })}
        </section>)
}