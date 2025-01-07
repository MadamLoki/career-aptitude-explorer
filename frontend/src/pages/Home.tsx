import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="min-h-screen bg-gray-900">
            <main>
                <div className="relative">
                    {/* Background grid */}
                    <div className="absolute inset-0 cyber-grid opacity-10" />
                    
                    <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
                        <div className="min-h-screen flex items-center justify-center">
                            {/* Decorative corner elements */}
                            <div className="absolute top-12 left-0 w-4 h-4 border-l border-t border-teal-500/50" />
                            <div className="absolute top-12 right-0 w-4 h-4 border-r border-t border-teal-500/50" />
                            
                            <div className="text-center space-y-8">
                                <h1 className="cyber-title text-4xl sm:text-6xl lg:text-7xl">
                                    Discover Your Perfect Career Path
                                </h1>
                                
                                <p className="cyber-text text-xl text-gray-400 max-w-2xl mx-auto">
                                    Take our comprehensive career assessment to find the perfect career match for your skills, interests, and personality.
                                </p>
                                
                                <div className="flex justify-center gap-6">
                                    <Link 
                                        to="/assessment" 
                                        className="group flex items-center gap-2 bg-transparent border border-teal-500/50 hover:border-teal-400 px-8 py-4 text-teal-400 transition-all hover:bg-teal-500/10 animate-cyber-pulse"
                                    >
                                        <span>Start Assessment</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;