import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const AirdropCalculator = () => {
  const [formData, setFormData] = useState({
    epoch3Points: '',
    epoch4Points: '',
    pointsType: 'daily', // 'daily' or 'total'
    userPoints: '',
    fdv: ''
  })

  // Fixed data
  const epoch1Points = 4660000000 // 4.66B RH points
  const epoch2Points = 8630000000 // 8.63B RH points
  const totalEpochs = 4
  const stage2Allocation = 4 // Fixed at 4%
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculatorRef = useRef(null)
  const resultRef = useRef(null)

  useEffect(() => {
    // Initial animation when component mounts
    const ctx = gsap.context(() => {
      gsap.fromTo(calculatorRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }, calculatorRef)

    return () => ctx.revert()
  }, [])

  const validateForm = () => {
    const newErrors = {}

    // Epoch 3 Points validation
    const epoch3Points = parseFloat(formData.epoch3Points.toString().replace(/[^\d.]/g, ''))
    if (!formData.epoch3Points || isNaN(epoch3Points) || epoch3Points <= 0) {
      newErrors.epoch3Points = 'Epoch 3 RH Points must be greater than 0'
    }

    // Epoch 4 Points validation
    const epoch4Points = parseFloat(formData.epoch4Points.toString().replace(/[^\d.]/g, ''))
    if (!formData.epoch4Points || isNaN(epoch4Points) || epoch4Points <= 0) {
      newErrors.epoch4Points = 'Epoch 4 RH Points must be greater than 0'
    }

    // User Points validation
    const userPoints = parseFloat(formData.userPoints.toString().replace(/[^\d.]/g, ''))
    if (!formData.userPoints || isNaN(userPoints) || userPoints <= 0) {
      newErrors.userPoints = `${formData.pointsType === 'daily' ? 'Daily' : 'Total'} Points must be greater than 0`
    }

    // FDV validation
    const fdv = parseFloat(formData.fdv.toString().replace(/[^\d.]/g, ''))
    if (!formData.fdv || isNaN(fdv) || fdv <= 0) {
      newErrors.fdv = 'FDV must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateAirdrop = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsCalculating(true)
    setResult(null)

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      // Clean and parse numeric values, removing any formatting
      const epoch3PointsStr = formData.epoch3Points.toString().replace(/[^\d.]/g, '')
      const epoch4PointsStr = formData.epoch4Points.toString().replace(/[^\d.]/g, '')
      const userPointsStr = formData.userPoints.toString().replace(/[^\d.]/g, '')
      const fdvStr = formData.fdv.toString().replace(/[^\d.]/g, '')

      const epoch3PointsParsed = parseFloat(epoch3PointsStr) || 0
      const epoch4PointsParsed = parseFloat(epoch4PointsStr) || 0
      const userPoints = parseFloat(userPointsStr) || 0
      const fdv = parseFloat(fdvStr) || 0

      // Check for any NaN values before proceeding
      if (isNaN(epoch3PointsParsed) || isNaN(epoch4PointsParsed) || isNaN(userPoints) || isNaN(fdv)) {
        console.error('NaN detected in input values')
        setIsCalculating(false)
        return
      }

      // Airdrop Calculation Algorithm
      const totalAirdropValue = fdv * (stage2Allocation / 100)
      const totalRHPoints = epoch1Points + epoch2Points + epoch3PointsParsed + epoch4PointsParsed
      const valuePerRHPoint = totalRHPoints > 0 ? totalAirdropValue / totalRHPoints : 0

      let userTotalPoints
      if (formData.pointsType === 'daily') {
        userTotalPoints = userPoints * 7 * totalEpochs
      } else {
        userTotalPoints = userPoints
      }

      const userAllocation = valuePerRHPoint * userTotalPoints
      const userPercentageOfPool = totalRHPoints > 0 ? (userTotalPoints / totalRHPoints) * 100 : 0

      // Final check for NaN in results
      if (isNaN(totalAirdropValue) || isNaN(totalRHPoints) || isNaN(valuePerRHPoint) ||
          isNaN(userTotalPoints) || isNaN(userAllocation) || isNaN(userPercentageOfPool)) {
        console.error('NaN detected in calculation results')
        setIsCalculating(false)
        return
      }

      const calculationResult = {
        totalAirdropValue: totalAirdropValue.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        }),
        totalRHPoints: totalRHPoints.toLocaleString(),
        valuePerRHPoint: valuePerRHPoint.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 6,
          maximumFractionDigits: 6
        }),
        userTotalPoints: userTotalPoints.toLocaleString(),
        userAllocation: userAllocation.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        }),
        userPercentageOfPool: userPercentageOfPool.toFixed(4),
        calculationType: formData.pointsType
      }

      setResult(calculationResult)
      setIsCalculating(false)

      // GSAP animation for result panel
      setTimeout(() => {
        if (resultRef.current) {
          gsap.fromTo(resultRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
          )

          // Number counting animation with GSAP
          const numbers = resultRef.current.querySelectorAll('.count-number')
          numbers.forEach(numberEl => {
            const finalValue = numberEl.dataset.value

            // Handle different number formats
            let numericValue
            let isPercentage = false
            let isCurrency = false
            let isVerySmallCurrency = false

            if (finalValue.includes('%')) {
              isPercentage = true
              numericValue = parseFloat(finalValue.replace('%', ''))
            } else if (finalValue.includes('$')) {
              isCurrency = true
              numericValue = parseFloat(finalValue.replace(/[$,]/g, ''))
              // Check for very small currency values (like value per point)
              if (numericValue < 1 && numericValue > 0) {
                isVerySmallCurrency = true
              }
            } else {
              // Regular number with potential commas
              numericValue = parseFloat(finalValue.replace(/[,]/g, ''))
            }

            if (isNaN(numericValue)) {
              numberEl.textContent = finalValue
              return
            }

            const obj = { value: 0 }
            gsap.to(obj, {
              value: numericValue,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                if (isPercentage) {
                  numberEl.textContent = obj.value.toFixed(4) + '%'
                } else if (isCurrency) {
                  if (isVerySmallCurrency) {
                    // For very small currency values, show more decimal places
                    numberEl.textContent = obj.value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 6
                    })
                  } else {
                    numberEl.textContent = obj.value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })
                  }
                } else {
                  // Regular number formatting with commas - always show as integer for large numbers
                  numberEl.textContent = Math.floor(obj.value).toLocaleString('en-US')
                }
              },
              onComplete: () => {
                // Ensure final value is exactly what we expect
                if (isPercentage) {
                  numberEl.textContent = numericValue.toFixed(4) + '%'
                } else if (isCurrency) {
                  if (isVerySmallCurrency) {
                    numberEl.textContent = numericValue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 6
                    })
                  } else {
                    numberEl.textContent = numericValue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })
                  }
                } else {
                  // Regular numbers - format with commas for all sizes
                  numberEl.textContent = numericValue.toLocaleString('en-US')
                }
              }
            })
          })
        }
      }, 100)

    } catch (error) {
      console.error('Calculation error:', error)
      setIsCalculating(false)
      alert('Error during calculation. Please check your inputs and try again.')
    }
  }

  const copyResults = () => {
    if (!result) return

    const resultText = `
AsterBot Airdrop Estimate:
• Total Airdrop Pool: ${result.totalAirdropValue}
• Total RH Points: ${result.totalRHPoints}
• Value per RH Point: ${result.valuePerRHPoint}
• Your Total Points: ${result.userTotalPoints}
• Pool Share: ${result.userPercentageOfPool}%
• Your Allocation: ${result.userAllocation}

Epoch Distribution: E1: 4.66B | E2: 8.63B | E3: ${formData.epoch3Points} | E4: ${formData.epoch4Points}
FDV: $${formData.fdv} | Stage 2: 4%
Points Type: ${result.calculationType === 'daily' ? 'Daily RH Points' : 'Total RH Points'}
Generated by AsterBot
    `.trim()

    navigator.clipboard.writeText(resultText).then(() => {
      // GSAP success animation
      gsap.to(resultRef.current, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })

      // Show copied feedback
      const button = document.querySelector('.copy-button')
      const originalText = button.textContent
      button.textContent = 'Copied!'
      setTimeout(() => {
        button.textContent = originalText
      }, 2000)
    })
  }

  const formatNumberInput = (value) => {
    // Remove all non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '')

    // Convert to number and back to handle multiple decimal points
    const numValue = parseFloat(cleanValue)
    if (isNaN(numValue)) return ''

    return cleanValue
  }

  const formatDisplayNumber = (value) => {
    if (!value) return ''
    const numValue = parseFloat(value.replace(/[^\d.]/g, ''))
    if (isNaN(numValue)) return value
    return numValue.toLocaleString('en-US')
  }

  const handleInputBlur = (field, value) => {
    // Format number with thousands separators on blur
    if (['epoch3Points', 'epoch4Points', 'userPoints', 'fdv'].includes(field)) {
      const cleanValue = value.replace(/[^\d.]/g, '')
      const numValue = parseFloat(cleanValue)
      if (!isNaN(numValue) && numValue > 0) {
        const formattedValue = numValue.toLocaleString('en-US')
        setFormData(prev => ({ ...prev, [field]: formattedValue }))
      }
    }
  }

  const handleInputFocus = (field, value) => {
    // Remove formatting on focus for easier editing
    if (['epoch3Points', 'epoch4Points', 'userPoints', 'fdv'].includes(field)) {
      const cleanValue = value.replace(/[^\d.]/g, '')
      setFormData(prev => ({ ...prev, [field]: cleanValue }))
    }
  }

  const handleInputChange = (field, value) => {
    let processedValue = value

    // Format numeric fields
    if (['epoch3Points', 'epoch4Points', 'userPoints', 'fdv'].includes(field)) {
      processedValue = formatNumberInput(value)
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }

    // Clear previous results when input changes to avoid stale data
    if (result) {
      setResult(null)
    }
  }

  return (
    <div ref={calculatorRef} className="max-w-full mx-auto">
      <div className="glass rounded-xl p-4 border border-primary-orange/20">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-white mb-1">
            Airdrop Calculator
          </h3>
          <p className="text-gray-350 text-sm">
            Calculate your estimated airdrop allocation
          </p>
        </div>

        <form onSubmit={calculateAirdrop} className="space-y-3">
          {/* Historical Epochs Info */}
          <div className="bg-dark-800/30 border border-gray-600 rounded-lg p-3">
            <h5 className="text-xs font-semibold text-primary-orange mb-2">Historical Epochs (Fixed)</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-350">Epoch 1:</span>
                <span className="text-white font-mono ml-1">4.66B</span>
              </div>
              <div>
                <span className="text-gray-350">Epoch 2:</span>
                <span className="text-white font-mono ml-1">8.63B</span>
              </div>
            </div>
          </div>

          {/* Future Epochs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="epoch3Points" className="block text-xs font-semibold text-primary-orange mb-1">
                Epoch 3 (Est.)
              </label>
              <input
                id="epoch3Points"
                type="text"
                value={formData.epoch3Points}
                onChange={(e) => handleInputChange('epoch3Points', e.target.value)}
                onBlur={(e) => handleInputBlur('epoch3Points', e.target.value)}
                onFocus={(e) => handleInputFocus('epoch3Points', e.target.value)}
                placeholder="10B"
                className={`w-full bg-dark-800 border ${
                  errors.epoch3Points ? 'border-red-500' : 'border-gray-600'
                } text-white px-3 py-2 rounded-lg focus:border-primary-orange focus:outline-none transition-colors duration-200 text-sm`}
              />
              {errors.epoch3Points && (
                <p className="error-text text-xs mt-1">{errors.epoch3Points}</p>
              )}
            </div>
            <div>
              <label htmlFor="epoch4Points" className="block text-xs font-semibold text-primary-orange mb-1">
                Epoch 4 (Est.)
              </label>
              <input
                id="epoch4Points"
                type="text"
                value={formData.epoch4Points}
                onChange={(e) => handleInputChange('epoch4Points', e.target.value)}
                onBlur={(e) => handleInputBlur('epoch4Points', e.target.value)}
                onFocus={(e) => handleInputFocus('epoch4Points', e.target.value)}
                placeholder="12B"
                className={`w-full bg-dark-800 border ${
                  errors.epoch4Points ? 'border-red-500' : 'border-gray-600'
                } text-white px-3 py-2 rounded-lg focus:border-primary-orange focus:outline-none transition-colors duration-200 text-sm`}
              />
              {errors.epoch4Points && (
                <p className="error-text text-xs mt-1">{errors.epoch4Points}</p>
              )}
            </div>
          </div>

          {/* Points Type */}
          <div>
            <label className="block text-xs font-semibold text-primary-orange mb-2">
              Points Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="pointsType"
                  value="daily"
                  checked={formData.pointsType === 'daily'}
                  onChange={(e) => handleInputChange('pointsType', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-full p-2 rounded-lg border transition-all duration-200 ${
                  formData.pointsType === 'daily'
                    ? 'border-primary-orange bg-primary-orange/10 text-primary-orange'
                    : 'border-gray-600 bg-dark-800 text-gray-350'
                }`}>
                  <span className="font-medium text-xs">Daily</span>
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="pointsType"
                  value="total"
                  checked={formData.pointsType === 'total'}
                  onChange={(e) => handleInputChange('pointsType', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-full p-2 rounded-lg border transition-all duration-200 ${
                  formData.pointsType === 'total'
                    ? 'border-primary-orange bg-primary-orange/10 text-primary-orange'
                    : 'border-gray-600 bg-dark-800 text-gray-350'
                }`}>
                  <span className="font-medium text-xs">Total</span>
                </div>
              </label>
            </div>
          </div>

          {/* User Points and FDV in Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="userPoints" className="block text-xs font-semibold text-primary-orange mb-1">
                Your {formData.pointsType === 'daily' ? 'Daily' : 'Total'} Points
              </label>
              <input
                id="userPoints"
                type="text"
                value={formData.userPoints}
                onChange={(e) => handleInputChange('userPoints', e.target.value)}
                onBlur={(e) => handleInputBlur('userPoints', e.target.value)}
                onFocus={(e) => handleInputFocus('userPoints', e.target.value)}
                placeholder={formData.pointsType === 'daily' ? '100' : '8,400'}
                className={`w-full bg-dark-800 border ${
                  errors.userPoints ? 'border-red-500' : 'border-gray-600'
                } text-white px-3 py-2 rounded-lg focus:border-primary-orange focus:outline-none transition-colors duration-200 text-sm`}
              />
              {errors.userPoints && (
                <p className="error-text text-xs mt-1">{errors.userPoints}</p>
              )}
            </div>
            <div>
              <label htmlFor="fdv" className="block text-xs font-semibold text-primary-orange mb-1">
                FDV (USD)
              </label>
              <input
                id="fdv"
                type="text"
                value={formData.fdv}
                onChange={(e) => handleInputChange('fdv', e.target.value)}
                onBlur={(e) => handleInputBlur('fdv', e.target.value)}
                onFocus={(e) => handleInputFocus('fdv', e.target.value)}
                placeholder="1B"
                className={`w-full bg-dark-800 border ${
                  errors.fdv ? 'border-red-500' : 'border-gray-600'
                } text-white px-3 py-2 rounded-lg focus:border-primary-orange focus:outline-none transition-colors duration-200 text-sm`}
              />
              {errors.fdv && (
                <p className="error-text text-xs mt-1">{errors.fdv}</p>
              )}
            </div>
          </div>

          {/* Stage 2 Allocation (Fixed) */}
          <div className="bg-dark-800/30 border border-gray-600 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-350 text-xs">Stage 2 Allocation:</span>
              <span className="text-white font-mono text-sm">4%</span>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            disabled={isCalculating}
            className={`w-full bg-gradient-orange text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/25 disabled:opacity-50 disabled:cursor-not-allowed ${
              isCalculating ? 'loading' : ''
            }`}
          >
            {isCalculating ? 'Calculating...' : 'Calculate'}
          </button>
        </form>

        {/* Results Section */}
        {result ? (
          <div ref={resultRef} className="bg-primary-orange/10 border border-primary-orange/30 rounded-lg p-3 mt-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Results</h4>
              <button
                onClick={copyResults}
                className="copy-button text-xs text-primary-orange hover:text-primary-orange-light transition-colors duration-200"
              >
                Copy
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-350">Pool:</span>
                <span className="count-number font-mono text-primary-orange font-semibold" data-value={result.totalAirdropValue}>
                  {result.totalAirdropValue}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-350">Your Share:</span>
                <span className="count-number font-mono text-white" data-value={result.userPercentageOfPool}>
                  {result.userPercentageOfPool}%
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-600 pt-2">
                <span className="text-gray-350 font-semibold">Your Allocation:</span>
                <span className="count-number font-mono text-green-400 font-bold" data-value={result.userAllocation}>
                  {result.userAllocation}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-dark-800/50 border border-gray-600 rounded-lg p-3 text-center mt-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-450 text-xs">Enter data to calculate</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AirdropCalculator