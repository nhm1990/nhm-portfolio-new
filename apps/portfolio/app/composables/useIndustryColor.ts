export const useIndustryColor = () => {
  const getIndustryColor = (industry: string): string => {
    const colors: Record<string, string> = {
      Chemical: '#5d7a52', // moss-500
      Finance: '#3bb06a', // mint-500
      Insurance: '#7aa87a', // sage-400
      'IT Consulting': '#2C2D32', // charcoal-900
    }
    return colors[industry] || '#5a8a5a'
  }

  return { getIndustryColor }
}
