export type GroupKey = "fiction" | "self-help-business" | "cs-academic" | "urdu" | "kids";

export type CoverTheme = "red" | "black" | "white";
export type Motif =
  | "sun"
  | "eye"
  | "rings"
  | "steps"
  | "coins"
  | "focus"
  | "braces"
  | "snake"
  | "database"
  | "crescent"
  | "vulture"
  | "kite";

export type Book = {
  id: number;
  slug: string;
  title: string;
  urduTitle?: string;
  author: string;
  category: string;
  group: GroupKey;
  price: number;
  rating: number;
  ratingCount: number;
  short: string;
  full: string[];
  language: "English" | "Urdu";
  studentEligible: boolean;
  cover: { theme: CoverTheme; motif: Motif };
};

export const GROUPS: { key: GroupKey; name: string; line: string }[] = [
  { key: "fiction", name: "Fiction", line: "Classics and modern stories" },
  { key: "self-help-business", name: "Self-Help and Business", line: "Habits, money and focus" },
  { key: "cs-academic", name: "Computer Science and Academic", line: "Course books and code" },
  { key: "urdu", name: "Urdu Literature", line: "اردو ادب" },
  { key: "kids", name: "Kids", line: "Stories for young readers" },
];

export const BOOKS: Book[] = [
  {
    id: 1,
    slug: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    group: "fiction",
    price: 1200,
    rating: 4.7,
    ratingCount: 318,
    short:
      "A shepherd boy leaves Andalusia to chase a treasure he saw in a dream, and learns to read the omens along the way.",
    full: [
      "Santiago is a young Andalusian shepherd who dreams of a treasure buried near the pyramids of Egypt. He sells his flock and sets out across the desert, meeting a king, a crystal merchant, an Englishman and finally the alchemist himself.",
      "Coelho's short fable is about listening to your heart, recognising opportunity and following your Personal Legend. It is one of the most translated books by a living author and a favourite first gift for new readers.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "red", motif: "sun" },
  },
  {
    id: 2,
    slug: "1984",
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    group: "fiction",
    price: 1100,
    rating: 4.8,
    ratingCount: 276,
    short:
      "Winston Smith rewrites history for the Party until he begins to doubt it. Orwell's warning about surveillance and truth.",
    full: [
      "In Airstrip One, Big Brother is always watching. Winston Smith works at the Ministry of Truth, altering records so the Party is never wrong. His quiet rebellion begins with a diary and a forbidden love affair.",
      "Published in 1949, 1984 gave the world words like doublethink and thoughtcrime. It remains the sharpest novel ever written about power, propaganda and the fragility of truth.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "black", motif: "eye" },
  },
  {
    id: 3,
    slug: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    group: "fiction",
    price: 950,
    rating: 4.6,
    ratingCount: 204,
    short:
      "Elizabeth Bennet and Mr Darcy misjudge each other at every turn. Austen's witty, warm story of first impressions.",
    full: [
      "When wealthy Mr Bingley rents Netherfield Park, the five Bennet sisters and their mother see a chance at marriage. Elizabeth, the sharpest of them, takes an instant dislike to Bingley's proud friend, Mr Darcy.",
      "Austen turns a story of manners into a lasting comedy about pride, prejudice and changing your mind. Over two centuries on, it still reads as fresh and funny as the day it was published.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "white", motif: "rings" },
  },
  {
    id: 4,
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    group: "self-help-business",
    price: 1800,
    rating: 4.9,
    ratingCount: 512,
    short:
      "Tiny changes, remarkable results. A practical system for building good habits and breaking bad ones, 1% at a time.",
    full: [
      "James Clear explains why habits are the compound interest of self-improvement. Rather than chasing big goals, he shows how to design small systems: make it obvious, make it attractive, make it easy, make it satisfying.",
      "Packed with examples from athletes, artists and scientists, Atomic Habits is a clear, usable guide for anyone who wants to study better, work better or simply live with more intention.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "white", motif: "steps" },
  },
  {
    id: 5,
    slug: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Business",
    group: "self-help-business",
    price: 1500,
    rating: 4.5,
    ratingCount: 389,
    short:
      "Two fathers, two very different lessons about money. Kiyosaki's classic on assets, liabilities and financial freedom.",
    full: [
      "Kiyosaki grew up with two father figures: his own highly educated but struggling father, and his best friend's father, who left school early and became wealthy. Their opposing views on money shaped his life.",
      "The book argues that the rich make money work for them, and that financial literacy is rarely taught in school. It has started more first conversations about investing than almost any other title.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "red", motif: "coins" },
  },
  {
    id: 6,
    slug: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self-Help",
    group: "self-help-business",
    price: 1700,
    rating: 4.6,
    ratingCount: 241,
    short:
      "Focused, distraction-free work is rare and valuable. Newport's rules for training your attention in a noisy world.",
    full: [
      "Cal Newport defines deep work as professional activity done in a state of distraction-free concentration that pushes your abilities to their limit. It is how hard things get learned and great work gets made.",
      "Through four rules (work deeply, embrace boredom, quit social media, drain the shallows) he offers a practical plan for students and professionals who want to do their best thinking again.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "black", motif: "focus" },
  },
  {
    id: 7,
    slug: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Computer Science",
    group: "cs-academic",
    price: 4500,
    rating: 4.7,
    ratingCount: 167,
    short:
      "A handbook of agile software craftsmanship. How to write code that other people, and future you, can read and change.",
    full: [
      "Uncle Bob Martin walks through the principles, patterns and practices of writing clean code: meaningful names, small functions, honest comments, careful error handling and tests you can trust.",
      "Case studies turn messy code into clean code step by step. A standard on reading lists for computer science students and working developers alike.",
    ],
    language: "English",
    studentEligible: true,
    cover: { theme: "black", motif: "braces" },
  },
  {
    id: 8,
    slug: "python-crash-course",
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Computer Science",
    group: "cs-academic",
    price: 3800,
    rating: 4.8,
    ratingCount: 198,
    short:
      "A hands-on, project-based introduction to programming. Learn Python basics, then build a game, charts and a web app.",
    full: [
      "The first half covers the fundamentals: variables, lists, loops, functions, classes and testing. The second half puts them to work in three projects: an arcade game, data visualisations and a Django web app.",
      "Clear explanations and exercises at the end of every chapter make it the most recommended first Python book for students and self-learners.",
    ],
    language: "English",
    studentEligible: true,
    cover: { theme: "red", motif: "snake" },
  },
  {
    id: 9,
    slug: "database-system-concepts",
    title: "Database System Concepts",
    author: "Silberschatz, Korth and Sudarshan",
    category: "Academic",
    group: "cs-academic",
    price: 5200,
    rating: 4.5,
    ratingCount: 94,
    short:
      "The standard university text on databases. Relational models, SQL, design, storage, indexing and transactions.",
    full: [
      "Used in database courses around the world, this text covers the relational model, SQL, entity-relationship design and normalisation, then moves on to storage, indexing, query processing and transaction management.",
      "Concepts are explained with a running university database example, making it a dependable companion from your first course to final-year projects.",
    ],
    language: "English",
    studentEligible: true,
    cover: { theme: "white", motif: "database" },
  },
  {
    id: 10,
    slug: "peer-e-kamil",
    title: "Peer-e-Kamil",
    urduTitle: "پیرِ کامل",
    author: "Umera Ahmed",
    category: "Urdu Literature",
    group: "urdu",
    price: 1600,
    rating: 4.9,
    ratingCount: 442,
    short:
      "Imama and Salar's journeys of faith, love and redemption. One of the most loved Urdu novels of its generation.",
    full: [
      "Imama Hashim, a young medical student, makes a choice that changes her family forever. Salar Sikandar, a brilliant and restless young man, is drawn into her story in ways neither of them expects.",
      "Umera Ahmed's novel follows both of them across years, asking what it means to search for the truth and to be forgiven. A modern classic of Urdu fiction, read and reread across Pakistan.",
    ],
    language: "Urdu",
    studentEligible: false,
    cover: { theme: "black", motif: "crescent" },
  },
  {
    id: 11,
    slug: "raja-gidh",
    title: "Raja Gidh",
    urduTitle: "راجہ گدھ",
    author: "Bano Qudsia",
    category: "Urdu Literature",
    group: "urdu",
    price: 1400,
    rating: 4.7,
    ratingCount: 213,
    short:
      "Bano Qudsia's landmark novel on halal and haram, desire and madness, told through a vulture's allegory.",
    full: [
      "Set around a group of students in Lahore, Raja Gidh follows Qayyum's restless pursuit of love and the slow damage of wanting what is forbidden. A parallel parliament of birds judges the vulture for eating the dead.",
      "Bano Qudsia weaves philosophy, mysticism and everyday Lahore into one of the most debated and admired novels in the Urdu language.",
    ],
    language: "Urdu",
    studentEligible: false,
    cover: { theme: "red", motif: "vulture" },
  },
  {
    id: 12,
    slug: "little-explorer-story-set",
    title: "Little Explorer Story Set",
    author: "Kitabistan Kids",
    category: "Kids",
    group: "kids",
    price: 1300,
    rating: 4.8,
    ratingCount: 126,
    short:
      "A set of illustrated bedtime stories about curiosity, kindness and adventure, for readers aged 4 to 8.",
    full: [
      "Each story follows a small explorer on a big day out: up a mountain, under the sea, into a busy bazaar and across the night sky. Short chapters and bright pictures make it easy to read aloud.",
      "A gentle first library for young readers, and a favourite gift for birthdays and Eid.",
    ],
    language: "English",
    studentEligible: false,
    cover: { theme: "white", motif: "kite" },
  },
];

export const getBook = (id: number) => BOOKS.find((b) => b.id === id)!;
export const getBookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug);
export const groupName = (key: GroupKey) => GROUPS.find((g) => g.key === key)!.name;

export const FEATURED = [1, 4, 7, 10, 5, 3, 8];
export const NEW_ARRIVALS = [8, 6, 12, 11];
export const BESTSELLERS = [4, 10, 1, 5];

/* Sample reviews, grouped by category. Replace with real customer reviews. */
export const BOOK_REVIEWS: Record<GroupKey, { name: string; city: string; rating: number; text: string }[]> = {
  fiction: [
    { name: "Mahnoor Ali", city: "Lahore", rating: 5, text: "Arrived well packed, crisp pages and a proper binding. Read it in two evenings." },
    { name: "Usman Qureshi", city: "Multan", rating: 4, text: "Good print quality and the price was lower than the shops near me." },
  ],
  "self-help-business": [
    { name: "Fatima Noor", city: "Karachi", rating: 5, text: "Original copy, not a reprint. I have already bought a second one as a gift." },
    { name: "Bilal Ahmed", city: "Faisalabad", rating: 4, text: "Paid cash at the door, no hassle. The book itself is worth every rupee." },
  ],
  "cs-academic": [
    { name: "Hamza Tariq", city: "Islamabad", rating: 5, text: "Student discount made this much easier on the budget. Clear print on the code samples." },
    { name: "Areeba Khan", city: "Peshawar", rating: 4, text: "Heavy book, packed carefully with no bent corners. Exactly what my course needed." },
  ],
  urdu: [
    { name: "Ayesha Siddiqui", city: "Lahore", rating: 5, text: "خوبصورت چھپائی اور مضبوط جلد۔ Lovely print and the Urdu type is easy to read." },
    { name: "Zainab Raza", city: "Rawalpindi", rating: 5, text: "Ordered for my mother, she was thrilled. Delivered to the door and paid on arrival." },
  ],
  kids: [
    { name: "Sana Malik", city: "Karachi", rating: 5, text: "My daughter asks for one story every night now. Bright pages that survive little hands." },
    { name: "Omer Farooq", city: "Hyderabad", rating: 4, text: "Nice set for the price. The pictures are the best part." },
  ],
};
