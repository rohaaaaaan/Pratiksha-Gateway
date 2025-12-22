import React from 'react';
import { motion } from 'framer-motion';
import { FaMountain, FaCompass, FaHeart } from 'react-icons/fa';
import './Features.css';

const featuresData = [
    {
        icon: <FaMountain />,
        title: 'Expert Guides',
        desc: 'Our local experts ensure you see the hidden gems, not just the tourist traps.'
    },
    {
        icon: <FaCompass />,
        title: 'Tailored Itineraries',
        desc: 'Every trip is customized to your pace, preferences, and style.'
    },
    {
        icon: <FaHeart />,
        title: 'Luxury Stays',
        desc: 'Handpicked premium accommodations for the most comfortable experience.'
    }
];

const Features = () => {
    return (
        <section className="features-section">
            <div className="features-container">
                <motion.div
                    className="features-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Why Choose Pratiksha-Gateaway</h2>
                </motion.div>

                <div className="features-grid">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            className="feature-card"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
