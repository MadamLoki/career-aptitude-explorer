import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CallToAction from './components/CallToAction'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Hero />
            },
            {
                path: "/Features",
                element: <Features />
            },
            {
                path: "../pages/Contact.tsx",
                element: <Contact />
            },
            {
                path: "/CallToAction",
                element: <CallToAction />
            },
            {
                path: "../pages/Testimonials.tsx",
                element: <Testimonials />
            },
        ]
    }
])
const rootElement= document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>
);
