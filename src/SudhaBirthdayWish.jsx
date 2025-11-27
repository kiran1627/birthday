import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Howl } from "howler";

/**
 * SudhaBirthdayWish - cheerful birthday page component
 *
 * Replace images in `photos` and `songUrl` with your own assets.
 */

export default function SudhaBirthdayWish() {
    const [started, setStarted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showGift, setShowGift] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [size, setSize] = useState({ width: 1200, height: 800 });
    const [index, setIndex] = useState(0);

    // Example images (replace with your own URLs)
    const photos = [
        "/memory1.jpg",
        "/memory2.jpg",
        "/memory3.jpg"
    ];

    // Replace with your song or put an mp3 into public/ and use "/your-song.mp3"
    const songUrl = "/birthday_song1.mp3"; // optional, add file to public/

    const audioRef = useRef(null);

    useEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (!songUrl) return;
        // load Howl instance
        audioRef.current = new Howl({
            src: [songUrl],
            html5: true,
            volume: 0.7,
            onend: () => setPlaying(false)
        });
        return () => {
            if (audioRef.current) audioRef.current.unload();
        };
    }, [songUrl]);

    const [isOpening, setIsOpening] = useState(false);

    const startCelebration = () => {
        setIsOpening(true);
        setShowConfetti(true);

        if (audioRef.current) {
            audioRef.current.play();
            setPlaying(true);
        }

        setTimeout(() => {
            setStarted(true);
            // Confetti continues on main screen
            setTimeout(() => setShowConfetti(false), 8000);
        }, 1200);
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }
    };

    // slideshow handlers
    useEffect(() => {
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % photos.length);
        }, 4000);
        return () => clearInterval(t);
    }, [photos.length]);

    if (!started) {
        return (
            <div className="welcome-screen">
                {showConfetti && <Confetti width={size.width} height={size.height} recycle={false} numberOfPieces={400} gravity={0.2} />}
                <motion.div
                    className={`welcome-gift-container ${isOpening ? "shake" : ""}`}
                    onClick={!isOpening ? startCelebration : undefined}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="welcome-box">
                        <div className="welcome-lid" />
                        <div className="welcome-bow" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h1 className="welcome-title">A Surprise for Sudha</h1>
                    <p className="tap-hint">{isOpening ? "Opening..." : "Tap the Gift to Open ✨"}</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="birthday-page">
            {showConfetti && <Confetti width={size.width} height={size.height} recycle={false} numberOfPieces={500} gravity={0.15} />}

            <header className="hero">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    className="title"
                >
                    Adavance Happy Birthday, Sudha! 🎉
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="subtitle"
                >
                    A little surprise made just for you — full of joy, memories, and love.
                </motion.p>

                <div className="controls">
                    <button
                        className="btn primary"
                        onClick={() => {
                            setShowConfetti(true);
                            // stop confetti after 6s
                            setTimeout(() => setShowConfetti(false), 6000);
                        }}
                    >
                        🎊 Celebrate
                    </button>

                    <button className="btn" onClick={toggleAudio}>
                        {playing ? "⏸ Pause Music" : "▶️ Play Music"}
                    </button>
                </div>
            </header>

            <main className="content">
                <section className="left-panel">
                    <div className="slideshow">
                        <motion.img
                            key={index}
                            src={photos[index]}
                            alt={`Memory ${index + 1}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="photo"
                        />
                        <div className="slideshow-controls">
                            <button
                                className="icon-btn"
                                onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                                aria-label="previous"
                            >
                                ◀
                            </button>
                            <span className="counter">{index + 1} / {photos.length}</span>
                            <button
                                className="icon-btn"
                                onClick={() => setIndex((i) => (i + 1) % photos.length)}
                                aria-label="next"
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                </section>

                <section className="right-panel">
                    <motion.div
                        className="gift-container"
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={`box ${showGift ? "open" : ""}`} onClick={() => {
                            setShowGift((s) => !s);
                            if (!showGift) {
                                setShowConfetti(true);
                                setTimeout(() => setShowConfetti(false), 5000);
                            }
                        }}>
                            <div className="lid">
                                <div className="ribbon" />
                            </div>
                            <div className="ribbon" />
                        </div>

                        {showGift && (
                            <motion.div
                                className="message-card"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <h2>For Sudha — With Love 💖</h2>
                                <p className="message">
                                    Sudha, your laughter brightens every day. Wishing you a year filled with joy, success,
                                    and sweet surprises. Happy birthday — dance, smile, and celebrate YOU!
                                </p>
                                <div className="actions">
                                    <a className="share" href="https://twitter.com/intent/tweet?text=Happy%20Birthday%20Sudha!%20🎉" target="_blank" rel="noreferrer">
                                        Share a wish
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </section>
            </main>

            <footer className="footer">
                <small>Made with ❤️ for Sudha</small>
            </footer>
        </div>
    );
}
