import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BotSection = ({ bot, index }) => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isNotified, setIsNotified] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.fromTo(cardRef.current.children,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out'
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleButtonHover = (e, isEntering) => {
    gsap.to(e.currentTarget, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleDownload = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })

    window.open("https://github.com/0xVoltage/AsterBot", "_blank")
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    try {
      const successTl = gsap.timeline()
      successTl.to(cardRef.current, {
        scale: 1.02,
        duration: 0.1,
        ease: 'power2.out'
      })
      .to(cardRef.current, {
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      })

      setIsNotified(true)
      setEmail('')

      setTimeout(() => setIsNotified(false), 3000)

    } catch (error) {
      setEmailError('Failed to sign up. Please try again.')
    }
  }

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute ${index % 2 === 0 ? 'top-1/4 left-1/4' : 'bottom-1/4 right-1/4'} w-96 h-96 bg-primary-orange rounded-full blur-3xl`}></div>
      </div>

      <div className="relative z-10 w-full">
        <div
          ref={cardRef}
          className="glass rounded-xl p-4 border border-primary-orange/20"
        >
          {bot.status === 'active' ? (
            <div className="grid lg:grid-cols-3 gap-4 items-start">
              <div className="lg:col-span-2 space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {bot.title}
                  </h2>
                  <p className="text-sm text-gray-350 mb-3">
                    {bot.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-primary-orange mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-1">
                    {bot.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-350 text-xs">
                        <div className="w-1.5 h-1.5 bg-primary-orange rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-dark-800/50 rounded-lg p-3 border border-gray-600">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-450">Version:</span>
                      <span className="text-primary-orange ml-1 font-mono">{bot.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-450">Size:</span>
                      <span className="text-white ml-1 font-mono">{bot.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-orange rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Download Bot
                    </h4>
                    <p className="text-xs text-gray-450 mb-3">
                      Get started with automated trading
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                    className="w-full bg-gradient-orange text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/25"
                    aria-label={`Download ${bot.title}`}
                  >
                    Download Now
                  </button>

                  <div className="text-xs text-gray-450 space-y-1">
                    <p>v{bot.version} • {bot.size}</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto space-y-8">
              <div>
                <div className="w-20 h-20 bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {bot.title}
                </h2>
                <p className="text-lg text-gray-350 mb-6">
                  {bot.description}
                </p>
              </div>

              <div className="bg-dark-800/50 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold text-primary-orange mb-4">
                  Coming Features
                </h3>
                <ul className="space-y-2">
                  {bot.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-350">
                      <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Get Notified
                </h3>
                <p className="text-sm text-gray-450 mb-4">
                  Be the first to know when this bot is ready
                </p>

                {!isNotified ? (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full bg-dark-800 border ${
                          emailError ? 'border-red-500' : 'border-gray-600'
                        } text-white px-4 py-3 rounded-lg focus:border-primary-orange focus:outline-none transition-colors duration-200`}
                        aria-label="Email address for notifications"
                        aria-describedby={emailError ? 'email-error' : undefined}
                      />
                      {emailError && (
                        <p id="email-error" className="error-text mt-2" role="alert">
                          {emailError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                      className="w-full bg-gradient-orange text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/25"
                      aria-label={`Get notified when ${bot.title} is ready`}
                    >
                      Notify Me
                    </button>
                  </form>
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold">Subscribed!</span>
                    </div>
                    <p className="text-sm text-gray-450">
                      You'll be notified when {bot.title.split(' ')[0]} is ready.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BotSection
