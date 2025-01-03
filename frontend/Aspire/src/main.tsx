import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CallToAction from './components/CallToAction.tsx'
import Hero from './components/Hero.tsx'
import Features from './components/Features.tsx'
import Testimonials from './components/Testimonials.tsx'

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
                path: "/",
                element: <Features />
            },
            {
                path: "/",
                element: <CallToAction />
            },
            {
                path: "/",
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
