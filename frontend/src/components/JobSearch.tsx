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
}

const JobSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = new URL('https://api.adzuna.com/v1/api/jobs/us/search/1');
            url.searchParams.append('app_id', process.env.ADZUNA_APP_ID || '');
            url.searchParams.append('app_key', process.env.ADZUNA_API_KEY || '');
            url.searchParams.append('results_per_page', '10');
            url.searchParams.append('what', searchTerm);
            url.searchParams.append('where', location);
            url.searchParams.append('content-type', 'application/json');

            const response = await fetch(url.toString());
            if (!response.ok) throw new Error('Failed to fetch job listings');
            const data = await response.json();
            setResults(data.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
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
                <form onSubmit={(e) => { e.preventDefault(); searchJobs(); }} className="cyber-card mb-8">
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
                                <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobSearch;