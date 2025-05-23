import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../styles/theme';

const NumberSelector = ({
  label,
  value,
  onValueChange,
  step = 1,
  min = 0,
  max = 999,
  unit = '',
  style,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onValueChange(parseFloat((value + step).toFixed(1)));
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onValueChange(parseFloat((value - step).toFixed(1)));
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <IconButton
          icon="minus"
          size={20}
          onPress={handleDecrement}
          disabled={value <= min}
          style={styles.button}
          iconColor={value <= min ? theme.colors.disabled : theme.colors.primary}
        />
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
        <IconButton
          icon="plus"
          size={20}
          onPress={handleIncrement}
          disabled={value >= max}
          style={styles.button}
          iconColor={value >= max ? theme.colors.disabled : theme.colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    borderRadius: theme.roundness,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.surface,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  unit: {
    fontSize: 16,
    marginLeft: 4,
    color: theme.colors.placeholder,
  },
  button: {
    backgroundColor: theme.colors.background,
    margin: 4,
  },
});

export default NumberSelector; 