import React, { useEffect, useRef } from 'react';

const ParticleSystem = ({ type = 'snow' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle Config
        const createParticle = () => {
            const x = Math.random() * canvas.width;
            const y = type === 'snow' ? -10 : Math.random() * canvas.height - canvas.height;
            const size = Math.random() * 3 + 1;
            const speedX = Math.random() * 1 - 0.5;
            const speedY = type === 'snow' ? Math.random() * 1 + 1 : Math.random() * 1 + 0.5;

            // Petal specific properties
            const rotation = Math.random() * 360;
            const rotationSpeed = Math.random() * 2 - 1;
            const color = type === 'snow' ? 'rgba(255, 255, 255, 0.8)'
                : type === 'petals' ? `rgba(255, 105, 180, ${Math.random() * 0.5 + 0.3})`
                    : `rgba(144, 238, 144, ${Math.random() * 0.5 + 0.3})`; // Light green for leaves

            return { x, y, size, speedX, speedY, rotation, rotationSpeed, color };
        };

        const initParticles = () => {
            particles = [];
            const count = type === 'snow' ? 100 : 40;
            for (let i = 0; i < count; i++) {
                particles.push({
                    ...createParticle(),
                    y: Math.random() * canvas.height // Distribute initially
                });
            }
        };

        const drawSnow = (p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        };

        const drawPetal = (p) => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.beginPath();
            // Simple petal shape (ellipse-ish)
            ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (type === 'petals' || type === 'leaves') {
                    p.rotation += p.rotationSpeed;
                    p.x += Math.sin(p.y * 0.01) * 0.5; // Swaying motion
                    drawPetal(p);
                } else {
                    drawSnow(p);
                }

                // Reset if out of bounds
                if (p.y > canvas.height) {
                    particles[index] = createParticle();
                }
            });

            animationFrameId = requestAnimationFrame(update);
        };

        initParticles();
        update();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [type]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}
        />
    );
};

export default ParticleSystem;
