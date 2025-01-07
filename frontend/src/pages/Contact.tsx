import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';

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

        // Form is valid, you could add form submission logic here
        setStatus("Message received! Thank you for reaching out.");
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
        <div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="fullName" className="mb-3 block text-base font-medium text-[#07074D]" >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            <p className={`text-red-500 ${showErrors.fullName ? '' : 'hidden'}`}>
                                Name is required
                            </p>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#000000]" >
                                Email Address
                            </label>
                            <input type="email" name="email" id="email" placeholder="example@domain.com" value={formData.email}
                                onChange={handleInputChange} onBlur={handleBlur} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            <p className={`text-red-500 ${showErrors.email ? '' : 'hidden'}`}>
                                Email is required
                            </p>
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Type your message"
                                value={formData.message}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            <p className={`text-red-500 ${showErrors.message ? '' : 'hidden'}`}>
                                Message is required
                            </p>
                        </div>

                        <div>
                            <button type="submit" className="hover:shadow-form rounded-md bg-gray-900 py-3 px-8 text-base font-semibold text-gray-300 hover:text-blue-400 outline-none">Submit</button>
                        </div>
                        {status && (
                            <div className="mt-4 text-center">
                                <p className={status.includes("Failed") ? "text-red-500" : "text-green-500"}>
                                    {status}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;