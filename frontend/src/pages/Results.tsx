// src/pages/Results.tsx
import { useLocation, Link } from 'react-router-dom';
import { Home, Brain, BriefcaseIcon } from 'lucide-react';

interface ResultsPageProps {
    // Add type definitions based on O*NET API response
    // This is a basic structure - update based on actual O*NET response
    interests?: {
        name: string;
        score: number;
    }[];
    careers?: {
        title: string;
        score: number;
        description?: string;
    }[];
}

function Results() {
    const location = useLocation();
    const results = location.state?.results as ResultsPageProps;

    if (!results) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="cyber-card p-8 text-center">
                    <p className="text-red-400 mb-4">No results available</p>
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="cyber-card p-8">
                    <h1 className="cyber-title text-3xl mb-6">Your Career Assessment Results</h1>
                    
                    {/* Interest Profile Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Brain className="w-5 h-5 text-teal-400" />
                            <h2 className="cyber-text text-xl">Interest Profile</h2>
                        </div>
                        <div className="grid gap-4">
                            {results.interests?.map((interest) => (
                                <div key={interest.name} className="border border-teal-500/30 p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">{interest.name}</span>
                                        <span className="text-teal-400">{interest.score}%</span>
                                    </div>
                                    <div className="bg-gray-800 h-2">
                                        <div 
                                            className="bg-teal-500 h-full transition-all"
                                            style={{ width: `${interest.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career Matches Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <BriefcaseIcon className="w-5 h-5 text-teal-400" />
                            <h2 className="cyber-text text-xl">Career Matches</h2>
                        </div>
                        <div className="space-y-4">
                            {results.careers?.map((career) => (
                                <div key={career.title} className="border border-teal-500/30 p-4 hover:border-teal-400 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-gray-300 font-medium">{career.title}</h3>
                                        <span className="text-teal-400">{career.score}% Match</span>
                                    </div>
                                    {career.description && (
                                        <p className="text-gray-400 text-sm">{career.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <Link 
                        to="/jobsearch"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all"
                    >
                        <BriefcaseIcon className="w-4 h-4" />
                        Search Jobs
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Results;