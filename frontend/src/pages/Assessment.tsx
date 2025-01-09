import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ThumbsUp, ThumbsDown, HelpCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
    index: number;
    area: string;
    text: string;
}

interface AnswerOption {
    value: number;
    name: string;
}

interface APIResponse {
    question: Question[];
    answer_options: {
        answer_option: AnswerOption[];
    };
    total: number;
}

function Assessment(): JSX.Element {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentBatchStart, setCurrentBatchStart] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [answerOptions, setAnswerOptions] = useState<AnswerOption[]>([]);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const fetchQuestions = async (start: number) => {
        setLoading(true);
        try {
            console.log('Fetching batch starting at:', start);
            
            // Format the request URL
            const url = new URL('/api/onet/questions', window.location.origin);
            url.searchParams.append('start', start.toString());
            url.searchParams.append('end', (start + 11).toString());
            
            console.log('Requesting from:', url.toString());

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorText
                });
                throw new Error(`Failed to fetch questions: ${response.status}`);
            }

            const data: APIResponse = await response.json();
            console.log('Received response:', data);

            setQuestions(data.question);
            setAnswerOptions(data.answer_options.answer_option);
            setTotalQuestions(data.total);
        } catch (err) {
            console.error('Error fetching questions:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions(currentBatchStart);
    }, [currentBatchStart]);

    const handleAnswer = (questionIndex: number, value: number) => {
        try {
            const question = questions[questionIndex];
            console.log('Recording answer:', {
                questionIndex: question.index,
                value,
                text: question.text
            });

            setAnswers(prev => ({
                ...prev,
                [question.index]: value
            }));
        } catch (err) {
            console.error('Error recording answer:', err);
            setError('Failed to record answer');
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentBatchStart + 12 <= totalQuestions) {
            setCurrentBatchStart(prev => prev + 12);
            setCurrentQuestionIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else if (currentBatchStart > 1) {
            setCurrentBatchStart(prev => prev - 12);
            setCurrentQuestionIndex(11);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="cyber-card p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400 mx-auto mb-4"></div>
                    <p className="cyber-text mb-6">Loading questions...</p>
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

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="cyber-card p-8 text-center border-red-500/30">
                    <p className="text-red-400 mb-4">{error}</p>
                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={() => fetchQuestions(currentBatchStart)}
                            className="cyber-button"
                        >
                            Try Again
                        </button>
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="cyber-card p-8 text-center">
                    <p className="text-red-400 mb-4">No questions available</p>
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

    const progress = ((currentBatchStart + currentQuestionIndex) / totalQuestions) * 100;

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="mb-8 relative">
                    <div className="h-1 bg-gray-800">
                        <div 
                            className="h-full bg-teal-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-gray-400 text-sm">
                        Question {currentBatchStart + currentQuestionIndex} of {totalQuestions}
                    </div>
                </div>

                <div className="cyber-card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="cyber-text text-sm bg-teal-500/10 px-3 py-1 rounded">
                            {currentQuestion.area}
                        </span>
                    </div>

                    <h2 className="cyber-title text-2xl mb-8">
                        {currentQuestion.text}
                    </h2>

                    <div className="space-y-4">
                        {answerOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(currentQuestionIndex, option.value)}
                                className={`w-full text-left p-4 border ${
                                    answers[currentQuestion.index] === option.value
                                        ? 'border-teal-500 bg-teal-500/10'
                                        : 'border-teal-500/30 hover:border-teal-400 hover:bg-teal-500/5'
                                } transition-all group flex items-center justify-between`}
                            >
                                <span className="text-gray-300">{option.name}</span>
                                {answers[currentQuestion.index] === option.value && (
                                    option.value <= 2 ? <ThumbsDown className="w-5 h-5 text-red-400" /> :
                                    option.value === 3 ? <HelpCircle className="w-5 h-5 text-yellow-400" /> :
                                    <ThumbsUp className="w-5 h-5 text-green-400" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentBatchStart === 1 && currentQuestionIndex === 0}
                                className="flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <Link 
                                to="/"
                                className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-all"
                            >
                                <Home className="w-4 h-4" />
                                Go Home
                            </Link>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!answers[currentQuestion.index]}
                            className="flex items-center gap-2 px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {currentBatchStart + currentQuestionIndex === totalQuestions ? 'Complete' : 'Next'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assessment;