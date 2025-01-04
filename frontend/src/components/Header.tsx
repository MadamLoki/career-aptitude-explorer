//import { Link } from 'react-router-dom'

function Header() {
	return (
		<header className="bg-white py-4 shadow-sm">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">Aspire</h1>

					<nav>
						<ul className="flex space-x-6">
							<li><a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</a></li>
							<li><a href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</a></li>
							<li><a href="/features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a></li>
							<li><a href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact Us</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
