import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CallToAction from './components/CallToAction'
import Hero from './components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Features />
            },
            {
                path: "/",
                element: <Hero />
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
