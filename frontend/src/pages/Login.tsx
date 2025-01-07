import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

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
        // Clear error when typing
        if (showErrors[name as keyof FormErrors]) {
            setShowErrors(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        // Validate form
        const newErrors = {
            email: !formData.email.trim(),
            password: !formData.password.trim()
        };

        setShowErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        // Add your login logic here
        console.log('Login attempted with:', formData);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="mb-10">
                    <h1 className="text-center text-4xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-center mt-2 text-gray-600">Enter your details to continue</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                            {showErrors.email && (
                                <p className="mt-1 text-sm text-red-500">Please enter your email</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Enter your password"
                            />
                            {showErrors.password && (
                                <p className="mt-1 text-sm text-red-500">Please enter your password</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <button type="submit" className="w-full rounded-lg bg-gray-900 p-4 text-sm font-semibold text-white hover:bg-gray-800 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
                                Sign In
                            </button>
                        </div>

                        <div className="text-center">
                            <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-blue-500" >
                                Forgot your password?
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500" >
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;