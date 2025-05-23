import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Card, Avatar, ProgressBar, FAB } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';
import InfoCard from '../components/InfoCard';
import Loading from '../components/Loading';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Simüle edilmiş veri - gerçek uygulamada veritabanı veya depolamadan alınır
  useEffect(() => {
    // API çağrısı veya depolama erişimi simulasyonu
    setTimeout(() => {
      setUserData({
        name: 'Ali Yılmaz',
        age: 32,
        height: 175,
        weight: 78,
        goal: 'Kilo Vermek',
        dailyCalories: 2100,
        waterGoal: 2500, // ml
        waterConsumed: 1500, // ml
        progress: 0.75, // %75 tamamlandı
        dietPlan: 'Düşük Karbonhidrat',
        todaysMeals: [
          { name: 'Kahvaltı', completed: true, time: '08:00' },
          { name: 'Ara Öğün', completed: true, time: '10:30' },
          { name: 'Öğle Yemeği', completed: true, time: '13:00' },
          { name: 'Ara Öğün', completed: false, time: '16:00' },
          { name: 'Akşam Yemeği', completed: false, time: '19:00' },
        ],
        nextMeal: {
          name: 'Ara Öğün',
          time: '16:00',
          foods: ['Elma', '10 adet badem'],
          calories: 150,
        },
        weeklyProgress: [0.65, 0.7, 0.8, 0.75, 0.9, 0.85, 0.75],
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Loading message="Bilgileriniz yükleniyor..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileCardContent}>
            <Avatar.Text
              size={60}
              label={userData.name.split(' ').map(n => n[0]).join('')}
              style={styles.avatar}
              labelStyle={styles.avatarLabel}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userDetails}>
                {userData.age} yaş • {userData.height} cm • {userData.weight} kg
              </Text>
              <Text style={styles.userGoal}>Hedef: {userData.goal}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={[styles.statsCard, { backgroundColor: '#E8F5E9' }]}>
            <Card.Content>
              <Text style={styles.statsLabel}>Günlük Kalori</Text>
              <Text style={styles.statsValue}>{userData.dailyCalories}</Text>
              <Text style={styles.statsUnit}>kcal</Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.statsCard, { backgroundColor: '#E1F5FE' }]}>
            <Card.Content>
              <Text style={styles.statsLabel}>Su Tüketimi</Text>
              <Text style={styles.statsValue}>{userData.waterConsumed}</Text>
              <Text style={styles.statsUnit}>/ {userData.waterGoal} ml</Text>
              <ProgressBar 
                progress={userData.waterConsumed / userData.waterGoal} 
                color={theme.colors.primary}
                style={styles.progressBar} 
              />
            </Card.Content>
          </Card>
        </View>

        <InfoCard
          title="Sonraki Öğünün"
          icon="food-apple"
          content={
            <View style={styles.mealContent}>
              <Text style={styles.mealName}>{userData.nextMeal.name} • {userData.nextMeal.time}</Text>
              {userData.nextMeal.foods.map((food, index) => (
                <Text key={index} style={styles.mealItem}>• {food}</Text>
              ))}
              <Text style={styles.mealCalories}>{userData.nextMeal.calories} kcal</Text>
            </View>
          }
          style={styles.mealCard}
        />

        <InfoCard
          title="Günlük İlerleme"
          icon="chart-line"
          content={
            <View style={styles.progressContent}>
              <Text style={styles.progressText}>
                Bugün {Math.round(userData.progress * 100)}% tamamlandı
              </Text>
              <ProgressBar 
                progress={userData.progress} 
                color={theme.colors.primary}
                style={styles.progressBar} 
              />
              <View style={styles.mealList}>
                {userData.todaysMeals.map((meal, index) => (
                  <View key={index} style={styles.mealRow}>
                    <View style={styles.mealCheck}>
                      {meal.completed ? (
                        <Avatar.Icon 
                          size={24} 
                          icon="check" 
                          style={styles.completedIcon} 
                          color="#fff"
                        />
                      ) : (
                        <Avatar.Icon 
                          size={24} 
                          icon="clock-outline" 
                          style={styles.pendingIcon}
                          color="#fff" 
                        />
                      )}
                    </View>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                    <Text 
                      style={[
                        styles.mealItem, 
                        meal.completed && styles.completedMeal
                      ]}
                    >
                      {meal.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          }
        />

        <Button
          mode="outlined"
          icon="food"
          style={styles.dietButton}
          labelStyle={styles.dietButtonText}
          onPress={() => navigation.navigate('DietPlan')}
        >
          Diyet Planımı Görüntüle
        </Button>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Su İçtim"
        onPress={() => {
          // Su içme kaydetme fonksiyonu
          const newWaterConsumed = Math.min(userData.waterConsumed + 250, userData.waterGoal);
          setUserData({...userData, waterConsumed: newWaterConsumed});
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
  profileCard: {
    marginBottom: theme.spacing.m,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.m,
  },
  avatarLabel: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  userDetails: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginVertical: 2,
  },
  userGoal: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.m,
  },
  statsCard: {
    width: '48%',
    borderRadius: theme.roundness,
    elevation: 2,
  },
  statsLabel: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statsUnit: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  progressBar: {
    marginTop: theme.spacing.s,
    height: 8,
    borderRadius: 4,
  },
  mealCard: {
    marginBottom: theme.spacing.m,
  },
  mealContent: {
    marginTop: theme.spacing.s,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  mealItem: {
    fontSize: 14,
    color: theme.colors.text,
    marginVertical: 2,
  },
  mealCalories: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: theme.spacing.xs,
  },
  progressContent: {
    marginTop: theme.spacing.s,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  mealList: {
    marginTop: theme.spacing.m,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  mealCheck: {
    marginRight: theme.spacing.s,
  },
  completedIcon: {
    backgroundColor: theme.colors.success,
  },
  pendingIcon: {
    backgroundColor: theme.colors.warning,
  },
  mealTime: {
    fontSize: 14,
    color: theme.colors.text,
    width: 50,
    marginRight: theme.spacing.s,
  },
  completedMeal: {
    textDecorationLine: 'line-through',
    color: theme.colors.placeholder,
  },
  dietButton: {
    marginVertical: theme.spacing.m,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  dietButtonText: {
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

export default HomeScreen; 