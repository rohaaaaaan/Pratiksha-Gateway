export const kedarnathTrip = {
    id: 'kedarnath-package',
    title: 'Pune to Kedarnath: A Spiritual Journey',
    from: 'Pune',
    to: 'Kedarnath',
    steps: [
        {
            id: 'step-1',
            type: 'travel',
            mode: 'flight',
            from: 'Pune (PNQ)',
            to: 'Delhi (DEL)',
            duration: '2h 15m',
            description: 'Flying across the heart of India.',
            details: {
                'Airline': 'Indigo 6E-123',
                'Distance': '1,173 km',
                'Altitude': '35,000 ft',
                'Avg Speed': '850 km/h'
            },
            images: [
                '/assets/virtual-trip/flight-1.jpg',
                '/assets/virtual-trip/flight-2.jpg',
                '/assets/virtual-trip/flight-3.jpg'
            ]
        },
        {
            id: 'step-2',
            type: 'activity',
            title: 'Welcome to Delhi',
            location: 'New Delhi',
            description: 'A quick transit stop in the capital. Visit India Gate before heading to the mountains.',
            details: {
                'Best Time': 'Oct - Mar',
                'Must Eat': 'Chole Bhature',
                'Entry Fee': 'Free',
                'Highlight': 'War Memorial'
            },
            images: [
                '/assets/virtual-trip/delhi-1.jpg',
                '/assets/virtual-trip/delhi-2.jpg',
                '/assets/virtual-trip/delhi-3.jpg',
                '/assets/virtual-trip/delhi-4.jpg',
                '/assets/virtual-trip/delhi-5.jpg'
            ]
        },
        {
            id: 'step-3',
            type: 'travel',
            mode: 'bus',
            from: 'Delhi',
            to: 'Rishikesh',
            duration: '6h 00m',
            description: 'Scenic drive towards the Gateway of Garhwal.',
            details: {
                'Bus Type': 'Volvo AC Sleeper',
                'Distance': '240 km',
                'Pit Stops': '2 Break Points',
                'Route': 'NH 334'
            },
            images: [
                'https://picsum.photos/1920/1080?random=7',
                'https://picsum.photos/1920/1080?random=8',
                'https://picsum.photos/1920/1080?random=9'
            ]
        },
        {
            id: 'step-4',
            type: 'activity',
            title: 'Evening Aarti at Rishikesh',
            location: 'Rishikesh',
            description: 'Witness the divine Ganga Aarti at Parmarth Niketan.',
            details: {
                'Timing': '6:00 PM',
                'Duration': '45 Mins',
                'Vibe': 'Spiritual / Calm',
                'Note': 'Remove shoes'
            },
            images: [
                'https://picsum.photos/1920/1080?random=10',
                'https://picsum.photos/1920/1080?random=11',
                'https://picsum.photos/1920/1080?random=12'
            ]
        },
        {
            id: 'step-5',
            type: 'travel',
            mode: 'helicopter',
            from: 'Phata',
            to: 'Kedarnath',
            duration: '15m',
            description: 'Soaring above the Himalayas. A breathtaking flight.',
            details: {
                'Operator': 'Pawan Hans',
                'Altitude': '11,755 ft',
                'Capacity': '6 Passengers',
                'View': 'Snow Peaks'
            },
            images: [
                'https://picsum.photos/1920/1080?random=13',
                'https://picsum.photos/1920/1080?random=14',
                'https://picsum.photos/1920/1080?random=15'
            ]
        },
        {
            id: 'step-6',
            type: 'activity',
            title: 'Kedarnath Temple Darshan',
            location: 'Kedarnath',
            description: 'The ultimate destination. Seek blessings at the abode of Lord Shiva.',
            details: {
                'Altitude': '3,583 m',
                'Built By': 'Pandavas / Adi Shankara',
                'River': 'Mandakini',
                'Temple Age': '> 1000 Years'
            },
            images: [
                'https://picsum.photos/1920/1080?random=16',
                'https://picsum.photos/1920/1080?random=17',
                'https://picsum.photos/1920/1080?random=18'
            ],
            isFinal: true
        }
    ]
};
