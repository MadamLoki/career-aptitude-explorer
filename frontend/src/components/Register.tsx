import { User, Mail, Eye } from 'lucide-react';

export default function Register () {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl grid md:grid-cols-3 cyber-card">
                {/* Left Panel */}
                <div className="max-md:order-1 cyber-stack bg-gray-800/50 p-8">
                    <div className="space-y-3">
                        <h4 className="cyber-text text-xl">Create Your Account</h4>
                        <p className="text-gray-400 text-sm">
                            Welcome to our registration page! Get started by creating your account.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h4 className="cyber-text text-xl">Simple & Secure Registration</h4>
                        <p className="text-gray-400 text-sm">
                            Our registration process is designed to be straightforward and secure. 
                            We prioritize your privacy and data security.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <form className="md:col-span-2 p-8 space-y-8">
                    <h3 className="cyber-title text-2xl">Create an account</h3>

                    <div className="cyber-stack-sm">
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Name</label>
                            <div className="relative">
                                <input name="name" type="text" required className="cyber-input w-full" placeholder="Enter name" />
                                <User className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-teal-400" />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Email Id</label>
                            <div className="relative">
                                <input name="email" type="email" required className="cyber-input w-full"placeholder="Enter email" />
                                <Mail className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-teal-400" />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Password</label>
                            <div className="relative">
                                <input name="password" type="password" required className="cyber-input w-full" placeholder="Enter password" />
                                <Eye className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-teal-400 cursor-pointer" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input id="terms" name="terms" type="checkbox" className="w-4 h-4 border-teal-500/30 bg-gray-800/50"/>
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                I accept the <a href="#" className="text-teal-400 hover:text-teal-300">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-transparent border border-teal-500/50 hover:border-teal-400 px-6 py-3 text-teal-400 transition-all hover:bg-teal-500/10 animate-cyber-pulse" >
                        Create an account
                    </button>

                    <p className="text-gray-400 text-sm text-center">Already have an account? 
                        <a href="/login" className="text-teal-400 hover:text-teal-300 ml-1">
                            Login here </a>
                    </p>
                </form>
            </div>
        </div>
    );
}