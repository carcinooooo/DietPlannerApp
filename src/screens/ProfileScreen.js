import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Avatar, Divider, Switch, List, IconButton } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';
import NumberSelector from '../components/NumberSelector';
import FormInput from '../components/FormInput';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: 'Ali Yılmaz',
    age: 32,
    gender: 'Erkek',
    height: 175,
    weight: 78,
    email: 'ali.yilmaz@email.com',
    activityLevel: 'Orta',
    goalWeight: 72,
    goalDate: '01.10.2025',
    preferences: ['Düşük Karbonhidrat', 'Glutensiz'],
    goal: 'Kilo Vermek',
  });

  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({...userData});
  
  // Ayarlar için durum
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [waterReminder, setWaterReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);

  // Kilo takibi için geçmiş veriler
  const weightHistory = [
    { date: '01.05.2025', weight: 81 },
    { date: '15.05.2025', weight: 80 },
    { date: '01.06.2025', weight: 79 },
    { date: '15.06.2025', weight: 78.5 },
    { date: '01.07.2025', weight: 78 },
  ];

  const handleSaveProfile = () => {
    setUserData(editedData);
    setEditing(false);
    Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi.');
  };

  const handleUpdateWeight = () => {
    const newWeight = parseFloat(editedData.weight);
    setUserData({...userData, weight: newWeight});
    Alert.alert('Başarılı', 'Kilo bilginiz güncellendi.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Çıkış Yap',
          onPress: () => {
            // Gerçek uygulamada oturum kapanışı yapar
            // Demo için yeniden başlangıç ekranına döneriz
            navigation.reset({
              index: 0,
              routes: [{ name: 'Onboarding' }],
            });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={80}
              label={userData.name.split(' ').map(n => n[0]).join('')}
              style={styles.avatar}
              labelStyle={styles.avatarLabel}
            />
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <Text style={styles.userDetails}>
                {userData.age} yaş • {userData.height} cm • {userData.weight} kg
              </Text>
            </View>
            
            {!editing && (
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => setEditing(true)}
                style={styles.editButton}
                iconColor={theme.colors.primary}
              />
            )}
          </View>
          
          {editing ? (
            <View style={styles.editForm}>
              <FormInput
                label="Ad Soyad"
                value={editedData.name}
                onChangeText={(text) => setEditedData({...editedData, name: text})}
                autoCapitalize="words"
              />
              
              <FormInput
                label="E-posta"
                value={editedData.email}
                onChangeText={(text) => setEditedData({...editedData, email: text})}
                keyboardType="email-address"
              />
              
              <NumberSelector
                label="Yaş"
                value={editedData.age}
                onValueChange={(value) => setEditedData({...editedData, age: value})}
                min={18}
                max={100}
                step={1}
              />
              
              <NumberSelector
                label="Boy (cm)"
                value={editedData.height}
                onValueChange={(value) => setEditedData({...editedData, height: value})}
                min={120}
                max={220}
                step={1}
                unit="cm"
              />
              
              <NumberSelector
                label="Kilo (kg)"
                value={editedData.weight}
                onValueChange={(value) => setEditedData({...editedData, weight: value})}
                min={30}
                max={200}
                step={0.5}
                unit="kg"
              />
              
              <Button
                mode="contained"
                style={styles.saveButton}
                labelStyle={styles.buttonLabel}
                onPress={handleSaveProfile}
              >
                Kaydet
              </Button>
              
              <Button
                mode="outlined"
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
                onPress={() => {
                  setEditedData({...userData});
                  setEditing(false);
                }}
              >
                İptal
              </Button>
            </View>
          ) : (
            <>
              <Divider style={styles.divider} />
              
              <View style={styles.goalsContainer}>
                <Text style={styles.sectionTitle}>Hedeflerim</Text>
                
                <View style={styles.goalItem}>
                  <Text style={styles.goalLabel}>Hedef Kilo:</Text>
                  <Text style={styles.goalValue}>{userData.goalWeight} kg</Text>
                </View>
                
                <View style={styles.goalItem}>
                  <Text style={styles.goalLabel}>Hedef Tarihi:</Text>
                  <Text style={styles.goalValue}>{userData.goalDate}</Text>
                </View>
                
                <View style={styles.goalItem}>
                  <Text style={styles.goalLabel}>Beslenme Tercihleri:</Text>
                  <Text style={styles.goalValue}>{userData.preferences.join(', ')}</Text>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.weightHistoryContainer}>
                <Text style={styles.sectionTitle}>Kilo Takibi</Text>
                
                {weightHistory.map((item, index) => (
                  <View key={index} style={styles.weightItem}>
                    <Text style={styles.weightDate}>{item.date}</Text>
                    <Text style={styles.weightValue}>{item.weight} kg</Text>
                  </View>
                ))}
                
                <View style={styles.weightUpdateContainer}>
                  <NumberSelector
                    label="Güncel Kilonuz (kg)"
                    value={editedData.weight}
                    onValueChange={(value) => setEditedData({...editedData, weight: value})}
                    min={30}
                    max={200}
                    step={0.1}
                    unit="kg"
                  />
                  
                  <Button
                    mode="contained"
                    compact
                    style={styles.updateButton}
                    labelStyle={styles.buttonLabel}
                    onPress={handleUpdateWeight}
                  >
                    Güncelle
                  </Button>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.settingsContainer}>
                <Text style={styles.sectionTitle}>Ayarlar</Text>
                
                <List.Item
                  title="Bildirimler"
                  description="Uygulama bildirimlerini aç/kapat"
                  left={props => <List.Icon {...props} icon="bell" />}
                  right={() => (
                    <Switch
                      value={notifications}
                      onValueChange={setNotifications}
                      color={theme.colors.primary}
                    />
                  )}
                />
                
                <List.Item
                  title="Karanlık Mod"
                  description="Karanlık temayı aç/kapat"
                  left={props => <List.Icon {...props} icon="theme-light-dark" />}
                  right={() => (
                    <Switch
                      value={darkMode}
                      onValueChange={setDarkMode}
                      color={theme.colors.primary}
                    />
                  )}
                />
                
                <List.Item
                  title="Su İçme Hatırlatıcısı"
                  description="Düzenli su içme hatırlatmaları"
                  left={props => <List.Icon {...props} icon="cup-water" />}
                  right={() => (
                    <Switch
                      value={waterReminder}
                      onValueChange={setWaterReminder}
                      color={theme.colors.primary}
                    />
                  )}
                />
                
                <List.Item
                  title="Öğün Hatırlatıcısı"
                  description="Öğün zamanı hatırlatmaları"
                  left={props => <List.Icon {...props} icon="silverware-fork-knife" />}
                  right={() => (
                    <Switch
                      value={mealReminder}
                      onValueChange={setMealReminder}
                      color={theme.colors.primary}
                    />
                  )}
                />
              </View>
              
              <Divider style={styles.divider} />
              
              <Button
                mode="outlined"
                icon="logout"
                style={styles.logoutButton}
                labelStyle={styles.logoutButtonLabel}
                onPress={handleLogout}
              >
                Çıkış Yap
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.m,
  },
  profileCard: {
    borderRadius: theme.roundness,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarLabel: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginVertical: 2,
  },
  userDetails: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: theme.colors.background,
  },
  divider: {
    marginVertical: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  goalsContainer: {
    marginVertical: theme.spacing.s,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  goalLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  goalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  weightHistoryContainer: {
    marginVertical: theme.spacing.s,
  },
  weightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  weightDate: {
    fontSize: 14,
    color: theme.colors.text,
  },
  weightValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  weightUpdateContainer: {
    marginTop: theme.spacing.m,
  },
  updateButton: {
    marginTop: theme.spacing.s,
    backgroundColor: theme.colors.primary,
  },
  settingsContainer: {
    marginVertical: theme.spacing.s,
  },
  editForm: {
    marginTop: theme.spacing.m,
  },
  saveButton: {
    marginTop: theme.spacing.m,
    backgroundColor: theme.colors.primary,
  },
  cancelButton: {
    marginTop: theme.spacing.s,
    borderColor: theme.colors.error,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButtonLabel: {
    fontSize: 14,
    color: theme.colors.error,
  },
  logoutButton: {
    marginVertical: theme.spacing.m,
    borderColor: theme.colors.error,
  },
  logoutButtonLabel: {
    color: theme.colors.error,
  },
});

export default ProfileScreen; 