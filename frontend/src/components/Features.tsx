import { BookUser, Brain, Route } from 'lucide-react';

function Features() {
    return (
        <section className="bg-white dark:bg-gray-500">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:flex lg:items-center">
                    <div className="w-full space-y-12 lg:w-1/2">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                                Discover Your Path
                            </h1>
                            <div className="mt-2">
                                <span className="inline-block w-40 h-1 rounded-full bg-blue-600"></span>
                                <span className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-600"></span>
                                <span className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-600"></span>
                            </div>
                        </div>

                        <div className="md:flex md:items-start md:-mx-4">
                            <span className="inline-block p-2 text-blue-600 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-600">
                                <BookUser className="w-6 h-6" />
                            </span>

                            <div className="mt-4 md:mx-4 md:mt-0">
                                <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                                    Personality Assessment
                                </h2>
                                <p className="mt-3 text-gray-500 dark:text-gray-300">
                                    Take our comprehensive personality assessment powered by advanced APIs to uncover careers that align with your natural traits and interests.
                                </p>
                            </div>
                        </div>

                        <div className="md:flex md:items-start md:-mx-4">
                            <span className="inline-block p-2 text-blue-600 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-600">
                                <Brain className="w-6 h-6" />
                            </span>

                            <div className="mt-4 md:mx-4 md:mt-0">
                                <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                                    Skills Analysis
                                </h2>
                                <p className="mt-3 text-gray-500 dark:text-gray-300">
                                    Evaluate your current skills and discover new ones you'll need for your dream career, with detailed insights from the O*NET database.
                                </p>
                            </div>
                        </div>

                        <div className="md:flex md:items-start md:-mx-4">
                            <span className="inline-block p-2 text-blue-600 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-600">
                                <Route className="w-6 h-6" />
                            </span>

                            <div className="mt-4 md:mx-4 md:mt-0">
                                <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                                    Career Roadmap
                                </h2>
                                <p className="mt-3 text-gray-500 dark:text-gray-300">
                                    Get a personalized roadmap showing the exact steps, education, and experience needed to reach your career goals, with progress tracking.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
                        <img 
                            className="w-96 h-96 object-cover rounded-lg" 
                            src="https://cdn.midjourney.com/c9a6dcdb-f81a-497c-81b4-adc1427ed742/0_1.png" 
                            alt="Career exploration illustration" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;