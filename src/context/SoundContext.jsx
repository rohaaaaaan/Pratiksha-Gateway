import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const SoundContext = createContext();

export const useSound = () => {
    return useContext(SoundContext);
};

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false); // Default unmuted for demo
    const audioContextRef = useRef(null);

    // Initialize AudioContext on first user interaction
    const initAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const playTone = (freq, type = 'sine', duration = 0.1, vol = 0.1) => {
        if (isMuted) return;
        initAudioContext();

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(vol, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    const playSound = (type) => {
        if (isMuted) return;

        switch (type) {
            case 'hover':
                // High pitch, short "pop"
                playTone(400, 'sine', 0.1, 0.05);
                break;
            case 'click':
                // Lower pitch, "tap"
                playTone(600, 'triangle', 0.1, 0.1);
                break;
            default:
                break;
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};
