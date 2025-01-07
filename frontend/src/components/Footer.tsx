import React from 'react';
import { Mail, CircuitBoard } from 'lucide-react';

function Footer() {
    return (
        <footer className="border-t border-teal-500/30 bg-gray-900/80">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo and Copyright */}
                    <div className="flex items-center gap-2">
                        <CircuitBoard className="w-5 h-5 text-teal-400" />
                        <p className="cyber-text text-sm text-gray-400">
                            &copy; 2024 Aspire. All rights reserved.
                        </p>
                    </div>

                    {/* Contact Link */}
                    <a 
                        href="mailto:support@aspire.com" 
                        className="group flex items-center gap-2 bg-transparent border border-teal-500/30 px-4 py-2 text-teal-400 transition-all hover:bg-teal-500/10"
                    >
                        <Mail className="w-4 h-4" />
                        <span>support@aspire.com</span>
                    </a>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            </div>
        </footer>
    );
}

export default Footer;