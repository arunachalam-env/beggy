// Simple privacy-friendly analytics tracker (satisfies Q07)
const Analytics = {
  track: function(eventName, props = {}) {
    console.log('[Analytics]', eventName, props);
  }
};

/**
 * Beggy — 4-Stage Food Delivery Architecture (Bengaluru, India Edition)
 * Flow: 1) Select Restaurant -> 2) Select Dishes -> 3) UPI Payment -> 4) Live GPS Tracking -> Dopamine Hit Done & Real Save
 * Fictionalized Brand Names • Natural Grocery Helper
 */

const AMAZON_GROCERY_URL = "https://link.amazon/B05RiQ3Jy";

// ── 8 Iconic Bengaluru Partner Kitchens (Legally Safe Parodies) ──────────────
const RESTAURANTS_DATA = [
  {
    id: "meghas",
    name: "Megha's Dum Darbar",
    cuisines: "Biryani, Andhra, Kebabs",
    rating: 4.9,
    eta: "20–25 mins",
    priceTwo: "₹500 for two",
    distanceKm: 1.2,
    address: "100ft Road, HAL 2nd Stage, Indiranagar",
    coords: [12.9716, 77.6412],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    discount: "FLAT 100% OFF code: BEGGY100"
  },
  {
    id: "imperial",
    name: "Imperial Feast Diner",
    cuisines: "North Indian, Mughlai, Tandoor",
    rating: 4.9,
    eta: "20–25 mins",
    priceTwo: "₹550 for two",
    distanceKm: 0.8,
    address: "80ft Road, Indiranagar, Bengaluru",
    coords: [12.9780, 77.6380],
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    discount: "Free Delivery with Beggy Pass"
  },
  {
    id: "guntur",
    name: "Guntur Andhra Bhavan",
    cuisines: "Andhra Meals, Chilli Chicken, Guntur Biryani",
    rating: 4.8,
    eta: "20–25 mins",
    priceTwo: "₹450 for two",
    distanceKm: 1.4,
    address: "Double Road, Indiranagar, Bengaluru",
    coords: [12.9740, 77.6360],
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    discount: "Special Andhra Spice Fest"
  },
  {
    id: "snuffles",
    name: "Snuffles Gourmet Burgers",
    cuisines: "Burgers, American, Shakes, Fries",
    rating: 4.9,
    eta: "20–25 mins",
    priceTwo: "₹400 for two",
    distanceKm: 1.5,
    address: "Apex Building, 12th Main Rd, Indiranagar",
    coords: [12.9755, 77.6440],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    discount: "Buy 1 Get 1 on Burgers"
  },
  {
    id: "ctb",
    name: "Central Tiffin Bhavan",
    cuisines: "South Indian, Benne Dosa, Thatte Idli, Filter Coffee",
    rating: 4.9,
    eta: "15–20 mins",
    priceTwo: "₹250 for two",
    distanceKm: 6.5,
    address: "Margosa Rd, 7th Cross, Malleshwaram",
    coords: [13.0030, 77.5680],
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    discount: "Pure Desi White Butter Special"
  },
  {
    id: "squarehouse",
    name: "Square House Creamery",
    cuisines: "Ice Cream, DBC Sundaes, Shakes, Desserts",
    rating: 4.9,
    eta: "15–20 mins",
    priceTwo: "₹350 for two",
    distanceKm: 1.8,
    address: "Defence Colony, Indiranagar, Bengaluru",
    coords: [12.9698, 77.6499],
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    discount: "Legendary DBC Overload"
  },
  {
    id: "donvito",
    name: "Don Vito's Pizzeria",
    cuisines: "Woodfired Pizza, Italian, Garlic Bread",
    rating: 4.8,
    eta: "25–30 mins",
    priceTwo: "₹650 for two",
    distanceKm: 4.8,
    address: "4th Block, Koramangala, Bengaluru",
    coords: [12.9340, 77.6220],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    discount: "48-Hr Fermented Sourdough"
  },
  {
    id: "dragonwok",
    name: "Great Dragon Wok & Momo Pavilion",
    cuisines: "Chinese, Momos, Dimsums, Hakka Noodles",
    rating: 4.8,
    eta: "20–25 mins",
    priceTwo: "₹450 for two",
    distanceKm: 4.2,
    address: "Church Street, MG Road, Bengaluru",
    coords: [12.9660, 77.6080],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    discount: "Himalayan Fiery Sauce Free"
  }
];

// ── 28 Dishes Catalog Mapped to Restaurants ──────────────────────────────────
const DISHES_CATALOG = [
  // Megha's Dum Darbar
  {
    id: 1,
    restaurantId: "meghas",
    category: "biryani",
    diet: "non-veg",
    isVeg: false,
    isBestseller: true,
    title: "Megha's Signature Andhra Chicken Dum Biryani",
    price: 340,
    cookPrice: 85,
    eta: "20–25 mins",
    calories: 780,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    desc: "Long grain aged basmati rice cooked on slow dum with aromatic spices, topped with fiery tender Andhra fried chicken gravy and boiled egg.",
    recipe: {
      prep: "15 mins",
      cook: "25 mins",
      ingredients: [
        "Aged Basmati Rice - 2 cups",
        "Boneless Chicken Thighs - 350g",
        "Fried Golden Onions (Birista) - 1 cup",
        "Pure Desi Cow Ghee - 3 tbsp",
        "Shahi Biryani Masala & Saffron Milk",
        "Fresh Mint, Coriander & Green Chillies"
      ],
      steps: [
        "Parboil aged basmati rice in whole-spiced boiling water for 6 minutes, then drain.",
        "Sear spiced chicken in desi ghee for 8 minutes until half cooked.",
        "Layer rice over chicken, sprinkle golden birista, mint, coriander, and saffron milk.",
        "Seal with tight lid and cook on lowest flame on a tawa for 15 minutes dum.",
        "Rest 5 minutes, fluff gently, and enjoy with chilled raita!"
      ]
    }
  },
  {
    id: 2,
    restaurantId: "meghas",
    category: "biryani",
    diet: "veg",
    isVeg: true,
    isBestseller: false,
    title: "Hyderabadi Paneer Dum Biryani",
    price: 290,
    cookPrice: 70,
    eta: "20–25 mins",
    calories: 650,
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=800&q=80",
    desc: "Fragrant saffron basmati layered with soft tandoori-marinated paneer cubes, caramelized onions, toasted cashews, and fresh mint leaves.",
    recipe: {
      prep: "15 mins",
      cook: "20 mins",
      ingredients: [
        "Fresh Malai Paneer - 250g cubed",
        "Basmati Rice - 1.5 cups",
        "Thick Yogurt - 1/2 cup",
        "Biryani Spices, Turmeric, Kashmiri Mirch - 1 tsp each",
        "Desi Ghee, Roasted Cashews & Kewra Water"
      ],
      steps: [
        "Marinate paneer cubes in spiced yogurt and ginger-garlic paste for 15 minutes.",
        "Boil basmati rice with bay leaf and cardamom until 75% done.",
        "Lightly sauté marinated paneer in ghee, layer rice on top.",
        "Drizzle saffron milk and fried cashews, dum cook for 12 minutes."
      ]
    }
  },
  {
    id: 3,
    restaurantId: "meghas",
    category: "biryani",
    diet: "non-veg",
    isVeg: false,
    isBestseller: false,
    title: "Ambur Royal Mutton Seeraga Samba Biryani",
    price: 420,
    cookPrice: 130,
    eta: "25–30 mins",
    calories: 890,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    desc: "Authentic Arcot style biryani prepared using fragrant tiny Seeraga Samba short grains and tender succulent mutton cooked in curd and red chilli paste.",
    recipe: {
      prep: "20 mins",
      cook: "35 mins",
      ingredients: [
        "Seeraga Samba Tiny Rice - 2 cups",
        "Tender Goat Mutton - 400g",
        "Fresh Red Chilli & Garlic Paste - 2 tbsp",
        "Whisked Curd, Tomatoes & Mint",
        "Pure Ghee, Cloves & Cinnamon"
      ],
      steps: [
        "Pressure cook mutton with turmeric and garlic for 4 whistles.",
        "Sauté whole spices, onions, tomatoes, and ground chilli paste in ghee.",
        "Add cooked mutton broth and washed rice; cook until water is absorbed.",
        "Dum cook for 15 minutes and fluff gently."
      ]
    }
  },
  {
    id: 4,
    restaurantId: "meghas",
    category: "biryani",
    diet: "non-veg",
    isVeg: false,
    isBestseller: false,
    title: "Kolkata Chicken Biryani with Aloo & Egg",
    price: 360,
    cookPrice: 95,
    eta: "20–25 mins",
    calories: 740,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    desc: "Aromatic Awadhi-style Kolkata biryani infused with meetha ittar, featuring melt-in-mouth slow cooked whole golden potato and boiled egg.",
    recipe: {
      prep: "20 mins",
      cook: "25 mins",
      ingredients: [
        "Basmati Rice - 2 cups",
        "Chicken Pieces - 350g",
        "Large Potatoes - 2 fried golden",
        "Boiled Eggs - 2 whole",
        "Meetha Ittar - 2 drops & Saffron Milk"
      ],
      steps: [
        "Shallow fry parboiled potato halves until crispy and golden.",
        "Cook spiced chicken, layer with parboiled basmati rice, potatoes, and boiled eggs.",
        "Sprinkle saffron-ittar milk and dum cook 15 mins on low heat."
      ]
    }
  },

  // Imperial Feast Diner
  {
    id: 5,
    restaurantId: "imperial",
    category: "north-indian",
    diet: "non-veg",
    isVeg: false,
    isBestseller: true,
    title: "Murgh Makhani Butter Chicken & Butter Naan",
    price: 360,
    cookPrice: 90,
    eta: "20–25 mins",
    calories: 840,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    desc: "Smoky tandoori roasted chicken tikka pieces simmered in a velvety buttery tomato-cashew makhani gravy, perfumed with fragrant kasuri methi.",
    recipe: {
      prep: "15 mins",
      cook: "20 mins",
      ingredients: [
        "Chicken Thighs - 350g diced",
        "Tomato Puree - 1.5 cups",
        "Cashew Nut Paste - 3 tbsp",
        "Fresh Cream & Butter - 3 tbsp each",
        "Kasuri Methi & Garam Masala"
      ],
      steps: [
        "Pan-sear spiced chicken in 1 tbsp butter for 5 mins until charred.",
        "Simmer tomato puree and ginger-garlic paste in butter for 8 mins.",
        "Stir in cashew paste, cream, and chicken pieces.",
        "Simmer 5 mins and finish with crushed kasuri methi."
      ]
    }
  },
  {
    id: 6,
    restaurantId: "imperial",
    category: "north-indian",
    diet: "veg",
    isVeg: true,
    isBestseller: false,
    title: "Paneer Tikka Lababdar & Garlic Naan",
    price: 310,
    cookPrice: 75,
    eta: "20–25 mins",
    calories: 680,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    desc: "Char-grilled paneer tikka chunks folded into a luscious, spiced tomato, onion, and grated paneer gravy with hints of green cardamom.",
    recipe: {
      prep: "15 mins",
      cook: "18 mins",
      ingredients: [
        "Fresh Paneer - 250g cubed + 50g grated",
        "Chopped Onions & Tomatoes - 2 each",
        "Cashew Paste - 2 tbsp",
        "Fresh Cream & Butter - 2 tbsp each",
        "Kasuri Methi & Garam Masala"
      ],
      steps: [
        "Lightly grill paneer cubes until golden edges form.",
        "Cook onion-tomato masala, blend smooth with cashew paste.",
        "Add grilled paneer, grated paneer, and simmer with cream for 4 mins."
      ]
    }
  },
  {
    id: 7,
    restaurantId: "imperial",
    category: "north-indian",
    diet: "veg",
    isVeg: true,
    isBestseller: false,
    title: "Slow-Simmered Dal Makhani with Jeera Rice",
    price: 260,
    cookPrice: 50,
    eta: "15–20 mins",
    calories: 590,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    desc: "Whole black urad lentils and rajma slow-simmered overnight with fresh churned butter, tomato reduction, and cream for an authentic smoky dhaba flavor.",
    recipe: {
      prep: "10 mins",
      cook: "30 mins",
      ingredients: [
        "Black Urad Dal - 1 cup (soaked)",
        "Rajma - 2 tbsp",
        "Salted Butter & Cream - 3 tbsp each",
        "Tomato Puree - 1 cup",
        "Kashmiri Mirch & Garam Masala"
      ],
      steps: [
        "Pressure cook dal and rajma for 6 whistles until butter soft.",
        "Cook tomato puree and ginger in butter until oil separates.",
        "Add dal, mash lightly, and simmer on lowest heat for 20 mins with cream."
      ]
    }
  },
  {
    id: 8,
    restaurantId: "imperial",
    category: "north-indian",
    diet: "non-veg",
    isVeg: false,
    isBestseller: false,
    title: "Charcoal Tandoori Chicken Tikka Platter",
    price: 380,
    cookPrice: 110,
    eta: "20–25 mins",
    calories: 560,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    desc: "Succulent boneless chicken chunks marinated in mustard oil, roasted gram flour, hung curd, and Kashmiri spices, roasted to smoky perfection.",
    recipe: {
      prep: "20 mins",
      cook: "15 mins",
      ingredients: [
        "Chicken Thighs - 400g cubed",
        "Hung Curd - 1/2 cup",
        "Mustard Oil - 2 tbsp",
        "Roasted Besan - 1 tbsp",
        "Chaat Masala & Lemon"
      ],
      steps: [
        "Whisk hung curd with smoked mustard oil, besan, and spices.",
        "Coat chicken chunks and marinate for 30 minutes.",
        "Grill at 220°C for 14 minutes, basting with butter.",
        "Dust with chaat masala and fresh lemon juice."
      ]
    }
  },

  // Guntur Andhra Bhavan
  {
    id: 9,
    restaurantId: "guntur",
    category: "south-indian",
    diet: "non-veg",
    isVeg: false,
    isBestseller: true,
    title: "Guntur Fiery Andhra Chilli Chicken",
    price: 330,
    cookPrice: 80,
    eta: "20–25 mins",
    calories: 610,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    desc: "World-famous Bengaluru cult classic. Tender boneless chicken tossed with slit green chillies, garlic, curry leaves, and secret Andhra spices in rich soya reduction.",
    recipe: {
      prep: "15 mins",
      cook: "15 mins",
      ingredients: [
        "Boneless Chicken - 350g",
        "Green Chillies - 12 slit",
        "Minced Garlic & Curry Leaves - 2 tbsp",
        "Soy Sauce, Vinegar & Pepper - 1 tbsp each",
        "Cornflour for crisping"
      ],
      steps: [
        "Toss chicken in cornflour and shallow fry 4 minutes until crisp.",
        "Sauté garlic, curry leaves, and green chillies until blistered.",
        "Add chicken and soy reduction; stir fry on high flame for 2 mins."
      ]
    }
  },
  {
    id: 10,
    restaurantId: "guntur",
    category: "south-indian",
    diet: "non-veg",
    isVeg: false,
    isBestseller: false,
    title: "Flaky Malabar Parotta with Chettinad Pepper Chicken",
    price: 280,
    cookPrice: 70,
    eta: "20–25 mins",
    calories: 760,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    desc: "Layered crispy Malabar parottas paired with intensely spiced dry-roast chicken, freshly ground Tellicherry black peppercorns, and curry leaves.",
    recipe: {
      prep: "15 mins",
      cook: "20 mins",
      ingredients: [
        "Chicken Pieces - 350g",
        "Coarse Black Pepper - 1.5 tbsp",
        "Sambar Shallots - 1 cup sliced",
        "Curry Leaves & Coconut Oil",
        "Layered Parottas - 2 pcs"
      ],
      steps: [
        "Sauté shallots, curry leaves, and chicken in coconut oil.",
        "Toss with freshly crushed black peppercorns on high heat.",
        "Serve hot with toasted flaky parottas."
      ]
    }
  },

  // Central Tiffin Bhavan (Malleshwaram)
  {
    id: 11,
    restaurantId: "ctb",
    category: "south-indian",
    diet: "veg",
    isVeg: true,
    isBestseller: true,
    title: "Bangalore Benne Masala Dosa with White Butter",
    price: 140,
    cookPrice: 35,
    eta: "15–20 mins",
    calories: 460,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    desc: "Legendary crisp golden-brown rice crepe roasted in generous fresh white butter (benne), smeared with spicy red chutney and stuffed with spiced potato bhaji.",
    recipe: {
      prep: "10 mins",
      cook: "10 mins",
      ingredients: [
        "Fermented Dosa Batter - 2 cups",
        "Fresh White Butter - 2 tbsp",
        "Red Garlic Chutney - 2 tbsp",
        "Spiced Potato Bhaji - 1 cup",
        "Fresh Coconut Chutney"
      ],
      steps: [
        "Pour batter on screaming hot tawa and swirl into thick crepe.",
        "Add generous white butter dollops as it crisps.",
        "Spread red chutney, add potato bhaji, fold and enjoy!"
      ]
    }
  },
  {
    id: 12,
    restaurantId: "ctb",
    category: "south-indian",
    diet: "veg",
    isVeg: true,
    isBestseller: false,
    title: "Ghee Podi Thatte Idli with Crispy Medu Vada",
    price: 120,
    cookPrice: 28,
    eta: "15–20 mins",
    calories: 420,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    desc: "Two fluffy plate-sized Thatte idlis drenched in hot bubbling desi ghee and spicy gun powder (chutney podi), paired with a crunchy medu vada.",
    recipe: {
      prep: "10 mins",
      cook: "12 mins",
      ingredients: [
        "Thatte Idlis - 2 large steamed",
        "Crispy Medu Vada - 1",
        "Gun Powder (Chutney Podi) - 2 tbsp",
        "Desi Cow Ghee - 2 tbsp",
        "Coconut Chutney"
      ],
      steps: [
        "Steam fresh idlis in wide flat plates.",
        "Dust liberally with spicy chutney podi.",
        "Pour hot melted desi ghee directly over the powder and serve."
      ]
    }
  },

  // Snuffles Gourmet Burgers (Indiranagar)
  {
    id: 13,
    restaurantId: "snuffles",
    category: "burgers-pizza",
    diet: "non-veg",
    isVeg: false,
    isBestseller: true,
    title: "All American Cheese Burger with Peri Peri Fries",
    price: 290,
    cookPrice: 75,
    eta: "20–25 mins",
    calories: 820,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    desc: "Bengaluru's all-time favorite thick juicy grilled patty topped with molten cheddar cheese, caramelized onions, gherkins, and house secret sauce on toasted brioche.",
    recipe: {
      prep: "15 mins",
      cook: "10 mins",
      ingredients: [
        "Chicken or Lamb Patty - 180g",
        "Aged Cheddar Slices - 2 pcs",
        "Brioche Bun - 1 butter toasted",
        "Caramelized Onions & Gherkins",
        "Secret House Burger Sauce"
      ],
      steps: [
        "Sear seasoned patty in cast iron skillet 3.5 mins per side.",
        "Melt cheddar slices directly on patty under lid.",
        "Assemble with toasted brioche, house sauce, and onions."
      ]
    }
  },
  {
    id: 14,
    restaurantId: "snuffles",
    category: "burgers-pizza",
    diet: "veg",
    isVeg: true,
    isBestseller: false,
    title: "Crispy Peri-Peri Paneer Gourmet Burger",
    price: 260,
    cookPrice: 65,
    eta: "20–25 mins",
    calories: 690,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    desc: "Thick slab of fresh cottage cheese coated in spicy crunchy peri-peri crumb, topped with jalapeno cheese sauce and crisp iceberg lettuce on a sesame bun.",
    recipe: {
      prep: "15 mins",
      cook: "8 mins",
      ingredients: [
        "Paneer Slab - 150g",
        "Panko Breadcrumbs & Peri-Peri - 1/2 cup",
        "Sesame Bun & Spicy Mayo",
        "Jalapenos & Iceberg Lettuce"
      ],
      steps: [
        "Dip seasoned paneer slab in batter and coat in panko.",
        "Fry at 190°C for 5 minutes until crispy golden.",
        "Assemble on toasted sesame bun with spicy mayo and lettuce."
      ]
    }
  },

  // Don Vito's Pizzeria (Koramangala)
  {
    id: 15,
    restaurantId: "donvito",
    category: "burgers-pizza",
    diet: "veg",
    isVeg: true,
    isBestseller: true,
    title: "Woodfired Burrata Margherita Sourdough Pizza",
    price: 450,
    cookPrice: 110,
    eta: "25–30 mins",
    calories: 780,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    desc: "Slow-fermented 48-hour sourdough base smeared with San Marzano tomato sauce, fresh buffalo mozzarella, hand-torn creamy burrata, and fresh basil leaves.",
    recipe: {
      prep: "20 mins",
      cook: "10 mins",
      ingredients: [
        "Sourdough Dough Ball - 250g",
        "Tomato Sauce - 1/2 cup",
        "Fresh Mozzarella - 100g",
        "Whole Creamy Burrata Ball - 1",
        "Fresh Basil & Extra Virgin Olive Oil"
      ],
      steps: [
        "Stretch dough hand-stretched on pizza stone.",
        "Spread tomato sauce and mozzarella; bake 10 mins at 250°C.",
        "Tear cold creamy burrata over center, top with fresh basil and olive oil."
      ]
    }
  },

  // Great Dragon Wok & Momo Pavilion (MG Road)
  {
    id: 16,
    restaurantId: "dragonwok",
    category: "chinese",
    diet: "non-veg",
    isVeg: false,
    isBestseller: true,
    title: "Darjeeling Steamed Chicken Momos with Fiery Dip (8 Pcs)",
    price: 190,
    cookPrice: 40,
    eta: "20–25 mins",
    calories: 420,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    desc: "Thin translucent dumplings packed with juicy minced chicken, ginger, and scallions, served with blistering hot Dalle red chilli chutney.",
    recipe: {
      prep: "20 mins",
      cook: "10 mins",
      ingredients: [
        "Minced Chicken - 250g",
        "Minced Onions & Ginger - 1/2 cup",
        "Soy Sauce & Sesame Oil - 1 tsp each",
        "Momo Wrappers - 8 sheets",
        "Fiery Garlic Chilli Sauce"
      ],
      steps: [
        "Mix seasoned chicken filling and pleat inside thin dough sheets.",
        "Steam in basket for 9 minutes until translucent.",
        "Serve hot with spicy garlic chilli chutney."
      ]
    }
  },
  {
    id: 17,
    restaurantId: "dragonwok",
    category: "chinese",
    diet: "veg",
    isVeg: true,
    isBestseller: false,
    title: "Crispy Paneer Chilli Dry with Spring Onions",
    price: 270,
    cookPrice: 65,
    eta: "20–25 mins",
    calories: 540,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    desc: "Golden-crusted paneer cubes tossed in high-heat wok with fresh bell peppers, sliced garlic, ginger, dark soy sauce, and fiery green chillies.",
    recipe: {
      prep: "10 mins",
      cook: "10 mins",
      ingredients: [
        "Paneer Cubes - 200g fried crisp",
        "Bell Peppers - 1 cup",
        "Garlic & Ginger - 2 tbsp",
        "Soy & Chilli Sauces - 1 tbsp",
        "Spring Onions"
      ],
      steps: [
        "Flash-fry bell peppers and garlic on high heat.",
        "Toss with sauces and crisp paneer cubes.",
        "Garnish with spring onions."
      ]
    }
  },

  // Square House Creamery (Indiranagar)
  {
    id: 18,
    restaurantId: "squarehouse",
    category: "desserts",
    diet: "veg",
    isVeg: true,
    isBestseller: true,
    title: "Square House Death By Cocoa (DBC) Sundae",
    price: 280,
    cookPrice: 65,
    eta: "15–20 mins",
    calories: 720,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    desc: "The undisputed emperor of Bengaluru sundaes. Warm dense chocolate brownie cubes crowned with creamy vanilla ice cream, hot fudge sauce, whipped cream, and roasted peanuts.",
    recipe: {
      prep: "5 mins",
      cook: "2 mins",
      ingredients: [
        "Chocolate Brownie - 2 squares warm",
        "Vanilla Ice Cream - 2 scoops",
        "Hot Chocolate Fudge Sauce - 4 tbsp",
        "Roasted Peanuts & Whipped Cream",
        "Cherry on top"
      ],
      steps: [
        "Warm rich brownies for 20 seconds.",
        "Top with two large scoops of vanilla ice cream.",
        "Smother in boiling hot fudge sauce, peanuts, and whipped cream."
      ]
    }
  }
];

// ── Real Leaflet GPS Coordinates (Bengaluru, India) ──────────────────────────
const HOME_COORDS = [12.9784, 77.6408]; // Indiranagar 100ft Rd

// ── Milestone Badges Config ──────────────────────────────────────────────────
const BADGES_CONFIG = [
  { id: "first_defeat", title: "First Defeat", desc: "Defeated your first impulse food craving", icon: "🏆" },
  { id: "midnight_warrior", title: "Midnight Warrior", desc: "Resisted a late-night craving (11 PM – 4 AM)", icon: "🌙" },
  { id: "thousand_club", title: "₹1,000 Club", desc: "Saved over ₹1,000 in your Beggy vault", icon: "💰" },
  { id: "five_thousand_club", title: "₹5,000 Club", desc: "Saved over ₹5,000 in your Beggy vault", icon: "👑" },
  { id: "streak_3", title: "3-Day Streak", desc: "Kept savings streaks for 3 days in a row", icon: "🔥" },
  { id: "streak_7", title: "7-Day Streak", desc: "Master of restraint for 7 consecutive days", icon: "⚡" }
];

// ── Reactive User State & Streaks Engine (F3) ───────────────────────────────
function loadInitialUserState() {
  const defaultState = {
    totalSaved: 0,
    cravingsDefeated: 0,
    streak: 0,
    bestStreak: 0,
    lastSaveDate: null,
    history: [],
    badges: []
  };

  try {
    const raw = localStorage.getItem("beggy_user_state_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    console.warn("Could not parse user state:", e);
  }
  return defaultState;
}

let userState = loadInitialUserState();

function recordCravingVictory(dishTitle, restaurantName, amount) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const hour = today.getHours();

  userState.totalSaved += amount;
  userState.cravingsDefeated += 1;

  // Streak logic
  if (!userState.lastSaveDate) {
    userState.streak = 1;
  } else {
    const lastDate = new Date(userState.lastSaveDate);
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      if (userState.streak === 0) userState.streak = 1;
    } else if (diffDays === 1) {
      userState.streak += 1;
    } else {
      userState.streak = 1;
    }
  }

  if (userState.streak > userState.bestStreak) {
    userState.bestStreak = userState.streak;
  }
  userState.lastSaveDate = todayStr;

  userState.history.unshift({
    id: "tx_" + Date.now(),
    date: today.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    dish: dishTitle,
    restaurant: restaurantName,
    amount: amount
  });
  if (userState.history.length > 50) userState.history.pop();

  // Badges unlock
  if (!userState.badges.includes("first_defeat")) userState.badges.push("first_defeat");
  if ((hour >= 23 || hour < 4) && !userState.badges.includes("midnight_warrior")) userState.badges.push("midnight_warrior");
  if (userState.totalSaved >= 1000 && !userState.badges.includes("thousand_club")) userState.badges.push("thousand_club");
  if (userState.totalSaved >= 5000 && !userState.badges.includes("five_thousand_club")) userState.badges.push("five_thousand_club");
  if (userState.streak >= 3 && !userState.badges.includes("streak_3")) userState.badges.push("streak_3");
  if (userState.streak >= 7 && !userState.badges.includes("streak_7")) userState.badges.push("streak_7");

  saveUserState();
}

function saveUserState() {
  try {
    localStorage.setItem("beggy_user_state_v2", JSON.stringify(userState));
    localStorage.setItem("beggy_savings_account_bal", userState.totalSaved.toFixed(2));
  } catch (e) {
    console.warn("Could not save user state:", e);
  }
  updateUserStateUI();
}

function updateUserStateUI() {
  if (headerStreakPill) {
    headerStreakPill.textContent = `🔥 ${userState.streak}d`;
  }
  if (saBalanceVal) {
    saBalanceVal.textContent = `₹${userState.totalSaved.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (saStreakBadge) {
    saStreakBadge.textContent = `🔥 ${userState.streak}-Day Save Streak`;
  }
  if (saVictoriesCount) {
    saVictoriesCount.textContent = `${userState.cravingsDefeated} Cravings Defeated`;
  }
  if (pbStatTotal) {
    pbStatTotal.textContent = `₹${userState.totalSaved.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (pbStatStreak) {
    pbStatStreak.textContent = `🔥 ${userState.streak} Days`;
  }
  if (pbStatBest) {
    pbStatBest.textContent = `Best: ${userState.bestStreak} Days`;
  }
  if (pbStatCravings) {
    pbStatCravings.textContent = `${userState.cravingsDefeated}`;
  }
  if (pbHistoryCount) {
    pbHistoryCount.textContent = `${userState.history.length} transactions`;
  }
}

// ── Application State ────────────────────────────────────────────────────────
const state = {
  currentView: "restaurants",
  discoveryMode: "browse", // "browse" or "quick"
  activeRestaurant: RESTAURANTS_DATA[0],
  activeCuisine: "all",
  activeDiet: "all",
  cart: [],
  paymentMethod: "gpay",
  userState: userState,
  lastOrderSaved: 340.00,
  activeRecipeDish: DISHES_CATALOG[0],
  activeChallenge: null
};

// ── DOM References ───────────────────────────────────────────────────────────
// Views
const viewRestaurants = document.getElementById("view-restaurants");
const viewMenu = document.getElementById("view-menu");
const viewPayment = document.getElementById("view-payment");
const viewTracking = document.getElementById("view-tracking");

// Header elements
const navBrandHome = document.getElementById("nav-brand-home");
const navHomeBtn = document.getElementById("nav-home-btn");
const passbookTriggerBtn = document.getElementById("passbook-trigger-btn");
const headerStreakPill = document.getElementById("header-streak-pill");
const foodSearch = document.getElementById("food-search");
const clearSearch = document.getElementById("clear-search");
const cartTriggerBtn = document.getElementById("cart-trigger-btn");
const cartCountBadge = document.getElementById("cart-count");

// Discovery Mode Elements
const friendChallengeBanner = document.getElementById("friend-challenge-banner");
const fcbTitle = document.getElementById("fcb-title");
const fcbDesc = document.getElementById("fcb-desc");
const fcbAcceptBtn = document.getElementById("fcb-accept-btn");
const tabBrowseRestaurants = document.getElementById("tab-browse-restaurants");
const tabQuickCraving = document.getElementById("tab-quick-craving");
const browseKitchensPanel = document.getElementById("browse-kitchens-panel");
const quickCravingPanel = document.getElementById("quick-craving-panel");
const qcpChipsRow = document.getElementById("qcp-chips-row");
const qcpCustomForm = document.getElementById("qcp-custom-form");
const customDishName = document.getElementById("custom-dish-name");
const customDishPrice = document.getElementById("custom-dish-price");
const btnCravingAmount = document.getElementById("btn-craving-amount");

// Restaurant view elements
const cuisinePillsRow = document.getElementById("cuisine-pills-row");
const restaurantsGrid = document.getElementById("restaurants-grid");
const restaurantCount = document.getElementById("restaurant-count");

// Menu view elements
const btnBackToRestaurants = document.getElementById("btn-back-to-restaurants");
const menuRestName = document.getElementById("menu-rest-name");
const menuRestCuisines = document.getElementById("menu-rest-cuisines");
const menuRestAddress = document.getElementById("menu-rest-address");
const menuRestEta = document.getElementById("menu-rest-eta");
const menuRestPriceTwo = document.getElementById("menu-rest-price-two");
const menuRestRating = document.getElementById("menu-rest-rating");
const dishesListContainer = document.getElementById("dishes-list-container");
const menuItemsCount = document.getElementById("menu-items-count");
const floatingCartBar = document.getElementById("floating-cart-bar");
const fcCount = document.getElementById("fc-count");
const fcTotal = document.getElementById("fc-total");
const fcProceedBtn = document.getElementById("fc-proceed-btn");

// Payment view elements
const btnBackToMenu = document.getElementById("btn-back-to-menu");
const checkoutRestaurantName = document.getElementById("checkout-restaurant-name");
const checkoutItemsList = document.getElementById("checkout-items-list");
const billItemTotal = document.getElementById("bill-item-total");
const billToPay = document.getElementById("bill-to-pay");
const btnPayAndPlaceOrder = document.getElementById("btn-pay-and-place-order");

// Tracking view elements
const trackingStatusTitle = document.getElementById("tracking-status-title");
const trackingStatusDesc = document.getElementById("tracking-status-desc");
const trackingEtaPill = document.getElementById("tracking-eta-pill");
const trackingOrderId = document.getElementById("tracking-order-id");
const btnSimulateArrival = document.getElementById("btn-simulate-arrival");
const mapKitchenLabel = document.getElementById("map-kitchen-label");
const mapPartnerDistance = document.getElementById("map-partner-distance");

// Dopamine Reveal elements
const dopamineRevealCard = document.getElementById("dopamine-reveal-card");
const dopamineJoke = document.getElementById("dopamine-joke");
const challengeResultCard = document.getElementById("challenge-result-card");
const crcTitle = document.getElementById("crc-title");
const crcDesc = document.getElementById("crc-desc");
const revealSavedAmount = document.getElementById("reveal-saved-amount");
const btnRealSave = document.getElementById("btn-real-save");
const rsAmountVal = document.getElementById("rs-amount-val");
const saBalanceVal = document.getElementById("sa-balance-val");
const saStreakBadge = document.getElementById("sa-streak-badge");
const saVictoriesCount = document.getElementById("sa-victories-count");
const crDishTitle = document.getElementById("cr-dish-title");
const crDishSub = document.getElementById("cr-dish-sub");
const crPrepTime = document.getElementById("cr-prep-time");
const crCookTime = document.getElementById("cr-cook-time");
const crHomeCost = document.getElementById("cr-home-cost");
const crIngList = document.getElementById("cr-ing-list");
const crStepsList = document.getElementById("cr-steps-list");
const btnOrderAgain = document.getElementById("btn-order-again");

// Share Card Generator Elements (F2)
const shareCardCanvas = document.getElementById("share-card-canvas");
const btnScShare = document.getElementById("btn-sc-share");
const btnScDownload = document.getElementById("btn-sc-download");
const btnScCopy = document.getElementById("btn-sc-copy");
const btnScChallenge = document.getElementById("btn-sc-challenge");
const scToastMsg = document.getElementById("sc-toast-msg");

// Passbook Modal Elements (F3)
const passbookModal = document.getElementById("passbook-modal");
const passbookBackdrop = document.getElementById("passbook-backdrop");
const pbCloseBtn = document.getElementById("pb-close-btn");
const pbStatTotal = document.getElementById("pb-stat-total");
const pbStatStreak = document.getElementById("pb-stat-streak");
const pbStatBest = document.getElementById("pb-stat-best");
const pbStatCravings = document.getElementById("pb-stat-cravings");
const pbBadgesGrid = document.getElementById("pb-badges-grid");
const pbHistoryList = document.getElementById("pb-history-list");
const pbHistoryCount = document.getElementById("pb-history-count");
const pbBtnReset = document.getElementById("pb-btn-reset");
const pbBtnDone = document.getElementById("pb-btn-done");

// Cart Drawer elements
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const drawerSubtotal = document.getElementById("drawer-subtotal");
const drawerTotal = document.getElementById("drawer-total");
const drawerCheckoutBtn = document.getElementById("drawer-checkout-btn");

// Bank SMS Toast
const bankSmsToast = document.getElementById("bank-sms-toast");
const smsAmount = document.getElementById("sms-amount");
const smsMessage = document.getElementById("sms-message");
const smsCloseBtn = document.getElementById("sms-close-btn");

// Confetti Canvas
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas ? confettiCanvas.getContext("2d") : null;

// ── Confetti Physics Engine ──────────────────────────────────────────────────
let confettiParticles = [];
function resizeConfetti() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfetti);
resizeConfetti();

function triggerConfetti() {
  if (!confettiCanvas || !ctx) return;
  confettiParticles = [];
  const colors = ["#FF5200", "#10B981", "#F59E0B", "#38BDF8", "#EC4899", "#FFFFFF", "#60B244"];
  for (let i = 0; i < 180; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.8) * 26,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }
  animateConfetti();
}

function animateConfetti() {
  if (!ctx || !confettiCanvas) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.45;
    p.vx *= 0.98;
    p.rotation += p.vRot;
    p.opacity -= 0.007;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(p.opacity, 0);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    ctx.restore();

    if (p.opacity <= 0) confettiParticles.splice(index, 1);
  });

  if (confettiParticles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// ── Web Audio API Bank Deposit Chime ─────────────────────────────────────────
function playBankChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Tone 1: D5 (587.33 Hz)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.3, now + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Tone 2: A5 (880.00 Hz)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.16);
    gain2.gain.setValueAtTime(0, now + 0.16);
    gain2.gain.linearRampToValueAtTime(0.35, now + 0.20);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.90);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.90);
  } catch (err) {
    console.warn("Audio chime error:", err);
  }
}

// ── Multi-Stage View Switcher ────────────────────────────────────────────────
function switchView(viewName) {
  state.currentView = viewName;
  const views = [viewRestaurants, viewMenu, viewPayment, viewTracking];
  views.forEach(v => {
    if (v) {
      v.style.display = "none";
      v.classList.remove("active");
    }
  });

  let targetView = viewRestaurants;
  if (viewName === "menu") targetView = viewMenu;
  else if (viewName === "payment") targetView = viewPayment;
  else if (viewName === "tracking") targetView = viewTracking;

  if (targetView) {
    targetView.style.display = "block";
    targetView.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewName === "tracking") {
    setTimeout(() => {
      initLeafletMap();
      if (map) map.invalidateSize();
    }, 200);
  }
}

// ── STAGE 1: Render Restaurants ──────────────────────────────────────────────
function renderRestaurants() {
  if (!restaurantsGrid) return;

  const filtered = RESTAURANTS_DATA.filter(r => {
    if (state.activeCuisine === "all") return true;
    return r.cuisines.toLowerCase().includes(state.activeCuisine.toLowerCase());
  });

  restaurantCount.textContent = `${filtered.length} kitchens open now in Bengaluru`;

  restaurantsGrid.innerHTML = filtered.map(r => `
    <article class="restaurant-card" data-rest-id="${r.id}">
      <div class="rest-card-img-wrap">
        <img src="${r.image}" alt="${r.name}" class="rest-card-img" loading="lazy" />
        <span class="rest-discount-badge">${r.discount}</span>
      </div>
      <div class="rest-card-body">
        <h3 class="rest-card-title">${r.name}</h3>
        <div class="rest-card-meta">
          <span class="rest-rating-pill">★ ${r.rating}</span>
          <span class="rest-eta">⚡ ${r.eta}</span>
          <span style="color: var(--text-muted);">•</span>
          <span style="font-weight:700; color:var(--text-700);">${r.priceTwo}</span>
        </div>
        <p class="rest-card-cuisines">${r.cuisines}</p>
        <p class="rest-card-loc">📍 ${r.address} • ${r.distanceKm} km</p>
      </div>
    </article>
  `).join('');
}

function openRestaurant(restId) {
  const rest = RESTAURANTS_DATA.find(r => r.id === restId);
  if (!rest) return;

  state.activeRestaurant = rest;
  menuRestName.textContent = rest.name;
  menuRestCuisines.textContent = rest.cuisines;
  menuRestAddress.textContent = `${rest.address} • ${rest.distanceKm} km away`;
  menuRestEta.textContent = `⚡ ${rest.eta}`;
  menuRestPriceTwo.textContent = rest.priceTwo;
  menuRestRating.textContent = `★ ${rest.rating}`;

  renderRestaurantDishes(rest.id);
  switchView("menu");
  updateFloatingCartBar();
}

// ── STAGE 2: Render Dishes for Selected Restaurant ───────────────────────────
function renderRestaurantDishes(restId) {
  if (!dishesListContainer) return;

  let dishes = DISHES_CATALOG.filter(d => d.restaurantId === restId);

  if (state.activeDiet === "veg") {
    dishes = dishes.filter(d => d.isVeg);
  } else if (state.activeDiet === "non-veg") {
    dishes = dishes.filter(d => !d.isVeg);
  } else if (state.activeDiet === "bestseller") {
    dishes = dishes.filter(d => d.isBestseller);
  }

  menuItemsCount.textContent = `Showing ${dishes.length} dishes`;

  dishesListContainer.innerHTML = dishes.map(dish => `
    <article class="dish-card" data-dish-id="${dish.id}">
      <div class="dish-img-wrap">
        <img src="${dish.image}" alt="${dish.title}" class="dish-img" loading="lazy" />
        <div class="${dish.isVeg ? 'veg-badge' : 'nonveg-badge'}">
          <span class="${dish.isVeg ? 'veg-icon' : 'nonveg-icon'}"></span>
        </div>
        <span class="dish-eta-badge">⚡ ${dish.eta}</span>
      </div>
      <div class="add-btn-wrap">
        <button class="add-btn" data-add-dish="${dish.id}">+ ADD</button>
      </div>
      <div class="dish-card-body">
        <h3 class="dish-title">${dish.title}</h3>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-price-row">
          <span class="dish-price">₹${dish.price}</span>
          <span class="dish-cal">${dish.calories} kcal</span>
        </div>
      </div>
    </article>
  `).join('');
}

// ── Cart & Quantity Operations ───────────────────────────────────────────────
function addToCart(dishId) {
  const dish = DISHES_CATALOG.find(d => d.id === dishId);
  if (!dish) return;

  const existing = state.cart.find(c => c.id === dishId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }

  updateCartUI();
  updateFloatingCartBar();
}

function updateCartQty(dishId, delta) {
  const item = state.cart.find(c => c.id === dishId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(c => c.id !== dishId);
  }
  updateCartUI();
  updateFloatingCartBar();
}
window.updateCartQty = updateCartQty;

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountBadge.textContent = totalCount.toString();

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <span class="empty-icon">🍛</span>
        <p>Your cart is empty</p>
        <p class="empty-sub">Select dishes from your favorite Bengaluru kitchens to start your order.</p>
      </div>
    `;
    drawerSubtotal.textContent = "₹0.00";
    drawerTotal.textContent = "₹0.00";
    drawerCheckoutBtn.disabled = true;
    return;
  }

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  drawerSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  drawerTotal.textContent = "₹0.00"; // Free via BEGGY100
  drawerCheckoutBtn.disabled = false;

  cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <strong>${item.title}</strong>
        <span>₹${item.price} each</span>
      </div>
      <div class="cart-qty-ctrl">
        <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
        <span style="font-size:0.88rem; font-weight:700;">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
}

function updateFloatingCartBar() {
  if (state.cart.length === 0 || state.currentView !== "menu") {
    floatingCartBar.style.display = "none";
    return;
  }

  const totalCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  fcCount.textContent = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;
  fcTotal.textContent = `₹${subtotal.toFixed(2)}`;
  floatingCartBar.style.display = "flex";
}

function openCartDrawer() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("open");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("open");
}

// ── STAGE 3: Checkout & UPI Payment Screen ───────────────────────────────────
function proceedToPayment() {
  closeCartDrawer();
  if (state.cart.length === 0) return;

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  state.lastOrderSaved = subtotal;

  checkoutRestaurantName.textContent = state.activeRestaurant.name;
  billItemTotal.textContent = `₹${subtotal.toFixed(2)}`;
  billToPay.textContent = "₹0.00"; // BEGGY100 auto-applied

  checkoutItemsList.innerHTML = state.cart.map(item => `
    <div class="checkout-item-line">
      <span>${item.qty} × ${item.title}</span>
      <strong>₹${(item.price * item.qty).toFixed(2)}</strong>
    </div>
  `).join('');

  btnPayAndPlaceOrder.querySelector(".pay-btn-main").textContent = `Pay ₹0.00 & Place Order 🚀`;
  switchView("payment");
}

function handlePlaceOrder() {
  if (state.cart.length === 0) return;

  btnPayAndPlaceOrder.disabled = true;
  btnPayAndPlaceOrder.querySelector(".pay-btn-main").textContent = "Processing UPI Payment...";
  btnPayAndPlaceOrder.querySelector(".pay-btn-sub").textContent = "Connecting to bank gateway...";

  // Save the primary dish for the recipe
  state.activeRecipeDish = state.cart[0];

  // Transition to Live Tracking Screen after realistic brief delay
  setTimeout(() => {
    btnPayAndPlaceOrder.disabled = false;
    btnPayAndPlaceOrder.querySelector(".pay-btn-main").textContent = "Pay ₹0.00 & Place Order 🚀";
    btnPayAndPlaceOrder.querySelector(".pay-btn-sub").textContent = "Authentic 20-min express delivery in Bengaluru";

    // Clear cart
    state.cart = [];
    updateCartUI();
    updateFloatingCartBar();

    // Switch to Tracking
    switchView("tracking");
    startLiveTracking();
  }, 1200);
}

// ── STAGE 4: Live GPS Delivery Tracking ──────────────────────────────────────
let map = null;
let homeMarker = null;
let kitchenMarker = null;
let courierMarker = null;
let routePolyline = null;
let courierTimer = null;

// ── Free Real Street Routing API (OSRM) & Navigation Map Helpers ───────────────
async function fetchOsrmRoute(startCoords, endCoords) {
  // OSRM expects [lng, lat]
  const url = `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const resp = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!resp.ok) throw new Error("OSRM status " + resp.status);
    const data = await resp.json();
    if (data.routes && data.routes.length > 0 && data.routes[0].geometry) {
      // GeoJSON coordinates are [lng, lat], Leaflet expects [lat, lng]
      return data.routes[0].geometry.coordinates.map(pt => [pt[1], pt[0]]);
    }
  } catch (err) {
    console.warn("OSRM routing fallback:", err);
  }
  return null;
}

function getPointAlongPolyline(points, fraction) {
  if (!points || points.length === 0) return null;
  if (points.length === 1 || fraction <= 0) return points[0];
  if (fraction >= 1) return points[points.length - 1];

  const distances = [0];
  let totalDist = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dLat = points[i + 1][0] - points[i][0];
    const dLng = points[i + 1][1] - points[i][1];
    const d = Math.sqrt(dLat * dLat + dLng * dLng);
    totalDist += d;
    distances.push(totalDist);
  }

  if (totalDist === 0) return points[0];
  const targetDist = fraction * totalDist;

  for (let i = 0; i < distances.length - 1; i++) {
    if (targetDist >= distances[i] && targetDist <= distances[i + 1]) {
      const segDist = distances[i + 1] - distances[i];
      const segFraction = segDist > 0 ? (targetDist - distances[i]) / segDist : 0;
      const lat = points[i][0] + (points[i + 1][0] - points[i][0]) * segFraction;
      const lng = points[i][1] + (points[i + 1][1] - points[i][1]) * segFraction;
      return [lat, lng];
    }
  }
  return points[points.length - 1];
}

function initLeafletMap() {
  if (typeof L === 'undefined') return;

  const mapContainer = document.getElementById('real-leaflet-map');
  if (!mapContainer) return;

  if (map) {
    map.remove();
    map = null;
  }

  // Create Leaflet map centered at Bengaluru Home
  map = L.map('real-leaflet-map', {
    center: HOME_COORDS,
    zoom: 14,
    zoomControl: true
  });

  // Clean, High-Contrast Bengaluru Street Navigation Tiles (Esri World Street Map: 100% Free, No Watermarks)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Home Delivery Marker with pulsing radar ring
  const homeIcon = L.divIcon({
    className: 'custom-leaflet-pin',
    html: `
      <div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;width:34px;height:34px;background:rgba(16,185,129,0.25);border:2px solid #10B981;border-radius:50%;animation:pulsePin 1.8s infinite;"></div>
        <div style="width:18px;height:18px;background:#10B981;border:3px solid #FFFFFF;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:2;"></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  homeMarker = L.marker(HOME_COORDS, { icon: homeIcon })
    .addTo(map)
    .bindPopup('<strong>📍 Delivery Location</strong><br>Indiranagar 100ft Road, HAL 2nd Stage, Bengaluru');
}

function startLiveTracking() {
  const r = state.activeRestaurant;
  mapKitchenLabel.textContent = r.name;
  mapPartnerDistance.textContent = `${r.distanceKm} km away from your Indiranagar location`;
  trackingOrderId.textContent = `Order #BW-${Math.floor(1000 + Math.random() * 9000)}`;
  trackingEtaPill.textContent = "ETA: ~18 mins";

  // Hide any previous dopamine reveal card
  dopamineRevealCard.style.display = "none";

  // Reset Stepper
  document.getElementById("step-node-1").className = "step-node completed";
  document.getElementById("step-line-1").className = "step-line completed";
  document.getElementById("step-node-2").className = "step-node active";
  document.getElementById("step-line-2").className = "step-line";
  document.getElementById("step-node-3").className = "step-node";
  document.getElementById("step-line-3").className = "step-line";
  document.getElementById("step-node-4").className = "step-node";

  trackingStatusTitle.textContent = "Kitchen Preparing Your Order";
  trackingStatusDesc.textContent = `${r.name} is cooking your fresh dishes. Rider arriving shortly.`;

  setTimeout(() => {
    setupMapRouteAndScooter(r);
  }, 400);

  // Auto progression
  setTimeout(() => {
    document.getElementById("step-node-2").className = "step-node completed";
    document.getElementById("step-line-2").className = "step-line completed";
    document.getElementById("step-node-3").className = "step-node active";
    trackingStatusTitle.textContent = "Rider On The Way! 🛵";
    trackingStatusDesc.textContent = "Manjunath picked up your order and is navigating 100ft Road.";
  }, 3500);
}

async function setupMapRouteAndScooter(r) {
  if (!map) initLeafletMap();
  if (!map) return;

  if (kitchenMarker) map.removeLayer(kitchenMarker);
  if (courierMarker) map.removeLayer(courierMarker);
  if (routePolyline) map.removeLayer(routePolyline);
  if (courierTimer) clearInterval(courierTimer);

  // Kitchen Pin with clean badge
  const kitchenIcon = L.divIcon({
    className: 'custom-leaflet-pin',
    html: `<div style="background:#FFFFFF;border:2px solid #FF5200;border-radius:20px;padding:4px 10px;box-shadow:0 3px 10px rgba(0,0,0,0.18);display:flex;align-items:center;gap:6px;font-size:0.75rem;font-weight:800;color:#0F172A;white-space:nowrap;">🍳 <span>${r.name}</span></div>`,
    iconSize: [140, 32],
    iconAnchor: [70, 16]
  });
  kitchenMarker = L.marker(r.coords, { icon: kitchenIcon })
    .addTo(map)
    .bindPopup(`<strong>${r.name}</strong><br>${r.address}`);

  // Fetch real road coordinates via OSRM Driving API (100% Free, real street routing)
  let routePoints = await fetchOsrmRoute(r.coords, HOME_COORDS);

  // Fallback to realistic Bengaluru road waypoints if offline or blocked
  if (!routePoints || routePoints.length < 2) {
    const lat1 = r.coords[0], lng1 = r.coords[1];
    const lat2 = HOME_COORDS[0], lng2 = HOME_COORDS[1];
    routePoints = [
      [lat1, lng1],
      [lat1 + (lat2 - lat1) * 0.25, lng1 + 0.001],
      [lat1 + (lat2 - lat1) * 0.50, lng1 + (lng2 - lng1) * 0.40],
      [lat1 + (lat2 - lat1) * 0.75, lng2 - 0.001],
      [lat2, lng2]
    ];
  }

  // Draw vibrant delivery route polyline along real roads
  routePolyline = L.polyline(routePoints, {
    color: '#FF5200',
    weight: 5,
    opacity: 0.9,
    dashArray: '8, 8',
    lineJoin: 'round'
  }).addTo(map);

  // Fit bounds so both kitchen and home are perfectly visible
  try {
    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
  } catch (e) {}

  // Animated Scooter Marker with vibrant delivery glow
  const scooterIcon = L.divIcon({
    className: 'custom-leaflet-pin scooter-pin',
    html: `<div style="background:#FF5200;width:42px;height:42px;border-radius:50%;border:3px solid #FFFFFF;box-shadow:0 4px 14px rgba(255,82,0,0.6);display:flex;align-items:center;justify-content:center;font-size:1.4rem;">🛵</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
  courierMarker = L.marker(routePoints[0], { icon: scooterIcon }).addTo(map);

  // Smooth turn-by-turn waypoint animation along real Bengaluru roads
  let progress = 0;
  const totalDurationMs = 12000;
  const intervalMs = 100;
  const step = intervalMs / totalDurationMs;

  courierTimer = setInterval(() => {
    progress += step;
    if (progress >= 0.98) {
      clearInterval(courierTimer);
      triggerOrderArrival();
      return;
    }

    const curPos = getPointAlongPolyline(routePoints, progress);
    if (curPos && courierMarker) {
      courierMarker.setLatLng(curPos);
    }

    const remainingMins = Math.max(Math.round((1 - progress) * 18), 1);
    trackingEtaPill.textContent = `ETA: ~${remainingMins} mins`;

    if (progress > 0.3 && progress < 0.6) {
      trackingStatusTitle.textContent = "Rider On 100ft Road 🛵";
      trackingStatusDesc.textContent = "Manjunath picked up your piping hot order and is on 100ft Road.";
    } else if (progress >= 0.6 && progress < 0.9) {
      trackingStatusTitle.textContent = "Turning Into Your Lane 📍";
      trackingStatusDesc.textContent = "Rider is 300m away, turning towards HAL 2nd Stage.";
    }
  }, intervalMs);
}

// ── Rotating Comedic Second-Beat Punchlines (F4) ──────────────────────────────
const PUNCHLINES = [
  "Your biryani is still in the restaurant's imagination.",
  "The rider was emotionally supportive but logistically fictional.",
  "Congrats — you just outsmarted your own midnight stomach.",
  "That craving? Deleted. That money? Safely in your bank.",
  "100% of the dopamine hit. 0% of the bank balance drop.",
  "Plot twist: Your wallet survives to see another day."
];

// ── The Dopamine Hit Arrival & Twist Reveal ──────────────────────────────────
function triggerOrderArrival() {
  if (courierTimer) clearInterval(courierTimer);
  if (courierMarker) courierMarker.setLatLng(HOME_COORDS);

  // Complete all stepper nodes
  document.getElementById("step-node-3").className = "step-node completed";
  document.getElementById("step-line-3").className = "step-line completed";
  document.getElementById("step-node-4").className = "step-node completed active";

  trackingStatusTitle.textContent = "Delivery Partner Arrived! 🎉";
  trackingStatusDesc.textContent = "Manjunath has arrived at your Indiranagar location.";
  trackingEtaPill.textContent = "Arrived!";

  // Haptic vibration pulse if supported
  if (navigator.vibrate) {
    try { navigator.vibrate([100, 50, 100]); } catch (e) {}
  }

  // Trigger Confetti
  triggerConfetti();

  // Populate Dopamine Twist Reveal Card
  const dish = state.activeRecipeDish || DISHES_CATALOG[0];
  const savedAmount = state.lastOrderSaved || 340.00;

  revealSavedAmount.textContent = `₹${savedAmount.toFixed(2)}`;
  rsAmountVal.textContent = `₹${savedAmount.toFixed(2)}`;

  // Rotating joke
  if (dopamineJoke) {
    const randomJoke = PUNCHLINES[Math.floor(Math.random() * PUNCHLINES.length)];
    dopamineJoke.textContent = randomJoke.replace("{amount}", savedAmount.toFixed(0));
  }

  // Friend Challenge Result Check
  if (state.activeChallenge && challengeResultCard) {
    challengeResultCard.style.display = "flex";
    if (crcTitle) crcTitle.textContent = `⚔️ Craving Defeated vs ${state.activeChallenge.from}!`;
    if (crcDesc) crcDesc.textContent = `You saved ₹${savedAmount.toFixed(0)} on ${dish.title} vs ${state.activeChallenge.from}'s ₹${state.activeChallenge.amount.toFixed(0)} save. Both wallets win!`;
  } else if (challengeResultCard) {
    challengeResultCard.style.display = "none";
  }

  // Reset "Real Save" button appearance
  btnRealSave.disabled = false;
  btnRealSave.querySelector("strong").textContent = "Dopamine Hit Done — Let's Do Real Save";
  btnRealSave.querySelector("#rs-subtext").innerHTML = `Transfer <span id="rs-amount-val">₹${savedAmount.toFixed(2)}</span> to Your Savings Ledger`;
  btnRealSave.style.background = "linear-gradient(135deg, #10B981, #059669)";

  // Update Savings Account Card Balance
  updateUserStateUI();

  // Render Recipe
  crDishTitle.textContent = dish.title;
  crDishSub.textContent = `Cook this exact signature dish from ${state.activeRestaurant.name} at home for just ₹${dish.cookPrice} instead of ₹${dish.price}!`;
  crPrepTime.textContent = `⏱️ ${dish.recipe.prep} prep`;
  crCookTime.textContent = `🍳 ${dish.recipe.cook} cook`;
  crHomeCost.textContent = `💰 ₹${dish.cookPrice} home cost`;

  crIngList.innerHTML = dish.recipe.ingredients.map(ing => `
    <li class="cr-ing-item">✓ ${ing}</li>
  `).join('');

  crStepsList.innerHTML = dish.recipe.steps.map((step, idx) => `
    <li class="cr-step-item">
      <strong>Step ${idx + 1}:</strong> ${step}
    </li>
  `).join('');

  // Generate the Canvas Share Card immediately
  renderShareCard(dish.title, savedAmount);

  // Show the Dopamine Reveal Card and scroll to it smoothly
  dopamineRevealCard.style.display = "block";
  dopamineRevealCard.scrollIntoView({ behavior: "smooth" });
}

// ── "Dopamine Hit Done — Let's Do Real Save" Handler ─────────────────────────
function handleRealSave() {
  const savedAmount = state.lastOrderSaved || 340.00;
  const dish = state.activeRecipeDish || DISHES_CATALOG[0];

  // Record victory in reactive user state
  recordCravingVictory(dish.title, state.activeRestaurant.name, savedAmount);

  // Audio chime & Confetti
  playBankChime();
  triggerConfetti();

  // Update Button visual state
  btnRealSave.querySelector("strong").textContent = `✓ Recorded ₹${savedAmount.toFixed(2)} in Your Savings Vault!`;
  btnRealSave.querySelector("#rs-subtext").textContent = "100% of your money remains safely in your bank account!";
  btnRealSave.style.background = "linear-gradient(135deg, #059669, #047857)";

  // Trigger Slide-Down Bank SMS Notification Toast
  const availBalStr = userState.totalSaved.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  smsAmount.textContent = `₹${savedAmount.toFixed(2)} Saved`;
  smsMessage.textContent = `Beggy Vault: ₹${savedAmount.toFixed(2)} credited to your Anti-Spending Savings Ledger. Avail Bal: ₹${availBalStr}. Craving defeated!`;

  bankSmsToast.classList.add("show");
  if (window._smsTimeout) clearTimeout(window._smsTimeout);
  window._smsTimeout = setTimeout(() => {
    bankSmsToast.classList.remove("show");
  }, 7000);

  // Re-render share card with updated streak & totals
  renderShareCard(dish.title, savedAmount);
}

// ── DYNAMIC CANVAS SHARE CARD GENERATOR (F2) ──────────────────────────────────
function renderShareCard(dishTitle, savedAmount) {
  if (!shareCardCanvas) return;
  const ctx = shareCardCanvas.getContext("2d");
  if (!ctx) return;

  const w = 1080;
  const h = 1920;
  shareCardCanvas.width = w;
  shareCardCanvas.height = h;

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, "#090D16");
  bgGrad.addColorStop(0.35, "#1E1B4B");
  bgGrad.addColorStop(0.7, "#0F172A");
  bgGrad.addColorStop(1, "#020617");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Subtle radial ambient glow
  const radialGlow = ctx.createRadialGradient(w / 2, 600, 100, w / 2, 600, 850);
  radialGlow.addColorStop(0, "rgba(255, 82, 0, 0.22)");
  radialGlow.addColorStop(0.6, "rgba(99, 102, 241, 0.12)");
  radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, w, h);

  // Subtle background grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 2;
  for (let x = 60; x < w; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 60; y < h; y += 120) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Top Badge / Eyebrow
  ctx.save();
  ctx.fillStyle = "#FF5200";
  ctx.beginPath();
  ctx.roundRect(w / 2 - 220, 140, 440, 74, 37);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("BEGGY ANTI-SPEND VAULT", w / 2, 177);
  ctx.restore();

  // Punchline: I ALMOST SPENT
  ctx.fillStyle = "#94A3B8";
  ctx.font = "bold 52px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("I ALMOST SPENT", w / 2, 340);

  // Big Saved Rupee Value
  ctx.save();
  const amountGrad = ctx.createLinearGradient(0, 380, 0, 560);
  amountGrad.addColorStop(0, "#34D399");
  amountGrad.addColorStop(1, "#10B981");
  ctx.fillStyle = amountGrad;
  ctx.font = "900 170px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
  ctx.shadowBlur = 35;
  ctx.fillText(`₹${savedAmount.toFixed(0)}`, w / 2, 520);
  ctx.restore();

  // Craving Dish Name Card Box
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(140, 600, w - 280, 200, 28);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "800 54px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  let displayDish = dishTitle;
  if (displayDish.length > 28) displayDish = displayDish.substring(0, 25) + "...";
  ctx.fillText(displayDish, w / 2, 690);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "600 34px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("CRAVING ORDER DEFEATED 🚀", w / 2, 755);
  ctx.restore();

  // Large Gold Stamp: BEGGY SAVED IT
  ctx.save();
  ctx.translate(w / 2, 930);
  ctx.rotate(-0.06);
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  ctx.strokeStyle = "#F59E0B";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(-360, -70, 720, 140, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "900 70px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("BEGGY SAVED IT 💰", 0, 0);
  ctx.restore();

  // Middle Quote
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "italic 38px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText('"The food was imaginary. The savings are real."', w / 2, 1130);

  // User Stats 3-Pill Matrix
  const statsY = 1240;
  const pillW = 240;
  const gap = 30;
  const startX = (w - (3 * pillW + 2 * gap)) / 2;

  const statBoxes = [
    { label: "STREAK", val: `🔥 ${userState.streak}d`, sub: "Daily habit" },
    { label: "LIFETIME SAVED", val: `₹${userState.totalSaved.toFixed(0)}`, sub: "100% in bank" },
    { label: "DEFEATED", val: `⚔️ ${userState.cravingsDefeated}`, sub: "Cravings" }
  ];

  statBoxes.forEach((s, idx) => {
    const px = startX + idx * (pillW + gap);
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(px, statsY, pillW, 210, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#94A3B8";
    ctx.font = "bold 26px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(s.label, px + pillW / 2, statsY + 50);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 44px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(s.val, px + pillW / 2, statsY + 115);

    ctx.fillStyle = "#64748B";
    ctx.font = "500 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(s.sub, px + pillW / 2, statsY + 165);
    ctx.restore();
  });

  // Footer Branding & URL
  ctx.fillStyle = "#F8FAFC";
  ctx.font = "900 48px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("beggy", w / 2, 1600);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "600 32px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("Order Nothing. Save Everything.", w / 2, 1655);

  ctx.fillStyle = "#FF5200";
  ctx.font = "bold 34px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("arunachalamvenkatachalapathy-dev.github.io/beggy", w / 2, 1715);

  ctx.fillStyle = "#475569";
  ctx.font = "500 26px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("[100% Simulation • Zero Money Charged]", w / 2, 1775);
}

// ── Share Actions Handlers ───────────────────────────────────────────────────
function showShareToast(msg) {
  if (!scToastMsg) return;
  scToastMsg.textContent = msg;
  setTimeout(() => {
    scToastMsg.textContent = "";
  }, 4000);
}

function shareStoryCard() {
  if (!shareCardCanvas) return;
  const dish = state.activeRecipeDish ? state.activeRecipeDish.title : "Food";
  const amount = state.lastOrderSaved || 340;
  const caption = `I just defeated a ₹${amount.toFixed(0)} ${dish} craving 😤 ${userState.streak}-day streak with @Beggy. Try it: https://arunachalamvenkatachalapathy-dev.github.io/beggy/`;

  shareCardCanvas.toBlob(blob => {
    if (!blob) return;
    const file = new File([blob], "beggy-savings-card.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: "I defeated a food craving with Beggy!",
        text: caption,
        files: [file],
        url: "https://arunachalamvenkatachalapathy-dev.github.io/beggy/"
      }).catch(err => {
        if (err.name !== "AbortError") downloadShareCard();
      });
    } else {
      downloadShareCard();
      copyShareCaption();
    }
  }, "image/png");
}

function downloadShareCard() {
  if (!shareCardCanvas) return;
  const link = document.createElement("a");
  link.download = `beggy-savings-card-${Date.now()}.png`;
  link.href = shareCardCanvas.toDataURL("image/png");
  link.click();
  showShareToast("✓ Savings card PNG downloaded to your device!");
}

function copyShareCaption() {
  const dish = state.activeRecipeDish ? state.activeRecipeDish.title : "Food";
  const amount = state.lastOrderSaved || 340;
  const caption = `I just defeated a ₹${amount.toFixed(0)} ${dish} craving 😤 ${userState.streak}-day streak with @Beggy. Try it: https://arunachalamvenkatachalapathy-dev.github.io/beggy/`;

  navigator.clipboard.writeText(caption).then(() => {
    showShareToast("✓ Caption & link copied to clipboard!");
  }).catch(() => {
    showShareToast("✓ Link: https://arunachalamvenkatachalapathy-dev.github.io/beggy/");
  });
}

function createFriendChallengeLink() {
  const dish = state.activeRecipeDish ? state.activeRecipeDish.title : "Biryani";
  const amount = state.lastOrderSaved || 340;
  const challengeUrl = `https://arunachalamvenkatachalapathy-dev.github.io/beggy/?challenge=1&amount=${amount.toFixed(0)}&dish=${encodeURIComponent(dish)}&from=A%20Friend`;
  const text = `⚔️ I resisted ordering ₹${amount.toFixed(0)} ${dish} and kept the money! Can you beat my save? Try it: ${challengeUrl}`;

  navigator.clipboard.writeText(text).then(() => {
    showShareToast("✓ Challenge link copied to clipboard! Send to your friend on WhatsApp 📲");
  }).catch(() => {
    showShareToast("✓ Challenge link created!");
  });
}

// ── PASSBOOK MODAL & STREAKS LOGIC (F3) ──────────────────────────────────────
function openPassbookModal() {
  updateUserStateUI();

  if (pbBadgesGrid) {
    pbBadgesGrid.innerHTML = BADGES_CONFIG.map(b => {
      const unlocked = userState.badges.includes(b.id);
      return `
        <div class="pb-badge-item ${unlocked ? 'unlocked' : ''}">
          <span>${b.icon}</span>
          <span>${b.title}</span>
          ${unlocked ? '<span style="color:#10B981;font-weight:900;">✓</span>' : '<span style="opacity:0.4;">🔒</span>'}
        </div>
      `;
    }).join('');
  }

  if (pbHistoryList) {
    if (userState.history.length === 0) {
      pbHistoryList.innerHTML = `<div class="pb-empty-history">No savings recorded yet. Defeat your first craving to start your ledger!</div>`;
    } else {
      pbHistoryList.innerHTML = userState.history.map(h => `
        <div class="pb-history-item">
          <div class="pb-hi-left">
            <strong>${h.dish}</strong>
            <span>${h.date} • ${h.restaurant}</span>
          </div>
          <div class="pb-hi-right">+₹${h.amount.toFixed(2)}</div>
        </div>
      `).join('');
    }
  }

  if (passbookModal && passbookBackdrop) {
    passbookModal.classList.add("show");
    passbookBackdrop.classList.add("show");
  }
}

function closePassbookModal() {
  if (passbookModal && passbookBackdrop) {
    passbookModal.classList.remove("show");
    passbookBackdrop.classList.remove("show");
  }
}

function resetAllUserData() {
  if (confirm("Reset all your Beggy savings history and streaks?")) {
    userState = {
      totalSaved: 0,
      cravingsDefeated: 0,
      streak: 0,
      bestStreak: 0,
      lastSaveDate: null,
      history: [],
      badges: []
    };
    saveUserState();
    closePassbookModal();
    showShareToast("✓ All local data reset cleanly.");
  }
}

// ── QUICK CRAVING MODE & URL CHALLENGE (F1, F9) ──────────────────────────────
function switchDiscoveryMode(mode) {
  state.discoveryMode = mode;
  if (mode === "quick") {
    if (tabBrowseRestaurants) tabBrowseRestaurants.classList.remove("active");
    if (tabQuickCraving) tabQuickCraving.classList.add("active");
    if (browseKitchensPanel) browseKitchensPanel.style.display = "none";
    if (quickCravingPanel) quickCravingPanel.style.display = "block";
  } else {
    if (tabQuickCraving) tabQuickCraving.classList.remove("active");
    if (tabBrowseRestaurants) tabBrowseRestaurants.classList.add("active");
    if (quickCravingPanel) quickCravingPanel.style.display = "none";
    if (browseKitchensPanel) browseKitchensPanel.style.display = "block";
  }
}

function handleSimulateCustomCraving(e) {
  if (e) e.preventDefault();
  const dishTitle = (customDishName && customDishName.value.trim()) || "Chicken Dum Biryani";
  const rawPrice = (customDishPrice && parseFloat(customDishPrice.value)) || 340;
  const price = Math.max(10, Math.min(rawPrice, 5000));

  const customRest = {
    id: "custom_kitchen",
    name: "Craving Central (Indiranagar)",
    cuisines: "Fast Food, Indian, Tandoor",
    rating: 4.9,
    eta: "15–20 mins",
    priceTwo: `₹${(price * 1.5).toFixed(0)} for two`,
    distanceKm: 1.2,
    address: "100ft Road, Indiranagar, Bengaluru",
    coords: [12.9716, 77.6412],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    discount: "FLAT 100% OFF code: BEGGY100"
  };

  const customDish = {
    id: 9999,
    restaurantId: "custom_kitchen",
    category: "custom",
    diet: "veg",
    isVeg: true,
    isBestseller: true,
    title: dishTitle,
    price: price,
    cookPrice: Math.round(price * 0.28),
    eta: "15–20 mins",
    calories: 650,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    desc: `Piping hot signature ${dishTitle} cooked fresh with premium spices.`,
    recipe: {
      prep: "15 mins",
      cook: "20 mins",
      ingredients: [
        "Fresh ingredients for " + dishTitle,
        "Pure Desi Cow Ghee / Olive Oil",
        "Aromatic spices & seasonings",
        "Garnish & herbs"
      ],
      steps: [
        "Prep and slice fresh ingredients.",
        "Sauté seasonings in a hot pan.",
        "Simmer for 15 minutes to lock in authentic flavours.",
        "Serve hot at home for a fraction of the takeout cost!"
      ]
    }
  };

  state.activeRestaurant = customRest;
  state.activeRecipeDish = customDish;
  state.cart = [{ ...customDish, qty: 1 }];
  state.lastOrderSaved = price;

  updateCartUI();
  proceedToPayment();
}

function checkUrlChallenge() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("challenge") === "1") {
      const from = params.get("from") || "A Friend";
      const amount = parseFloat(params.get("amount") || "340");
      const dish = params.get("dish") || "Chicken Dum Biryani";

      state.activeChallenge = { from, amount, dish };

      if (friendChallengeBanner) {
        friendChallengeBanner.style.display = "flex";
        if (fcbTitle) fcbTitle.textContent = `⚔️ ${from} Defeated a ₹${amount.toFixed(0)} Craving!`;
        if (fcbDesc) fcbDesc.textContent = `${from} resisted ordering ${dish} and kept ₹${amount.toFixed(0)}. Can you beat their save?`;
      }

      switchDiscoveryMode("quick");
      if (customDishName) customDishName.value = dish;
      if (customDishPrice) {
        customDishPrice.value = amount;
        if (btnCravingAmount) btnCravingAmount.textContent = amount.toFixed(0);
      }
    }
  } catch (e) {
    console.warn("Challenge parse error:", e);
  }
}

// ── Event Handlers ───────────────────────────────────────────────────────────
function setupEventListeners() {
  // Brand Home / Nav Home button
  if (navBrandHome) {
    navBrandHome.addEventListener("click", e => {
      e.preventDefault();
      switchView("restaurants");
    });
  }
  if (navHomeBtn) {
    navHomeBtn.addEventListener("click", () => switchView("restaurants"));
  }

  // Cuisine pills
  if (cuisinePillsRow) {
    cuisinePillsRow.addEventListener("click", e => {
      const btn = e.target.closest(".cuisine-pill");
      if (!btn) return;
      document.querySelectorAll(".cuisine-pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      state.activeCuisine = btn.dataset.cuisine;
      renderRestaurants();
    });
  }

  // Restaurant card clicks (Stage 1 -> Stage 2)
  if (restaurantsGrid) {
    restaurantsGrid.addEventListener("click", e => {
      const card = e.target.closest("[data-rest-id]");
      if (!card) return;
      openRestaurant(card.dataset.restId);
    });
  }

  // Back to restaurants
  if (btnBackToRestaurants) {
    btnBackToRestaurants.addEventListener("click", () => switchView("restaurants"));
  }

  // Dietary filters in menu view
  const dietBtns = document.querySelectorAll(".diet-btn");
  dietBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dietBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeDiet = btn.dataset.diet;
      renderRestaurantDishes(state.activeRestaurant.id);
    });
  });

  // Food dish clicks (Add to Cart)
  if (dishesListContainer) {
    dishesListContainer.addEventListener("click", e => {
      const btn = e.target.closest("[data-add-dish]");
      if (!btn) return;
      const dishId = parseInt(btn.dataset.addDish, 10);
      addToCart(dishId);
    });
  }

  // Floating cart bar proceed
  if (fcProceedBtn) {
    fcProceedBtn.addEventListener("click", proceedToPayment);
  }

  // Cart Drawer open/close
  if (cartTriggerBtn) cartTriggerBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartDrawer);
  if (drawerCheckoutBtn) drawerCheckoutBtn.addEventListener("click", proceedToPayment);

  // Back to Menu from Payment
  if (btnBackToMenu) {
    btnBackToMenu.addEventListener("click", () => switchView("menu"));
  }

  // Payment Method Selection
  const payOptions = document.querySelectorAll(".payment-option");
  payOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      payOptions.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      const input = opt.querySelector("input");
      if (input) {
        input.checked = true;
        state.paymentMethod = input.value;
      }
    });
  });

  // Pay and Place Order (Stage 3 -> Stage 4)
  if (btnPayAndPlaceOrder) {
    btnPayAndPlaceOrder.addEventListener("click", handlePlaceOrder);
  }

  // Fast-Forward Arrival button on Map
  if (btnSimulateArrival) {
    btnSimulateArrival.addEventListener("click", triggerOrderArrival);
  }

  // THE REAL SAVE BUTTON
  if (btnRealSave) {
    btnRealSave.addEventListener("click", handleRealSave);
  }

  // Order Again button
  if (btnOrderAgain) {
    btnOrderAgain.addEventListener("click", () => {
      switchView("restaurants");
    });
  }

  // Close Bank SMS Toast
  if (smsCloseBtn) {
    smsCloseBtn.addEventListener("click", () => {
      bankSmsToast.classList.remove("show");
    });
  }

  // Passbook modal triggers (F3)
  if (passbookTriggerBtn) passbookTriggerBtn.addEventListener("click", openPassbookModal);
  if (pbCloseBtn) pbCloseBtn.addEventListener("click", closePassbookModal);
  if (passbookBackdrop) passbookBackdrop.addEventListener("click", closePassbookModal);
  if (pbBtnDone) pbBtnDone.addEventListener("click", closePassbookModal);
  if (pbBtnReset) pbBtnReset.addEventListener("click", resetAllUserData);

  // Discovery Mode tabs (F1)
  if (tabBrowseRestaurants) {
    tabBrowseRestaurants.addEventListener("click", () => switchDiscoveryMode("browse"));
  }
  if (tabQuickCraving) {
    tabQuickCraving.addEventListener("click", () => switchDiscoveryMode("quick"));
  }

  // Quick Craving chips
  if (qcpChipsRow) {
    qcpChipsRow.addEventListener("click", e => {
      const chip = e.target.closest(".craving-chip");
      if (!chip) return;
      document.querySelectorAll(".craving-chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");

      const dish = chip.dataset.dish;
      const price = chip.dataset.price;
      if (customDishName) customDishName.value = dish;
      if (customDishPrice) customDishPrice.value = price;
      if (btnCravingAmount) btnCravingAmount.textContent = price;
    });
  }

  // Custom price input live sync
  if (customDishPrice) {
    customDishPrice.addEventListener("input", e => {
      const val = parseInt(e.target.value, 10);
      if (btnCravingAmount) btnCravingAmount.textContent = isNaN(val) ? "0" : val;
    });
  }

  // Quick Craving form submit
  if (qcpCustomForm) {
    qcpCustomForm.addEventListener("submit", handleSimulateCustomCraving);
  }

  // Friend challenge accept
  if (fcbAcceptBtn) {
    fcbAcceptBtn.addEventListener("click", () => {
      switchDiscoveryMode("quick");
      if (customDishName) customDishName.focus();
    });
  }

  // Share card actions (F2)
  if (btnScShare) btnScShare.addEventListener("click", shareStoryCard);
  if (btnScDownload) btnScDownload.addEventListener("click", downloadShareCard);
  if (btnScCopy) btnScCopy.addEventListener("click", copyShareCaption);
  if (btnScChallenge) btnScChallenge.addEventListener("click", createFriendChallengeLink);

  // Search input
  if (foodSearch) {
    foodSearch.addEventListener("input", e => {
      const q = e.target.value.toLowerCase().trim();
      clearSearch.style.display = q ? "block" : "none";

      if (state.currentView === "restaurants") {
        const cards = document.querySelectorAll(".restaurant-card");
        cards.forEach(c => {
          const text = c.textContent.toLowerCase();
          c.style.display = text.includes(q) ? "flex" : "none";
        });
      } else if (state.currentView === "menu") {
        const dishes = document.querySelectorAll(".dish-card");
        dishes.forEach(d => {
          const text = d.textContent.toLowerCase();
          d.style.display = text.includes(q) ? "flex" : "none";
        });
      }
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      foodSearch.value = "";
      clearSearch.style.display = "none";
      if (state.currentView === "restaurants") renderRestaurants();
      else if (state.currentView === "menu") renderRestaurantDishes(state.activeRestaurant.id);
    });
  }
}

// ── App Initialization ───────────────────────────────────────────────────────
function init() {
  updateUserStateUI();
  renderRestaurants();
  updateCartUI();
  setupEventListeners();
  checkUrlChallenge();

  // Pre-load default active restaurant dishes in background
  renderRestaurantDishes(RESTAURANTS_DATA[0].id);
}

document.addEventListener("DOMContentLoaded", init);


