import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    // Optional: Persist banner state in localStorage
    useEffect(() => {
        const hasSeenBanner = localStorage.getItem('hasSeenBanner');
        if (hasSeenBanner) {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenBanner', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="relative bg-gray-900 border-b border-teal-500/30 transition-all">
            <div className="max-w-6xl mx-auto px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-teal-400">New</span>
                        <span className="text-gray-300">
                            Take our career assessment and discover your perfect path
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link 
                            to="/tests" 
                            className="group flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 transition-colors"
                        >
                            Take the test
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <button 
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                            aria-label="Close announcement"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnnouncementBanner;