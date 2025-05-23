import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../styles/theme';

// Screens - şimdilik boş ekran bileşenleri kullanacağız
import WelcomeScreen from '../screens/WelcomeScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import GoalScreen from '../screens/GoalScreen';
import HomeScreen from '../screens/HomeScreen';
import DietPlanScreen from '../screens/DietPlanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TipsScreen from '../screens/TipsScreen';

// Geçici olarak çalışacak basit bir AppNavigator
const AppNavigator = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        Diet Planner App - Hoş Geldiniz
      </Text>
      <Text>
        Paketler yüklendiğinde navigasyon çalışacaktır
      </Text>
    </View>
  );
};

export default AppNavigator; 