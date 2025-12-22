import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import './Hero.css';

const slides = [
    {
        id: 1,
        location: 'Kashmir',
        image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Snowy Landscape (looks like Gulmarg)
        title: 'Experience the Heaven',
        desc: 'Let the snow of Kashmir touch your soul.',
        particle: 'snow'
    },
    {
        id: 2,
        location: 'Rajasthan',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Jaipur/Pink City vibe
        title: 'Royal Grandeur',
        desc: 'Walk through the pink petals of history.',
        particle: 'petals'
    },
    {
        id: 3,
        location: 'Kerala',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Green Backwaters
        title: 'Gods Own Country',
        desc: 'Lose yourself in the lush green misty trails.',
        particle: 'leaves'
    },
    {
        id: 4,
        location: 'Uttarakhand',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Majestic Mountains
        title: 'Devbhoomi Calls',
        desc: 'Find peace in the valleys of gods.',
        particle: 'snow'
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000); // Change slide every 6 seconds
        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    return (
        <div className="hero-container">
            {/* Background Slideshow with Ken Burns Effect */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    className="hero-bg-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <img
                        src={slide.image}
                        alt={slide.location}
                        className="ken-burns-img"
                    />
                    <div className="hero-overlay"></div>
                </motion.div>
            </AnimatePresence>

            {/* Particle System Layer */}
            <div className="particles-layer">
                <ParticleSystem key={slide.particle} type={slide.particle} />
            </div>

            <div className="hero-content">
                <motion.span
                    className="location-tag"
                    key={`tag-${slide.id}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {slide.location}
                </motion.span>

                <motion.h1
                    key={`title-${slide.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {slide.title}
                </motion.h1>

                <motion.p
                    key={`desc-${slide.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {slide.desc}
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <button className="btn-primary" onClick={() => document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })}>Explore Packages</button>
                    <button className="btn-secondary" onClick={() => window.open('https://www.instagram.com/reel/DAxshPtIN4C/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', '_blank')}>Watch Experience 🎬</button>
                </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="slide-indicators">
                {slides.map((s, index) => (
                    <div
                        key={s.id}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></div>
                ))}
            </div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </div>
    );
};

export default Hero;
