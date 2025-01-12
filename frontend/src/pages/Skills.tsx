import { useEffect, useState } from "react";
import { ExternalLink, Info, X } from 'lucide-react';

function Skills() {
    const [kata, setKata] = useState({
        name: "",
        url: "",
    });
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/codewars");
                const data = await response.json();
                setKata({
                    name: data.name,
                    url: data.url,
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-lg border border-teal-500/30 p-8 relative">
                {/* Info Button */}
                <button
                    onClick={() => setShowInfo(true)}
                    className="absolute top-4 right-4 p-2 text-teal-400 hover:text-teal-300 transition-colors"
                    aria-label="Show Information"
                >
                    <Info className="w-5 h-5" />
                </button>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-teal-500/30" />
                <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-teal-500/30" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-teal-500/30" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-teal-500/30" />

                {/* Title with arrows */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className="text-teal-400">&lt;</span>
                    <h1 className="text-3xl font-bold text-white">Random Daily Kata</h1>
                    <span className="text-teal-400">&gt;</span>
                </div>

                {/* Kata Content */}
                <div className="border border-teal-500/30 rounded bg-gray-800/30 p-8 mb-8">
                    <p className="text-center text-xl text-white">
                        {kata.name || 'Loading...'}
                    </p>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <a 
                        href={kata.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-teal-400 border border-teal-500/30 px-6 py-3 hover:bg-teal-500/10 transition-colors"
                    >
                        View on Codewars
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Info Modal */}
                {showInfo && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-gray-900 border border-teal-500/30 p-8 max-w-lg rounded relative">
                            <button
                                onClick={() => setShowInfo(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-teal-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl text-white mb-4">About Daily Kata</h2>
                            
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    The Daily Kata feature provides you with coding challenges from Codewars to help improve your programming skills.
                                </p>
                                
                                <div>
                                    <h3 className="text-teal-400 text-lg mb-2">How it works:</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Each day, you'll receive a new coding challenge (kata)</li>
                                        <li>Click "View on Codewars" to attempt the challenge</li>
                                        <li>Solve the kata to earn points and improve your ranking</li>
                                        <li>Practice regularly to enhance your problem-solving skills</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-teal-400 text-lg mb-2">Benefits:</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Improve your coding skills through daily practice</li>
                                        <li>Learn different problem-solving approaches</li>
                                        <li>Prepare for technical interviews</li>
                                        <li>Track your progress over time</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Skills;