import { Link } from 'react-router-dom';
import { Brain, Target, BookOpen, TrendingUp, Users, BarChart } from 'lucide-react';

const mainFeatures = [
    {
        title: "Personalized Assessment",
        description: "Our advanced assessment tool analyzes your skills, interests, and personality traits to identify career paths that align with your unique profile.",
        icon: Brain,
        link: "/assessment"
    },
    {
        title: "Career Matching",
        description: "Get matched with careers that fit your profile, complete with detailed insights into salary ranges, growth potential, and required qualifications.",
        icon: Target,
        link: "/careers"
    },
    {
        title: "Skill Development",
        description: "Receive personalized recommendations for courses, certifications, and training programs to help you qualify for your target career.",
        icon: TrendingUp,
        link: "/skills"
    },
    {
        title: "Industry Insights",
        description: "Access up-to-date information about different industries, including trends, challenges, and opportunities in various career fields.",
        icon: BarChart,
        link: "/insights"
    },
    {
        title: "Job Search Portal",
        description: "Access real-time job listings powered by Adzuna API, featuring detailed salary information, company profiles, and location-based search across multiple industries.",
        icon: BookOpen,
        link: "/jobsearch"
    },
    {
        title: "Community Support",
        description: "Connect with professionals in your target field and join discussions about career development and industry trends.",
        icon: Users,
        link: "/community"
    }
];

const processSteps = [
    {
        title: "Take the Assessment",
        description: "Complete our comprehensive career assessment that evaluates multiple aspects of your professional profile.",
        link: "/assessment",
        points: [
            "Personality traits and work style preferences",
            "Skills and competencies analysis",
            "Career interests and values assessment",
            "Work environment preferences"
        ]
    },
    {
        title: "Explore Matches",
        description: "Review your personalized career matches and detailed insights about each option.",
        link: "/careers",
        points: [
            "Detailed career path descriptions",
            "Required qualifications and skills",
            "Salary expectations and growth potential",
            "Industry demand and outlook"
        ]
    },
    {
        title: "Plan Your Path",
        description: "Get a customized roadmap to achieve your career goals.",
        link: "/planner",
        points: [
            "Step-by-step action plans",
            "Educational requirements",
            "Skill development recommendations",
            "Timeline and milestones"
        ]
    },
    {
        title: "Take Action",
        description: "Access tools and resources to start your career journey.",
        link: "/resources",
        points: [
            "Job search strategies",
            "Resume and interview preparation",
            "Networking opportunities",
            "Professional development resources"
        ]
    }
];

function HomeDetails() {
    return (
        <div className="bg-gray-900">
            {/* Main Benefits Section */}
            <section className="relative border-b border-teal-500/30 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="cyber-title text-3xl mb-12 text-center">Why Choose Aspire?</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mainFeatures.map((feature, index) => (
                            <Link 
                                key={index}
                                to={feature.link}
                                className="border border-teal-500/30 bg-gray-800/50 p-6 hover:bg-gray-800/70 transition-all hover:border-teal-400 group cursor-pointer"
                            >
                                <feature.icon className="w-8 h-8 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="cyber-text text-xl mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                                <div className="mt-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="cyber-title text-3xl mb-12 text-center">How Aspire Works</h2>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        {processSteps.map((step, index) => (
                            <Link 
                                key={index}
                                to={step.link}
                                className="flex gap-6 group cursor-pointer hover:bg-gray-800/30 p-4 transition-colors border border-transparent hover:border-teal-500/30"
                            >
                                <div className="flex-shrink-0 w-12 h-12 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:border-teal-400 transition-colors">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="cyber-text text-xl mb-3">{step.title}</h3>
                                    <p className="text-gray-400 mb-4">{step.description}</p>
                                    <ul className="space-y-2">
                                        {step.points.map((point, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-400">
                                                <div className="w-1 h-1 bg-teal-400"></div>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomeDetails;