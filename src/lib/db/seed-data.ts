/** Seed payload for the main Aaswad branch */

export const SEED_SUPERADMIN = {
  email: "admin@aaswad.com",
  password: "admin123",
  name: "Super Admin",
};

export const SEED_BRANCH_ADMIN = {
  email: "branch@aaswad.com",
  password: "branch123",
  name: "Branch Admin",
};

export const SEED_BRANCH = {
  slug: "aaswad-main",
  nameMr: "आस्वाद",
  nameEn: "Aaswad",
  taglineMr: "शाही बिर्याणी",
  taglineEn: "Shahi Biryani",
  sinceMr: "७५ वर्षांपासून आस्वाद लंच होम यांचे",
  sinceEn: "Aaswad Lunch Home — 75 Years of Legacy",
  proprietorMr: "चिपाडे बंधू",
  proprietorEn: "Chipade Brothers",
  brandLogoText: "Aaasvaad",
  addressMr: "विठ्ठल नगर, चिंचवड",
  addressEn: "Vitthal Nagar, Chinchwad",
  phone: "8087771117",
};

export const SEED_SOCIAL_LINKS = [
  {
    platform: "instagram" as const,
    labelMr: "Instagram",
    labelEn: "Instagram",
    url: "https://www.instagram.com",
    displayOrder: 0,
  },
  {
    platform: "zomato" as const,
    labelMr: "Zomato",
    labelEn: "Zomato",
    url: "https://www.zomato.com",
    displayOrder: 1,
  },
  {
    platform: "swiggy" as const,
    labelMr: "Swiggy",
    labelEn: "Swiggy",
    url: "https://www.swiggy.com",
    displayOrder: 2,
  },
];

type SeedItem = {
  nameMr: string;
  nameEn: string;
  price: number;
  isVeg: boolean;
  descriptionMr?: string;
  descriptionEn?: string;
};

type SeedCategory = {
  nameMr: string;
  nameEn: string;
  columnSide: "left" | "right";
  items: SeedItem[];
};

type SeedPage = {
  titleMr: string;
  titleEn: string;
  category: "veg" | "non-veg";
  bottomTextMr?: string;
  bottomTextEn?: string;
  image1Url: string;
  image2Url: string;
  categories: SeedCategory[];
};

export const SEED_PAGES: SeedPage[] = [
  {
    titleMr: "शाकाहारी मेनू",
    titleEn: "Vegetarian Menu",
    category: "veg",
    image1Url: "/biryani1.jpeg",
    image2Url: "/biryani2.jpeg",
    categories: [
      {
        nameMr: "मुख्य पदार्थ",
        nameEn: "Main Course",
        columnSide: "left",
        items: [
          { nameMr: "पनीर मसाला", nameEn: "Paneer Masala", price: 190, isVeg: true },
          { nameMr: "काजू मसाला", nameEn: "Cashew Masala", price: 130, isVeg: true },
          { nameMr: "व्हेज भाजी", nameEn: "Mixed Veg Curry", price: 100, isVeg: true },
          { nameMr: "शेजवान मसाला", nameEn: "Schezwan Masala", price: 100, isVeg: true },
        ],
      },
      {
        nameMr: "राईस",
        nameEn: "Rice",
        columnSide: "left",
        items: [
          { nameMr: "साधा भात", nameEn: "Plain Rice", price: 30, isVeg: true },
          { nameMr: "जिरा राईस", nameEn: "Jeera Rice", price: 45, isVeg: true },
        ],
      },
      {
        nameMr: "रोटी / भाकरी",
        nameEn: "Roti / Bhakri",
        columnSide: "right",
        items: [
          { nameMr: "चपाती", nameEn: "Chapati", price: 15, isVeg: true },
          { nameMr: "भाकरी", nameEn: "Bhakri", price: 20, isVeg: true },
          { nameMr: "मालवणी पराठा", nameEn: "Malvani Paratha", price: 25, isVeg: true },
          { nameMr: "मसाला पराठा", nameEn: "Masala Paratha", price: 30, isVeg: true },
        ],
      },
      {
        nameMr: "Extras",
        nameEn: "Extras",
        columnSide: "right",
        items: [
          { nameMr: "भाजलेला पापड", nameEn: "Roasted Papad", price: 20, isVeg: true },
          { nameMr: "तळलेला पापड", nameEn: "Fried Papad", price: 25, isVeg: true },
        ],
      },
    ],
  },
  {
    titleMr: "स्टार्टर्स व बिर्याणी",
    titleEn: "Starters & Biryani",
    category: "non-veg",
    bottomTextMr:
      "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
    bottomTextEn:
      "Mutton, chicken, fish, country chicken & biryani available by the kilo.",
    image1Url: "/biryani1.jpeg",
    image2Url: "/biryani2.jpeg",
    categories: [
      {
        nameMr: "स्टार्टर",
        nameEn: "Starters",
        columnSide: "left",
        items: [
          { nameMr: "चिकन टिक्का", nameEn: "Chicken Tikka", price: 250, isVeg: false },
          { nameMr: "चिकन लॉलीपॉप", nameEn: "Chicken Lollipop", price: 180, isVeg: false },
          { nameMr: "चिकन चिली", nameEn: "Chicken Chilli", price: 160, isVeg: false },
        ],
      },
      {
        nameMr: "अंडा स्पेशल",
        nameEn: "Egg Specials",
        columnSide: "left",
        items: [
          { nameMr: "अंडा करी", nameEn: "Egg Curry", price: 80, isVeg: false },
          { nameMr: "अंडा मसाला", nameEn: "Egg Masala", price: 90, isVeg: false },
          { nameMr: "ऑम्लेट", nameEn: "Omelette", price: 60, isVeg: false },
          { nameMr: "अंडा भुर्जी", nameEn: "Egg Bhurji", price: 75, isVeg: false },
          { nameMr: "अंडा फ्राय", nameEn: "Fried Egg", price: 40, isVeg: false },
          { nameMr: "उकडलेले अंडे", nameEn: "Boiled Eggs", price: 30, isVeg: false },
        ],
      },
      {
        nameMr: "बिर्याणी",
        nameEn: "Biryani",
        columnSide: "right",
        items: [
          { nameMr: "चिकन दम बिर्याणी (हाफ)", nameEn: "Chicken Dum Biryani (Half)", price: 130, isVeg: false },
          { nameMr: "चिकन दम बिर्याणी (फुल)", nameEn: "Chicken Dum Biryani (Full)", price: 170, isVeg: false },
          { nameMr: "आस्वाद शाही चिकन बिर्याणी", nameEn: "Aaswad Shahi Chicken Biryani", price: 200, isVeg: false },
          { nameMr: "मटण दम बिर्याणी", nameEn: "Mutton Dum Biryani", price: 270, isVeg: false },
          { nameMr: "आस्वाद शाही मटण दम बिर्याणी", nameEn: "Aaswad Shahi Mutton Dum Biryani", price: 300, isVeg: false },
          { nameMr: "अंडा बिर्याणी", nameEn: "Egg Biryani", price: 150, isVeg: false },
          { nameMr: "आस्वाद शाही अंडा बिर्याणी", nameEn: "Aaswad Shahi Egg Biryani", price: 160, isVeg: false },
          { nameMr: "चिकन टिक्का बिर्याणी", nameEn: "Chicken Tikka Biryani", price: 180, isVeg: false },
        ],
      },
    ],
  },
  {
    titleMr: "मेन कोर्स व थाळी",
    titleEn: "Main Course & Thali",
    category: "non-veg",
    bottomTextMr:
      "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
    bottomTextEn:
      "Mutton, chicken, fish, country chicken & biryani available by the kilo.",
    image1Url: "/biryani1.jpeg",
    image2Url: "/biryani2.jpeg",
    categories: [
      {
        nameMr: "चिकन स्पेशल",
        nameEn: "Chicken Specials",
        columnSide: "left",
        items: [
          { nameMr: "चिकन हांडी", nameEn: "Chicken Handi", price: 370, isVeg: false },
          { nameMr: "चिकन तवा", nameEn: "Chicken Tawa", price: 300, isVeg: false },
          { nameMr: "चिकन मसाला", nameEn: "Chicken Masala", price: 200, isVeg: false },
        ],
      },
      {
        nameMr: "मटण स्पेशल",
        nameEn: "Mutton Specials",
        columnSide: "left",
        items: [
          { nameMr: "मटण मसाला", nameEn: "Mutton Masala", price: 250, isVeg: false },
          { nameMr: "मटण हांडी", nameEn: "Mutton Handi", price: 950, isVeg: false },
          { nameMr: "मटण रस्सा प्लेट", nameEn: "Mutton Rassa Plate", price: 200, isVeg: false },
          { nameMr: "मटण पाय सूप", nameEn: "Mutton Paya Soup", price: 150, isVeg: false },
          { nameMr: "मटण सूप", nameEn: "Mutton Soup", price: 100, isVeg: false },
        ],
      },
      {
        nameMr: "थाळी",
        nameEn: "Thali",
        columnSide: "right",
        items: [
          { nameMr: "चिकन थाळी", nameEn: "Chicken Thali", price: 250, isVeg: false },
          { nameMr: "चिकन टिक्का थाळी", nameEn: "Chicken Tikka Thali", price: 300, isVeg: false },
          { nameMr: "मटण थाळी", nameEn: "Mutton Thali", price: 300, isVeg: false },
          { nameMr: "आस्वाद शाही चिकन थाळी", nameEn: "Aaswad Shahi Chicken Thali", price: 400, isVeg: false },
          { nameMr: "आस्वाद शाही मटण थाळी", nameEn: "Aaswad Shahi Mutton Thali", price: 500, isVeg: false },
        ],
      },
      {
        nameMr: "राईस",
        nameEn: "Rice",
        columnSide: "right",
        items: [
          { nameMr: "बिर्याणी राईस", nameEn: "Biryani Rice", price: 80, isVeg: false },
          { nameMr: "अंडा मसाला राईस", nameEn: "Egg Masala Rice", price: 120, isVeg: false },
          { nameMr: "अंडा रस्सा राईस", nameEn: "Egg Rassa Rice", price: 100, isVeg: false },
        ],
      },
      {
        nameMr: "Extras",
        nameEn: "Extras",
        columnSide: "right",
        items: [
          { nameMr: "एक्स्ट्रा रस्सा", nameEn: "Extra Gravy", price: 25, isVeg: false },
          { nameMr: "एक्स्ट्रा अंडे", nameEn: "Extra Eggs", price: 20, isVeg: false },
        ],
      },
    ],
  },
];
