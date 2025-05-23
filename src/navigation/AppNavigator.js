import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import { theme } from '../styles/theme';

// Screens - yüklenen ekranları import edeceğiz, şimdilik boş
import WelcomeScreen from '../screens/WelcomeScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import GoalScreen from '../screens/GoalScreen';
import HomeScreen from '../screens/HomeScreen';
import DietPlanScreen from '../screens/DietPlanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TipsScreen from '../screens/TipsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Kullanıcı profili oluşturma stack
const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="UserInfo" 
        component={UserInfoScreen} 
        options={{ title: 'Kişisel Bilgiler' }}
      />
      <Stack.Screen 
        name="Preferences" 
        component={PreferencesScreen} 
        options={{ title: 'Beslenme Tercihleri' }}
      />
      <Stack.Screen 
        name="Goal" 
        component={GoalScreen} 
        options={{ title: 'Hedefler' }}
      />
    </Stack.Navigator>
  );
};

// Ana uygulama tab navigatoru
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'DietPlan') {
            iconName = 'food-apple';
          } else if (route.name === 'Tips') {
            iconName = 'lightbulb-on';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          }

          return <IconButton icon={iconName} size={size} iconColor={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.disabled,
        tabBarStyle: { 
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Ana Sayfa' }}
      />
      <Tab.Screen 
        name="DietPlan" 
        component={DietPlanScreen} 
        options={{ title: 'Diyet Planım' }}
      />
      <Tab.Screen 
        name="Tips" 
        component={TipsScreen} 
        options={{ title: 'Beslenme Önerileri' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profilim' }}
      />
    </Tab.Navigator>
  );
};

// Ana root navigator
const AppNavigator = () => {
  // Gerçek uygulamada, kullanıcının giriş yapıp yapmadığını kontrol edin
  const isOnboarded = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 