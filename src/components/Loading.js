import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../styles/theme';

const Loading = ({ message = 'Yükleniyor...', size = 'large', fullScreen = true }) => {
  if (fullScreen) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={size} color={theme.colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {message && <Text style={styles.inlineMessage}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  message: {
    marginTop: theme.spacing.m,
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
  },
  inlineMessage: {
    marginLeft: theme.spacing.s,
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default Loading; 