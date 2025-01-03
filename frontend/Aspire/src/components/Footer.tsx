function Footer() {
    return (
        <footer id="contact" className="w-full p-6 bg-gray-300 text-gray-800">
            <div className="container mx-auto text-center space-y-2">
                <p className="text-sm">&copy; 2024 Aspire. All rights reserved.</p>
                <p className="text-sm">
                    Contact us: {" "}
                    <a href="mailto:support@aspire.com" className="font-semibold hover:text-gray-600 transition-colors">
                        support@aspire.com
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer;