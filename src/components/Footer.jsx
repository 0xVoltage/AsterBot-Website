import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const openModal = (type) => {
    // Placeholder for modal implementations - replace with actual modal logic
    switch (type) {
      case 'privacy':
        alert('Privacy Policy modal would open here. Connect to /legal/privacy endpoint.')
        break
      case 'terms':
        alert('Terms of Service modal would open here. Connect to /legal/terms endpoint.')
        break
      case 'contact':
        alert('Contact modal would open here. Connect to /api/contact endpoint.')
        break
      default:
        break
    }
  }

  const socialLinks = [
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Discord',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-dark-900/95 border-t border-primary-orange/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-white">HunterZ</span>
            </div>
            <p className="text-gray-450 text-sm leading-relaxed">
              Professional trading bot hub for PerpDex airdrops. Automate volume responsibly with enterprise-grade tools.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-450 hover:text-primary-orange transition-colors duration-200"
                  aria-label={`Follow us on ${link.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('aster')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-450 hover:text-white transition-colors duration-200 text-sm"
                >
                  Aster Bot
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('contact')}
                  className="text-gray-450 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-450 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Documentation link would go here. Connect to /docs endpoint.')
                  }}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-450 hover:text-white transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('API docs link would go here. Connect to /api-docs endpoint.')
                  }}
                >
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal & Compliance</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openModal('privacy')}
                  className="text-gray-450 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('terms')}
                  className="text-gray-450 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <span className="text-gray-450 text-sm">Risk Disclosure</span>
              </li>
              <li>
                <span className="text-gray-450 text-sm">Compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-450 text-sm text-center md:text-left">
              © {currentYear} HunterZ. All rights reserved.
            </p>

            {/* Legal Notice */}
            <div className="text-center md:text-right">
              <p className="text-gray-450 text-xs leading-relaxed max-w-md">
                Use responsibly — this project is for educational and research purposes.
                HunterZ is not offering financial advice. Trading involves risk of loss.
              </p>
            </div>
          </div>

          {/* Additional Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="space-y-2">
                <h4 className="text-yellow-400 font-semibold text-sm">Important Responsible Usage Notice</h4>
                <p className="text-gray-350 text-xs leading-relaxed">
                  Our bots are designed for legitimate volume generation and airdrop farming within platform terms of service.
                  Users are responsible for compliance with local regulations and platform rules. We strongly recommend consulting
                  with legal and financial advisors before using automated trading tools. Results may vary and past performance
                  does not guarantee future results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer