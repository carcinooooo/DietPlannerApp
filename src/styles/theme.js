import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Green color for health/diet theme
    accent: '#FF8A65', // Orange accent for energy
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#F44336',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    disabled: '#BDBDBD',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  roundness: 12,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  card: {
    marginVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.m,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  subheader: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  paragraph: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  button: {
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}; 