import golisodaImg from '../assets/golisoda.png';
function Hero() {
    return (

        <section
            id="home"
            className="
            relative
            min-h-screen
            flex
            items-center
            justify-center
            overflow-hidden
            bg-gradient-to-br
            from-lime-400
            via-green-500
            to-emerald-600
            px-6
            md:px-16
        "
        >

            {/* Background Glow */}
            <div className="
                absolute
                w-[500px]
                h-[500px]
                bg-white/10
                rounded-full
                blur-3xl
                top-[-100px]
                right-[-100px]
            " />

            <div className="
                relative
                z-10
                max-w-7xl
                w-full
                grid
                md:grid-cols-2
                gap-12
                items-center
            ">

                {/* Left Content */}
                <div className="text-center md:text-left">

                    <p className="
                        uppercase
                        tracking-[4px]
                        text-white/80
                        mb-4
                        text-sm
                        md:text-base
                    ">
                        Traditional Indian Refreshment
                    </p>

                    <h1 className="
                        text-5xl
                        sm:text-6xl
                        lg:text-7xl
                        font-extrabold
                        leading-tight
                        text-white
                    ">

                        Open The <br />

                        <span className="text-yellow-200">
                            Fizz Of Tradition
                        </span>

                    </h1>

                    <p className="
                        mt-6
                        text-lg
                        md:text-xl
                        text-white/90
                        max-w-xl
                        leading-relaxed
                    ">

                        Refreshing authentic Goli Soda for
                        restaurants, cafes, stores, events,
                        and bulk orders across India.

                    </p>

                    {/* Buttons */}
                    <div className="
                        mt-8
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                        justify-center
                        md:justify-start
                    ">

                        <button className="
                            bg-white
                            text-green-700
                            px-8
                            py-4
                            rounded-full
                            font-bold
                            shadow-xl
                            hover:scale-105
                            transition
                            duration-300
                        ">

                            Order Now

                        </button>

                        <button className="
                            border-2
                            border-white
                            text-white
                            px-8
                            py-4
                            rounded-full
                            font-semibold
                            hover:bg-white
                            hover:text-green-700
                            transition
                            duration-300
                        ">

                            Explore Flavors

                        </button>

                    </div>

                </div>

                {/* Right Image */}
                <div className="
                    flex
                    justify-center
                    relative
                ">

                    <img
                        src={golisodaImg}
                        alt="Goli Soda Bottle"
                        className="
                        w-[280px]
                        sm:w-[260px]
                        lg:w-[350px]
                        drop-shadow-2xl
                        slow-bounce
"
                    />

                </div>

            </div>

        </section>
    )
}

export default Hero