import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';

interface LoginFormData {
    email: string;
    password: string;
}

interface FormErrors {
    email: boolean;
    password: boolean;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [showErrors, setShowErrors] = useState<FormErrors>({
        email: false,
        password: false,
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (showErrors[name as keyof FormErrors]) {
            setShowErrors(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const newErrors = {
            email: !formData.email.trim(),
            password: !formData.password.trim()
        };
        setShowErrors(newErrors);
        if (Object.values(newErrors).some(error => error)) {
            return;
        }
        console.log('Login attempted with:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-teal-900 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="mb-10 cyber-text-glow" data-text="Welcome Back">
                    <h1 className="text-center cyber-title">Welcome Back</h1>
                    <p className="text-center mt-2 cyber-text">Enter your credentials to continue</p>
                </div>

                <div className="cyber-card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block cyber-text mb-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-teal-400" />
                                    Email Address
                                </div>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="cyber-input w-full"
                                placeholder="Enter your email"
                            />
                            {showErrors.email && (
                                <p className="mt-1 text-sm text-red-400">Please enter your email</p>
                            )}
                        </div>

                        <div>
                            <label className="block cyber-text mb-2">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-teal-400" />
                                    Password
                                </div>
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleInputChange}
                                className="cyber-input w-full"
                                placeholder="Enter your password"
                            />
                            {showErrors.password && (
                                <p className="mt-1 text-sm text-red-400">Please enter your password</p>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="cyber-button w-full flex items-center justify-center gap-2 animate-cyber-pulse"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="text-center">
                            <Link 
                                to="/forgot-password" 
                                className="cyber-text text-sm hover:text-teal-400 transition-colors"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="cyber-text text-sm">
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className="cyber-text font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;