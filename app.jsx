import { useState, useEffect, useRef } from 'react'

function App() {
    const [currentSection, setCurrentSection] = useState(0)
    const [typedText, setTypedText] = useState('')
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [showFireworks, setShowFireworks] = useState(false)
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [revealedSections, setRevealedSections] = useState(new Set())
    const audioRef = useRef(null)

    // Birthday date - January 30th, 2026
    const birthdayDate = new Date('2026-01-30T00:00:00')

    // Typing animation text
    const fullText = "Happy Birthday to the most amazing person in my life! 💕"

    // Photo gallery with actual images
    const photos = [
        { id: 1, src: "/first meet.jpg", caption: "Our First Meeting" },
        { id: 2, src: "/smileeee.jpg", caption: "That Beautiful Smile" },
        { id: 3, src: "/together.jpg", caption: "Adventures Together" },
        { id: 4, src: "/memoriii.jpg", caption: "Making Memories" },
        { id: 5, src: "/forever.jpg", caption: "Forever & Always" }
    ]

    // Love story timeline
    const timeline = [
        { date: "First Day", title: "The Day We Met", description: "When our eyes first met, I knew something special was beginning..." },
        { date: "First Month", title: "Getting to Know You", description: "Every conversation made me fall deeper..." },
        { date: "First Adventure", title: "Our First Trip", description: "Creating memories that will last forever..." },
        { date: "Today", title: "Still Falling", description: "Every day with you is a new reason to smile..." }
    ]

    // Countdown timer
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime()
            const distance = birthdayDate.getTime() - now

            if (distance > 0) {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                })
            } else {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)
        return () => clearInterval(interval)
    }, [birthdayDate])

    // Typing animation
    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1))
            }, 100)
            return () => clearTimeout(timeout)
        }
    }, [typedText, fullText])

    // Auto-sliding photos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [photos.length])

    // Scroll reveal
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.reveal-section')
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect()
                if (rect.top < window.innerHeight * 0.75) {
                    setRevealedSections(prev => new Set([...prev, index]))
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Background music
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3
            // Auto-play will be attempted, but may be blocked by browser
            audioRef.current.play().catch(e => console.log('Autoplay prevented:', e))
        }
    }, [])

    const triggerFireworks = () => {
        setShowFireworks(true)
        // Create fireworks particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createFirework()
            }, i * 100)
        }
    }

    const createFirework = () => {
        const firework = document.createElement('div')
        firework.className = 'firework'
        firework.style.left = Math.random() * 100 + '%'
        firework.style.top = Math.random() * 100 + '%'
        document.querySelector('.fireworks-container')?.appendChild(firework)
        setTimeout(() => firework.remove(), 2000)
    }

    return (
        <div className="app">
            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/bg-music.mp3" type="audio/mpeg" />
            </audio>

            {/* Music Control */}
            <button
                className="music-control"
                onClick={() => {
                    if (audioRef.current.paused) {
                        audioRef.current.play()
                    } else {
                        audioRef.current.pause()
                    }
                }}
            >
                🎵
            </button>

            {/* Hero Section with Countdown */}
            <section className="hero-section">
                <div className="floating-hearts">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="heart" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`
                        }}>❤️</div>
                    ))}
                </div>

                <div className="hero-content">
                    <h1 className="main-title">Happy Birthday</h1>
                    <h2 className="sub-title">My Dearest Love</h2>

                    <div className="countdown">
                        <div className="countdown-item">
                            <span className="countdown-value">{countdown.days}</span>
                            <span className="countdown-label">Days</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-value">{countdown.hours}</span>
                            <span className="countdown-label">Hours</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-value">{countdown.minutes}</span>
                            <span className="countdown-label">Minutes</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-value">{countdown.seconds}</span>
                            <span className="countdown-label">Seconds</span>
                        </div>
                    </div>

                    <div className="typing-container">
                        <p className="typed-text">{typedText}<span className="cursor">|</span></p>
                    </div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="reveal-section photo-gallery" style={{
                opacity: revealedSections.has(0) ? 1 : 0,
                transform: revealedSections.has(0) ? 'translateY(0)' : 'translateY(50px)'
            }}>
                <h2 className="section-title">Our Beautiful Moments</h2>
                <div className="photo-slider">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            className={`photo-slide ${index === currentPhotoIndex ? 'active' : ''}`}
                        >
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="photo-image"
                            />
                            <p className="photo-caption">{photo.caption}</p>
                        </div>
                    ))}
                </div>
                <div className="slider-dots">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentPhotoIndex ? 'active' : ''}`}
                            onClick={() => setCurrentPhotoIndex(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Love Story Timeline */}
            <section className="reveal-section timeline-section" style={{
                opacity: revealedSections.has(1) ? 1 : 0,
                transform: revealedSections.has(1) ? 'translateY(0)' : 'translateY(50px)'
            }}>
                <h2 className="section-title">Our Love Story</h2>
                <div className="timeline">
                    {timeline.map((event, index) => (
                        <div key={index} className="timeline-item" style={{
                            animationDelay: `${index * 0.2}s`
                        }}>
                            <div className="timeline-marker">💕</div>
                            <div className="timeline-content">
                                <span className="timeline-date">{event.date}</span>
                                <h3 className="timeline-title">{event.title}</h3>
                                <p className="timeline-description">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* I Love You Section */}
            <section className="reveal-section love-section" style={{
                opacity: revealedSections.has(2) ? 1 : 0,
                transform: revealedSections.has(2) ? 'scale(1)' : 'scale(0.8)'
            }}>
                <div className="love-content">
                    <h2 className="love-title">I Love You</h2>
                    <p className="love-message">
                        More than words can express, more than stars in the sky,
                        more than all the moments we've shared. You are my everything,
                        today and always. Happy Birthday, my love! 💖
                    </p>
                    <button className="fireworks-button" onClick={triggerFireworks}>
                        Celebrate! 🎉
                    </button>
                </div>
            </section>

            {/* Fireworks Container */}
            {showFireworks && (
                <div className="fireworks-container">
                    <div className="fireworks-overlay">
                        <h1 className="fireworks-text">🎊 Happy Birthday! 🎊</h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
