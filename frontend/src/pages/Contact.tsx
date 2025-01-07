import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

interface FormData {
    fullName: string;
    email: string;
    message: string;
}

interface FormErrors {
    fullName: boolean;
    email: boolean;
    message: boolean;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        message: "",
    });

    const [showErrors, setShowErrors] = useState<FormErrors>({
        fullName: false,
        email: false,
        message: false,
    });

    const [status, setStatus] = useState<string>("");

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        const newErrors = {
            fullName: formData.fullName.trim() === "",
            email: formData.email.trim() === "",
            message: formData.message.trim() === "",
        };

        setShowErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleBlur = (
        event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = event.target;
        setShowErrors(prev => ({
            ...prev,
            [name]: value.trim() === ""
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!validateForm()) return;

        setStatus("Transmission received. We'll respond shortly.");
        setFormData({
            fullName: "",
            email: "",
            message: "",
        });
        setShowErrors({
            fullName: false,
            email: false,
            message: false,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
                {/* Section Title */}
                <div className="text-center mb-8">
                    <h2 className="cyber-title text-3xl mb-2">Contact the Team</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
                </div>

                {/* Contact Form */}
                <div className="cyber-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="flex items-center gap-2 cyber-text mb-2">
                                <User className="w-4 h-4 text-teal-400" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className="w-full bg-gray-800/50 border border-teal-500/30 rounded-md px-4 py-3 text-gray-300 focus:border-teal-400 focus:outline-none transition-colors placeholder:text-gray-600"
                                placeholder="Enter your name"
                            />
                            {showErrors.fullName && (
                                <p className="mt-1 text-red-400">Name required</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 cyber-text mb-2"> <Mail className="w-4 h-4 text-teal-400" />
                                Email Address
                            </label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} className="w-full bg-gray-800/50 border border-teal-500/30 rounded-md px-4 py-3 text-gray-300 focus:border-teal-400 focus:outline-none transition-colors placeholder:text-gray-600" placeholder="Enter your email" />
                            {showErrors.email && ( <p className="mt-1 text-red-400">Email required</p> )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 cyber-text mb-2">
                                <MessageSquare className="w-4 h-4 text-teal-400" />
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className="cyber-input w-full h-32 resize-none"
                                placeholder="Type your message"
                            />
                            {showErrors.message && (
                                <p className="mt-1 text-red-400">Message required</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="group w-full bg-transparent border border-teal-500/50 hover:border-teal-400 px-6 py-3 text-teal-400 transition-all hover:bg-teal-500/10 animate-cyber-pulse flex items-center justify-center gap-2"
                        >
                            <span>Submit</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {status && (
                            <div className="text-center cyber-text">
                                <p className="text-teal-400">{status}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;