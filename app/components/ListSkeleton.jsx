export const ListSkeleton = ({ count = 12 }) => {
    return (
        <section className="mt-12 flex flex-col items-center gap-4 animate-pulse text-zinc-400">
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className="w-[90%] sm:w-3/4 border border-zinc-500 rounded-2xl shadow-md shadow-zinc-600 p-4 md:p-6 flex flex-col items-center sm:items-start bg-zinc-800"
                >
                    <div className="h-6 w-1/2 bg-zinc-700 rounded mb-2" />
                    
                </div>
            ))}
        </section>
    );
};
