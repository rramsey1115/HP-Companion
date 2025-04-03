import Image from "next/image";
import Link from "next/link";

const Magic = () => {

    return (
        <>
            <header>
                <h1 className="text-3xl h-10 my-4">Magic of the HP Universe</h1>
            </header>
            <section className="flex flex-wrap justify-center">
                {/* Potions background container */}
                <Link href="/magic/potions" className="flex-1 m-7 relative text-center outline border-solid rounded-sm border-stone-600 group min-w-[300px]" style={{ height: '300px' }}>
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300"
                        style={{ 
                            backgroundImage: 'url(/images/potions.jpg)', 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>

                    {/* Overlay text */}
                    <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-20 flex justify-center items-center text-6xl text-white font-semibold">
                        Potions
                    </div>
                </Link>

                {/* Spells background container */}
                <Link href="/magic/spells" className="flex-1 m-7 relative text-center outline border-solid rounded-sm border-stone-600 group min-w-[300px]" style={{ height: '300px' }}>

                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300"
                        style={{ 
                            backgroundImage: 'url(/images/spells.png)', 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>

                    {/* Overlay text */}
                    <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-20 flex justify-center items-center text-6xl text-white font-semibold">
                        Spells
                    </div>
                </Link>
            </section>
        </>
    );
}

export default Magic;
