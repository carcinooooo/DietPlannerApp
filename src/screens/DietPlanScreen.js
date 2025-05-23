import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Chip, Divider, List, FAB, IconButton } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';
import Loading from '../components/Loading';
import * as ApiService from '../services/api';

const DietPlanScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [currentDay, setCurrentDay] = useState('Pazartesi');
  
  // Simüle edilmiş kullanıcı verisi
  const userInfo = {
    name: 'Ali Yılmaz',
    age: 32,
    gender: 'Erkek',
    height: 175,
    weight: 78,
    activityLevel: 'Orta',
  };
  
  const preferences = ['Düşük Karbonhidrat', 'Glutensiz'];
  const goal = 'Kilo Vermek';

  // Günler listesi
  const days = [
    'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'
  ];

  useEffect(() => {
    loadDietPlan();
  }, []);

  const loadDietPlan = async () => {
    try {
      setLoading(true);
      // Gerçek bir API çağrısı yerine demo fonksiyonu kullanıyoruz
      const response = await ApiService.generateDietPlanDemo(userInfo, preferences, goal);
      setDietPlan(response);
      setLoading(false);
    } catch (error) {
      console.error('Error loading diet plan:', error);
      setLoading(false);
      // Hata gösterimi
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDietPlan();
    setRefreshing(false);
  };

  // Markdown benzeri basit parser
  const formatText = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <Text key={index} style={styles.heading1}>
            {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith('## ')) {
        return (
          <Text key={index} style={styles.heading2}>
            {line.substring(3)}
          </Text>
        );
      } else if (line.startsWith('### ')) {
        return (
          <Text key={index} style={styles.heading3}>
            {line.substring(4)}
          </Text>
        );
      } else if (line.startsWith('- ')) {
        return (
          <Text key={index} style={styles.bulletItem}>
            {line}
          </Text>
        );
      } else if (line.trim() === '') {
        return <View key={index} style={styles.spacer} />;
      } else {
        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      }
    });
  };

  if (loading) {
    return <Loading message="Diyet planınız hazırlanıyor..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Kişiselleştirilmiş Diyet Planınız</Text>
            <Text style={styles.cardDescription}>
              Bu diyet planı, sizin bilgileriniz doğrultusunda yapay zeka ile oluşturuldu.
            </Text>
            
            <View style={styles.chipContainer}>
              <Chip 
                icon="target" 
                style={styles.chip} 
                textStyle={styles.chipText}
              >
                {goal}
              </Chip>
              {preferences.map((pref, index) => (
                <Chip 
                  key={index}
                  icon="silverware-fork-knife" 
                  style={styles.chip} 
                  textStyle={styles.chipText}
                >
                  {pref}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysContainer}
        >
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setCurrentDay(day)}
              style={[
                styles.dayButton,
                currentDay === day && styles.activeDayButton
              ]}
            >
              <Text 
                style={[
                  styles.dayButtonText,
                  currentDay === day && styles.activeDayButtonText
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Card style={styles.dietCard}>
          <Card.Content>
            {dietPlan && formatText(dietPlan)}
          </Card.Content>
        </Card>
        
        <Button
          mode="outlined"
          icon="refresh"
          style={styles.refreshButton}
          labelStyle={styles.refreshButtonText}
          onPress={handleRefresh}
          loading={refreshing}
          disabled={refreshing}
        >
          Yeni Plan Oluştur
        </Button>
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="content-save"
        label="Planı Kaydet"
        onPress={() => {
          // Diyet planını kaydetme fonksiyonu
          console.log('Diet plan saved');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  infoCard: {
    marginBottom: theme.spacing.m,
    borderRadius: theme.roundness,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.s,
  },
  chip: {
    backgroundColor: theme.colors.primary + '20',
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: theme.colors.primary,
  },
  daysContainer: {
    marginVertical: theme.spacing.m,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.disabled,
  },
  activeDayButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayButtonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  activeDayButtonText: {
    color: '#fff',
  },
  dietCard: {
    marginBottom: theme.spacing.m,
    borderRadius: theme.roundness,
  },
  heading1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginVertical: theme.spacing.s,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginVertical: theme.spacing.s,
  },
  heading3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginVertical: theme.spacing.xs,
  },
  paragraph: {
    fontSize: 14,
    color: theme.colors.text,
    marginVertical: 4,
    lineHeight: 22,
  },
  bulletItem: {
    fontSize: 14,
    color: theme.colors.text,
    marginVertical: 2,
    marginLeft: theme.spacing.s,
    lineHeight: 22,
  },
  spacer: {
    height: theme.spacing.s,
  },
  refreshButton: {
    marginVertical: theme.spacing.m,
    borderColor: theme.colors.primary,
  },
  refreshButtonText: {
    color: theme.colors.primary,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.m,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default DietPlanScreen; 