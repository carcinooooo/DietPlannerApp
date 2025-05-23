import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';

const OptionSelector = ({
  label,
  options,
  selectedValue,
  onSelect,
  multiSelect = false,
  style,
}) => {
  const handleSelect = (value) => {
    if (multiSelect) {
      if (selectedValue.includes(value)) {
        onSelect(selectedValue.filter(item => item !== value));
      } else {
        onSelect([...selectedValue, value]);
      }
    } else {
      onSelect(value);
    }
  };

  const isSelected = (value) => {
    if (multiSelect) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView 
        horizontal={options.length > 3}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={options.length <= 3 ? styles.optionsContainer : styles.optionsScrollContainer}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected(option.value) && styles.selectedOption,
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                isSelected(option.value) && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  optionsScrollContainer: {
    flexDirection: 'row',
    paddingRight: theme.spacing.m,
  },
  option: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    borderRadius: theme.roundness,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10', // 10% opacity
  },
  optionText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default OptionSelector; 