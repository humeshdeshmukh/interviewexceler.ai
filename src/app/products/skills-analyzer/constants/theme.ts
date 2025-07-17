export const theme = {
  colors: {
    primary: {
      main: '#fcba28',
      light: '#fcd978',
      dark: '#e29f1e',
      gradient: 'linear-gradient(135deg, #fcba28, #fcd978)'
    },
    secondary: {
      main: '#7B61FF',
      light: '#9D89FF',
      dark: '#5A3FFF',
      gradient: 'linear-gradient(135deg, #7B61FF, #9D89FF)'
    },
    accent: {
      main: '#FF6B6B',
      light: '#FF8F8F',
      dark: '#FF4747',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8F8F)'
    },
    success: {
      main: '#00C48C',
      light: '#33D2A6',
      dark: '#00A372'
    },
    warning: {
      main: '#FFB547',
      light: '#FFC571',
      dark: '#E69A35'
    },
    error: {
      main: '#FF4747',
      light: '#FF6B6B',
      dark: '#E63333'
    },
    background: {
      default: '#0A0A0F',
      paper: '#14141F',
      elevated: '#1E1E2D'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B4B4C7',
      disabled: '#6E6E89'
    },
    border: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      focused: 'rgba(252, 186, 40, 0.5)'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #fcba28 0%, #fcd978 100%)',
    secondary: 'linear-gradient(135deg, #7B61FF 0%, #9D89FF 100%)',
    accent: 'linear-gradient(135deg, #FF6B6B 0%, #FF8F8F 100%)',
    dark: 'linear-gradient(135deg, #14141F 0%, #1E1E2D 100%)',
    glow: {
      primary: 'radial-gradient(circle at center, rgba(252, 186, 40, 0.15) 0%, transparent 70%)',
      secondary: 'radial-gradient(circle at center, rgba(123, 97, 255, 0.15) 0%, transparent 70%)',
      accent: 'radial-gradient(circle at center, rgba(255, 107, 107, 0.15) 0%, transparent 70%)'
    }
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.3)',
    glow: {
      primary: '0 0 20px rgba(252, 186, 40, 0.2)',
      secondary: '0 0 20px rgba(123, 97, 255, 0.2)',
      accent: '0 0 20px rgba(255, 107, 107, 0.2)'
    }
  },
  animation: {
    transition: {
      fast: '0.2s ease-in-out',
      medium: '0.3s ease-in-out',
      slow: '0.5s ease-in-out'
    },
    scale: {
      hover: 'scale(1.05)',
      active: 'scale(0.95)'
    }
  }
};
