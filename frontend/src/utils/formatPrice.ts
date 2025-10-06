export const formatPrice = (price: number, currency = 'INR'): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0'
  }

  const formatters: Record<string, Intl.NumberFormat> = {
    INR: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    USD: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
    EUR: new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
  }

  const formatter = formatters[currency] || formatters.INR
  return formatter.format(price)
}

export const formatPriceChange = (currentPrice: number, previousPrice: number): {
  amount: number
  percentage: number
  isIncrease: boolean
  formatted: string
} => {
  const amount = currentPrice - previousPrice
  const percentage = previousPrice > 0 ? (amount / previousPrice) * 100 : 0
  const isIncrease = amount > 0

  return {
    amount,
    percentage,
    isIncrease,
    formatted: `${isIncrease ? '+' : ''}${formatPrice(amount)} (${isIncrease ? '+' : ''}${percentage.toFixed(1)}%)`,
  }
}

export const formatCompactPrice = (price: number): string => {
  if (price >= 10000000) { // 1 crore
    return `₹${(price / 10000000).toFixed(1)}Cr`
  } else if (price >= 100000) { // 1 lakh
    return `₹${(price / 100000).toFixed(1)}L`
  } else if (price >= 1000) { // 1 thousand
    return `₹${(price / 1000).toFixed(1)}K`
  }
  return formatPrice(price)
}
