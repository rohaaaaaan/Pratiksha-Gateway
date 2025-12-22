import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
    return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [preSelectedDestination, setPreSelectedDestination] = useState(null);

    const openBooking = (destId = null) => {
        setPreSelectedDestination(destId);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        setPreSelectedDestination(null);
    };

    return (
        <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, preSelectedDestination }}>
            {children}
        </BookingContext.Provider>
    );
};
