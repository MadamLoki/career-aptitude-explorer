import { Activity, Home, LogIn, Layers, MessageCircle } from 'lucide-react';
import AnnouncementBanner from './Hero';

const Header = () => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-md py-4 border-b border-teal-500/30 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="cyber-text-glow" data-text="Aspire">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Activity className="text-teal-400 w-6 h-6" />
                            <span className="cyber-text">Aspire</span>
                        </h1>
                    </div>

					<AnnouncementBanner />

                    {/* Navigation */}
                    <nav className="relative">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <a href="/" className="cyber-text flex items-center gap-2 hover:text-teal-400 transition-colors">
                                    <Home className="w-4 h-4" />
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="cyber-text flex items-center gap-2 hover:text-teal-400 transition-colors">
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </a>
                            </li>
                            <li>
                                <a href="/features" className="cyber-text flex items-center gap-2 hover:text-teal-400 transition-colors">
                                    <Layers className="w-4 h-4" />
                                    <span>Features</span>
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="bg-transparent border border-teal-500/50 hover:border-teal-400 px-4 py-2 text-teal-400 flex items-center gap-2 transition-all hover:bg-teal-500/10 animate-cyber-pulse">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Contact Us</span>
                                </a>
                            </li>
                        </ul>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;