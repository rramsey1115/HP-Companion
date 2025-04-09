import { ListSkeleton } from "./ListSkeleton";

export const MainList = ({ array, loading, handleListClick }) => {
    return array.length === 0 || loading === true
        ? <ListSkeleton />
        : (
            <section className="mt-12 flex flex-col items-center gap-4 text-zinc-100">
                {array.map((item) => (
                    <div
                        key={item.id}
                        id={item.id}
                        className="cursor-pointer w-[90%] sm:w-3/4 border border-zinc-500 rounded-2xl shadow-md shadow-zinc-600 p-4 md:p-6 bg-zinc-800 hover:bg-yellow-500 hover:text-black transition-colors duration-200"
                        onClick={handleListClick}
                    >
                        <h5 className="text-lg font-medium text-center sm:text-left">{item.name}</h5>
                    </div>
                ))}
            </section>
        );
};
