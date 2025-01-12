import { useState, FormEvent, ChangeEvent } from 'react';
import { User, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface FormErrors {
    name: string;
    email: string;
    password: string;
    general?: string;
}

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        email: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            name: '',
            email: '',
            password: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!acceptedTerms) {
            setErrors(prev => ({
                ...prev,
                general: 'Please accept the terms and conditions'
            }));
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({ name: '', email: '', password: '' });

        try {            
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
                credentials: 'include' // Important for cookies
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Successful registration
            navigate('/login', { 
                state: { message: 'Registration successful! Please log in.' }
            });

        } catch (error) {
            setErrors(prev => ({
                ...prev,
                general: error instanceof Error ? error.message : 'Registration failed'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

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
                <form onSubmit={handleSubmit} className="md:col-span-2 p-8 space-y-8">
                    <h3 className="cyber-title text-2xl">Create an account</h3>

                    {errors.general && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded">
                            <AlertCircle className="w-4 h-4" />
                            <p className="text-sm">{errors.general}</p>
                        </div>
                    )}

                    <div className="cyber-stack-sm">
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Name</label>
                            <div className="relative">
                                <input 
                                    name="name" 
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`cyber-input w-full ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="Enter name"
                                />
                                <User className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-teal-400" />
                            </div>
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Email</label>
                            <div className="relative">
                                <input 
                                    name="email" 
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`cyber-input w-full ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Enter email"
                                />
                                <Mail className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-teal-400" />
                            </div>
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Password</label>
                            <div className="relative">
                                <input 
                                    name="password" 
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`cyber-input w-full ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-400"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input 
                                id="terms" 
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="w-4 h-4 border-teal-500/30 bg-gray-800/50"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                I accept the <a href="#" className="text-teal-400 hover:text-teal-300">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-transparent border border-teal-500/50 hover:border-teal-400 px-6 py-3 text-teal-400 transition-all hover:bg-teal-500/10 animate-cyber-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating account...' : 'Create an account'}
                    </button>

                    <p className="text-gray-400 text-sm text-center">
                        Already have an account?{' '}
                        <a href="/login" className="text-teal-400 hover:text-teal-300">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}