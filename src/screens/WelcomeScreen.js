import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Diyet Planlayıcı</Text>
        <Text style={styles.subheader}>Kişiselleştirilmiş Diyet Planları</Text>
      </View>
      
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/welcome.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Hoş Geldiniz!</Text>
        <Text style={styles.description}>
          Diyet Planlayıcı uygulaması ile size özel diyet planları oluşturun. 
          Boy, kilo ve diğer bilgilerinizi girerek, yapay zeka destekli kişiselleştirilmiş 
          diyet önerilerine erişin.
        </Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>Kişiselleştirilmiş diyet planları</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>AI destekli beslenme önerileri</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>
            <Text style={styles.featureText}>İlerleme takibi ve raporlama</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('UserInfo')}
        >
          Başlayalım
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.l,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subheader: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: theme.spacing.xs,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.l,
    height: '25%',
  },
  image: {
    width: '80%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.l,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.l,
  },
  featureContainer: {
    marginBottom: theme.spacing.l,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  featureIconText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
  },
  buttonContainer: {
    padding: theme.spacing.l,
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

export default WelcomeScreen; 