import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../styles/theme';

const FormInput = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  placeholder,
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  right,
  left,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        error={!!error}
        disabled={disabled}
        mode="outlined"
        outlineColor={theme.colors.disabled}
        activeOutlineColor={theme.colors.primary}
        style={[styles.input, style]}
        right={right}
        left={left}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
    width: '100%',
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
});

export default FormInput; 