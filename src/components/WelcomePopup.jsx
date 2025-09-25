import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const WelcomePopup = ({ isVisible, onClose }) => {
  const popupRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isVisible) {
      const ctx = gsap.context(() => {
        // Animate overlay and popup in
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        gsap.fromTo(popupRef.current,
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
        )
      })

      return () => ctx.revert()
    }
  }, [isVisible])

  const handleClose = () => {
    const ctx = gsap.context(() => {
      gsap.to(popupRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'power2.in'
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose
      })
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Popup Content */}
      <div
        ref={popupRef}
        className="relative max-w-md w-full glass rounded-2xl p-6 border border-primary-orange/30 shadow-2xl"
      >

        {/* Content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-orange/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Welcome to AsterBot!
          </h2>

          <p className="text-gray-350 mb-6 leading-relaxed">
            To maximize your earnings and qualify for the airdrop, create your AsterDEX account now.
            Start accumulating RH Points immediately with our optimized trading strategies.
          </p>

          {/* Join AsterDEX Section */}
          <div className="bg-dark-800/50 rounded-xl p-4 border border-primary-orange/20 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-5 h-5 bg-primary-orange/20 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Join AsterDEX</h3>
            </div>

            <p className="text-gray-350 mb-4 text-sm">
              Create your account to start earning RH Points and qualify for the airdrop
            </p>

            {/* Team Boost Message */}
            <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-primary-orange/20 rounded flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-primary-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-primary-orange font-semibold text-sm">Team Boost Active!</span>
              </div>
              <p className="text-gray-300 text-xs">
                Join our team on Aster and get a <span className="text-primary-orange font-bold">Team Boost of x1.5</span> on all your earnings!
              </p>
            </div>

            <a
              href="https://www.asterdex.com/en/referral/c67143"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="inline-flex items-center gap-2 bg-gradient-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-orange/25 transition-all duration-300 text-sm w-full justify-center relative overflow-hidden group"
            >
              <span className="relative z-10">Join AsterDEX Now</span>
              <div className="relative z-10 flex items-center gap-1">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+50% Boost</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePopup
