import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph, Divider, Searchbar, ActivityIndicator } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';
import * as ApiService from '../services/api';
import InfoCard from '../components/InfoCard';
import Loading from '../components/Loading';

const TipsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [tipResults, setTipResults] = useState(null);
  
  // Önceden hazırlanmış beslenme önerileri
  const predefinedTips = [
    {
      id: 1,
      category: 'breakfast',
      title: 'Sağlıklı Kahvaltı İpuçları',
      content: 'Güne protein ağırlıklı bir kahvaltı ile başlamak, gün boyu enerji seviyenizi dengede tutar ve açlık hissini azaltır. Yumurta, yulaf ezmesi, tam tahıllı ekmek ve yağlı tohumlar iyi seçeneklerdir.',
      icon: 'food',
    },
    {
      id: 2,
      category: 'snack',
      title: 'Akıllı Atıştırmalıklar',
      content: 'Ara öğünlerde kuruyemiş, meyve veya yoğurt gibi sağlıklı atıştırmalıklar tercih etmek, kan şekerinizi dengeler ve ana öğünlerde aşırı yemenizi engeller.',
      icon: 'food-apple',
    },
    {
      id: 3,
      category: 'dinner',
      title: 'Akşam Yemeği Önerileri',
      content: 'Akşam yemeklerinde karbonhidrat miktarını azaltıp, protein ve sağlıklı yağları artırmak, uyku kalitenizi iyileştirebilir ve sabah daha dinç uyanmanızı sağlayabilir.',
      icon: 'silverware-fork-knife',
    },
    {
      id: 4,
      category: 'hydration',
      title: 'Su Tüketiminin Önemi',
      content: 'Günde en az 8 bardak su içmek, metabolizmanızı hızlandırır, toksinlerin atılmasına yardımcı olur ve genel sağlık için çok önemlidir. Su içmeyi unutmamak için yanınızda her zaman bir şişe su bulundurun.',
      icon: 'cup-water',
    },
    {
      id: 5,
      category: 'nutrition',
      title: 'Besin Çeşitliliğinin Önemi',
      content: 'Farklı renklerde sebze ve meyve tüketmek, vücudunuzun ihtiyaç duyduğu çeşitli vitamin ve mineralleri almanızı sağlar. Her öğünde tabağınızda en az 3 farklı renk olmasına dikkat edin.',
      icon: 'fruit-watermelon',
    },
    {
      id: 6,
      category: 'breakfast',
      title: 'Kahvaltıda Şekerden Kaçının',
      content: 'Kahvaltıda şekerli gıdalar yerine proteinli ve lifli besinler tüketmek, gün boyunca daha stabil enerji seviyesi sağlar ve kilo kontrolüne yardımcı olur.',
      icon: 'cookie-off',
    },
  ];

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'breakfast', label: 'Kahvaltı' },
    { id: 'lunch', label: 'Öğle Yemeği' },
    { id: 'dinner', label: 'Akşam Yemeği' },
    { id: 'snack', label: 'Atıştırmalık' },
    { id: 'hydration', label: 'Sıvı Tüketimi' },
    { id: 'nutrition', label: 'Beslenme' },
  ];

  // Kategori filtresi ve arama işlevi
  const getFilteredTips = () => {
    let filtered = predefinedTips;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tip => tip.category === activeCategory);
    }
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tip => 
          tip.title.toLowerCase().includes(lowerCaseQuery) ||
          tip.content.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    return filtered;
  };

  // AI tabanlı öneriler almak için fonksiyon
  const getAITips = async (category) => {
    try {
      setLoading(true);
      
      // Gerçek bir uygulama için bu fonksiyonu kullanın
      // const response = await ApiService.getHealthyEatingTips(category);
      
      // Demo için gecikme ekledik
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let demoResponse = '';
      if (category === 'breakfast') {
        demoResponse = `
# Sağlıklı Kahvaltı Önerileri

Güne sağlıklı bir kahvaltı ile başlamak, gün boyu enerji seviyenizi dengelemenize ve daha iyi odaklanmanıza yardımcı olur.

## Önerilen Kahvaltı Seçenekleri

- **Yulaf Ezmesi**: 1/2 su bardağı yulaf, 1 su bardağı süt (veya bitkisel süt), 1 tatlı kaşığı bal ve çeşitli meyveler ile hazırlayabilirsiniz.
- **Protein Kahvaltısı**: 2 adet haşlanmış yumurta, 1 dilim tam tahıllı ekmek, 1/4 avokado ve biraz domates-salatalık.
- **Smoothie Bowl**: 1 adet muz, 1/2 su bardağı yoğurt, 1 yemek kaşığı fıstık ezmesi ve üzerine çeşitli kuruyemişler.

## Pratik Tarifler

### Yulaf Ezmesi Tarifi
1. Yulafı süt ile karıştırın ve orta ateşte pişirin
2. Kıvamı koyulaşınca ateşten alın
3. Üzerine muz, çilek veya yaban mersini ekleyin
4. Bir tatlı kaşığı bal veya akçaağaç şurubu ile tatlandırın

### Kahvaltı İçin İpuçları
- Kahvaltıyı asla atlamayın
- Şekerli gıdalardan uzak durun
- Mutlaka protein içeren besinler tüketin
- Kahvaltınızı önceden hazırlayarak zamandan tasarruf edebilirsiniz
        `;
      } else if (category === 'lunch') {
        demoResponse = `
# Öğle Yemeği Önerileri

Öğle yemeği, gün ortasında enerji seviyenizi yükseltmek için önemlidir. Dengeli bir öğle yemeği, öğleden sonra oluşabilecek yorgunluğu önlemeye yardımcı olur.

## Hızlı ve Sağlıklı Öğle Yemeği Seçenekleri

- **Protein Salatası**: Izgara tavuk, ton balığı veya haşlanmış yumurta ile hazırlanan bol yeşillikli salata.
- **Tam Tahıl Sandviçi**: Tam tahıllı ekmek arasına humus, avokado, domates, marul ve az yağlı peynir.
- **Sebze Çorbası ve Yanında Protein**: Mercimek çorbası veya sebze çorbası yanında az yağlı peynir ve tam tahıllı kraker.

## Öğle Yemeği İçin İpuçları

- Öğle yemeğini önceden hazırlayarak işyerine götürün
- Porsiyonları kontrol altında tutun
- Basit karbonhidratlar yerine kompleks karbonhidratları tercih edin
- Yemeğinizin yarısının sebzelerden oluşmasına dikkat edin
        `;
      } else {
        demoResponse = `
# Sağlıklı Beslenme Önerileri

Sağlıklı bir beslenme düzeni, genel sağlığınız için temel oluşturur. Dengeli beslenme, vücudunuzun ihtiyaç duyduğu tüm besin maddelerini almanızı sağlar.

## Genel Beslenme İlkeleri

- **Besin Çeşitliliği**: Farklı renk ve türde sebze ve meyve tüketin.
- **Protein Dengesini Koruyun**: Her öğünde kaliteli protein kaynakları (et, tavuk, balık, kurubaklagiller, yumurta) tüketin.
- **Sağlıklı Yağları Seçin**: Zeytinyağı, avokado, fındık, ceviz gibi sağlıklı yağları tercih edin.
- **Su Tüketimini Artırın**: Günde en az 2 litre su için.

## Beslenme Alışkanlıkları

- Günde 3 ana öğün, 2 ara öğün tüketin
- Akşam geç saatlerde yemek yemekten kaçının
- Besinleri mevsiminde tüketin
- İşlenmiş gıdalardan uzak durun
- Şeker tüketimini azaltın
        `;
      }
      
      setTipResults(demoResponse);
      setLoading(false);
    } catch (error) {
      console.error('Error getting AI tips:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Beslenme önerisi ara..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setActiveCategory(category.id)}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === category.id && styles.activeCategoryText
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {getFilteredTips().map((tip) => (
          <InfoCard
            key={tip.id}
            title={tip.title}
            icon={tip.icon}
            content={tip.content}
            onPress={() => getAITips(tip.category)}
            showMoreButton
            onMorePress={() => getAITips(tip.category)}
            style={styles.tipCard}
          />
        ))}
        
        {tipResults && (
          <Card style={styles.aiResultCard}>
            <Card.Content>
              <Title style={styles.aiResultTitle}>Yapay Zeka Önerileri</Title>
              {loading ? (
                <ActivityIndicator animating={true} color={theme.colors.primary} style={styles.loader} />
              ) : (
                <ScrollView style={styles.aiResultContent}>
                  {tipResults.split('\n').map((line, index) => {
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
                  })}
                </ScrollView>
              )}
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    margin: theme.spacing.m,
    elevation: 2,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.disabled,
  },
  activeCategoryButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryButtonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  activeCategoryText: {
    color: '#fff',
  },
  scrollContent: {
    padding: theme.spacing.m,
    paddingTop: 0,
  },
  tipCard: {
    marginBottom: theme.spacing.m,
  },
  aiResultCard: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.xxl,
    borderRadius: theme.roundness,
    elevation: 3,
  },
  aiResultTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    marginBottom: theme.spacing.s,
  },
  loader: {
    margin: theme.spacing.l,
  },
  aiResultContent: {
    maxHeight: 400,
  },
  heading1: {
    fontSize: 20,
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
});

export default TipsScreen; 