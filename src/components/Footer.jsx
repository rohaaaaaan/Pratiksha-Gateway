import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3>Pratiksha-Gateaway</h3>
                    <p>Curating unforgettable journeys across India.</p>
                </div>
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/destinations">Destinations</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/siddhivinayak_holiday/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>

                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Pratiksha-Gateaway. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
