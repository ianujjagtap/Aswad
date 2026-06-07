// Premium Flyer Menu Data for Aaswad Shahi Biryani
// Refactored to match the deep maroon & gold theme from the new reference image

export interface MenuItem {
  nameMr: string;
  price: string;
  descriptionMr?: string;
  isVeg?: boolean;
}

export interface MenuCategory {
  nameMr: string;
  items: MenuItem[];
}

export interface MenuPageData {
  title: string;
  leftColumn: MenuCategory[];
  rightColumn: MenuCategory[];
  bottomText?: string;
  images: string[];
}

export interface BranchDetails {
  name: string;
  tagline: string;
  since: string;
  proprietor: string;
  phone: string;
  address: string;
  zomatoLink: string;
  swiggyLink: string;
  pages: MenuPageData[];
}

export const aaswadMenuData: BranchDetails = {
  name: "आस्वाद",
  tagline: "शाही बिर्याणी",
  since: "७५ वर्षांपासून आस्वाद लंच होम यांचे",
  proprietor: "चिपाडे बंधू",
  phone: "8087771117",
  address: "विठ्ठल नगर, चिंचवड",
  zomatoLink: "https://www.zomato.com",
  swiggyLink: "https://www.swiggy.com",
  pages: [
    {
      title: "स्पेशल व स्टार्टर्स",
      images: [
        "/biryani1.jpeg",
      ],
      bottomText: "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
      leftColumn: [
        {
          nameMr: "आजचे स्पेशल (Specials)",
          items: [
            { nameMr: "चिकन टिक्का", price: "240", isVeg: false },
            { nameMr: "चिकन टिक्का बिर्याणी", price: "180", isVeg: false },
            { nameMr: "चिकन लॉलीपॉप", price: "180", isVeg: false },
            { nameMr: "चिकन चिली", price: "160", isVeg: false },
            { nameMr: "बोनलेस मसाला", price: "160", isVeg: false },
          ],
        },
      ],
      rightColumn: [
        {
          nameMr: "स्टार्टर्स (Starters)",
          items: [
            { nameMr: "बॉईल अंडी प्लेट", price: "30", isVeg: false },
            { nameMr: "अंडा फ्राय", price: "40", isVeg: false },
            { nameMr: "ऑम्लेट", price: "60", isVeg: false },
            { nameMr: "अंडा भुर्जी", price: "75", isVeg: false },
            { nameMr: "चिकन टिक्का", price: "250", isVeg: false },
            { nameMr: "चिकन तवा", price: "220", isVeg: false },
            { nameMr: "चिकन चिली", price: "160", isVeg: false },
          ],
        },
      ],
    },
    {
      title: "बिर्याणी व थाळी",
      images: [
        "/biryani2.jpeg",
      ],
      bottomText: "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
      leftColumn: [
        {
          nameMr: "बिर्याणी मेनू (Biryani)",
          items: [
            { nameMr: "चिकन दम बिर्याणी (हाफ)", price: "130", isVeg: false },
            { nameMr: "चिकन दम बिर्याणी (फुल)", price: "170", isVeg: false },
            { nameMr: "आस्वाद शाही चिकन बिर्याणी", price: "200", isVeg: false },
            { nameMr: "मटण दम बिर्याणी", price: "270", isVeg: false },
            { nameMr: "आस्वाद शाही मटण दम बिर्याणी", price: "300", isVeg: false },
            { nameMr: "अंडा बिर्याणी", price: "150", isVeg: false },
            { nameMr: "आस्वाद शाही अंडा बिर्याणी", price: "160", isVeg: false },
          ],
        },
      ],
      rightColumn: [
        {
          nameMr: "शाही थाळी (Thali)",
          items: [
            { nameMr: "आस्वाद शाही चिकन थाळी", price: "400", isVeg: false },
            { nameMr: "चिकन टिक्का थाळी", price: "300", isVeg: false },
            { nameMr: "आस्वाद शाही मटण थाळी", price: "500", isVeg: false },
          ],
        },
      ],
    },
    {
      title: "मेन कोर्स व इतर",
      images: [
        "/biryani1.jpeg",
      ],
      bottomText: "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
      leftColumn: [
        {
          nameMr: "चिकन मेन कोर्स (Chicken)",
          items: [
            { nameMr: "चिकन हंडी (११ पीस)", price: "370", isVeg: false },
            { nameMr: "चिकन हंडी (२२ पीस)", price: "720", isVeg: false },
            { nameMr: "चिकन तवा", price: "300", isVeg: false },
          ],
        },
        {
          nameMr: "मटण मेन कोर्स (Mutton)",
          items: [
            { nameMr: "मटण मसाला", price: "250", isVeg: false },
            { nameMr: "मटण हंडी", price: "950", isVeg: false },
            { nameMr: "मटण रस्सा प्लेट", price: "200", isVeg: false },
          ],
        },
      ],
      rightColumn: [
        {
          nameMr: "चायनीज (Chinese)",
          items: [
            { nameMr: "व्हेज भाजी", price: "100", isVeg: true },
            { nameMr: "शेजवान मसाला", price: "100", isVeg: true },
            { nameMr: "चिकन ट्रिपल राईस", price: "140", isVeg: false },
            { nameMr: "पनीर मसाला", price: "190", isVeg: true },
          ],
        },
        {
          nameMr: "रोटी आणि ब्रेड (Roti)",
          items: [
            { nameMr: "चपाती", price: "15", isVeg: true },
            { nameMr: "भाकरी", price: "20", isVeg: true },
            { nameMr: "मालवणी पराठा", price: "25", isVeg: true },
            { nameMr: "मसाला पराठा", price: "30", isVeg: true },
          ],
        },
        {
          nameMr: "राईस आणि एक्स्ट्रा (Rice & Sides)",
          items: [
            { nameMr: "प्लेन राईस", price: "30", isVeg: true },
            { nameMr: "जिरा राईस", price: "45", isVeg: true },
            { nameMr: "बिर्याणी राईस", price: "80", isVeg: true },
            { nameMr: "एक्स्ट्रा रस्सा", price: "25", isVeg: false },
            { nameMr: "एक्स्ट्रा अंडे", price: "20", isVeg: false },
          ],
        },
      ],
    },
  ],
};

// ── Backwards compatibility helper types & object for Admin forms ───────
export interface DemoMenuItem {
  id: string;
  nameMr: string;
  nameEn: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  imageUrl?: string;
}

export interface DemoCategory {
  id: string;
  nameMr: string;
  nameEn: string;
  items: DemoMenuItem[];
}

export interface DemoBranch {
  name: string;
  slug: string;
  address: string;
  phone: string;
  phone2: string;
  tagline: string;
  config: {
    bgImageUrl: string | null;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  categories: DemoCategory[];
}

const getFlatCategories = (): DemoCategory[] => {
  const cats: DemoCategory[] = [];
  let itemCounter = 1;

  aaswadMenuData.pages.forEach((page) => {
    const allCols = [...page.leftColumn, ...page.rightColumn];
    allCols.forEach((col) => {
      const existing = cats.find((c) => c.nameMr === col.nameMr);
      const items = col.items.map((item) => {
        const parsedPrice = parseInt(item.price.split("/")[0]) || 0;
        return {
          id: `item-${itemCounter++}`,
          nameMr: item.nameMr + (item.descriptionMr ? ` ${item.descriptionMr}` : ""),
          nameEn: item.nameMr,
          price: parsedPrice,
          isVeg: col.nameMr.includes("व्हेज") || item.nameMr.includes("व्हेज"),
          isAvailable: true,
        };
      });

      if (existing) {
        existing.items.push(...items);
      } else {
        cats.push({
          id: `cat-${col.nameMr}`,
          nameMr: col.nameMr,
          nameEn: col.nameMr,
          items,
        });
      }
    });
  });

  return cats;
};

export const demoBranch: DemoBranch = {
  name: "आस्वाद शाही बिर्याणी",
  slug: "aaswad-main",
  address: aaswadMenuData.address,
  phone: aaswadMenuData.phone,
  phone2: aaswadMenuData.phone,
  tagline: "शाही बिर्याणी",
  config: {
    bgImageUrl: null,
    fontFamily: "Noto Sans Devanagari",
    primaryColor: "#8B1A1A",
    secondaryColor: "#D4A517",
    accentColor: "#F5E6C8",
  },
  categories: getFlatCategories(),
};
