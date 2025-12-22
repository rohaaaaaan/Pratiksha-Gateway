import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import About from '../components/About';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <Destinations />
            <About />
            <Features />
            <Footer />
        </div>
    );
};

export default Home;
