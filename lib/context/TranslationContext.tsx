"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';

// Define the available languages
export type Language = 'fr' | 'ar';

// Define the translation data structure
interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
  };
}

// Sample translations for demonstration
const translations: Translations = {
  // Navigation
  'nav.home': {
    fr: 'Accueil',
    ar: 'الرئيسية'
  },
  'nav.products': {
    fr: 'Produits',
    ar: 'المنتجات'
  },
  'nav.products.all': {
    fr: 'Tous les produits',
    ar: 'جميع المنتجات'
  },
  'nav.products.catalogue': {
    fr: 'Voir l\'ensemble du catalogue',
    ar: 'عرض الكتالوج الكامل'
  },
  'nav.products.byBrand': {
    fr: 'PAR MARQUE',
    ar: 'حسب العلامة التجارية'
  },
  'nav.about': {
    fr: 'Société',
    ar: 'الشركة'
  },
  'nav.partners': {
    fr: 'Partenaires',
    ar: 'الشركاء'
  },
  'nav.contact': {
    fr: 'Contact',
    ar: 'اتصل بنا'
  },

  // Search
  'search.placeholder': {
    fr: 'Rechercher un produit',
    ar: 'البحث عن منتج'
  },

  // Home Page
  'home.hero.title': {
    fr: 'Solutions industrielles UTC',
    ar: 'حلول UTC الصناعية'
  },
  'home.hero.eyebrow': {
    fr: 'Distribution industrielle, automatisme et motorisation',
    ar: 'توزيع صناعي، أتمتة ومحركات'
  },
  'home.hero.subtitle': {
    fr: 'Votre partenaire de confiance pour vos projets. Nous connectons vos lignes de production aux meilleurs équipements Lenze, IFM et WAGO.',
    ar: 'شريكك الموثوق لمشاريعك. نربط خطوط إنتاجك بأفضل تجهيزات Lenze وIFM وWAGO.'
  },
  'home.hero.cta': {
    fr: 'Demander un devis',
    ar: 'طلب عرض سعر'
  },
  'home.hero.secondaryCta': {
    fr: 'Voir les produits',
    ar: 'عرض المنتجات'
  },
  'home.hero.network': {
    fr: 'Réseau UTC',
    ar: 'شبكة UTC'
  },
  'home.hero.reliableAutomation': {
    fr: 'Automatisation fiable',
    ar: 'أتمتة موثوقة'
  },
  'home.hero.motorization': {
    fr: 'Motorisation',
    ar: 'المحركات'
  },
  'home.hero.detection': {
    fr: 'Détection',
    ar: 'الكشف'
  },
  'home.hero.connectivity': {
    fr: 'Connectique',
    ar: 'التوصيل'
  },
  'home.features.title': {
    fr: 'Pourquoi nous choisir',
    ar: 'لماذا تختارنا'
  },
  'home.solutions.title': {
    fr: 'Nos Solutions',
    ar: 'حلولنا'
  },
  'home.solutions.subtitle': {
    fr: 'Des solutions adaptées à vos besoins industriels',
    ar: 'حلول مخصصة لاحتياجاتك الصناعية'
  },

  // Products Page
  'products.title': {
    fr: 'Nos Produits',
    ar: 'منتجاتنا'
  },
  'products.subtitle': {
    fr: 'Découvrez notre gamme complète de produits industriels',
    ar: 'اكتشف مجموعتنا الكاملة من المنتجات الصناعية'
  },
  'products.filter.all': {
    fr: 'Tous',
    ar: 'الكل'
  },
  'products.filter.category': {
    fr: 'Catégorie',
    ar: 'الفئة'
  },
  'products.filter.price': {
    fr: 'Prix',
    ar: 'السعر'
  },
  'products.noResults': {
    fr: 'Aucun produit trouvé',
    ar: 'لم يتم العثور على منتجات'
  },
  'products.viewDetails': {
    fr: 'Voir les détails',
    ar: 'عرض التفاصيل'
  },

  // About Page
  'about.title': {
    fr: 'Notre Société',
    ar: 'شركتنا'
  },
  'about.subtitle': {
    fr: 'Découvrez notre histoire et nos valeurs',
    ar: 'اكتشف قصتنا وقيمنا'
  },
  'about.mission.title': {
    fr: 'Notre Mission',
    ar: 'مهمتنا'
  },
  'about.vision.title': {
    fr: 'Notre Vision',
    ar: 'رؤيتنا'
  },
  'about.values.title': {
    fr: 'Nos Valeurs',
    ar: 'قيمنا'
  },

  // Partners Page
  'partners.title': {
    fr: 'Nos Partenaires',
    ar: 'شركاؤنا'
  },
  'partners.subtitle': {
    fr: 'Collaborations stratégiques pour des solutions optimales',
    ar: 'تعاون استراتيجي لحلول مثالية'
  },
  'partners.discover': {
    fr: 'Découvrir nos Partenaires',
    ar: 'اكتشف شركاءنا'
  },

  // Contact Page
  'contact.title': {
    fr: 'Contactez-nous',
    ar: 'اتصل بنا'
  },
  'contact.subtitle': {
    fr: 'Nous sommes à votre écoute',
    ar: 'نحن هنا للاستماع إليك'
  },
  'contact.form.name': {
    fr: 'Nom',
    ar: 'الاسم'
  },
  'contact.form.email': {
    fr: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'contact.form.message': {
    fr: 'Message',
    ar: 'الرسالة'
  },
  'contact.form.submit': {
    fr: 'Envoyer',
    ar: 'إرسال'
  },

  // Common
  'button.discover': {
    fr: 'Découvrir',
    ar: 'اكتشف'
  },
  'button.contact': {
    fr: 'Nous Contacter',
    ar: 'اتصل بنا'
  },
  'button.quote': {
    fr: 'Demander un Devis',
    ar: 'طلب عرض سعر'
  },
  'button.readMore': {
    fr: 'En savoir plus',
    ar: 'قراءة المزيد'
  },
  'button.viewAll': {
    fr: 'Voir tout',
    ar: 'عرض الكل'
  },
  'footer.rights': {
    fr: 'Tous droits réservés',
    ar: 'جميع الحقوق محفوظة'
  },

  // Footer
  'footer.company': {
    fr: 'UTC Industrie',
    ar: 'يو تي سي للصناعة'
  },
  'footer.description': {
    fr: 'Fournisseur de produits industriels de haute qualité depuis 1985.',
    ar: 'مورد منتجات صناعية عالية الجودة منذ عام 1985'
  },
  'footer.quickLinks': {
    fr: 'Liens Rapides',
    ar: 'روابط سريعة'
  },
  'footer.productCategories': {
    fr: 'Catégories de Produits',
    ar: 'فئات المنتجات'
  },
  'footer.privacy': {
    fr: 'Politique de Confidentialité',
    ar: 'سياسة الخصوصية'
  },
  'footer.terms': {
    fr: 'Conditions d\'Utilisation',
    ar: 'شروط الاستخدام'
  },
  'footer.sitemap': {
    fr: 'Plan du Site',
    ar: 'خريطة الموقع'
  },
  'products.categories.pumps': {
    fr: 'Pompes',
    ar: 'مضخات'
  },
  'products.categories.valves': {
    fr: 'Vannes',
    ar: 'صمامات'
  },
  'products.categories.compressors': {
    fr: 'Compresseurs',
    ar: 'ضواغط'
  },
  'products.categories.exchangers': {
    fr: 'Échangeurs de Chaleur',
    ar: 'مبادلات حرارية'
  },
  'products.categories.filtration': {
    fr: 'Systèmes de Filtration',
    ar: 'أنظمة التصفية'
  },

  // Expertise Sections
  'expertise.hygiene': {
    fr: 'Hygiène',
    ar: 'النظافة'
  },
  'expertise.pharmaceutical': {
    fr: 'Pharmaceutique',
    ar: 'الصيدلة'
  },
  'expertise.food': {
    fr: 'Agroalimentaire',
    ar: 'الصناعات الغذائية'
  },
  'expertise.robotics': {
    fr: 'Robotique',
    ar: 'الروبوتات'
  },

  // Value Propositions
  'value.qualityAssurance': {
    fr: 'Assurance Qualité',
    ar: 'ضمان الجودة'
  },
  'value.worldwideShipping': {
    fr: 'Expédition Mondiale',
    ar: 'شحن عالمي'
  },
  'value.technicalSupport': {
    fr: 'Support Technique',
    ar: 'الدعم الفني'
  },

  // Solutions
  'solutions.automation': {
    fr: 'Automatismes',
    ar: 'أنظمة التحكم الآلي'
  },
  'solutions.drives': {
    fr: 'Entraînements',
    ar: 'المحركات'
  },
  'solutions.custom': {
    fr: 'Sur Mesure',
    ar: 'حلول مخصصة'
  },

  // About Page
  'about.ourHistory': {
    fr: 'Notre Histoire',
    ar: 'تاريخنا'
  },
  'about.companyImage': {
    fr: 'Image de l\'entreprise',
    ar: 'صورة الشركة'
  },
  'about.qualityExcellence': {
    fr: 'Excellence de Qualité',
    ar: 'التميز في الجودة'
  },
  'about.customerOrientation': {
    fr: 'Orientation Client',
    ar: 'التوجه نحو العملاء'
  },
  'about.globalPerspective': {
    fr: 'Perspective Mondiale',
    ar: 'رؤية عالمية'
  },
  'about.joinNetwork': {
    fr: 'Rejoignez Notre Réseau',
    ar: 'انضم إلى شبكتنا'
  },

  // Contact Page
  'contact.companyInfo': {
    fr: 'Informations de l\'Entreprise',
    ar: 'معلومات الشركة'
  },
  'contact.address': {
    fr: 'Adresse',
    ar: 'العنوان'
  },
  'contact.phone': {
    fr: 'Téléphone',
    ar: 'الهاتف'
  },

  // Products Page
  'products.browse': {
    fr: 'Parcourez notre catalogue complet de produits industriels conçus pour la fiabilité, l\'efficacité et la performance.',
    ar: 'تصفح كتالوج منتجاتنا الصناعية الكاملة المصممة للموثوقية والكفاءة والأداء.'
  },
  'products.filters': {
    fr: 'Filtres',
    ar: 'التصفية'
  },
  'products.categories': {
    fr: 'Catégories',
    ar: 'الفئات'
  },
  'products.noCategories': {
    fr: 'Aucune catégorie disponible',
    ar: 'لا توجد فئات متاحة'
  },
  'products.specifications': {
    fr: 'Spécifications',
    ar: 'المواصفات'
  },
  'products.related': {
    fr: 'Produits Associés',
    ar: 'منتجات ذات صلة'
  },

  // Common UI
  'ui.close': {
    fr: 'Fermer',
    ar: 'إغلاق'
  },
  'ui.share': {
    fr: 'Partager',
    ar: 'مشاركة'
  },
  'ui.image': {
    fr: 'Image',
    ar: 'صورة'
  },
  'ui.photo': {
    fr: 'Photo',
    ar: 'صورة'
  },

  // Error Pages
  'error.notFound': {
    fr: 'Page Non Trouvée',
    ar: 'الصفحة غير موجودة'
  },

  // Expertise Section
  'expertise.title': {
    fr: 'Secteurs d\'Expertise',
    ar: 'مجالات الخبرة'
  },
  'expertise.description': {
    fr: 'Nous proposons des solutions spécialisées pour répondre aux besoins spécifiques de différents secteurs industriels.',
    ar: 'نقدم حلولاً متخصصة لتلبية الاحتياجات المحددة لمختلف القطاعات الصناعية'
  },
  'expertise.hygiene.title': {
    fr: 'Hygiène',
    ar: 'النظافة'
  },
  'expertise.hygiene.description': {
    fr: 'Équipements et solutions pour les industries nécessitant des normes d\'hygiène strictes, avec des matériaux conformes aux réglementations sanitaires.',
    ar: 'معدات وحلول للصناعات التي تتطلب معايير نظافة صارمة، مع مواد متوافقة مع اللوائح الصحية'
  },
  'expertise.pharmaceutical.title': {
    fr: 'Pharmaceutique',
    ar: 'الصناعات الدوائية'
  },
  'expertise.pharmaceutical.description': {
    fr: 'Solutions de précision pour l\'industrie pharmaceutique, respectant les normes GMP et assurant la fiabilité des processus de production.',
    ar: 'حلول دقيقة للصناعات الدوائية، تلتزم بمعايير التصنيع الجيد وتضمن موثوقية عمليات الإنتاج'
  },
  'expertise.food.title': {
    fr: 'Agroalimentaire',
    ar: 'الصناعات الغذائية'
  },
  'expertise.food.description': {
    fr: 'Équipements spécialisés pour la transformation, le conditionnement et la conservation des produits alimentaires, conformes aux normes HACCP.',
    ar: 'معدات متخصصة لتصنيع وتعبئة وحفظ المنتجات الغذائية، متوافقة مع معايير تحليل المخاطر ونقاط التحكم الحرجة'
  },
  'expertise.robotics.title': {
    fr: 'Robotique',
    ar: 'الروبوتات'
  },
  'expertise.robotics.description': {
    fr: 'Solutions d\'automatisation et de robotique industrielle pour optimiser les processus de production et améliorer l\'efficacité opérationnelle.',
    ar: 'حلول الأتمتة والروبوتات الصناعية لتحسين عمليات الإنتاج وتحسين الكفاءة التشغيلية'
  },
  'expertise.cement.title': {
    fr: 'Cimenterie',
    ar: 'مصانع الإسمنت'
  },
  'expertise.cement.description': {
    fr: 'Solutions robustes pour les lignes de production de ciment, conçues pour les environnements exigeants et les fortes cadences.',
    ar: 'حلول قوية لخطوط إنتاج الإسمنت، مصممة للبيئات الصعبة ومعدلات الإنتاج العالية'
  },
  'expertise.brick.title': {
    fr: 'Briquerie et Produits Rouges',
    ar: 'مصانع الآجر والمنتجات الحمراء'
  },
  'expertise.brick.description': {
    fr: 'Équipements adaptés aux briqueteries et aux produits rouges pour fiabiliser la manutention, la cuisson et la production continue.',
    ar: 'معدات ملائمة لمصانع الآجر والمنتجات الحمراء لضمان موثوقية المناولة والحرق والإنتاج المستمر'
  },
};

// Define the context type
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: string;
  isClient: boolean;
}

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [dir, setDir] = useState<string>('ltr');
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Function to detect user's browser language
  const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'fr';
    
    const storedLang = localStorage.getItem('preferredLanguage') as Language;
    if (storedLang && (storedLang === 'fr' || storedLang === 'ar')) {
      return storedLang;
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) return 'ar';
    return 'fr'; // Default to French for all other languages
  };

  // Handle client-side hydration and language detection
  useEffect(() => {
    setIsClient(true);
    setMounted(true);
    const detectedLang = detectBrowserLanguage();
    setLanguage(detectedLang);
  }, []);

  // Update document direction and store language preference when language changes
  useEffect(() => {
    if (typeof document !== 'undefined' && mounted) {
      const isArabic = language === 'ar';
      setDir(isArabic ? 'rtl' : 'ltr');
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      
      // Update font family based on language
      if (isArabic) {
        document.documentElement.classList.add('font-arabic');
      } else {
        document.documentElement.classList.remove('font-arabic');
      }

      // Store language preference
      localStorage.setItem('preferredLanguage', language);
    }
  }, [language, mounted]);

  // Translation function
  const t = useCallback((key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  }, [language]);

  const contextValue = useMemo(
    () => ({ language, setLanguage, t, dir, isClient }),
    [language, t, dir, isClient]
  );

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook to use the translation context
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
