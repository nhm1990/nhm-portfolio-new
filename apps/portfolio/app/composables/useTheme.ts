/**
 * Zentrale Theme-Konfiguration für das Portfolio
 * Alle Farben und Gradients werden hier verwaltet
 */

export const useTheme = () => {
  // Haupt-Farbpalette (Naturgrün-Schema)
  const colors = {
    // Primärfarben
    primary: {
      light: '#7aa87a', // sage-400
      main: '#5a8a5a', // sage-500
      dark: '#4a724a', // sage-600
    },
    // Akzentfarben
    accent: {
      light: '#5ac788', // mint-400
      main: '#3bb06a', // mint-500
      dark: '#2d8f54', // mint-600
    },
    // Sekundärfarben
    secondary: {
      light: '#829978', // moss-400
      main: '#5d7a52', // moss-500
      dark: '#4a6241', // moss-600
    },
    // Neutrale Farben
    neutral: {
      white: '#ffffff',
      light: '#f6f8f6', // sage-50
      medium: '#e8f0e8', // sage-100
      dark: '#2C2D32', // charcoal-900
    },
  }

  // Vordefinierte Gradients
  const gradients = {
    primary: 'linear-gradient(135deg, #5a8a5a 0%, #3bb06a 100%)',
    accent: 'linear-gradient(135deg, #3bb06a 0%, #5d7a52 100%)',
    text: 'linear-gradient(90deg, #5a8a5a 0%, #2C2D32 50%, #5a8a5a 100%)',
    soft: 'linear-gradient(180deg, #ffffff 0%, #f6f8f6 100%)',
    hero: 'radial-gradient(circle at 30% 50%, #e0f5e9 0%, #ffffff 50%, #f6f8f6 100%)',
  }

  // Tailwind-Klassen für Gradients (zur einfachen Verwendung)
  const gradientClasses = {
    primary: 'bg-gradient-primary',
    accent: 'bg-gradient-accent',
    text: 'bg-gradient-text bg-clip-text text-transparent',
    soft: 'bg-gradient-soft',
    hero: 'bg-gradient-hero',
  }

  // Hintergrundmuster
  const patterns = {
    dots: 'bg-pattern-dots',
    grid: 'bg-pattern-grid',
    leaves: 'bg-pattern-leaves',
    circuit: 'bg-pattern-circuit',
    code: 'bg-pattern-code',
    binary: 'bg-pattern-binary',
    hexagons: 'bg-pattern-hexagons',
  }

  // Button-Styles (PrimeVue)
  const buttonStyles = {
    primary:
      '!bg-gradient-primary !border-0 !text-white !shadow-lg hover:!shadow-xl hover:!scale-105 !transition-all',
    secondary: '!border-2 !border-sage-500 !text-sage-600 hover:!bg-sage-50 !transition-all',
    accent: '!bg-gradient-accent !border-0 !text-white !shadow-md hover:!shadow-lg !transition-all',
  }

  // Chip/Badge-Styles (für Skills, Tags, etc.)
  const chipStyles = {
    primary: '!bg-sage-500 !text-white',
    secondary: '!bg-moss-500 !text-white',
    accent: '!bg-mint-500 !text-white',
    light: '!bg-sage-100 !text-sage-700',
    gradient: '!bg-gradient-primary !text-white',
    gradientAccent: '!bg-gradient-accent !text-white',
  }

  // Section-Hintergründe
  const sectionBackgrounds = {
    hero: 'bg-white bg-pattern-leaves', // Weiß + Blätter
    marquee: 'bg-gradient-dark bg-pattern-circuit', // Dunkler Gradient + Circuit
    clients: 'bg-sage-50 bg-pattern-grid', // Sehr hell + Grid
    portfolio: 'bg-white bg-pattern-code', // Weiß + Code-Pattern
    skills: 'bg-mint-50 bg-pattern-dots', // Mint-Ton + Dots
    experience: 'bg-sage-50 bg-pattern-binary', // Sage-Ton + Binary
    contact: 'bg-white bg-pattern-hexagons', // Weiß + Hexagons
  }

  return {
    colors,
    gradients,
    gradientClasses,
    patterns,
    buttonStyles,
    chipStyles,
    sectionBackgrounds,
  }
}
