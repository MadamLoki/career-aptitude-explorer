import { ArrowRight, Target, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <main>
                {/* Hero Section */}
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl text-gray-900">
                                Discover Your Perfect Career Path
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                                Take our comprehensive career assessment to find the perfect career match for your skills, interests, and personality.
                            </p>
                            <div className="mt-8 flex gap-x-4 sm:justify-center">
                                <Link
                                    to="/assessment"
                                    className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Start Assessment
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-blue-600">Find Your Path</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to find your dream career
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {features.map((feature) => (
                                    <div key={feature.title} className="flex flex-col">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                            <feature.icon className="h-5 w-5 flex-none text-blue-600" />
                                            {feature.title}
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                            <p className="flex-auto">{feature.description}</p>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const features = [
    {
        title: 'Personalized Assessment',
        description: 'Take our comprehensive assessment to understand your strengths, interests, and values.',
        icon: Target,
    },
    {
        title: 'Career Library',
        description: 'Explore detailed information about hundreds of career paths and opportunities.',
        icon: BookOpen,
    },
    {
        title: 'Career Roadmap',
        description: 'Get a personalized roadmap with steps to achieve your career goals.',
        icon: TrendingUp,
    },
];

export default Home;