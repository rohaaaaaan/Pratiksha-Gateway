import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

import './Navbar.css';

import { useSound } from '../context/SoundContext';
import { useBooking } from '../context/BookingContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isMuted, toggleMute, playSound } = useSound();
    const { openBooking } = useBooking();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onMouseEnter={() => playSound('hover')}>
                    Pratiksha-Gateway
                </Link>
                <div className="menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={mobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onMouseEnter={() => playSound('hover')}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/destinations" className="nav-link" onMouseEnter={() => playSound('hover')}>Destinations</Link>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link" onMouseEnter={() => playSound('hover')}>About</a>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link-btn" onClick={() => {
                            openBooking();
                            setMobileMenuOpen(false);
                        }} onMouseEnter={() => playSound('hover')}>Book Now</button>
                    </li>
                    <li className="nav-item">
                        <button className="sound-toggle" onClick={toggleMute}>
                            {isMuted ? '🔇' : '🔊'}
                        </button>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
