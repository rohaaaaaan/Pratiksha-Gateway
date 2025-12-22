import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import './DestinationDetails.css';

import { useSound } from '../context/SoundContext';
import { useBooking } from '../context/BookingContext';

// Experience Modal Component
const ExperienceModal = ({ image, title, onClose }) => {
    if (!image) return null;
    return (
        <div className="experience-modal-overlay" onClick={onClose}>
            <motion.div
                className="experience-modal-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
            >
                <img src={image} alt={title} />
                <div className="experience-caption">
                    <h3>{title}</h3>
                    <p>✨ Immersion View</p>
                </div>
                <button className="close-modal-btn" onClick={onClose}>×</button>
            </motion.div>
        </div>
    );
};

// Mock data - in a real app this would come from an API or central config
const destinationsDetails = {
    1: {
        title: 'Kashmir',
        image: '/assets/images/kashmir/cover.jpg',
        desc: 'Experience the paradise on earth with our curated Kashmir packages.',
        plans: {
            '3 Days': [
                { day: 1, title: 'Arrival in Srinagar', desc: 'Houseboat check-in and Shikara ride at sunset.', image: '/assets/images/kashmir/shikara-ride.jpg' },
                { day: 2, title: 'Gulmarg Day Trip', desc: 'Gondola ride and snow activities.', image: '/assets/images/kashmir/gulmarg.jpg' },
                { day: 3, title: 'Departure', desc: 'Morning market visit and airport transfer.', image: '/assets/images/kashmir/departure.jpg' }
            ],
            '5 Days': [
                { day: 1, title: 'Arrival in Srinagar', desc: 'Transfer to houseboat, Shikara ride.', image: '/assets/images/kashmir/shikara-ride.jpg' },
                { day: 2, title: 'Gulmarg', desc: 'Day trip to Gulmarg, Gondola ride.', image: '/assets/images/kashmir/gulmarg.jpg' },
                { day: 3, title: 'Pahalgam', desc: 'Visit Betaab Valley and Aru Valley.', image: '/assets/images/kashmir/pahalgam.jpg' },
                { day: 4, title: 'Sonamarg', desc: 'Visit Thajiwas Glacier.', image: '/assets/images/kashmir/sonmarg.jpg' },
                { day: 5, title: 'Departure', desc: 'Transfer to airport.', image: '/assets/images/kashmir/departure.jpg' }
            ],
            '7 Days': [
                { day: 1, title: 'Arrival & Shikara Ride', desc: 'Welcome to Srinager. Sunset boat ride.', image: '/assets/images/kashmir/shikara-ride.jpg' },
                { day: 2, title: 'Gulmarg Adventure', desc: 'Full day skiing and Gandola phase 2.', image: '/assets/images/kashmir/gulmarg.jpg' },
                { day: 3, title: 'Pahalgam Leisure', desc: 'Riverside relaxation and pony ride.', image: '/assets/images/kashmir/pahalgam.jpg' },
                { day: 4, title: 'Pahalgam Exploring', desc: 'Aru Valley and Baisaran.', image: '/assets/images/kashmir/pahalgam.jpg' },
                { day: 5, title: 'Sonamarg Day Trip', desc: 'Golden Meadow and zero point.', image: '/assets/images/kashmir/sonmarg.jpg' },
                { day: 6, title: 'Srinagar Local', desc: 'Mughal Gardens and Shankaracharya Temple.', image: '/assets/images/kashmir/srinagar.jpg' },
                { day: 7, title: 'Departure', desc: 'Shopping and airport drop.', image: '/assets/images/kashmir/departure.jpg' }
            ]
        }
    },
    2: {
        title: 'Uttarakhand',
        image: '/assets/images/uttarakhand/cover.jpg',
        desc: 'Exploring the land of gods, from Rishikesh to Nainital.',
        plans: {
            '3 Days': [
                { day: 1, title: 'Rishikesh Arrival', desc: 'Ganga Aarti and campsite check-in.', image: '/assets/images/uttarakhand/ganga-aarti.jpg' },
                { day: 2, title: 'River Rafting', desc: '16km Rafting and Cliff Jumping.', image: '/assets/images/uttarakhand/rafting.jpg' },
                { day: 3, title: 'Departure', desc: 'Morning Yoga and drive back.', image: '/assets/images/uttarakhand/haridwar.jpg' }
            ],
            '5 Days': [
                { day: 1, title: 'Haridwar & Rishikesh', desc: 'Ganga Aarti and temple visits.', image: '/assets/images/uttarakhand/ganga-aarti.jpg' },
                { day: 2, title: 'Mussoorie', desc: 'Kempty Falls and Mall Road.', image: '/assets/images/uttarakhand/mussoorie.jpg' },
                { day: 3, title: 'Dhanaulti', desc: 'Eco Park and camping.', image: '/assets/images/uttarakhand/dhanaulti.jpg' },
                { day: 4, title: 'Rishikesh Rafting', desc: 'Adventure sports and cafe hopping.', image: '/assets/images/uttarakhand/rafting.jpg' },
                { day: 5, title: 'Departure', desc: 'Transfer to Dehradun/Delhi.', image: '/assets/images/uttarakhand/haridwar.jpg' }
            ],
            '7 Days': [
                { day: 1, title: 'Nainital Arrival', desc: 'Lake tour and boat ride.', image: '/assets/images/uttarakhand/nainital.jpg' },
                { day: 2, title: 'Nainital Sightseeing', desc: 'Snow View Point and Tiffin Top.', image: '/assets/images/uttarakhand/nainital.jpg' },
                { day: 3, title: 'Jim Corbett', desc: 'Transfer to Jungle Resort.', image: '/assets/images/uttarakhand/jungle-resort.jpg' },
                { day: 4, title: 'Jungle Safari', desc: 'Early morning tiger safari.', image: '/assets/images/uttarakhand/tiger-safari.jpg' },
                { day: 5, title: 'Mussoorie', desc: 'Drive to Queen of Hills.', image: '/assets/images/uttarakhand/mussoorie.jpg' },
                { day: 6, title: 'Mussoorie & Landour', desc: 'Char Dukan and Lal Tibba.', image: '/assets/images/uttarakhand/mussoorie.jpg' },
                { day: 7, title: 'Departure', desc: 'Drive back to Delhi.', image: '/assets/images/uttarakhand/haridwar.jpg' }
            ]
        }
    },
    3: {
        title: 'Rajasthan',
        image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1920',
        desc: 'Discover the royal heritage, majestic forts, and golden deserts of Rajasthan.',
        plans: {
            '3 Days': [
                { day: 1, title: 'Jaipur Arrival', desc: 'Pink City exploration - Hawa Mahal and City Palace.', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 2, title: 'Amber Fort & Nahargarh', desc: 'Elephant ride to Amber Fort, sunset at Nahargarh.', image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 3, title: 'Departure', desc: 'Morning bazaar shopping and airport transfer.', image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1600' }
            ],
            '5 Days': [
                { day: 1, title: 'Jaipur - Pink City', desc: 'Arrival and Hawa Mahal, City Palace visit.', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 2, title: 'Amber Fort', desc: 'Full day fort exploration and light show.', image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 3, title: 'Jodhpur - Blue City', desc: 'Drive to Jodhpur, Mehrangarh Fort visit.', image: 'https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 4, title: 'Jodhpur Heritage', desc: 'Jaswant Thada, Clock Tower and local cuisine.', image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 5, title: 'Departure', desc: 'Transfer to Jodhpur airport.', image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1600' }
            ],
            '7 Days': [
                { day: 1, title: 'Jaipur Arrival', desc: 'Welcome to Pink City. Evening at Chokhi Dhani.', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 2, title: 'Jaipur Forts', desc: 'Amber Fort, Jal Mahal, and Nahargarh Fort.', image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 3, title: 'Pushkar', desc: 'Sacred lake visit and Brahma Temple.', image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 4, title: 'Jodhpur', desc: 'Blue City arrival, Mehrangarh Fort.', image: 'https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 5, title: 'Jaisalmer', desc: 'Golden Fort and desert camp check-in.', image: 'https://images.pexels.com/photos/3889704/pexels-photo-3889704.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 6, title: 'Desert Safari', desc: 'Camel safari, dune sunset, and folk performance.', image: 'https://images.pexels.com/photos/1703312/pexels-photo-1703312.jpeg?auto=compress&cs=tinysrgb&w=1600' },
                { day: 7, title: 'Departure', desc: 'Drive to Jodhpur airport.', image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1600' }
            ]
        }
    },
    4: {
        title: 'Kerala',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        desc: 'Experience Gods Own Country - backwaters, tea gardens, and serene beaches.',
        plans: {
            '3 Days': [
                { day: 1, title: 'Kochi Arrival', desc: 'Fort Kochi exploration and Kathakali show.', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-4.0.3&w=1600' },
                { day: 2, title: 'Alleppey Backwaters', desc: 'Houseboat cruise through palm-fringed canals.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&w=1600' },
                { day: 3, title: 'Departure', desc: 'Morning in Marari Beach, airport transfer.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=1600' }
            ],
            '5 Days': [
                { day: 1, title: 'Kochi - Gateway of Kerala', desc: 'Chinese fishing nets and Jew Town.', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-4.0.3&w=1600' },
                { day: 2, title: 'Munnar Tea Gardens', desc: 'Drive to hill station, tea plantation visit.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&w=1600' },
                { day: 3, title: 'Munnar Exploration', desc: 'Eravikulam National Park and Top Station.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&w=1600' },
                { day: 4, title: 'Alleppey Houseboat', desc: 'Overnight luxury houseboat experience.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&w=1600' },
                { day: 5, title: 'Departure', desc: 'Kochi airport transfer.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=1600' }
            ],
            '7 Days': [
                { day: 1, title: 'Kochi Arrival', desc: 'Fort Kochi heritage walk and sunset cruise.', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-4.0.3&w=1600' },
                { day: 2, title: 'Munnar Journey', desc: 'Scenic drive through spice plantations.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&w=1600' },
                { day: 3, title: 'Munnar Highlands', desc: 'Tea factory, Echo Point, and Mattupetty Dam.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&w=1600' },
                { day: 4, title: 'Thekkady Wildlife', desc: 'Periyar Tiger Reserve boat safari.', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&w=1600' },
                { day: 5, title: 'Alleppey Backwaters', desc: 'Check-in to premium houseboat.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&w=1600' },
                { day: 6, title: 'Kovalam Beach', desc: 'Lighthouse Beach and Ayurvedic spa.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=1600' },
                { day: 7, title: 'Departure', desc: 'Trivandrum airport transfer.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=1600' }
            ]
        }
    },
    default: {
        title: 'Destination',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        desc: 'Explore the beauty of India.',
        plans: {
            '3 Days': [], '5 Days': [], '7 Days': []
        }
    }
};

const DestinationDetails = () => {
    const { id } = useParams();
    const data = destinationsDetails[id] || destinationsDetails.default;
    const [activePlan, setActivePlan] = React.useState('5 Days');
    const [selectedExperience, setSelectedExperience] = React.useState(null);
    const { playSound } = useSound();
    const { openBooking } = useBooking();

    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePlan('5 Days');
    }, [id]);

    const handlePlanChange = (plan) => {
        playSound('click');
        setActivePlan(plan);
    };

    const handleExperienceClick = (item) => {
        playSound('click');
        setSelectedExperience(item);
    };

    const currentItinerary = data.plans ? data.plans[activePlan] : [];

    return (
        <div className="details-page">
            <Navbar />

            <AnimatePresence>
                {selectedExperience && (
                    <ExperienceModal
                        image={selectedExperience.image}
                        title={selectedExperience.title}
                        onClose={() => setSelectedExperience(null)}
                    />
                )}
            </AnimatePresence>

            <div className="details-hero">
                <img src={data.image} alt={data.title} />
                <div className="details-hero-overlay">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {data.title}
                    </motion.h1>
                </div>
            </div>

            <div className="details-content">
                <div className="details-info">
                    <h2>Overview</h2>
                    <p>{data.desc}</p>

                    <div className="plan-selector">
                        {Object.keys(data.plans || {}).map(plan => (
                            <button
                                key={plan}
                                className={`plan-tab ${activePlan === plan ? 'active' : ''}`}
                                onClick={() => handlePlanChange(plan)}
                                onMouseEnter={() => playSound('hover')}
                            >
                                {plan}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn-book"
                        onMouseEnter={() => playSound('hover')}
                        onClick={() => {
                            playSound('click');
                            openBooking(id);
                        }}
                    >
                        Book {activePlan} Tour
                    </button>
                </div>

                {currentItinerary && currentItinerary.length > 0 && (
                    <div className="itinerary-section">
                        <h3>{activePlan} Itinerary</h3>
                        <p className="interact-hint">✨ Click on any day to see the experience</p>
                        <div className="timeline">
                            <div className="timeline-inner">
                                {currentItinerary.map((item, index) => (
                                    <div
                                        key={index}
                                        className="timeline-item interactive-item"
                                        onClick={() => handleExperienceClick(item)}
                                        onMouseEnter={() => playSound('hover')}
                                    >
                                        <div className="timeline-marker">{item.day}</div>
                                        <div className="timeline-content">
                                            <h4>Day {item.day}: {item.title} <span className="view-icon">👁️</span></h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DestinationDetails;
