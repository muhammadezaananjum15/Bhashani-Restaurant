export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: string;
  description: string;
  price: number; // in PKR
  originalPrice?: number;
  image: string;
  popular?: boolean;
  spicyLevel?: 1 | 2 | 3;
  sizes?: { label: string; price: number }[];
  includes?: string[];
  dealNumber?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  badge?: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'deals', name: 'Hot Deals', icon: '🔥', badge: 'Special' },
  { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
  { id: 'sandwich', name: 'Sandwiches', icon: '🥪' },
  { id: 'roll', name: 'Rolls & Parathas', icon: '🌯' },
  { id: 'bbq-chicken', name: 'B.B.Q Chicken', icon: '🍗', badge: 'Charcoal' },
  { id: 'bbq-beef', name: 'B.B.Q Beef', icon: '🥩' },
  { id: 'karahi', name: 'Chicken Karahi', icon: '🥘' },
  { id: 'handi', name: 'Chicken Handi', icon: '🍲' },
  { id: 'biryani', name: 'Biryani', icon: '🍚' },
  { id: 'chinese', name: 'Chinese & Rice', icon: '🥢' },
  { id: 'fries', name: 'Fries', icon: '🍟' },
  { id: 'sides', name: 'Sides & Drinks', icon: '🥤' },
  { id: 'extras', name: 'Extras', icon: '✨' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- HOT DEALS ---
  {
    id: 'deal-01',
    name: 'Deal No. 01',
    category: 'deals',
    dealNumber: 1,
    description: '1 Crispy Zinger Burger, 1 Club Sandwich, 1 Golden French Fries, and 1 Chilled Drink (500ML).',
    price: 899,
    originalPrice: 1100,
    image: '/images/banners/Deal-1.webp',
    popular: true,
    includes: ['1 Zinger Burger', '1 Club Sandwich', '1 French Fries', '1 Drink 500ML']
  },
  {
    id: 'deal-02',
    name: 'Deal No. 02',
    category: 'deals',
    dealNumber: 2,
    description: '2 Juicy Beef Burgers, 1 Flavour Loaded Fries, and 1 Chilled Drink (500ML).',
    price: 849,
    originalPrice: 1050,
    image: '/images/banners/Deal-2.webp',
    popular: true,
    includes: ['2 Beef Burger', '1 Flavour Fries', '1 Drink 500ML']
  },
  {
    id: 'deal-03',
    name: 'Deal No. 03',
    category: 'deals',
    dealNumber: 3,
    description: '2 Chicken Burgers, 2 Beef Burgers, 1 Mayo Fries, and 1 Chilled 1 Litre Soft Drink.',
    price: 1549,
    originalPrice: 1850,
    image: '/images/banners/Deal-3.webp',
    popular: true,
    includes: ['2 Chicken Burger', '2 Beef Burger', '1 Mayo Fries', '1 Ltr Drink']
  },
  {
    id: 'deal-04',
    name: 'Deal No. 04',
    category: 'deals',
    dealNumber: 4,
    description: '2 Crispy Zinger Burgers, 2 Quarter Chest Broasts, 1 Club Sandwich, and 1 Chilled 1 Litre Soft Drink.',
    price: 2199,
    originalPrice: 2600,
    image: '/images/banners/Deal-4.webp',
    popular: true,
    includes: ['2 Zinger Burger', '2 Chest Broast', '1 Club Sandwich', '1 Ltr Drink']
  },
  {
    id: 'deal-05',
    name: 'Deal No. 05 (Mega Zinger Feast)',
    category: 'deals',
    dealNumber: 5,
    description: '5 Giant Crispy Zinger Burgers packed with crunchy fillets & signature sauce + 1 Chilled 1 Litre Drink.',
    price: 1999,
    originalPrice: 2350,
    image: '/images/banners/Deal-5.webp',
    popular: true,
    includes: ['5 Zinger Burger', '1 Ltr Drink']
  },

  // --- SANDWICHES ---
  {
    id: 'sw-special-club',
    name: 'Special Club Sandwich',
    category: 'sandwich',
    description: 'Signature layered sandwich packed with spiced chicken, egg, fresh greens, melted cheese, and creamy sauce.',
    price: 400,
    image: '/images/items/20.webp',
    popular: true
  },
  {
    id: 'sw-club',
    name: 'Club Sandwich',
    category: 'sandwich',
    description: 'Classic toasted triple-decker sandwich loaded with tender shredded chicken, egg, and fresh garden veggies.',
    price: 380,
    image: '/images/items/21.webp'
  },
  {
    id: 'sw-club-cheese',
    name: 'Club Cheese Sandwich',
    category: 'sandwich',
    description: 'Classic triple-layered club sandwich with an extra melted cheddar slice for a gooey delight.',
    price: 420,
    image: '/images/items/22.webp'
  },
  {
    id: 'sw-chicken',
    name: 'Chicken Sandwich',
    category: 'sandwich',
    description: 'Freshly toasted white bread stuffed with lightly seasoned chicken and rich mayonnaise.',
    price: 320,
    image: '/images/items/73.webp'
  },
  {
    id: 'sw-chicken-cheese',
    name: 'Chicken Cheese Sandwich',
    category: 'sandwich',
    description: 'Tender chicken filing infused with rich garlic mayo and melted cheese slice.',
    price: 360,
    image: '/images/items/20.webp'
  },
  {
    id: 'sw-malai',
    name: 'Malai Sandwich',
    category: 'sandwich',
    description: 'Ultra-creamy malai boti infused filling grilled inside golden toasted sandwich bread.',
    price: 380,
    image: '/images/items/22.webp',
    popular: true
  },
  {
    id: 'sw-malai-club',
    name: 'Malai Club Sandwich',
    category: 'sandwich',
    description: 'Generous multi-layered club sandwich filled with velvety charcoal malai chicken and creamy dressing.',
    price: 420,
    image: '/images/items/21.webp'
  },
  {
    id: 'sw-malai-club-cheese',
    name: 'Malai Club Cheese Sandwich',
    category: 'sandwich',
    description: 'The ultimate royal sandwich: rich malai chicken, melted cheese slices, egg, and house special sauce.',
    price: 450,
    image: '/images/items/16.webp',
    popular: true
  },
  {
    id: 'sw-crispy',
    name: 'Crispy Sandwich',
    category: 'sandwich',
    description: 'Golden crunchy fried chicken breast fillet inside toasted bread with tangy sauce and iceberg lettuce.',
    price: 380,
    image: '/images/items/16.webp'
  },
  {
    id: 'sw-crispy-club',
    name: 'Crispy Club Sandwich',
    category: 'sandwich',
    description: 'Triple-decker stacked sandwich loaded with crunchy golden fried chicken fillets and savory sauce.',
    price: 420,
    image: '/images/items/16.webp',
    popular: true
  },
  {
    id: 'sw-crispy-cheese',
    name: 'Crispy Cheese Sandwich',
    category: 'sandwich',
    description: 'Crispy golden fried fillet combined with warm melted cheese slice and garlic herb sauce.',
    price: 420,
    image: '/images/items/20.webp'
  },
  {
    id: 'sw-bbq',
    name: 'B.B.Q Sandwich',
    category: 'sandwich',
    description: 'Smoky charcoal-grilled BBQ chicken chunks tossed in tangy barbecue dressing.',
    price: 380,
    image: '/images/items/22.webp'
  },
  {
    id: 'sw-bbq-club',
    name: 'B.B.Q Club Sandwich',
    category: 'sandwich',
    description: 'Smoky aromatic charcoal BBQ chicken layered with fluffy omelet, crisp lettuce, and special spices.',
    price: 420,
    image: '/images/items/21.webp'
  },
  {
    id: 'sw-bbq-cheese',
    name: 'B.B.Q Cheese Sandwich',
    category: 'sandwich',
    description: 'Smoky BBQ boti chunks enveloped with rich melted cheddar cheese slice in toasted bread.',
    price: 420,
    image: '/images/items/16.webp'
  },

  // --- ROLLS ---
  {
    id: 'roll-chicken',
    name: 'Chicken Roll',
    category: 'roll',
    description: 'Freshly baked flaky crispy paratha wrapped around succulent spiced chicken chunks and sliced onions.',
    price: 170,
    image: '/images/items/18.webp',
    popular: true
  },
  {
    id: 'roll-chicken-mayo-garlic',
    name: 'Chicken Mayo Garlic Roll',
    category: 'roll',
    description: 'Juicy chicken boti bathed in our signature thick mayo garlic sauce wrapped in crispy paratha.',
    price: 230,
    image: '/images/items/18.webp',
    popular: true
  },
  {
    id: 'roll-chicken-cheese',
    name: 'Chicken Cheese Roll',
    category: 'roll',
    description: 'Crisp hot paratha filled with spiced chicken pieces and loaded with shredded melted cheese.',
    price: 230,
    image: '/images/items/14.webp'
  },
  {
    id: 'roll-chicken-malai',
    name: 'Chicken Malai Roll',
    category: 'roll',
    description: 'Tender chicken marinated in cream and mild green cardamom, rolled with fresh mint and onions.',
    price: 220,
    image: '/images/items/18.webp'
  },
  {
    id: 'roll-chicken-malai-mayo-garlic',
    name: 'Chicken Malai Mayo Garlic Roll',
    category: 'roll',
    description: 'Melt-in-mouth malai boti infused with creamy garlic mayonnaise in a crisp golden paratha.',
    price: 250,
    image: '/images/items/15.webp',
    popular: true
  },
  {
    id: 'roll-chicken-malai-cheese',
    name: 'Chicken Malai Cheese Roll',
    category: 'roll',
    description: 'Creamy malai chicken paired with luscious melted cheese for the richest roll experience.',
    price: 250,
    image: '/images/items/14.webp'
  },
  {
    id: 'roll-beef-kabab',
    name: 'Beef Kabab Roll',
    category: 'roll',
    description: 'Spiced minced beef seekh kabab grilled on live coals, wrapped in paratha with zesty chutney.',
    price: 170,
    image: '/images/items/12.webp'
  },
  {
    id: 'roll-beef-kabab-mayo-garlic',
    name: 'Beef Kabab Mayo Garlic Roll',
    category: 'roll',
    description: 'Charcoal grilled beef seekh kabab generously coated in signature garlic mayonnaise.',
    price: 230,
    image: '/images/items/12.webp',
    popular: true
  },
  {
    id: 'roll-beef-kabab-cheese',
    name: 'Beef Kabab Cheese Roll',
    category: 'roll',
    description: 'Smoky beef kabab combined with melting cheese slice in a freshly fried puri paratha.',
    price: 230,
    image: '/images/items/14.webp'
  },
  {
    id: 'roll-beef-boti',
    name: 'Beef Boti Roll',
    category: 'roll',
    description: 'Succulent marinated beef undercut boti skewered and grilled over slow burning charcoal.',
    price: 200,
    image: '/images/items/17.webp'
  },
  {
    id: 'roll-beef-boti-mayo-garlic',
    name: 'Beef Boti Mayo Garlic Roll',
    category: 'roll',
    description: 'Tender beef boti tossed with garlic mayonnaise dressing, rolled in flaky paratha.',
    price: 250,
    image: '/images/items/17.webp',
    popular: true
  },
  {
    id: 'roll-beef-boti-cheese',
    name: 'Beef Boti Cheese Roll',
    category: 'roll',
    description: 'Juicy spiced beef boti combined with melted cheese slice in hot golden paratha.',
    price: 250,
    image: '/images/items/14.webp'
  },

  // --- FAST FOOD ---
  {
    id: 'ff-broast-chest',
    name: 'Broast Chest (Quarter)',
    category: 'fast-food',
    description: 'Fresh tender chicken breast portion deep-fried under pressure to golden crispy crunch. Served with dinner roll and fries.',
    price: 500,
    image: '/images/items/19.webp',
    popular: true
  },
  {
    id: 'ff-crispy-broast',
    name: 'Crispy Broast',
    category: 'fast-food',
    description: 'Extra crunch coating infused with secret Karachi street spices, juicy chicken inside.',
    price: 520,
    image: '/images/items/19.webp'
  },
  {
    id: 'ff-spicy-broast',
    name: 'Spicy Broast',
    category: 'fast-food',
    description: 'Marinated with fiery red chili rub and fried to perfection. Packed with hot Karachi spice.',
    price: 520,
    spicyLevel: 3,
    image: '/images/items/19.webp'
  },
  {
    id: 'ff-mayo-broast',
    name: 'Mayo Broast',
    category: 'fast-food',
    description: 'Golden crispy broast chicken coated in decadent creamy garlic-mayo sauce.',
    price: 580,
    image: '/images/items/19.webp',
    popular: true
  },
  {
    id: 'ff-zinger-burger',
    name: 'Zinger Burger',
    category: 'fast-food',
    description: 'Hand-breaded whole muscle chicken thigh fillet fried to ultra crispiness, with lettuce & creamy mayo.',
    price: 400,
    image: '/images/items/24.webp',
    popular: true
  },
  {
    id: 'ff-zinger-burger-jumbo',
    name: 'Zinger Burger (Jumbo)',
    category: 'fast-food',
    description: 'Double crunch! Oversized crispy zinger fillet served on a toasted jumbo sesame bun with extra sauce.',
    price: 600,
    image: '/images/items/26.webp',
    popular: true
  },
  {
    id: 'ff-zinger-spicy-burger',
    name: 'Zinger Spicy Burger',
    category: 'fast-food',
    description: 'Hot chili dusted crispy zinger fillet topped with jalapenos, spicy mayo, and crisp lettuce.',
    price: 420,
    spicyLevel: 3,
    image: '/images/items/26.webp'
  },
  {
    id: 'ff-zinger-cheese-burger',
    name: 'Zinger Cheese Burger',
    category: 'fast-food',
    description: 'Crispy golden zinger fillet smothered with a thick melted cheddar cheese slice.',
    price: 460,
    image: '/images/items/25.webp',
    popular: true
  },
  {
    id: 'ff-zinger-paratha-roll',
    name: 'Zinger Paratha Roll',
    category: 'fast-food',
    description: 'Crispy fried zinger chicken tenders wrapped inside a hot flaky puri paratha with garlic sauce.',
    price: 350,
    image: '/images/items/18.webp',
    popular: true
  },
  {
    id: 'ff-chicken-burger',
    name: 'Chicken Burger',
    category: 'fast-food',
    description: 'Classic seasoned chicken patty grilled and served with fresh lettuce, tomato, and savory dressing.',
    price: 320,
    image: '/images/items/24.webp'
  },
  {
    id: 'ff-chicken-burger-jumbo',
    name: 'Chicken Burger (Jumbo)',
    category: 'fast-food',
    description: 'Double chicken patties stacked high with cheese and vegetables on a toasted bun.',
    price: 420,
    image: '/images/items/26.webp'
  },
  {
    id: 'ff-chicken-spicy-burger',
    name: 'Chicken Spicy Burger',
    category: 'fast-food',
    description: 'Seasoned chicken patty basted in spicy peri peri sauce with fresh greens.',
    price: 340,
    spicyLevel: 2,
    image: '/images/items/24.webp'
  },
  {
    id: 'ff-chicken-cheese-burger',
    name: 'Chicken Cheese Burger',
    category: 'fast-food',
    description: 'Tender chicken patty topped with warm melted cheese slice and savory burger sauce.',
    price: 380,
    image: '/images/items/25.webp'
  },
  {
    id: 'ff-beef-burger',
    name: 'Beef Burger',
    category: 'fast-food',
    description: 'Pure ground beef patty seasoned with house spices and seared to juicy perfection.',
    price: 350,
    image: '/images/items/23.webp'
  },
  {
    id: 'ff-beef-burger-jumbo',
    name: 'Beef Burger (Jumbo)',
    category: 'fast-food',
    description: 'Giant beef burger with double meat patties, caramelized onions, and house burger relish.',
    price: 450,
    image: '/images/items/23.webp',
    popular: true
  },
  {
    id: 'ff-beef-cheese-burger',
    name: 'Beef Cheese Burger',
    category: 'fast-food',
    description: 'Juicy seared beef patty covered with melted cheddar cheese, pickles, and classic sauce.',
    price: 400,
    image: '/images/items/23.webp',
    popular: true
  },
  {
    id: 'ff-beef-spicy-burger',
    name: 'Beef Spicy Burger',
    category: 'fast-food',
    description: 'Bold beef patty infused with crushed red chili, jalapenos, and spicy burger sauce.',
    price: 370,
    spicyLevel: 2,
    image: '/images/items/23.webp'
  },

  // --- CHICKEN KARAHI ---
  {
    id: 'karahi-chicken',
    name: 'Chicken Karahi',
    category: 'karahi',
    description: 'Classic wok-cooked chicken prepared with ripe tomatoes, ginger juliennes, green chilies, and freshly roasted black pepper.',
    price: 900,
    image: '/images/items/43.webp',
    popular: true,
    sizes: [
      { label: 'Half Karahi', price: 900 },
      { label: 'Full Karahi', price: 1800 }
    ]
  },
  {
    id: 'karahi-chicken-white',
    name: 'Chicken White Karahi',
    category: 'karahi',
    description: 'Mildly spiced, velvety white gravy made with yogurt, thick cream, white pepper, and green cardamom.',
    price: 1000,
    image: '/images/items/38.webp',
    popular: true,
    sizes: [
      { label: 'Half Karahi', price: 1000 },
      { label: 'Full Karahi', price: 2000 }
    ]
  },
  {
    id: 'karahi-chicken-shenwari',
    name: 'Chicken Shenwari Karahi',
    category: 'karahi',
    description: 'Authentic Pashtun-style karahi cooked simply in animal fat/oil with tomatoes, garlic, salt, and green chilies. Minimal spice, maximum flavor.',
    price: 900,
    image: '/images/items/44.webp',
    popular: true,
    sizes: [
      { label: 'Half Karahi', price: 900 },
      { label: 'Full Karahi', price: 1800 }
    ]
  },
  {
    id: 'karahi-chicken-green',
    name: 'Chicken Green Karahi',
    category: 'karahi',
    description: 'Aromatic spicy karahi infused with freshly blended coriander, mint, green chili paste, and warm spices.',
    price: 1000,
    spicyLevel: 2,
    image: '/images/items/41.webp',
    sizes: [
      { label: 'Half Karahi', price: 1000 },
      { label: 'Full Karahi', price: 2000 }
    ]
  },

  // --- CHICKEN HANDI ---
  {
    id: 'handi-chicken',
    name: 'Chicken Handi',
    category: 'handi',
    description: 'Boneless chicken cubes slow-simmered in an authentic clay handi with rich onion-tomato gravy and aromatic herbs.',
    price: 1000,
    image: '/images/items/34.webp',
    popular: true,
    sizes: [
      { label: 'Half Handi', price: 1000 },
      { label: 'Full Handi', price: 2000 }
    ]
  },
  {
    id: 'handi-chicken-reshmi-paneer',
    name: 'Chicken Reshmi Paneer Handi',
    category: 'handi',
    description: 'Tender chicken morsels with homemade cottage cheese cubes cooked in a silky, royal cashew-cream sauce.',
    price: 1100,
    image: '/images/items/51.webp',
    popular: true,
    sizes: [
      { label: 'Half Handi', price: 1100 },
      { label: 'Full Handi', price: 2200 }
    ]
  },
  {
    id: 'handi-chicken-makhni',
    name: 'Chicken Makhni Handi',
    category: 'handi',
    description: 'Mouthwatering butter chicken handi cooked with pure desi butter, fresh cream, and aromatic fenugreek leaves (kasoori methi).',
    price: 1100,
    image: '/images/items/53.webp',
    popular: true,
    sizes: [
      { label: 'Half Handi', price: 1100 },
      { label: 'Full Handi', price: 2200 }
    ]
  },

  // --- BIRYANI ---
  {
    id: 'biryani-chicken',
    name: 'Chicken Biryani',
    category: 'biryani',
    description: 'Traditional Karachi style fragrant long-grain basmati rice layered with spicy chicken masala, saffron, and tender potatoes.',
    price: 300,
    image: '/images/items/48.webp',
    popular: true
  },
  {
    id: 'biryani-beef',
    name: 'Beef Biryani',
    category: 'biryani',
    description: 'Rich and hearty Karachi beef biryani packed with slow-cooked succulent beef chunks and fragrant spices.',
    price: 300,
    image: '/images/items/48.webp',
    popular: true
  },
  {
    id: 'biryani-simple',
    name: 'Biryani (Simple / Plain Rice)',
    category: 'biryani',
    description: 'Aromatic seasoned basmati biryani rice cooked in fragrant spiced broth, served with zesty raita.',
    price: 180,
    image: '/images/items/47.webp'
  },

  // --- CHINESE ---
  {
    id: 'ch-fried-rice-chicken',
    name: 'Chicken Fried Rice',
    category: 'chinese',
    description: 'Wok-tossed basmati rice with finely diced chicken, scrambled eggs, carrots, scallions, and soy sauce.',
    price: 450,
    image: '/images/items/47.webp',
    popular: true
  },
  {
    id: 'ch-fried-rice-egg',
    name: 'Egg Fried Rice',
    category: 'chinese',
    description: 'Classic wok-fried rice with fluffy eggs, green spring onions, and oriental seasoning.',
    price: 400,
    image: '/images/items/47.webp'
  },
  {
    id: 'ch-masala-rice',
    name: 'Chicken Masala Rice',
    category: 'chinese',
    description: 'Pakistani-Chinese fusion spicy rice loaded with tender chicken pieces and zesty wok seasonings.',
    price: 450,
    image: '/images/items/48.webp'
  },
  {
    id: 'ch-shashlik-rice',
    name: 'Chicken Shashlik with Rice',
    category: 'chinese',
    description: 'Boneless chicken cubes with bell peppers and onions in sweet & tangy tomato sauce, served over egg fried rice.',
    price: 650,
    image: '/images/items/30.webp',
    popular: true
  },
  {
    id: 'ch-schezwan-rice',
    name: 'Chicken Schezwan with Rice',
    category: 'chinese',
    description: 'Spicy and piquant Schezwan style chicken tossed with red chilies and garlic, paired with egg fried rice.',
    price: 650,
    spicyLevel: 3,
    image: '/images/items/44.webp'
  },
  {
    id: 'ch-manchurian-rice',
    name: 'Chicken Manchurian with Rice',
    category: 'chinese',
    description: 'Crispy chicken bites glazed in savory garlic, ginger, and scallion Manchurian sauce with fried rice.',
    price: 650,
    image: '/images/items/31.webp',
    popular: true
  },
  {
    id: 'ch-chilli-dry-rice',
    name: 'Chicken Chilli Dry with Rice',
    category: 'chinese',
    description: 'All-time favorite: crispy chicken strips tossed with green chilies, ginger, and soy sauce over aromatic rice.',
    price: 650,
    spicyLevel: 2,
    image: '/images/items/49.webp',
    popular: true
  },
  {
    id: 'ch-chilli-veg-rice',
    name: 'Chicken Chilli Vegetable with Rice',
    category: 'chinese',
    description: 'Stir-fried chicken tossed with seasonal crunchy vegetables in a light garlic soy gravy, served with rice.',
    price: 650,
    image: '/images/items/52.webp'
  },
  {
    id: 'ch-chowmein-chicken',
    name: 'Chicken Chowmein',
    category: 'chinese',
    description: 'Fresh wok-tossed noodles with shredded chicken, cabbage, bell peppers, carrots, and savory sauces.',
    price: 600,
    image: '/images/items/45.webp',
    popular: true
  },
  {
    id: 'ch-spaghetti-chicken',
    name: 'Chicken Spaghetti',
    category: 'chinese',
    description: 'Hearty noodles cooked with seasoned shredded chicken, garden veggies, and house fusion spicy sauce.',
    price: 600,
    image: '/images/items/45.webp'
  },

  // --- B.B.Q (CHICKEN) ---
  {
    id: 'bbq-tikka-chest',
    name: 'Chicken Tikka (Chest)',
    category: 'bbq-chicken',
    description: 'Signature charcoal-grilled chicken breast quarter marinated in curd, lemon juice, and secret fiery spices.',
    price: 450,
    image: '/images/items/29.webp',
    popular: true
  },
  {
    id: 'bbq-malai-tikka',
    name: 'Chicken Malai Tikka',
    category: 'bbq-chicken',
    description: 'Melt-in-mouth chicken quarter basted in heavy cream, green cardamom, mild spices, and roasted over slow embers.',
    price: 500,
    image: '/images/items/28.webp',
    popular: true
  },
  {
    id: 'bbq-chicken-boti',
    name: 'Chicken Boti (Plate)',
    category: 'bbq-chicken',
    description: 'Boneless chicken cubes skewered and roasted on coals till slightly charred on outside and tender juicy inside.',
    price: 440,
    image: '/images/items/18.webp',
    popular: true
  },
  {
    id: 'bbq-chicken-malai-boti',
    name: 'Chicken Malai Boti (Plate)',
    category: 'bbq-chicken',
    description: 'Boneless chicken cubes marinated in rich cashew cream, white pepper, and mild herbs grilled to buttery tenderness.',
    price: 480,
    image: '/images/items/22.webp',
    popular: true
  },
  {
    id: 'bbq-chicken-reshmi-kabab',
    name: 'Chicken Reshmi Kabab',
    category: 'bbq-chicken',
    description: 'Delicate minced chicken seekh skewers infused with ginger, coriander, and mild cream, grilled on live coals.',
    price: 400,
    image: '/images/items/12.webp'
  },

  // --- B.B.Q (BEEF) ---
  {
    id: 'bbq-beef-bihari-boti',
    name: 'Beef Bihari Boti',
    category: 'bbq-beef',
    description: 'Karachi legend: thinly sliced beef undercut marinated with raw papaya, roasted gram flour, and pungent mustard oil.',
    price: 500,
    image: '/images/items/17.webp',
    popular: true
  },
  {
    id: 'bbq-beef-seekh-kabab',
    name: 'Beef Seekh Kabab',
    category: 'bbq-beef',
    description: 'Finely minced beef blended with aromatic spices, onions, and fresh mint, charcoal-grilled on metal skewers.',
    price: 440,
    image: '/images/items/12.webp',
    popular: true
  },
  {
    id: 'bbq-beef-gola-kabab',
    name: 'Beef Gola Kabab',
    category: 'bbq-beef',
    description: 'Round juicy beef meatballs seasoned with mace, nutmeg, and fried onions, grilled over glowing charcoal coals.',
    price: 440,
    image: '/images/items/12.webp'
  },

  // --- FRIES ---
  {
    id: 'fries-french',
    name: 'French Fries',
    category: 'fries',
    description: 'Golden crispy potato finger fries sprinkled with light salt.',
    price: 130,
    image: '/images/items/11.webp'
  },
  {
    id: 'fries-flavour',
    name: 'Fries (Flavour)',
    category: 'fries',
    description: 'Crisp hot french fries tossed in your choice of spicy masala, cheese, or tangy BBQ seasoning.',
    price: 150,
    image: '/images/items/11.webp',
    popular: true
  },
  {
    id: 'fries-mayo',
    name: 'Mayo Fries',
    category: 'fries',
    description: 'Crispy piping hot fries smothered with rich creamy garlic mayonnaise sauce.',
    price: 200,
    image: '/images/items/11.webp',
    popular: true
  },

  // --- SIDES & DRINKS ---
  {
    id: 'side-chapati',
    name: 'Chapati',
    category: 'sides',
    description: 'Soft whole wheat flatbread made fresh on tawa.',
    price: 20,
    image: '/images/items/14.webp'
  },
  {
    id: 'side-puri-paratha',
    name: 'Puri Paratha',
    category: 'sides',
    description: 'Flaky, layered golden fried paratha made fresh to order.',
    price: 100,
    image: '/images/items/15.webp',
    popular: true
  },
  {
    id: 'side-raita',
    name: 'Zeera & Mint Raita',
    category: 'sides',
    description: 'Fresh chilled yogurt seasoned with roasted cumin and crushed mint.',
    price: 30,
    image: '/images/items/70.webp'
  },
  {
    id: 'side-salad',
    name: 'Fresh Garden Salad',
    category: 'sides',
    description: 'Crisp sliced onions, cucumber, tomatoes, and lemon wedges.',
    price: 50,
    image: '/images/items/70.webp'
  },
  {
    id: 'side-sting',
    name: 'Sting Energy Drink',
    category: 'sides',
    description: 'Chilled energy booster.',
    price: 120,
    image: '/images/items/65.webp'
  },
  {
    id: 'side-cold-drink-500',
    name: 'Cold Drink (500ml)',
    category: 'sides',
    description: 'Ice chilled soft drink (Pepsi, 7UP, Mirinda, Mountain Dew).',
    price: 110,
    image: '/images/items/61.webp'
  },
  {
    id: 'side-cold-drink-1ltr',
    name: 'Cold Drink (1 Litre)',
    category: 'sides',
    description: '1 Litre chilled soft drink bottle.',
    price: 170,
    image: '/images/items/68.webp'
  },
  {
    id: 'side-cold-drink-tin',
    name: 'Cold Drink (Tin Pack)',
    category: 'sides',
    description: '250ml chilled beverage can.',
    price: 120,
    image: '/images/items/66.webp'
  },

  // --- EXTRAS ---
  {
    id: 'extra-mayoo',
    name: 'Extra Mayo Dip',
    category: 'extras',
    description: 'Extra portion of our signature creamy garlic mayonnaise dip.',
    price: 100,
    image: '/images/items/11.webp'
  },
  {
    id: 'extra-bun',
    name: 'Extra Bun',
    category: 'extras',
    description: 'Toasted soft burger bun.',
    price: 50,
    image: '/images/items/24.webp'
  },
  {
    id: 'extra-coleslaw',
    name: 'Coleslaw',
    category: 'extras',
    description: 'Sweet and creamy shredded cabbage and carrot salad.',
    price: 50,
    image: '/images/items/70.webp'
  }
];

export const RESTAURANT_INFO = {
  name: 'Bhashani Pakwan Center',
  urduName: 'بھاشانی پکوان سینٹر',
  tagline: 'FAST FOOD & B.B.Q — COME HUNGRY, LEAVE HAPPY..!!',
  phone: '+92 314 511 83 38',
  phoneClean: '923145118338',
  address: 'Plot No. 32, Akbar Shaheed Chowk, Sector-14/A, Orangi Town, Karachi.',
  deliveryNote: 'Delivery Charges: According to Area',
  hours: 'Daily: 4:00 PM – 3:00 AM (Late Night Service)',
  logoUrl: '/images/logo.png',
  flyers: [
    { title: 'Deals, Sandwich & Rolls Menu', src: '/images/menu-flyer-1.jpg' },
    { title: 'Karahi, BBQ, Fast Food & Chinese Menu', src: '/images/menu-flyer-2.jpg' }
  ]
};
