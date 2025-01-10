import { useLocation } from 'react-router-dom';
import { ChevronRight, Target } from 'lucide-react';

interface ResultData {
    area: string;
    score: number;
    value?: number;
    description: string;
}

interface ResultsData {
    start: number;
    end: number;
    total: number;
    result: ResultData[];
}

const AssessmentResults = () => {
    const location = useLocation();
    const resultsData = location.state?.results as ResultsData;

    console.log('Raw results data:', resultsData);

    if (!resultsData || !resultsData.result) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="text-gray-400">No results available</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800/30 rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-white mb-6">Assessment Results</h1>
                    
                    {/* Results Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {resultsData.result.map((area: ResultData, index: number) => {
                            // Calculate display score
                            const displayScore = area.score ?? area.value ?? 0;
                            
                            return (
                                <div 
                                    key={index}
                                    className="border border-teal-500/30 bg-gray-800/50 p-6 hover:bg-gray-800/70 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 p-2 border border-teal-500/30 bg-teal-500/10">
                                            <Target className="w-6 h-6 text-teal-400" />
                                        </div>
                                        
                                        <div className="space-y-4 flex-1">
                                            {/* Area Title and Score */}
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-white">
                                                    {area.area}
                                                </h3>
                                                <div className="text-xl font-bold text-teal-400">
                                                    {Math.round(displayScore)}%
                                                </div>
                                            </div>

                                            {/* Score Visualization */}
                                            <div className="h-1.5 bg-gray-800 rounded-full">
                                                <div 
                                                    className="h-full bg-teal-400 rounded-full transition-all group-hover:bg-teal-300"
                                                    style={{ 
                                                        width: `${Math.min(Math.max(displayScore, 0), 100)}%` 
                                                    }}
                                                />
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-400 text-sm">
                                                {area.description}
                                            </p>

                                            {/* Action Link */}
                                            <button 
                                                className="flex items-center gap-2 text-teal-400 text-sm group-hover:text-teal-300 transition-colors"
                                                onClick={() => console.log(`View details for ${area.area}`)}
                                            >
                                                Explore {area.area} Careers
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentResults;