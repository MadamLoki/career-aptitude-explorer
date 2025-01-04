function Features() {
    return (
        <section id="features" className="bg-zinc-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="flex flex-col items-center justify-between p-8 bg-slate-800 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="max-w-xl mb-6">
                            <h3 className="font-sans text-2xl font-bold text-white mb-4">
                                Personalized Aptitude Tests
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Discover your strengths and weaknesses with our scientifically designed career aptitude tests.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between p-8 bg-slate-800 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="max-w-xl mb-6">
                            <h3 className="font-sans text-2xl font-bold text-white mb-4">
                                Expert Career Guidance
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Receive expert advice and resources for your career development and job search.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between p-8 bg-slate-800 rounded-lg hover:shadow-xl transition-shadow">
                        <div className="max-w-xl mb-6">
                            <h3 className="font-sans text-2xl font-bold text-white mb-4">
                                Job Placement Assistance
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Get matched with top companies and take the next step in your professional journey.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;