import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

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
        if (Object.values(newErrors).some(error => error)) return;
        // Add login logic here
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md text-center mb-8">
                <h1 className="cyber-title text-3xl mb-2">Welcome Back</h1>
                <p className="text-gray-400">Enter your credentials to continue</p>
            </div>

            <div className="w-full max-w-md bg-gray-800/50 border border-teal-500/30 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                            <User className="w-4 h-4 text-teal-400" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900/50 border border-teal-500/30 rounded-md px-4 py-3 text-gray-300 focus:border-teal-400 focus:outline-none transition-colors placeholder:text-gray-600"
                            placeholder="Enter your email"
                        />
                        {showErrors.email && (
                            <p className="mt-1 text-red-400">Please enter your email</p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                            <Lock className="w-4 h-4 text-teal-400" />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full bg-gray-900/50 border border-teal-500/30 rounded-md px-4 py-3 text-gray-300 focus:border-teal-400 focus:outline-none transition-colors placeholder:text-gray-600"
                            placeholder="Enter your password"
                        />
                        {showErrors.password && (
                            <p className="mt-1 text-red-400">Please enter your password</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-400 text-gray-900 font-medium py-3 rounded-md transition-colors"
                    >
                        Sign In
                    </button>

                    <div className="text-center">
                        <Link to="/forgot-password" className="text-teal-400 hover:text-teal-300 text-sm">
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </div>

            <div className="mt-6 text-center text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-teal-400 hover:text-teal-300">
                    Sign up for free
                </Link>
            </div>
        </div>
    );
};

export default Login;