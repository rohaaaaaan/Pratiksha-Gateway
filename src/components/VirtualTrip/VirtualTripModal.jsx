import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import './VirtualTripModal.css';

// Carousel Component
const ImageCarousel = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [images]);

    return (
        <div className="carousel-container">
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt="Trip visual"
                    className="carousel-image"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>
            <div className="carousel-overlay"></div>
        </div>
    );
};

// SVG Path Animation Component to avoid hooks in loop
const FlightAnimation = () => {
    const progress = useMotionValue(0);
    const offsetDistance = useTransform(progress, [0, 100], ["0%", "100%"]);

    useEffect(() => {
        const controls = animate(progress, 100, {
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1
        });
        return controls.stop;
    }, [progress]);

    return (
        <motion.g
            className="moving-plane-group"
            style={{ "--flight-progress": offsetDistance }}
        >
            <path
                d="M22 16L4 20L2 14L8 12L2 8L4 2L22 6L28 2L30 4L22 16Z"
                fill="#f9cb28"
                transform="translate(-15, -10) rotate(15)"
            />
        </motion.g>
    );
};

// Travel Animation Component
const TravelView = ({ step }) => (
    <div className="travel-view-container">
        <ImageCarousel images={step.images} />

        <div className="travel-overlay-content">
            <div className="flight-path-container">
                {/* SVG Animated Path */}
                <svg width="300" height="100" viewBox="0 0 300 100" className="flight-svg">
                    {/* Dashed Path Line */}
                    <path
                        d="M 20 50 Q 150 -30 280 50"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />
                    {/* Moving Plane */}
                    <motion.path
                        d="M 20 50 Q 150 -30 280 50"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                    />
                    <FlightAnimation />
                </svg>
            </div>

            <div className="travel-route-info">
                <div className="city-node">
                    <span className="city-dot"></span>
                    <span className="city-name">{step.from.split(' ')[0]}</span>
                </div>
                <div className="travel-icon-large">
                    {step.mode === 'flight' ? '✈️' : step.mode === 'bus' ? '🚌' : '🚁'}
                </div>
                <div className="city-node">
                    <span className="city-dot"></span>
                    <span className="city-name">{step.to.split(' ')[0]}</span>
                </div>
            </div>

            <motion.div
                className="travel-meta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="travel-details-grid">
                    {step.details && Object.entries(step.details).map(([key, value]) => (
                        <div key={key} className="detail-item">
                            <span className="detail-label">{key}</span>
                            <span className="detail-value">{value}</span>
                        </div>
                    ))}
                </div>
                <p className="travel-desc" style={{ marginTop: '20px' }}>{step.description}</p>
            </motion.div>
        </div>
    </div>
);

const ActivityView = ({ step }) => (
    <div className="activity-view-container">
        <ImageCarousel images={step.images} />

        <div className="activity-info-card">
            <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {step.title}
            </motion.h1>
            <motion.div
                className="activity-divider"
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ delay: 0.6, duration: 0.8 }}
            ></motion.div>

            <motion.div
                className="activity-details-grid"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                {step.details && Object.entries(step.details).map(([key, value]) => (
                    <div key={key} className="detail-bubble">
                        <span className="bubble-label">{key}</span>
                        <span className="bubble-value">{value}</span>
                    </div>
                ))}
            </motion.div>

            <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {step.description}
            </motion.p>
        </div>
    </div>
);

const VirtualTripModal = ({ isOpen, onClose, trip }) => {
    if (!isOpen || !trip) return null;

    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < trip.steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextStep();
            if (e.key === 'ArrowLeft') prevStep();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentStep, onClose, trip.steps.length]); // Added dependencies for useEffect

    const step = trip.steps[currentStep];
    const progress = ((currentStep + 1) / trip.steps.length) * 100;

    return (
        <div className="virtual-trip-overlay">
            <div className="trip-progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="trip-header">
                <h2>{trip.title}</h2>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="trip-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.id}
                        className="step-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {step.type === 'travel' ? (
                            <TravelView step={step} />
                        ) : (
                            <ActivityView step={step} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="trip-controls">
                <button
                    className="control-btn prev"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    Previous
                </button>
                <div className="step-indicator">Step {currentStep + 1} / {trip.steps.length}</div>
                <button
                    className="control-btn next"
                    onClick={currentStep === trip.steps.length - 1 ? onClose : nextStep}
                >
                    {currentStep === trip.steps.length - 1 ? 'Finish Trip' : 'Next Step →'}
                </button>
            </div>
        </div >
    );
};

export default VirtualTripModal;
