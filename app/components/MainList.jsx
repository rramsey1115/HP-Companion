import { ListSkeleton } from "./ListSkeleton";
import { motion } from "framer-motion";

export const MainList = ({ array, loading, handleListClick }) => {
    return array.length === 0 || loading === true
        ? <ListSkeleton />
        : (
            <section className="mt-12 flex flex-col items-center gap-4 text-zinc-100">
                {array.map((item, index) => (
                    <motion.div
                        key={item.id}
                        id={item.id}
                        initial={{ opacity: 0, y: 20 }} // Initial state: faded and slightly below
                        animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and move up
                        transition={{ duration: 0.5, ease: 'easeIn', delay: index * 0.1 }} // Add delay for staggered effect
                        className="cursor-pointer w-[90%] sm:w-3/4 border border-zinc-500 rounded-2xl shadow-md shadow-zinc-600 p-4 md:p-6 bg-zinc-800 hover:bg-yellow-500 hover:text-black transition-colors duration-200"
                        onClick={handleListClick}
                    >
                        <h5 className="text-lg font-medium text-center sm:text-left">{item.name}</h5>
                    </motion.div>
                ))}
            </section>
        );
};
