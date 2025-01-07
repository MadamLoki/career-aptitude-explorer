import { Mail, CircuitBoard, ExternalLink } from 'lucide-react';

function Footer() {
    return (
        <footer className="border-t border-teal-500/30 bg-gray-900/80">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Contact and Copyright */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CircuitBoard className="w-5 h-5 text-teal-400" />
                            <p className="cyber-text text-sm text-gray-400">
                                &copy; 2024 Aspire. All rights reserved.
                            </p>
                        </div>
                        
                        <a 
                            href="mailto:support@aspire.com" 
                            className="group flex items-center gap-2 bg-transparent border border-teal-500/30 px-4 py-2 text-teal-400 transition-all hover:bg-teal-500/10 w-fit"
                        >
                            <Mail className="w-4 h-4" />
                            <span>support@aspire.com</span>
                        </a>
                    </div>

                    {/* API Attribution */}
                    <div className="space-y-4">
                        <div className="border-l-2 border-teal-500/30 pl-4">
                            <h3 className="text-teal-400 text-sm font-medium mb-2">Data Attribution</h3>
                            <p className="text-gray-400 text-sm">
                                Career information is powered by the Career OneStop API, sponsored by the U.S. Department of Labor, 
                                Employment and Training Administration.
                            </p>
                            <a 
                                href="https://www.careeronestop.org/Developers/WebAPI/web-api.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm mt-2"
                            >
                                Learn more about the API
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Additional Legal Text */}
                <div className="text-xs text-gray-500 border-t border-teal-500/10 pt-4">
                    <p>
                        This product was funded by a grant awarded by the U.S. Department of Labor's Employment and Training Administration. 
                        The product was created by Aspire and does not necessarily reflect the official position of the U.S. Department of Labor. 
                        The Department of Labor makes no guarantees, warranties, or assurances of any kind, express or implied, with respect 
                        to such information, including any information on linked sites and including, but not limited to, accuracy of the 
                        information or its completeness, timeliness, usefulness, adequacy, continued availability, or ownership.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;