import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Brain, Heart, Briefcase } from 'lucide-react';

interface Question {
    id: number;
    category: string;
    text: string;
    options: string[];
}

const questions: Question[] = [
    {
        id: 1,
        category: 'Interests',
        text: 'Which environment do you prefer working in?',
        options: [
            'Creative and artistic spaces',
            'Structured office environment',
            'Outdoor and nature settings',
            'Technical and digital spaces'
        ]
    },
    {
        id: 2,
        category: 'Skills',
        text: 'What type of tasks energize you the most?',
        options: [
            'Problem-solving and analysis',
            'Helping and teaching others',
            'Creating and designing',
            'Organizing and planning'
        ]
    },
    {
        id: 3,
        category: 'Values',
        text: 'What matters most to you in a career?',
        options: [
            'Work-life balance',
            'Financial security',
            'Making a difference',
            'Learning opportunities'
        ]
    }
];

function Assessment(): JSX.Element {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNext = () => {
        if (currentStep < questions.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const CategoryIcon = {
        'Interests': Heart,
        'Skills': Brain,
        'Values': Briefcase
    }[currentQuestion?.category] || Brain;

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Progress bar */}
                <div className="mb-8 relative">
                    <div className="h-1 bg-gray-800">
                        <div 
                            className="h-full bg-teal-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-gray-400 text-sm">
                        Progress: {Math.round(progress)}%
                    </div>
                </div>

                {/* Question card */}
                <div className="cyber-card p-8">
                    {currentQuestion ? (
                        <>
                            <div className="flex items-center gap-3 mb-6">
                                <CategoryIcon className="w-6 h-6 text-teal-400" />
                                <span className="cyber-text text-sm">{currentQuestion.category}</span>
                            </div>

                            <h2 className="cyber-title text-2xl mb-8">
                                {currentQuestion.text}
                            </h2>

                            <div className="space-y-4">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(currentQuestion.id, option)}
                                        className={`w-full text-left p-4 border ${
                                            answers[currentQuestion.id] === option
                                                ? 'border-teal-500 bg-teal-500/10'
                                                : 'border-teal-500/30 hover:border-teal-400 hover:bg-teal-500/5'
                                        } transition-all group flex items-center justify-between`}
                                    >
                                        <span className="text-gray-300">{option}</span>
                                        {answers[currentQuestion.id] === option && (
                                            <Check className="w-5 h-5 text-teal-400" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentStep === 0}
                                    className="flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={!answers[currentQuestion.id]}
                                    className="flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="cyber-title text-2xl mb-4">Assessment Complete</h2>
                            <p className="text-gray-400 mb-8">
                                Processing your results...
                            </p>
                            {/* Add your completion logic here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Assessment;