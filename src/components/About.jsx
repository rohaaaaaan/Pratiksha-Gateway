import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import './About.css';

const About = () => {
    const { openBooking } = useBooking();

    const adventures = [
        { icon: '🏔️', count: '50+', label: 'Mountains Conquered' },
        { icon: '🌅', count: '200+', label: 'Sunrises Witnessed' },
        { icon: '✈️', count: '100+', label: 'Trips Curated' },
        { icon: '😊', count: '5000+', label: 'Happy Travelers' }
    ];

    const journeyHighlights = [
        {
            year: '2018',
            title: 'The First Step',
            desc: 'Started with a solo backpacking trip to Ladakh that changed everything.'
        },
        {
            year: '2019',
            title: 'Building the Dream',
            desc: 'Founded Pratiksha\'s Getaway to share authentic travel experiences.'
        },
        {
            year: '2021',
            title: 'Growing Community',
            desc: 'Crossed 1000+ happy travelers and expanded to 15 destinations.'
        },
        {
            year: '2024',
            title: 'The Journey Continues',
            desc: 'Now curating life-changing adventures across India and beyond.'
        }
    ];

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                {/* Header */}
                <motion.div
                    className="about-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">Meet Your Guide</span>
                    <h2>The Story Behind the Journey</h2>
                </motion.div>

                {/* Main Content */}
                <div className="about-content">
                    {/* Left - Image & Stats */}
                    <motion.div
                        className="about-visual"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="profile-card">
                            <div className="profile-image">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    alt="Pratiksha - Founder"
                                />
                                <div className="profile-badge">
                                    <span>✨ Founder & Explorer</span>
                                </div>
                            </div>
                            <div className="profile-info">
                                <h3>Pratiksha</h3>
                                <p className="tagline">"Not all who wander are lost"</p>
                            </div>
                        </div>

                        {/* Adventure Stats */}
                        <div className="adventure-stats">
                            {adventures.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="stat-item"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                >
                                    <span className="stat-icon">{stat.icon}</span>
                                    <span className="stat-count">{stat.count}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Bio & Journey */}
                    <motion.div
                        className="about-story"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="bio-section">
                            <h3>Hey there, fellow wanderer! 👋</h3>
                            <p>
                                I'm Pratiksha — a mountain lover, sunrise chaser, and your personal gateway
                                to India's most breathtaking destinations. What started as a solo adventure
                                to find myself in the Himalayas has now become a mission to help others
                                discover the magic that awaits beyond their comfort zone.
                            </p>
                            <p>
                                With a camera in one hand and a steaming cup of chai in the other, I've
                                explored hidden valleys, befriended local villagers, and witnessed sunrises
                                that made me question if heaven exists right here on Earth.
                                <span className="highlight"> Spoiler: It does.</span>
                            </p>
                            <p>
                                At <strong>Pratiksha's Getaway</strong>, I don't just plan trips — I craft
                                experiences. Every itinerary is personally curated with love, local insights,
                                and those secret spots that Google Maps doesn't know about. 🗺️
                            </p>
                        </div>

                        {/* Journey Timeline */}
                        <div className="journey-timeline">
                            <h4>My Journey So Far</h4>
                            <div className="timeline-items">
                                {journeyHighlights.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="timeline-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    >
                                        <span className="timeline-year">{item.year}</span>
                                        <div className="timeline-content">
                                            <h5>{item.title}</h5>
                                            <p>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            className="about-cta"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <p>Ready to start your adventure?</p>
                            <button className="btn-adventure" onClick={() => openBooking()}>
                                Let's Plan Your Trip 🚀
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
