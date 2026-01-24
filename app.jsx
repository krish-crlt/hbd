import { useState, useEffect, useRef } from 'react'

function App() {
    const [musicStarted, setMusicStarted] = useState(false)
    const [typedText, setTypedText] = useState('')
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [showFireworks, setShowFireworks] = useState(false)
    const [showGift, setShowGift] = useState(false)
    const [giftOpened, setGiftOpened] = useState(false)
    const [showCake, setShowCake] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [showPhotoAlbum, setShowPhotoAlbum] = useState(false)
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
        { id: 4, src: "/making-memories.png", caption: "Making Memories" },
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

        // Show gift box after fireworks end (5 seconds)
        setTimeout(() => {
            setShowFireworks(false)
            setShowGift(true)
        }, 5000)
    }

    const createFirework = () => {
        const firework = document.createElement('div')
        firework.className = 'firework'
        firework.style.left = Math.random() * 100 + '%'
        firework.style.top = Math.random() * 100 + '%'
        document.querySelector('.fireworks-container')?.appendChild(firework)
        setTimeout(() => firework.remove(), 2000)
    }

    const handleStartMusic = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
        setMusicStarted(true)
    }

    const handleGiftClick = () => {
        setGiftOpened(true)
        // Show cake after balloons fly up (3 seconds)
        setTimeout(() => {
            setShowCake(true)
        }, 3000)
    }

    const handleCakeClick = () => {
        setShowMessage(true)
    }

    const handleContinueToWebsite = () => {
        setShowGift(false)
        setShowPhotoAlbum(true)
        // Scroll to photo album section after a short delay
        setTimeout(() => {
            document.querySelector('.photo-album-section')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
    }

    return (
        <div className="app">
            {/* Music Splash Screen */}
            {!musicStarted && (
                <div className="music-splash">
                    <div className="splash-content">
                        <div className="splash-icon">🎵</div>
                        <h1 className="splash-title">Welcome!</h1>
                        <p className="splash-message">Click below to play music and continue</p>
                        <button className="start-music-button" onClick={handleStartMusic}>
                            Play Music & Continue 🎶
                        </button>
                    </div>
                </div>
            )}

            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/bg-music.m4a" type="audio/mp4" />
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

            {/* Photo Album Section */}
            {showPhotoAlbum && (
                <section className="photo-album-section reveal-section">
                    <h2 className="section-title">Our Photo Album 📸</h2>
                    <div className="photo-album-grid">
                        {photos.map((photo) => (
                            <div key={photo.id} className="album-photo-card">
                                <img src={photo.src} alt={photo.caption} className="album-photo" />
                                <p className="album-caption">{photo.caption}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Fireworks Container */}
            {showFireworks && (
                <div className="fireworks-container">
                    <div className="fireworks-overlay">
                        <h1 className="fireworks-text">🎊 Happy Birthday! 🎊</h1>
                    </div>
                </div>
            )}

            {/* Gift Box */}
            {showGift && (
                <div className="gift-container">
                    <div className={`gift-box ${giftOpened ? 'opened' : ''}`} onClick={handleGiftClick}>
                        {!giftOpened && (
                            <>
                                <div className="gift-bow">🎀</div>
                                <div className="gift-body">
                                    <div className="gift-ribbon-v"></div>
                                    <div className="gift-ribbon-h"></div>
                                    <div className="gift-lid">
                                        <div className="gift-lid-ribbon"></div>
                                    </div>
                                    <div className="gift-base"></div>
                                </div>
                                <p className="tap-text">Tap to Open! 🎁</p>
                            </>
                        )}

                        {giftOpened && (
                            <>
                                {/* Heart Balloons */}
                                {[...Array(15)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="heart-balloon"
                                        style={{
                                            left: `${10 + Math.random() * 80}%`,
                                            animationDelay: `${Math.random() * 0.5}s`,
                                            '--balloon-color': ['#ff6b9d', '#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#ff6ba5'][i % 6]
                                        }}
                                    >
                                        ❤️
                                    </div>
                                ))}

                                {/* Birthday Cake */}
                                {showCake && !showMessage && (
                                    <div className="birthday-cake-container">
                                        <div className="birthday-cake">
                                            <img src="/birthday-cake.png" alt="Birthday Cake" className="cake-image" />
                                        </div>
                                        <button className="cake-tap-button" onClick={handleCakeClick}>
                                            Tap to see the message 💌
                                        </button>
                                    </div>
                                )}

                                {/* Bengali Birthday Message */}
                                {showMessage && (
                                    <div className="bengali-message">
                                        <h2 className="bengali-title">🎂🤍 শুভ জন্মদিন প্রিয় 🤍🎂</h2>
                                        <div className="bengali-text">
                                            <p>তুমি আমার জীবনের সেই শান্ত দুপুর,</p>
                                            <p>যেখানে শব্দ কম আর অনুভূতি গভীর 🌙</p>
                                            <p>তোমার হাসিতে আমার সব ক্লান্তি গলে যায়,</p>
                                            <p>আর তোমার উপস্থিতিতেই আমার দিনটা সম্পূর্ণ হয় ✨</p>
                                            <br />
                                            <p>তুমি শুধু একজন মানুষ নও,</p>
                                            <p>তুমি আমার অভ্যাস, আমার স্বস্তি, আমার নীরব ভালোবাসা 🤍</p>
                                            <p>আজকের দিনটা হোক ঠিক তোমার মতোই—</p>
                                            <p>নরম, সুন্দর আর আলোয় ভরা 🌸</p>
                                            <br />
                                            <p>ঈশ্বর যেন তোমার প্রতিটি স্বপ্ন ছুঁয়ে দেন,</p>
                                            <p>আর আমার হাতটা যেন সবসময় তোমার হাতেই থাকে 💫</p>
                                            <p>সবসময় এমনই থেকো, প্রিয়—</p>
                                            <p>আমার সবচেয়ে সুন্দর গল্প 🤍🌷</p>
                                            <br />
                                            <p className="english-text">Happy Birthday Dear 🎈✨</p>
                                        </div>
                                        <button className="continue-website-button" onClick={handleContinueToWebsite}>
                                            Continue to Website & Photo Album 📸
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
