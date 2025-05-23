import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';

const PreferencesScreen = ({ navigation }) => {
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  
  const dietTypes = [
    { label: 'Standart', value: 'standard' },
    { label: 'Vejetaryen', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Glutensiz', value: 'gluten_free' },
    { label: 'Düşük Karbonhidrat', value: 'low_carb' },
    { label: 'Ketojenik', value: 'keto' },
    { label: 'Akdeniz', value: 'mediterranean' },
    { label: 'Paleo', value: 'paleo' },
  ];
  
  const allergies = [
    { label: 'Süt Ürünleri', value: 'dairy' },
    { label: 'Yumurta', value: 'eggs' },
    { label: 'Fıstık', value: 'peanuts' },
    { label: 'Kuruyemiş', value: 'tree_nuts' },
    { label: 'Deniz Ürünleri', value: 'seafood' },
    { label: 'Kabuklu Deniz Ürünleri', value: 'shellfish' },
    { label: 'Soya', value: 'soy' },
    { label: 'Buğday', value: 'wheat' },
  ];
  
  const restrictions = [
    { label: 'Düşük Sodyum', value: 'low_sodium' },
    { label: 'Düşük Şeker', value: 'low_sugar' },
    { label: 'Düşük Yağ', value: 'low_fat' },
    { label: 'Yüksek Protein', value: 'high_protein' },
    { label: 'Laktoz İçermeyen', value: 'lactose_free' },
    { label: 'Organik', value: 'organic' },
    { label: 'İşlenmemiş', value: 'unprocessed' },
  ];

  const toggleDiet = (value) => {
    if (selectedDiets.includes(value)) {
      setSelectedDiets(selectedDiets.filter(item => item !== value));
    } else {
      setSelectedDiets([...selectedDiets, value]);
    }
  };

  const toggleAllergy = (value) => {
    if (selectedAllergies.includes(value)) {
      setSelectedAllergies(selectedAllergies.filter(item => item !== value));
    } else {
      setSelectedAllergies([...selectedAllergies, value]);
    }
  };

  const toggleRestriction = (value) => {
    if (selectedRestrictions.includes(value)) {
      setSelectedRestrictions(selectedRestrictions.filter(item => item !== value));
    } else {
      setSelectedRestrictions([...selectedRestrictions, value]);
    }
  };

  const handleNext = () => {
    const preferences = {
      dietTypes: selectedDiets,
      allergies: selectedAllergies,
      restrictions: selectedRestrictions,
    };
    
    // Gerçek uygulamada, bu bilgileri bir veri deposunda saklayın
    console.log('Preferences:', preferences);
    
    navigation.navigate('Goal');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Beslenme Tercihleriniz</Text>
      <Text style={styles.description}>
        Lütfen beslenme tercihlerinizi ve alerjilerinizi seçin. Bu bilgiler size en uygun diyet planını oluşturmamızda yardımcı olacak.
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diyet Türü</Text>
        <Text style={styles.sectionDescription}>
          Uygulamak istediğiniz bir diyet türü varsa seçin (opsiyonel):
        </Text>
        <View style={styles.chipContainer}>
          {dietTypes.map(diet => (
            <Chip
              key={diet.value}
              selected={selectedDiets.includes(diet.value)}
              onPress={() => toggleDiet(diet.value)}
              style={[
                styles.chip,
                selectedDiets.includes(diet.value) && styles.selectedChip,
              ]}
              textStyle={[
                styles.chipText,
                selectedDiets.includes(diet.value) && styles.selectedChipText,
              ]}
            >
              {diet.label}
            </Chip>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alerjiler</Text>
        <Text style={styles.sectionDescription}>
          Varsa gıda alerjilerinizi seçin:
        </Text>
        <View style={styles.chipContainer}>
          {allergies.map(allergy => (
            <Chip
              key={allergy.value}
              selected={selectedAllergies.includes(allergy.value)}
              onPress={() => toggleAllergy(allergy.value)}
              style={[
                styles.chip,
                selectedAllergies.includes(allergy.value) && styles.selectedChip,
              ]}
              textStyle={[
                styles.chipText,
                selectedAllergies.includes(allergy.value) && styles.selectedChipText,
              ]}
            >
              {allergy.label}
            </Chip>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diğer Kısıtlamalar</Text>
        <Text style={styles.sectionDescription}>
          Diğer beslenme tercihlerinizi seçin:
        </Text>
        <View style={styles.chipContainer}>
          {restrictions.map(restriction => (
            <Chip
              key={restriction.value}
              selected={selectedRestrictions.includes(restriction.value)}
              onPress={() => toggleRestriction(restriction.value)}
              style={[
                styles.chip,
                selectedRestrictions.includes(restriction.value) && styles.selectedChip,
              ]}
              textStyle={[
                styles.chipText,
                selectedRestrictions.includes(restriction.value) && styles.selectedChipText,
              ]}
            >
              {restriction.label}
            </Chip>
          ))}
        </View>
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
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
    backgroundColor: theme.colors.surface,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.text,
  },
  selectedChipText: {
    color: 'white',
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

export default PreferencesScreen;