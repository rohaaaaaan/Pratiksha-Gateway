import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import './BookingModal.css';

const destinations = [
    { id: 1, title: 'Kashmir', icon: '🏔️' },
    { id: 2, title: 'Uttarakhand', icon: '🌲' },
    { id: 3, title: 'Rajasthan', icon: '👑' },
    { id: 4, title: 'Kerala', icon: '🌴' },
    { id: 'custom', title: 'Other / Custom', icon: '🌍' }
];

const plans = ['3 Days', '5 Days', '7 Days', 'Custom Plan'];

const BookingModal = () => {
    const { isBookingOpen, closeBooking, preSelectedDestination } = useBooking();
    const [step, setStep] = useState(1);
    const [selectedDest, setSelectedDest] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [customRequest, setCustomRequest] = useState('');
    const [customDestinationName, setCustomDestinationName] = useState('');

    useEffect(() => {
        if (isBookingOpen) {
            setStep(preSelectedDestination ? 2 : 1);
            if (preSelectedDestination) {
                const dest = destinations.find(d => d.id === parseInt(preSelectedDestination));
                setSelectedDest(dest);
            }
        } else {
            // Reset on close
            setTimeout(() => {
                setStep(1);
                setSelectedDest(null);
                setSelectedPlan('');
                setSelectedPlan('');
                setCustomRequest('');
                setCustomDestinationName('');
            }, 300);
        }
    }, [isBookingOpen, preSelectedDestination]);

    const handleNext = () => {
        if (step === 1 && selectedDest) setStep(2);
        else if (step === 2 && selectedPlan) handleWhatsApp();
    };

    const handleWhatsApp = () => {
        const phone = '919075679521'; // Pratiksha's Gateway Official Number
        let message = `Hi Pratiksha-Gateway! 👋 I'm interested in `;

        if (selectedDest.id === 'custom') {
            message += `a *Custom Trip* to *${customDestinationName || 'a destination not listed'}*. `;
        } else {
            message += `booking a trip to *${selectedDest.title}*. `;
        }

        if (selectedPlan === 'Custom Plan') {
            message += `Plan Type: *Custom Plan*. Requirements: ${customRequest}`;
        } else {
            message += `Plan Duration: *${selectedPlan}*`;
        }

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        closeBooking();
    };

    if (!isBookingOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="booking-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeBooking}
            >
                <motion.div
                    className="booking-modal"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={closeBooking}>&times;</button>

                    <div className="modal-header">
                        <h3>Plan Your Trip ✈️</h3>
                        <div className="progress-bar">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
                            <div className="line"></div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
                        </div>
                    </div>

                    <div className="modal-content">
                        {step === 1 && (
                            <div className="step-content">
                                <h4>Where do you want to go?</h4>
                                <div className="destination-grid">
                                    {destinations.map(dest => (
                                        <div
                                            key={dest.id}
                                            className={`dest-card ${selectedDest?.id === dest.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedDest(dest)}
                                        >
                                            <span className="dest-icon">{dest.icon}</span>
                                            <span>{dest.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="step-content">
                                <h4>{selectedDest.id === 'custom' ? 'Where do you want to go?' : `Choose your itinerary for ${selectedDest?.title}`}</h4>

                                {selectedDest.id === 'custom' && (
                                    <input
                                        type="text"
                                        placeholder="Enter destination name (e.g. Goa, Ladakh)"
                                        value={customDestinationName}
                                        onChange={e => setCustomDestinationName(e.target.value)}
                                        className="custom-input"
                                        style={{ marginBottom: '20px' }}
                                    />
                                )}

                                <div className="plans-grid">
                                    {plans.map(plan => (
                                        <div
                                            key={plan}
                                            className={`plan-card ${selectedPlan === plan ? 'selected' : ''}`}
                                            onClick={() => setSelectedPlan(plan)}
                                        >
                                            {plan}
                                        </div>
                                    ))}
                                </div>

                                {selectedPlan === 'Custom Plan' && (
                                    <textarea
                                        placeholder="Tell us about your preferences (budget, interests, group size)..."
                                        value={customRequest}
                                        onChange={e => setCustomRequest(e.target.value)}
                                        className="custom-input"
                                        rows="3"
                                    ></textarea>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        {step === 2 && <button className="back-btn" onClick={() => setStep(1)}>Back</button>}
                        <button
                            className="next-btn"
                            disabled={(step === 1 && !selectedDest) || (step === 2 && !selectedPlan)}
                            onClick={handleNext}
                        >
                            {step === 1 ? 'Next' : 'Checkout via WhatsApp 💬'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingModal;
