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
    discount: "FLAT 100% OFF code: BWIGGY100"
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
    discount: "Free Delivery with Bwiggy One"
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

// ── Application State ────────────────────────────────────────────────────────
const state = {
  currentView: "restaurants",
  activeRestaurant: RESTAURANTS_DATA[0],
  activeCuisine: "all",
  activeDiet: "all",
  cart: [],
  paymentMethod: "gpay",
  savingsAccountBalance: parseFloat(localStorage.getItem("beggy_savings_account_bal") || "48650.00"),
  lastOrderSaved: 340.00,
  activeRecipeDish: DISHES_CATALOG[0]
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
const foodSearch = document.getElementById("food-search");
const clearSearch = document.getElementById("clear-search");
const cartTriggerBtn = document.getElementById("cart-trigger-btn");
const cartCountBadge = document.getElementById("cart-count");

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
const revealSavedAmount = document.getElementById("reveal-saved-amount");
const btnRealSave = document.getElementById("btn-real-save");
const rsAmountVal = document.getElementById("rs-amount-val");
const saBalanceVal = document.getElementById("sa-balance-val");
const crDishTitle = document.getElementById("cr-dish-title");
const crDishSub = document.getElementById("cr-dish-sub");
const crPrepTime = document.getElementById("cr-prep-time");
const crCookTime = document.getElementById("cr-cook-time");
const crHomeCost = document.getElementById("cr-home-cost");
const crIngList = document.getElementById("cr-ing-list");
const crStepsList = document.getElementById("cr-steps-list");
const btnOrderAgain = document.getElementById("btn-order-again");

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
        <div class="swiggy-add-btn-wrap">
          <button class="swiggy-add-btn" data-add-dish="${dish.id}">+ ADD</button>
        </div>
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
  drawerTotal.textContent = "₹0.00"; // Free via BWIGGY100
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
  billToPay.textContent = "₹0.00"; // BWIGGY100 auto-applied

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
    zoom: 13,
    zoomControl: true
  });

  // CartoDB Dark Matter tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Home marker
  const homeIcon = L.divIcon({
    className: 'custom-leaflet-pin',
    html: '<div style="width:16px;height:16px;background:#10B981;border:3px solid #FFFFFF;border-radius:50%;box-shadow:0 0 10px #10B981;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  homeMarker = L.marker(HOME_COORDS, { icon: homeIcon })
    .addTo(map)
    .bindPopup('<strong>Delivery Location</strong><br>Indiranagar 100ft Road, Bengaluru');
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
  trackingStatusDesc = `${r.name} is cooking your fresh dishes. Rider arriving shortly.`;

  setTimeout(() => {
    setupMapRouteAndScooter(r);
  }, 400);

  // Auto progression
  setTimeout(() => {
    document.getElementById("step-node-2").className = "step-node completed";
    document.getElementById("step-line-2").className = "step-line completed";
    document.getElementById("step-node-3").className = "step-node active";
    trackingStatusTitle.textContent = "Rider on the Way!";
    trackingStatusDesc.textContent = "Suresh picked up your piping hot order and is on CMH Road.";
  }, 3500);
}

function setupMapRouteAndScooter(r) {
  if (!map) initLeafletMap();
  if (!map) return;

  if (kitchenMarker) map.removeLayer(kitchenMarker);
  if (courierMarker) map.removeLayer(courierMarker);
  if (routePolyline) map.removeLayer(routePolyline);
  if (courierTimer) clearInterval(courierTimer);

  // Kitchen Pin
  const kitchenIcon = L.divIcon({
    className: 'custom-leaflet-pin',
    html: '<span style="font-size:1.5rem; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.8));">🍳</span>',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
  kitchenMarker = L.marker(r.coords, { icon: kitchenIcon }).addTo(map);

  // Route Polyline
  const midLat = (r.coords[0] + HOME_COORDS[0]) / 2 + 0.002;
  const midLng = (r.coords[1] + HOME_COORDS[1]) / 2 - 0.0025;
  const routePoints = [r.coords, [midLat, midLng], HOME_COORDS];

  routePolyline = L.polyline(routePoints, {
    color: '#FF5200',
    weight: 4,
    opacity: 0.85,
    dashArray: '6, 8'
  }).addTo(map);

  // Scooter Marker
  const scooterIcon = L.divIcon({
    className: 'custom-leaflet-pin scooter-pin',
    html: '<span style="font-size:1.8rem; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.9));">🛵</span>',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
  courierMarker = L.marker(r.coords, { icon: scooterIcon }).addTo(map);

  // Smooth animation
  let progress = 0;
  courierTimer = setInterval(() => {
    progress += 0.02;
    if (progress >= 0.92) {
      clearInterval(courierTimer);
      triggerOrderArrival();
      return;
    }

    const curLat = r.coords[0] + (HOME_COORDS[0] - r.coords[0]) * progress;
    const curLng = r.coords[1] + (HOME_COORDS[1] - r.coords[1]) * progress;
    courierMarker.setLatLng([curLat, curLng]);

    const remainingMins = Math.max(Math.round((1 - progress) * 18), 1);
    trackingEtaPill.textContent = `ETA: ~${remainingMins} mins`;
  }, 400);
}

// ── The Dopamine Hit Arrival & Twist Reveal ──────────────────────────────────
function triggerOrderArrival() {
  if (courierTimer) clearInterval(courierTimer);
  if (courierMarker) courierMarker.setLatLng(HOME_COORDS);

  // Complete all stepper nodes
  document.getElementById("step-node-3").className = "step-node completed";
  document.getElementById("step-line-3").className = "step-line completed";
  document.getElementById("step-node-4").className = "step-node completed active";

  trackingStatusTitle.textContent = "Delivery Partner Arrived! 🎉";
  trackingStatusDesc.textContent = "Suresh has arrived at your Indiranagar location.";
  trackingEtaPill.textContent = "Arrived!";

  // Trigger Confetti
  triggerConfetti();

  // Populate Dopamine Twist Reveal Card
  const dish = state.activeRecipeDish || DISHES_CATALOG[0];
  const savedAmount = state.lastOrderSaved || 340.00;

  revealSavedAmount.textContent = `₹${savedAmount.toFixed(2)}`;
  rsAmountVal.textContent = `₹${savedAmount.toFixed(2)}`;
  saBalanceVal.textContent = `₹${state.savingsAccountBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Reset "Real Save" button appearance
  btnRealSave.disabled = false;
  btnRealSave.querySelector("strong").textContent = "Dopamine Hit Done — Let's Do Real Save";
  btnRealSave.querySelector("#rs-subtext").innerHTML = `Transfer <span id="rs-amount-val">₹${savedAmount.toFixed(2)}</span> to Your Dummy Savings Account`;
  btnRealSave.style.background = "linear-gradient(135deg, #10B981, #059669)";

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

  // Show the Dopamine Reveal Card and scroll to it smoothly
  dopamineRevealCard.style.display = "block";
  dopamineRevealCard.scrollIntoView({ behavior: "smooth" });
}

// ── "Dopamine Hit Done — Let's Do Real Save" Handler ─────────────────────────
function handleRealSave() {
  const savedAmount = state.lastOrderSaved || 340.00;

  // Add saved money to user's dummy savings account
  state.savingsAccountBalance += savedAmount;
  localStorage.setItem("beggy_savings_account_bal", state.savingsAccountBalance.toFixed(2));

  // Audio chime & Confetti
  playBankChime();
  triggerConfetti();

  // Update Savings Account Card Balance
  saBalanceVal.textContent = `₹${state.savingsAccountBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Update Button visual state
  btnRealSave.querySelector("strong").textContent = `✓ Transferred ₹${savedAmount.toFixed(2)} to Your Real Savings!`;
  btnRealSave.querySelector("#rs-subtext").textContent = "BHARAT BANK credit alert generated. ₹0 spent on takeout!";
  btnRealSave.style.background = "linear-gradient(135deg, #059669, #047857)";

  // Trigger Slide-Down Bank SMS Notification Toast
  const todayStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const availBalStr = state.savingsAccountBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  smsAmount.textContent = `₹${savedAmount.toFixed(2)} Credited`;
  smsMessage.textContent = `BHARAT BANK Alert: A/C **4921 credited with ₹${savedAmount.toFixed(2)} on ${todayStr} via UPI/Beggy Anti-Spend. Avail Bal: ₹${availBalStr}. Craving defeated!`;

  bankSmsToast.classList.add("show");
  if (window._smsTimeout) clearTimeout(window._smsTimeout);
  window._smsTimeout = setTimeout(() => {
    bankSmsToast.classList.remove("show");
  }, 7000);
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
  renderRestaurants();
  updateCartUI();
  setupEventListeners();

  // Pre-load default active restaurant dishes in background
  renderRestaurantDishes(RESTAURANTS_DATA[0].id);
}

document.addEventListener("DOMContentLoaded", init);
