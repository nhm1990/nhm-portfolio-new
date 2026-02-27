import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
  primitive: {
    // Custom color palette from your photo
    bronze: {
      50: '#f9f5f4',
      100: '#f3ebe9',
      200: '#e7d7d3',
      300: '#d4b8b0',
      400: '#bf9689',
      500: '#7A453F',
      600: '#683a35',
      700: '#56302c',
      800: '#442623',
      900: '#321c1a',
      950: '#1f110f',
    },
    skyblue: {
      50: '#f7fbfd',
      100: '#eff6fb',
      200: '#e4f0f7',
      300: '#B9D1E9',
      400: '#9fc1dd',
      500: '#85b1d1',
      600: '#6b9fc5',
      700: '#5689b3',
      800: '#46729a',
      900: '#375b7b',
      950: '#28445c',
    },
    charcoal: {
      50: '#f7f7f7',
      100: '#e3e3e3',
      200: '#c8c8c8',
      300: '#a4a4a4',
      400: '#818181',
      500: '#666666',
      600: '#515151',
      700: '#434343',
      800: '#383838',
      900: '#2C2D32',
      950: '#1a1a1c',
    },
    sage: {
      50: '#f9faf8',
      100: '#f2f3f1',
      200: '#e6e7e3',
      300: '#d3d5cf',
      400: '#c0c3bb',
      500: '#959684',
      600: '#7d7f70',
      700: '#65675b',
      800: '#4d4e46',
      900: '#353631',
      950: '#1d1e1c',
    },
  },
  semantic: {
    primary: {
      50: '{bronze.50}',
      100: '{bronze.100}',
      200: '{bronze.200}',
      300: '{bronze.300}',
      400: '{bronze.400}',
      500: '{bronze.500}',
      600: '{bronze.600}',
      700: '{bronze.700}',
      800: '{bronze.800}',
      900: '{bronze.900}',
      950: '{bronze.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{bronze.500}',
          inverseColor: '#ffffff',
          hoverColor: '{bronze.600}',
          activeColor: '{bronze.700}',
        },
        highlight: {
          background: '{skyblue.300}',
          focusBackground: '{skyblue.400}',
          color: '{charcoal.900}',
          focusColor: '{charcoal.950}',
        },
      },
    },
  },
})

export default {
  preset: MyPreset,
  options: {
    prefix: 'p',
    darkModeSelector: 'none', // No dark mode
    cssLayer: false,
  },
}
