import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Destinations.css';

const destinationsData = [
    {
        id: 1,
        title: 'Kashmir',
        image: `${import.meta.env.BASE_URL}assets/images/kashmir/cover.jpg`,
        desc: 'Paradise on Earth',
        duration: '5 Days',
        price: '₹18,999',
        rating: 4.8,
        location: 'North India'
    },
    {
        id: 2,
        title: 'Uttarakhand',
        image: `${import.meta.env.BASE_URL}assets/images/uttarakhand/cover.jpg`,
        desc: 'Land of Gods',
        duration: '6 Days',
        price: '₹14,500',
        rating: 4.9,
        location: 'Himalayas'
    },
    {
        id: 3,
        title: 'Rajasthan',
        image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
        desc: 'The Royal State',
        duration: '7 Days',
        price: '₹22,000',
        rating: 4.7,
        location: 'West India'
    },
    {
        id: 4,
        title: 'Kerala',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'Gods Own Country',
        duration: '5 Days',
        price: '₹16,999',
        rating: 4.8,
        location: 'South India'
    }
];

const Destinations = () => {
    const [selectedTrip, setSelectedTrip] = React.useState(null);

    const handleVirtualTrip = (e) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation();
        import('./VirtualTrip/tripData').then(module => {
            setSelectedTrip(module.kedarnathTrip);
        });
    };

    return (
        <section className="destinations-section" id="destinations">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Popular Destinations
                </motion.h2>
                <p>Curated experiences for the wanderlust in you.</p>
            </div>

            <div className="destinations-grid">
                {destinationsData.map((dest, index) => (
                    <Link to={`/destination/${dest.id}`} key={dest.id} className="destination-link">
                        <motion.div
                            className="destination-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="card-image">
                                <img src={dest.image} alt={dest.title} />
                                <div className="card-badges">
                                    <span className="badge-location">📍 {dest.location}</span>
                                    <span className="badge-rating">★ {dest.rating}</span>
                                </div>
                                <div className="card-overlay">
                                    <h3>{dest.title}</h3>
                                    <p>{dest.desc}</p>

                                    <div className="card-meta">
                                        <div className="meta-item">
                                            <span className="meta-icon">🕒</span>
                                            <span>{dest.duration}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-icon">💰</span>
                                            <span>{dest.price}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <button className="btn-explore">Explore</button>
                                        {dest.title === 'Uttarakhand' && (
                                            <button
                                                className="btn-virtual-trip"
                                                onClick={handleVirtualTrip}
                                            >
                                                Virtual Trip 🕶️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Lazy load the modal to avoid circular deps or heavy init if needed */}
            {selectedTrip && (
                <React.Suspense fallback={null}>
                    <VirtualTripModal
                        isOpen={!!selectedTrip}
                        onClose={() => setSelectedTrip(null)}
                        trip={selectedTrip}
                    />
                </React.Suspense>
            )}
        </section>
    );
};

// Lazy load the component
const VirtualTripModal = React.lazy(() => import('./VirtualTrip/VirtualTripModal'));

export default Destinations;
