// components/CharacterSkeleton.jsx
const CharacterSkeleton = () => {
    return (
        <article className="p-4 md:p-6 mt-12 flex flex-col items-center gap-4 md:flex-row md:items-start border border-zinc-500 rounded-2xl shadow-md shadow-zinc-600 animate-pulse text-zinc-400">
            <div className="m-2">
                <div className="w-[325px] h-[200px] bg-zinc-700 rounded-2xl" />
            </div>
            <div className="m-2 space-y-4 w-full max-w-xl">
                <div className="h-8 w-1/2 bg-zinc-700 rounded" />
                <div className="h-5 w-1/3 bg-zinc-700 rounded" />
                <div className="h-6 w-20 bg-zinc-700 rounded" />
                <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-zinc-700 rounded" />
                    <div className="h-4 w-2/3 bg-zinc-700 rounded" />
                    <div className="h-4 w-1/2 bg-zinc-700 rounded" />
                </div>
                <div className="mt-4 space-y-2">
                    <div className="h-6 w-24 bg-zinc-700 rounded" />
                    <div className="h-4 w-2/3 bg-zinc-700 rounded" />
                </div>
            </div>
        </article>
    )
}

export default CharacterSkeleton;
