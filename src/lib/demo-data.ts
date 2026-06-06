// Premium Flyer Menu Data for Aaswad Shahi Biryani
// Refactored to match the deep maroon & gold theme from the new reference image

export interface MenuItem {
  nameMr: string;
  price: string;
  descriptionMr?: string;
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
      title: "बिर्याणी मेनू",
      images: [
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop",
      ],
      bottomText: "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
      leftColumn: [
        {
          nameMr: "व्हेज",
          items: [
            { nameMr: "शेवभाजी", price: "90" },
            { nameMr: "सोयाबीन मसाला / फ्राय", price: "90" },
            { nameMr: "डाळ फ्राय / तडका", price: "90" },
            { nameMr: "पनीर मसाला", price: "140" },
            { nameMr: "काजू मसाला", price: "130" },
          ],
        },
        {
          nameMr: "व्हेज बिर्याणी",
          items: [
            { nameMr: "व्हेज दम बिर्याणी", price: "120" },
            { nameMr: "आस्वाद शाही व्हेज दम बिर्याणी", price: "160" },
            { nameMr: "सर्व साधारण व्हेज दम बिर्याणी", price: "110/190" },
          ],
        },
      ],
      rightColumn: [
        {
          nameMr: "चिकन बिर्याणी",
          items: [
            { nameMr: "चिकन दम बिर्याणी", price: "110" },
            { nameMr: "आस्वाद शहा. चिकन दम बिर्याणी", price: "180" },
            { nameMr: "सर्व साधारण चिकन दम बिर्याणी", price: "100/180" },
          ],
        },
        {
          nameMr: "मटण बिर्याणी",
          items: [
            { nameMr: "मटण दम बिर्याणी", price: "180" },
            { nameMr: "आस्वाद शहा. मटण दम बिर्याणी", price: "230" },
            { nameMr: "सर्व साधारण मटण दम बिर्याणी", price: "230/380" },
          ],
        },
      ],
    },
    {
      title: "थाळी व कॉम्बो",
      images: [
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop",
      ],
      bottomText: "किलो प्रमाणे मटण, चिकन, मच्छी, गावरान चिकन, बिर्याणी बनवून मिळेल.",
      leftColumn: [
        {
          nameMr: "चिकन थाळी",
          items: [
            {
              nameMr: "चिकन थाळी",
              descriptionMr: "(चिकन मसाला + चिकन फ्राय + रस्सा + सूप + राईस + २ चपाती/भाकरी)",
              price: "170",
            },
            {
              nameMr: "आस्वाद शहा. चिकन थाळी",
              descriptionMr: "(चिकन मसाला + चिकन फ्राय + चिकन बिर्याणी + सूप + २ चपाती/भाकरी + कोशिंबीर + सोलकढी/ताक)",
              price: "250",
            },
          ],
        },
        {
          nameMr: "मटण थाळी",
          items: [
            {
              nameMr: "मटण थाळी",
              descriptionMr: "(मटण मसाला + मटण फ्राय + रस्सा + सूप + राईस + २ चपाती/भाकरी)",
              price: "199",
            },
            {
              nameMr: "आस्वाद शहा. मटण थाळी",
              descriptionMr: "(मटण मसाला + मटण फ्राय + मटण बिर्याणी + सूप + २ चपाती/भाकरी + कोशिंबीर + सोलकढी/ताक)",
              price: "320",
            },
          ],
        },
        {
          nameMr: "बिर्याणी कॉम्बो",
          items: [
            {
              nameMr: "आस्वाद शहा. चिकन दम बिर्याणी",
              descriptionMr: "(१/२ बिर्याणी, चिकन दम बिर्याणी + २ चपाती/भाकरी + रस्सा + कोशिंबीर + सोलकढी/ताक)",
              price: "349",
            },
            {
              nameMr: "आस्वाद शहा. मटण दम बिर्याणी",
              descriptionMr: "(१/२ बिर्याणी, मटण दम बिर्याणी + २ चपाती/भाकरी + रस्सा + कोशिंबीर + सोलकढी/ताक)",
              price: "449",
            },
          ],
        },
      ],
      rightColumn: [
        {
          nameMr: "राईस",
          items: [
            { nameMr: "प्लेन राईस (हाफ/फुल)", price: "30/60" },
            { nameMr: "जिरा राईस (हाफ/फुल)", price: "40/80" },
          ],
        },
        {
          nameMr: "रोटी",
          items: [
            { nameMr: "भाकरी", price: "15" },
            { nameMr: "चपाती", price: "15" },
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
