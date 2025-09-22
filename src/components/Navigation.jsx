import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Navigation = ({ bots, currentView, setCurrentView }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    // GSAP nav entry animation
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Animate active indicator when view changes
    animateActiveIndicator(currentView)
  }, [currentView])

  // GSAP animation for active indicator
  const animateActiveIndicator = (section) => {
    const linkElement = document.querySelector(`[data-section="${section}"]`)
    if (linkElement && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: linkElement.offsetWidth,
        x: linkElement.offsetLeft,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const navigateToView = (viewId) => {
    setIsOpen(false) // Close mobile menu
    setCurrentView(viewId === 'hero' ? 'home' : viewId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openDashboard = () => {
    // Placeholder for dashboard - replace with actual dashboard logic
    alert('Dashboard login would open here. Connect to authentication system.')
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-lg border-b border-primary-orange/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigateToView('hero')}
            className="flex items-center gap-3 text-xl font-bold text-white hover:text-primary-orange transition-colors duration-300"
            aria-label="HunterZ Home"
          >
            <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">H</span>
            </div>
            HunterZ
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center relative">
            <div className="flex items-center space-x-1 relative">
              {/* Active indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-primary-orange transition-all duration-300 ease-out"
                style={{ width: '0px', transform: 'translateX(0px)' }}
              ></div>

              {/* Navigation Links */}
              <button
                data-section="home"
                onClick={() => navigateToView('hero')}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === 'home'
                    ? 'text-primary-orange'
                    : 'text-gray-350 hover:text-white'
                }`}
                aria-label="Go to Home"
              >
                Home
              </button>

              {bots.map((bot) => (
                <button
                  key={bot.id}
                  data-section={bot.id}
                  onClick={() => navigateToView(bot.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentView === bot.id
                      ? 'text-primary-orange'
                      : 'text-gray-350 hover:text-white'
                  }`}
                  aria-label={`Go to ${bot.title}`}
                >
                  {bot.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openDashboard}
              className="btn-hover-lift bg-gradient-orange text-white px-6 py-2 rounded-lg font-semibold text-sm"
              aria-label="Open dashboard"
            >
              Sign In / Dashboard
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-primary-orange transition-colors duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-600">
            <div className="space-y-2" role="menu">
              <button
                onClick={() => navigateToView('hero')}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentView === 'home'
                    ? 'text-primary-orange bg-primary-orange/10'
                    : 'text-gray-350 hover:text-white hover:bg-gray-700/50'
                } rounded-lg`}
                role="menuitem"
              >
                Home
              </button>

              {bots.map((bot) => (
                <button
                  key={bot.id}
                  onClick={() => navigateToView(bot.id)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentView === bot.id
                      ? 'text-primary-orange bg-primary-orange/10'
                      : 'text-gray-350 hover:text-white hover:bg-gray-700/50'
                  } rounded-lg`}
                  role="menuitem"
                >
                  {bot.title}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-600 mt-4">
                <button
                  onClick={openDashboard}
                  className="w-full bg-gradient-orange text-white px-4 py-3 rounded-lg font-semibold text-sm"
                  role="menuitem"
                >
                  Sign In / Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation