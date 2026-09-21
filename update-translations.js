const fs = require('fs');
const path = require('path');

const translations = {
  mr: `
    'nav.visaInfo': 'व्हिसा माहिती',
    'nav.application': 'अर्ज',
    'nav.apply': 'अर्ज करा',
    'home.hero.title': 'इंडियन व्हिसा ऑनलाइन वर आपले स्वागत आहे',
    'home.hero.subtitle': 'भारताच्या तुमच्या प्रवासाची योजना करा.',
    'home.selectCountry.title': 'तुम्ही कुठून प्रवास करत आहात?',
    'home.selectCountry.desc': 'तुमच्या भारताच्या प्रवासासाठी उपलब्ध असलेले व्हिसा पर्याय शोधण्यासाठी तुमचा देश निवडा.',
    'home.searchCountry': 'देश शोधा...',
    'home.noCountrySelected': 'कोणताही देश निवडलेला नाही',
    'btn.continue': 'पुढे जा',`,
  ta: `
    'nav.visaInfo': 'விசா தகவல்',
    'nav.application': 'விண்ணப்பம்',
    'nav.apply': 'விண்ணப்பிக்கவும்',
    'home.hero.title': 'இந்திய விசா ஆன்லைனுக்கு வரவேற்கிறோம்',
    'home.hero.subtitle': 'இந்தியாவுக்கான உங்கள் பயணத்தை திட்டமிடுங்கள்.',
    'home.selectCountry.title': 'நீங்கள் எங்கிருந்து பயணம் செய்கிறீர்கள்?',
    'home.selectCountry.desc': 'இந்தியாவுக்கான உங்கள் பயணத்திற்கு கிடைக்கக்கூடிய விசா விருப்பங்களை ஆராய உங்கள் நாட்டைத் தேர்ந்தெடுக்கவும்.',
    'home.searchCountry': 'நாட்டைத் தேடு...',
    'home.noCountrySelected': 'எந்த நாடும் தேர்ந்தெடுக்கப்படவில்லை',
    'btn.continue': 'தொடரவும்',`,
  te: `
    'nav.visaInfo': 'వీసా సమాచారం',
    'nav.application': 'దరఖాస్తు',
    'nav.apply': 'దరఖాస్తు చేయండి',
    'home.hero.title': 'ఇండియన్ వీసా ఆన్‌లైన్‌కు స్వాగతం',
    'home.hero.subtitle': 'భారతదేశానికి మీ ప్రయాణాన్ని ప్లాన్ చేయండి.',
    'home.selectCountry.title': 'మీరు ఎక్కడి నుండి ప్రయాణిస్తున్నారు?',
    'home.selectCountry.desc': 'భారతదేశానికి మీ ప్రయాణానికి అందుబాటులో ఉన్న వీసా ఎంపికలను అన్వేషించడానికి మీ దేశాన్ని ఎంచుకోండి.',
    'home.searchCountry': 'దేశాన్ని శోధించండి...',
    'home.noCountrySelected': 'ఏ దేశం ఎంపిక కాలేదు',
    'btn.continue': 'కొనసాగించు',`,
  bn: `
    'nav.visaInfo': 'ভিসা তথ্য',
    'nav.application': 'আবেদন',
    'nav.apply': 'আবেদন করুন',
    'home.hero.title': 'ইন্ডিয়ান ভিসা অনলাইনে স্বাগতম',
    'home.hero.subtitle': 'ভারতে আপনার ভ্রমণের পরিকল্পনা করুন।',
    'home.selectCountry.title': 'আপনি কোথা থেকে ভ্রমণ করছেন?',
    'home.selectCountry.desc': 'ভারতে আপনার ভ্রমণের জন্য উপলব্ধ ভিসা বিকল্পগুলি অন্বেষণ করতে আপনার দেশ নির্বাচন করুন।',
    'home.searchCountry': 'দেশ অনুসন্ধান করুন...',
    'home.noCountrySelected': 'কোনো দেশ নির্বাচিত হয়নি',
    'btn.continue': 'চালিয়ে যান',`,
  gu: `
    'nav.visaInfo': 'વિઝા માહિતી',
    'nav.application': 'અરજી',
    'nav.apply': 'અરજી કરો',
    'home.hero.title': 'ઇન્ડિયન વિઝા ઓનલાઈનમાં આપનું સ્વાગત છે',
    'home.hero.subtitle': 'ભારતની તમારી યાત્રાનું આયોજન કરો.',
    'home.selectCountry.title': 'તમે ક્યાંથી મુસાફરી કરી રહ્યા છો?',
    'home.selectCountry.desc': 'ભારતની તમારી યાત્રા માટે ઉપલબ્ધ વિઝા વિકલ્પો અન્વેષણ કરવા માટે તમારો દેશ પસંદ કરો.',
    'home.searchCountry': 'દેશ શોધો...',
    'home.noCountrySelected': 'કોઈ દેશ પસંદ કરેલ નથી',
    'btn.continue': 'ચાલુ રાખો',`,
  kn: `
    'nav.visaInfo': 'ವೀಸಾ ಮಾಹಿತಿ',
    'nav.application': 'ಅರ್ಜಿ',
    'nav.apply': 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'home.hero.title': 'ಇಂಡಿಯನ್ ವೀಸಾ ಆನ್‌ಲೈನ್‌ಗೆ ಸುಸ್ವಾಗತ',
    'home.hero.subtitle': 'ಭಾರತಕ್ಕೆ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಯೋಜಿಸಿ.',
    'home.selectCountry.title': 'ನೀವು ಎಲ್ಲಿಂದ ಪ್ರಯಾಣಿಸುತ್ತಿದ್ದೀರಿ?',
    'home.selectCountry.desc': 'ಭಾರತಕ್ಕೆ ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕಾಗಿ ಲಭ್ಯವಿರುವ ವೀಸಾ ಆಯ್ಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ನಿಮ್ಮ ದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    'home.searchCountry': 'ದೇಶವನ್ನು ಹುಡುಕಿ...',
    'home.noCountrySelected': 'ಯಾವುದೇ ದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ',
    'btn.continue': 'ಮುಂದುವರಿಸಿ',`,
  ml: `
    'nav.visaInfo': 'വിസ വിവരം',
    'nav.application': 'അപേക്ഷ',
    'nav.apply': 'അപേക്ഷിക്കുക',
    'home.hero.title': 'ഇന്ത്യൻ വിസ ഓൺലൈനിലേക്ക് സ്വാഗതം',
    'home.hero.subtitle': 'ഇന്ത്യയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര ആസൂത്രണം ചെയ്യുക.',
    'home.selectCountry.title': 'നിങ്ങൾ എവിടെ നിന്നാണ് യാത്ര ചെയ്യുന്നത്?',
    'home.selectCountry.desc': 'ഇന്ത്യയിലേക്കുള്ള നിങ്ങളുടെ യാത്രയ്ക്ക് ലഭ്യമായ വിസ ഓപ്ഷനുകൾ പര്യവേക്ഷണം ചെയ്യാൻ നിങ്ങളുടെ രാജ്യം തിരഞ്ഞെടുക്കുക.',
    'home.searchCountry': 'രാജ്യം തിരയുക...',
    'home.noCountrySelected': 'ഒരു രാജ്യവും തിരഞ്ഞെടുത്തിട്ടില്ല',
    'btn.continue': 'തുടരുക',`,
  pa: `
    'nav.visaInfo': 'ਵੀਜ਼ਾ ਜਾਣਕਾਰੀ',
    'nav.application': 'ਐਪਲੀਕੇਸ਼ਨ',
    'nav.apply': 'ਅਪਲਾਈ ਕਰੋ',
    'home.hero.title': 'ਇੰਡੀਅਨ ਵੀਜ਼ਾ ਔਨਲਾਈਨ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ',
    'home.hero.subtitle': 'ਭಾರਤ ਦੀ ਆਪਣੀ ਯਾਤਰਾ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।',
    'home.selectCountry.title': 'ਤੁਸੀਂ ਕਿੱਥੋਂ ਯਾਤਰਾ ਕਰ ਰਹੇ ਹੋ?',
    'home.selectCountry.desc': 'ਭਾਰਤ ਦੀ ਆਪਣੀ ਯਾਤਰਾ ਲਈ ਉਪਲਬਧ ਵੀਜ਼ਾ ਵਿਕਲਪਾਂ ਦੀ ਪੜਚੋਲ ਕਰਨ ਲਈ ਆਪਣਾ ਦੇਸ਼ ਚੁਣੋ।',
    'home.searchCountry': 'ਦੇਸ਼ ਖੋਜੋ...',
    'home.noCountrySelected': 'ਕੋਈ ਦੇਸ਼ ਨਹੀਂ ਚੁਣਿਆ ਗਿਆ',
    'btn.continue': 'ਜਾਰੀ ਰੱਖੋ',`
};

const filePath = path.join(__dirname, 'src/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

for (const [lang, translationsStr] of Object.entries(translations)) {
  const regex = new RegExp("(\\\\s*)" + lang + ":\\\\s*\\\\{");
  // using string splitting/replacing as an alternative to avoid regex backreference quirks
  const parts = content.split(\`\\n  \${lang}: {\`);
  if (parts.length === 2) {
    content = parts[0] + \`\\n  \${lang}: {\` + translationsStr + parts[1];
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translations updated successfully.');
