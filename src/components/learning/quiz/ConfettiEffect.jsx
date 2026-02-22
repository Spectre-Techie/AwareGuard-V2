import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';

/**
 * ConfettiEffect - Celebration animation for correct answers
 * 
 * Displays confetti animation using react-confetti library.
 * Auto-stops after 3 seconds.
 * 
 * @component
 */
export default function ConfettiEffect({ show, onComplete }) {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-stop confetti after 3 seconds
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onComplete?.();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            colors={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899']}
        />
    );
}

ConfettiEffect.propTypes = {
    show: PropTypes.bool.isRequired,
    onComplete: PropTypes.func
};
