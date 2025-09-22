import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BotSection from './components/BotSection'
import AirdropCalculator from './components/AirdropCalculator'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Smooth scroll setup
      gsap.set('html', { scrollBehavior: 'smooth' })

      // Main app fade in
      gsap.fromTo(appRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }, appRef)

    return () => ctx.revert()
  }, [])

  // AsterBot data
  const asterBot = {
    id: 'asterbot',
    title: 'AsterBot — Volume Optimized Trading Bot',
    description: 'Automated 24/7 execution tuned to maximize your allocation for Aster\'s airdrop.',
    features: [
      'Continuous automation',
      'Volume-first strategies',
      'Adjustable risk profiles',
      'Detailed reporting'
    ],
    status: 'active',
    version: '1.2.0',
    size: '3MB',
    hasCalculator: true
  }

  return (
    <div ref={appRef} className="min-h-screen bg-gradient-dark">
      <main className="relative">
        <section className="h-screen relative overflow-hidden">
          <div className="container mx-auto px-4 py-4 h-full flex flex-col">
            {/* Join AsterDEX Section - Top */}
            <div className="glass rounded-xl p-3 border border-primary-orange/20 text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-5 h-5 bg-primary-orange/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white">Join AsterDEX</h2>
              </div>
              <p className="text-gray-350 mb-3 text-sm">
                Create your account to start earning RH Points and qualify for the airdrop
              </p>
              <a
                href="https://www.asterdex.com/en/referral/c67143"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-orange text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-orange/25 transition-all duration-300 text-sm"
              >
                <span>Create Account with Referral</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-xs text-gray-450 mt-2">
                Using referral code: <span className="text-primary-orange font-mono">c67143</span>
              </p>
            </div>

            {/* Main Content - AsterBot and Calculator */}
            <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
              {/* Left Column - AsterBot */}
              <div className="flex flex-col justify-start pt-8">
                <div className="flex-1">
                  <BotSection bot={asterBot} index={0} />
                </div>
              </div>

              {/* Right Column - Calculator */}
              <div className="flex flex-col justify-start pt-8">
                <div className="flex-1">
                  <AirdropCalculator />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
