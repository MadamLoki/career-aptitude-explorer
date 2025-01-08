import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export function Error() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-8">
            <div className="cyber-card max-w-lg text-center relative">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-teal-500/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-teal-500/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-teal-500/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-teal-500/50" />
                
                {/* Error Icon */}
                <div className="relative mb-8">
                    <AlertTriangle className="w-20 h-20 mx-auto text-teal-400 animate-cyber-pulse" />
                    <div className="absolute inset-0 bg-teal-500/20 blur-2xl" />
                </div>

                {/* Error Message */}
                <div className="cyber-text-glow mb-6" data-text="ERROR 404">
                    <h1 className="cyber-title text-4xl mb-2">ERROR 404</h1>
                    <p className="cyber-text text-xl">We seem to have found an issue.</p>
                </div>

                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                    Don't worry, the team is working on it! Please try refreshing the page or come back later.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    <Link to="/" className="bg-transparent border border-teal-500/50 hover:border-teal-400 px-6 py-3 text-teal-400 transition-all hover:bg-teal-500/10 flex items-center justify-center gap-2">
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                    </Link>
                </div>

                {/* Decorative Lines */}
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
                <div className="absolute -top-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            </div>
        </div>
    );
}

export default Error;