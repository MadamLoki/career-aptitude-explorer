function Hero() {
    return (
        <section className="bg-slate-900">
            <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-3xl text-center mx-auto space-y-8">
                        <h2 className="font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl">
                            Aspire for the career that is meant for you
                        </h2>

                        <p className="text-lg text-gray-400">
                            Discover your strengths, get personalized career advice, browse a selection of careers and fields suited for
                            you, and secure job placements with Aspire!
                        </p>

                        <div className="text-center">
                            <a
                                href="/tests"
                                className="inline-flex justify-center items-center gap-x-3 bg-gradient-to-tl from-blue-600 to-violet-600 hover:shadow-blue-700/50 text-white text-lg font-medium rounded-full py-3 px-8 shadow-lg transition-shadow duration-300"
                            >
                                Take the test
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;