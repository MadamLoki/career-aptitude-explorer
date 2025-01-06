import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import { Home } from './pages/Home.tsx';

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;