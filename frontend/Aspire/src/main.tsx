import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CallToAction from './components/CallToAction.tsx'
import Hero from './components/Hero.tsx'
import Features from './components/Features.tsx'
import Testimonials from './pages/Testimonials.tsx'
import Contact from './pages/Contact.tsx'

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

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)
