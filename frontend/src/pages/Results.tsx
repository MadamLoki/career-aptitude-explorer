import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResultData {
    area: string;
    score: number;
    description: string;
}

interface ResultsData {
    start: number;
    end: number;
    total: number;
    result: ResultData[];
}

const Results: React.FC = () => {
    const { state } = useLocation();
    const { results } = state as { results: ResultsData };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="cyber-card p-8">
                    <div className="mb-8">
                        <h1 className="cyber-title text-3xl">Assessment Results</h1>
                    </div>

                    <div className="space-y-6">
                        {results.result.map((result, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg">
                                <h2 className="cyber-subtitle text-2xl mb-4">{result.area}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 mb-2">Score:</p>
                                        <p className="text-teal-400 text-3xl font-bold">{typeof result.score === 'number' ? result.score : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-2">Description:</p>
                                        <p className="text-gray-300">{result.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <p className="text-gray-400">
                            Answers: {results.start} - {results.end} of {results.total}
                        </p>
                        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all" >
                            <ChevronLeft className="w-4 h-4" />
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;