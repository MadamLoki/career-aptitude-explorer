import React from 'react';
import { BookUser, Brain, Route, ArrowRight } from 'lucide-react';

function Features() {
    return (
        <section className="bg-gray-900 relative overflow-hidden">
            {/* Background grid effect */}
            <div className="absolute inset-0 cyber-grid opacity-10" />
            
            <div className="container px-6 py-16 mx-auto relative">
                <div className="lg:flex lg:items-center lg:gap-12">
                    <div className="w-full space-y-12 lg:w-1/2">
                        <div>
                            <h1 className="cyber-title text-4xl lg:text-5xl">
                                Discover Your Path
                            </h1>
                            
                            {/* Decorative bars */}
                            <div className="mt-4 flex items-center gap-1">
                                <span className="inline-block w-40 h-0.5 bg-teal-500/50"></span>
                                <span className="inline-block w-3 h-0.5 bg-teal-500/70"></span>
                                <span className="inline-block w-1 h-0.5 bg-teal-500"></span>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {/* Feature 1 */}
                            <div className="flex items-start gap-6">
                                <span className="flex-shrink-0 p-2 border border-teal-500/30 bg-teal-500/10 animate-cyber-pulse">
                                    <BookUser className="w-6 h-6 text-teal-400" />
                                </span>

                                <div>
                                    <h2 className="cyber-text text-2xl mb-3">
                                        Personality Assessment
                                    </h2>
                                    <p className="text-gray-400">
                                        Take our comprehensive personality assessment powered by advanced APIs to uncover careers that align with your natural traits and interests.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start gap-6">
                                <span className="flex-shrink-0 p-2 border border-teal-500/30 bg-teal-500/10 animate-cyber-pulse">
                                    <Brain className="w-6 h-6 text-teal-400" />
                                </span>

                                <div>
                                    <h2 className="cyber-text text-2xl mb-3">
                                        Skills Analysis
                                    </h2>
                                    <p className="text-gray-400">
                                        Evaluate your current skills and discover new ones you'll need for your dream career, with detailed insights from the O*NET database.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-start gap-6">
                                <span className="flex-shrink-0 p-2 border border-teal-500/30 bg-teal-500/10 animate-cyber-pulse">
                                    <Route className="w-6 h-6 text-teal-400" />
                                </span>

                                <div>
                                    <h2 className="cyber-text text-2xl mb-3">
                                        Career Roadmap
                                    </h2>
                                    <p className="text-gray-400">
                                        Get a personalized roadmap showing the exact steps, education, and experience needed to reach your career goals, with progress tracking.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className="group flex items-center gap-2 bg-transparent border border-teal-500/50 hover:border-teal-400 px-6 py-3 text-teal-400 transition-all hover:bg-teal-500/10">
                            Explore Features
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="hidden lg:block lg:w-1/2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-500/20 animate-cyber-pulse" />
                            <img 
                                className="w-full h-auto object-cover"
                                src="https://cdn.midjourney.com/c9a6dcdb-f81a-497c-81b4-adc1427ed742/0_1.png" 
                                alt="Career exploration illustration"
                            />
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-teal-500/50" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-teal-500/50" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-teal-500/50" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-teal-500/50" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;