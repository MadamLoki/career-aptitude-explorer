import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import { Home } from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import Login from './pages/Login.tsx';
import Footer from './components/Footer.tsx';
import Features from './components/Features.tsx';
import Assessment from './pages/Assessment.tsx';
import Error from './components/Error.tsx';
import Register from './components/Register.tsx';

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
				<Header />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/features" element={<Features />} />
					<Route path="/assessment" element={<Assessment />} />
					<Route path="/register" element={<Register />} />

					// Add more routes as needed
					<Route path="*" element={<Error />} />
				</Routes>

				<Footer />
			</div>
		</Router>
	);
}

export default App;