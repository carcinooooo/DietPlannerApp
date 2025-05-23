import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Card, RadioButton } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';

const GoalScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [error, setError] = useState('');

  const goals = [
    {
      value: 'weight_loss',
      title: 'Kilo Vermek',
      description: 'Sağlıklı bir şekilde kilo vermek ve ideal kilonuza ulaşmak için planlı bir beslenme.',
      icon: 'scale-bathroom'
    },
    {
      value: 'weight_gain',
      title: 'Kilo Almak',
      description: 'Sağlıklı bir şekilde kilo almak ve kas kütlenizi artırmak için beslenme desteği.',
      icon: 'weight-lifter'
    },
    {
      value: 'maintenance',
      title: 'Kilo Korumak',
      description: 'Mevcut kilonuzu korumak ve genel sağlığınızı iyileştirmek için dengeli beslenme.',
      icon: 'scale-balance'
    },
    {
      value: 'muscle_gain',
      title: 'Kas Kazanmak',
      description: 'Kas kütlenizi artırmak ve vücut kompozisyonunuzu iyileştirmek için protein odaklı beslenme.',
      icon: 'arm-flex'
    },
    {
      value: 'health_improvement',
      title: 'Sağlıklı Yaşamak',
      description: 'Genel sağlığınızı iyileştirmek ve hastalıklardan korunmak için beslenme planı.',
      icon: 'heart-pulse'
    },
    {
      value: 'energy_boost',
      title: 'Enerji Artırmak',
      description: 'Günlük enerji seviyenizi artırmak ve yorgunluğu azaltmak için beslenme desteği.',
      icon: 'lightning-bolt'
    }
  ];

  const handleNext = () => {
    if (!selectedGoal) {
      setError('Lütfen bir hedef seçin');
      return;
    }
    
    // Gerçek uygulamada, bu bilgileri bir veri deposunda saklayın
    console.log('Selected Goal:', selectedGoal);
    
    // Ana ekranlara geçiş (uygulama yeniden başladığında bu geçişi yapın)
    // Burada çok basit bir geçiş yapıyoruz, normalde AsyncStorage gibi bir depolama kullanmalısınız
    // ve App.js'de kontrol etmelisiniz
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Hedefleriniz Neler?</Text>
      <Text style={styles.description}>
        Size en uygun diyet planını oluşturabilmemiz için beslenme hedeflerinizi seçin.
      </Text>
      
      <RadioButton.Group onValueChange={value => {
        setSelectedGoal(value);
        setError('');
      }} value={selectedGoal}>
        {goals.map(goal => (
          <Card 
            key={goal.value}
            style={[
              styles.card,
              selectedGoal === goal.value && styles.selectedCard
            ]}
            onPress={() => {
              setSelectedGoal(goal.value);
              setError('');
            }}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.radioContainer}>
                <RadioButton 
                  value={goal.value} 
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDescription}>{goal.description}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </RadioButton.Group>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleNext}
        >
          Diyet Planımı Oluştur
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
  card: {
    marginBottom: theme.spacing.m,
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.disabled,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10', // 10% opacity
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    marginRight: theme.spacing.s,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
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

export default GoalScreen; 