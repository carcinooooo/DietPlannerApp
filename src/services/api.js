import axios from 'axios';

// Normalde gerçek bir API anahtarı buraya yazılmamalı, .env dosyasında saklanmalıdır
// Bu sadece demo amaçlıdır
const API_KEY = 'YOUR_OPENAI_API_KEY';
const API_URL = 'https://api.openai.com/v1/chat/completions';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

/**
 * AI tabanlı diyet planı oluşturur
 * @param {Object} userInfo - Kullanıcının bilgileri (yaş, cinsiyet, boy, kilo, vb.)
 * @param {Array} preferences - Tercihler ve kısıtlamalar (vejetaryen, vegan, alerjiler, vb.)
 * @param {String} goal - Hedef (kilo verme, kilo alma, sağlıklı yaşam, vb.)
 * @returns {Promise} - Diyet planı yanıtı
 */
export const generateDietPlan = async (userInfo, preferences, goal) => {
  try {
    const promptContent = `
      Bana bir haftalık detaylı bir diyet planı oluştur. Kişisel bilgilerim:
      
      Yaş: ${userInfo.age}
      Cinsiyet: ${userInfo.gender}
      Boy: ${userInfo.height} cm
      Kilo: ${userInfo.weight} kg
      Aktivite seviyesi: ${userInfo.activityLevel}
      
      Diyet tercihleri ve kısıtlamalar: ${preferences.join(', ')}
      
      Hedefim: ${goal}
      
      Lütfen günlük 3 ana öğün ve 2 ara öğün içeren bir haftalık plan oluştur. 
      Her öğün için kalori miktarını ve besin değerlerini (protein, karbonhidrat, yağ) belirt.
      Ayrıca bu diyeti takip ederken dikkat etmem gereken noktaları da ekle.
    `;

    const response = await api.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Bir beslenme ve diyet uzmanısın. Bilimsel temellere dayalı, sağlıklı ve sürdürülebilir beslenme önerileri sunuyorsun." },
        { role: "user", content: promptContent }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Diet Plan generation failed:', error);
    throw error;
  }
};

/**
 * Sağlıklı beslenme önerileri alır
 * @param {String} category - Öneri kategorisi (kahvaltı, öğle yemeği, akşam yemeği, atıştırmalık, vb.)
 * @returns {Promise} - Beslenme önerileri yanıtı
 */
export const getHealthyEatingTips = async (category) => {
  try {
    const promptContent = `
      ${category} için sağlıklı beslenme önerileri ve pratik tarifler verir misin?
    `;

    const response = await api.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Bir beslenme ve diyet uzmanısın. Bilimsel temellere dayalı, sağlıklı ve sürdürülebilir beslenme önerileri sunuyorsun." },
        { role: "user", content: promptContent }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Healthy eating tips generation failed:', error);
    throw error;
  }
};

// Demo amaçlı, yapay verilerle çalışan fonksiyon
export const generateDietPlanDemo = (userInfo, preferences, goal) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        # ${userInfo.name} için 7 Günlük Kişiselleştirilmiş Diyet Planı
        
        ## Genel Bilgiler
        - Yaş: ${userInfo.age}
        - Cinsiyet: ${userInfo.gender}
        - Boy: ${userInfo.height} cm
        - Kilo: ${userInfo.weight} kg
        - Hedef: ${goal}
        - Günlük Kalori İhtiyacı: ${Math.round(userInfo.gender === 'Erkek' 
          ? (10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age + 5) * (userInfo.activityLevel === 'Düşük' ? 1.2 : userInfo.activityLevel === 'Orta' ? 1.55 : 1.9)
          : (10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age - 161) * (userInfo.activityLevel === 'Düşük' ? 1.2 : userInfo.activityLevel === 'Orta' ? 1.55 : 1.9)
        )} kcal
        
        ## Pazartesi
        
        ### Kahvaltı (400 kcal)
        - 2 dilim tam tahıllı ekmek
        - 1 yumurta (haşlanmış)
        - 30g lor peyniri
        - 5 adet zeytin
        - Domates, salatalık, yeşillik
        
        ### Ara Öğün (150 kcal)
        - 1 orta boy elma
        - 10 adet badem
        
        ### Öğle Yemeği (500 kcal)
        - 120g ızgara tavuk göğsü
        - 1 porsiyon bulgur pilavı
        - Mevsim salatası (zeytinyağı ve limon ile)
        
        ### Ara Öğün (150 kcal)
        - 1 kase yoğurt
        - 1 tatlı kaşığı bal
        
        ### Akşam Yemeği (450 kcal)
        - 150g fırında somon
        - Izgara sebzeler (kabak, patlıcan, biber)
        - 1/2 avokado
        
        ## Önemli Notlar
        - Günde en az 2 litre su içmeyi unutmayın
        - Yemekleri yavaş yiyin ve iyi çiğneyin
        - Şekerli içeceklerden ve işlenmiş gıdalardan uzak durun
        - Öğün atlamayın ve düzenli beslenin
      `);
    }, 1500);
  });
};

export default {
  generateDietPlan,
  getHealthyEatingTips,
  generateDietPlanDemo
}; 