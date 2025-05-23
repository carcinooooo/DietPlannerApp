import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';
import FormInput from '../components/FormInput';
import NumberSelector from '../components/NumberSelector';
import OptionSelector from '../components/OptionSelector';

const UserInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [activityLevel, setActivityLevel] = useState('');
  
  const [errors, setErrors] = useState({});

  const genderOptions = [
    { label: 'Erkek', value: 'Erkek' },
    { label: 'Kadın', value: 'Kadın' },
  ];

  const activityOptions = [
    { label: 'Düşük', value: 'Düşük' },
    { label: 'Orta', value: 'Orta' },
    { label: 'Yüksek', value: 'Yüksek' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'İsim gerekli';
    }
    
    if (!gender) {
      newErrors.gender = 'Cinsiyet seçiniz';
    }
    
    if (!activityLevel) {
      newErrors.activityLevel = 'Aktivite seviyesi seçiniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const userInfo = {
        name,
        age,
        gender,
        height,
        weight,
        activityLevel,
      };
      
      // Gerçek uygulamada, bu bilgileri bir veri deposunda saklayın
      console.log('User Info:', userInfo);
      
      navigation.navigate('Preferences');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Kişisel Bilgileriniz</Text>
        <Text style={styles.description}>
          Size en uygun diyet planını hazırlayabilmemiz için lütfen bilgilerinizi giriniz.
        </Text>
        
        <FormInput
          label="Adınız"
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoCapitalize="words"
        />
        
        <NumberSelector
          label="Yaşınız"
          value={age}
          onValueChange={setAge}
          min={18}
          max={100}
          step={1}
        />
        
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Cinsiyet</Text>
          <OptionSelector
            options={genderOptions}
            selectedValue={gender}
            onSelect={setGender}
          />
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>
        
        <NumberSelector
          label="Boyunuz (cm)"
          value={height}
          onValueChange={setHeight}
          min={120}
          max={220}
          step={1}
          unit="cm"
        />
        
        <NumberSelector
          label="Kilonuz (kg)"
          value={weight}
          onValueChange={setWeight}
          min={30}
          max={200}
          step={0.5}
          unit="kg"
        />
        
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Aktivite Seviyeniz</Text>
          <OptionSelector
            options={activityOptions}
            selectedValue={activityLevel}
            onSelect={setActivityLevel}
          />
          {errors.activityLevel && (
            <Text style={styles.errorText}>{errors.activityLevel}</Text>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleNext}
          >
            Devam Et
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.l,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
  },
  selectorContainer: {
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: theme.spacing.l,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.roundness,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
});

export default UserInfoScreen; 