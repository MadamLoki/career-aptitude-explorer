import React, { useState } from 'react';
import { Search, MapPin, Building2, Calendar, DollarSign } from 'lucide-react';

interface JobListing {
    id: string;
    title: string;
    description: string;
    company: { display_name: string };
    location: { display_name: string };
    salary_min: number;
    salary_max: number;
    created: string;
    redirect_url: string;
}

const JobSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchJobs = async () => {
        if (!searchTerm || !location) {
            setError('Please enter both a job title and location');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                what: searchTerm,
                where: location
            });

            const response = await fetch(`/api/jobs/search?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch job listings: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && Array.isArray(data.results)) {
                setResults(data.results);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const formatSalary = (min: number, max: number) => {
        if (!min && !max) return 'Salary not specified';
        if (min === max) return `$${min.toLocaleString()}`;
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="cyber-container">
                {/* Search Form */}
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchJobs();
                    }} 
                    className="cyber-card mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-3 flex items-center">
                                <Search className="w-5 h-5 text-teal-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Job title or keywords"
                                className="cyber-input pl-12 w-full"
                                required
                            />
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-3 flex items-center">
                                <MapPin className="w-5 h-5 text-teal-400" />
                            </div>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                                className="cyber-input pl-12 w-full"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-transparent border border-teal-500/50 hover:border-teal-400 px-6 py-3 text-teal-400 transition-all hover:bg-teal-500/10 animate-cyber-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Searching...' : 'Search Jobs'}
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="cyber-card border-red-500/30 mb-6">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Results */}
                <div className="cyber-stack">
                    {results.map((job) => (
                        <div key={job.id} className="cyber-card hover:border-teal-400/50 transition-colors">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="cyber-text text-xl mb-2">{job.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4 text-teal-400" />
                                            {job.company.display_name}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-teal-400" />
                                            {job.location.display_name}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4 text-teal-400" />
                                            {formatSalary(job.salary_min, job.salary_max)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-teal-400" />
                                            {new Date(job.created).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">{job.description}</p>
                                <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors group" >
                                    View Details 
                                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobSearch;