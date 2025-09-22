import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const trustRef = useRef(null)
  const mockupRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Hero Entry Animation
      const tl = gsap.timeline({ delay: 0.3 })

      // Staggered fade-in + upward slide animation
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(ctaRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(trustRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(mockupRef.current,
        { opacity: 0, scale: 0.8, rotateY: 15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      // Floating animation for mockup
      gsap.to(mockupRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToLearn = () => {
    const asterSection = document.getElementById('aster')
    if (asterSection) {
      asterSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWaitlistModal = () => {
    // Placeholder for waitlist modal - replace with actual modal implementation
    alert('Waitlist signup modal would open here. Connect to /api/waitlist endpoint.')
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-orange opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-orange-light opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <h1
              ref={titleRef}
              className="text-responsive-xl font-black text-white leading-tight"
            >
              <span className="text-primary-orange">HunterZ</span> — High-Volume Bot Hub for{' '}
              <span className="text-primary-orange">PerpDex Airdrops</span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subtitleRef}
              className="text-xl lg:text-2xl text-gray-350 max-w-2xl mx-auto lg:mx-0"
            >
              Automate volume, maximize your airdrop allocation. Tools for advanced users and traders.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToLearn}
                className="btn-hover-lift bg-gradient-orange text-white px-8 py-4 rounded-lg font-semibold text-lg"
                aria-label="Learn how HunterZ works"
              >
                Learn How It Works
              </button>
              <button
                onClick={openWaitlistModal}
                className="btn-hover-lift border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
                aria-label="Join HunterZ waitlist"
              >
                Join Waitlist
              </button>
            </div>

            {/* Trust Strip */}
            <div ref={trustRef} className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
              <div className="flex items-center gap-2 text-gray-450">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-gray-450">
                <div className="w-3 h-3 bg-primary-orange rounded-full"></div>
                <span className="text-sm font-medium">24/7 Operation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-450">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Audit-Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stylized Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={mockupRef}
              className="relative max-w-md w-full"
            >
              {/* Stylized Device/Bot Illustration */}
              <div className="glass rounded-2xl p-8 border border-primary-orange/20">
                <div className="space-y-4">
                  {/* Terminal-like header */}
                  <div className="flex items-center gap-2 pb-4 border-b border-gray-600">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-450 ml-2">HunterZ Terminal</span>
                  </div>

                  {/* Animated stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-450">Volume Today:</span>
                      <span className="text-primary-orange font-mono">$2,847,392</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-450">Active Bots:</span>
                      <span className="text-green-400 font-mono">6/6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-450">Est. Points:</span>
                      <span className="text-primary-orange font-mono">127,834</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3 pt-4">
                    <div>
                      <div className="flex justify-between text-xs text-gray-450 mb-1">
                        <span>Points Earned</span>
                        <span>87%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-orange h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-450 mb-1">
                        <span>Daily Goal</span>
                        <span>64%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">All systems operational</span>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-orange opacity-20 rounded-2xl blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero