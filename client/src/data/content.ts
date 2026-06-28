export const MINERALS = [
  { symbol: 'Ca²⁺', name: 'Calcium', value: '240 mg/L', desc: 'About 99% of the calcium in our bodies is in our bones and teeth.' },
  { symbol: 'Na⁺', name: 'Sodium', value: '5.2 mg/L', desc: "It's an important component for proper muscle and nerve function." },
  { symbol: 'NO₃⁻', name: 'Nitrate', value: '4.4 mg/L', desc: "It's great for health to drink water with levels of nitrate under 10 mg/L." },
  { symbol: 'Mg²⁺', name: 'Magnesium', value: '42 mg/L', desc: 'Magnesium is a nutrient that the body needs to stay healthy.' },
  { symbol: 'SO₄²⁻', name: 'Sulfate', value: '400 mg/L', desc: 'Sulfate is among the most important macronutrients in cells.' },
  { symbol: 'HCO₃⁻', name: 'Bicarbonate', value: '384 mg/L', desc: 'Bicarbonate is an antacid used to relieve heartburn and acid indigestion.' },
];

export const TESTIMONIALS = [
  { name: 'Ayesha Malik', city: 'Karachi', text: 'Elegancía has completely changed my perception of bottled water. From its refined taste to the elegant packaging, everything speaks of class and purity.' },
  { name: 'Usman Sheikh', city: 'Lahore', text: 'We serve Elegancía at all our corporate meetings now. It reflects the premium image our brand stands for — simple, pure, and impressive in every detail.' },
  { name: 'Sara Khan', city: 'Islamabad', text: "There's something distinct about Elegancía. It's not just refreshing; it feels luxurious. Guests instantly notice the difference." },
  { name: 'Bilal Ahmed', city: 'Faisalabad', text: 'I tried Elegancía at a restaurant and immediately switched. The clarity, the smoothness — you can tell it\'s crafted for those who value quality.' },
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Distributors', path: '/distributors' },
  { label: 'Partner', path: '/partner' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_COLS = {
  getStarted: [
    { label: 'About', path: '/about' },
    { label: 'Why Choose Us', path: '/about#why' },
    { label: 'Distributors', path: '/distributors' },
    { label: 'Certification', path: '/certification' },
  ],
  moreInfo: [
    { label: 'Our Products', path: '/products' },
    { label: 'Become a Partner', path: '/partner' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Vision & Mission', path: '/#vision' },
  ],
  contact: {
    emails: ['sales@elegancia.com.pk', 'info@elegancia.com.pk'],
    phone: '+92 313 46 66 686',
    location: 'Pakistan',
  },
};

export const LEADERSHIP = [
  { name: 'Executive Leadership', role: 'Vision & Strategy', bio: 'Guiding Elegancía with a commitment to purity, elegance, and sustainable excellence across every market we serve.' },
  { name: 'Operations', role: 'Quality & Sourcing', bio: 'Ensuring every bottle meets the highest standards of mineral balance, safety, and premium presentation.' },
  { name: 'Partnerships', role: 'Distribution & Growth', bio: 'Building a global network of distributors who share our vision of refined hydration for elite experiences.' },
];

export interface LeaderProfile {
  name: string;
  role: string;
  tag: string;
  initials: string;
  image: string;
  lead: string;
  paragraphs: string[];
}

export const CHAIRMAN: LeaderProfile = {
  name: 'Muhammad Arslan',
  role: 'Chairman & Founder',
  tag: 'Chairman',
  initials: 'MA',
  image: '/assets/leadership/chairman.jpg',
  lead: 'Welcome to Elegancía — The Water of Elites.',
  paragraphs: [
    'When I founded Elegancía, my vision was to create a premium bottled water brand for those who value purity, taste, and quality without compromise.',
    'From advanced purification and mineral balance to hygienic bottling and secure packaging, every stage reflects our commitment to purity, reliability, and elegance.',
    'Designed for homes, offices, events, and hospitality partners, Elegancía is more than water — it is a statement of refined choice and modern living.',
    'Thank you for visiting us. We look forward to serving you with excellence in every detail.',
  ],
};

/** @deprecated use CHAIRMAN */
export const FOUNDER = CHAIRMAN;

export const CEO: LeaderProfile = {
  name: 'Muhammad Sufyan',
  role: 'Chief Executive Officer & Managing Director',
  tag: 'Executive',
  initials: 'MS',
  image: '/assets/leadership/ceo.jpg',
  lead: 'At Elegancía, our clients expect more than hydration — they expect reliability, consistency, and a brand that elevates every table it reaches.',
  paragraphs: [
    'As Chief Executive Officer, I lead day-to-day operations across production, logistics, and our distributor network — ensuring every order is fulfilled on time and every bottle meets our quality benchmarks.',
    'We invest in modern bottling practices, trained teams, and responsive client care. Our operations group coordinates closely with distributors and customers before, during, and after every delivery.',
    'Elegancía has earned the trust of households, restaurants, and corporate partners across Pakistan. That record reflects the discipline of our people and the vision our Chairman established from the start.',
    'Whether you need a single order or a long-term supply partnership, my commitment is the same: deliver exceptional service with integrity, efficiency, and care.',
  ],
};

export const LEADERSHIP_TEAM = [
  {
    name: 'Muhammad Zahid',
    role: 'National Sales Manager',
    initials: 'MZ',
    image: '/assets/leadership/zahid.jpg',
    bio: 'Muhammad Zahid leads national sales and area operations — coordinating distributor networks, regional growth, and on-ground execution to bring Elegancía to partners and customers across Pakistan.',
  },
];

export const LEADERSHIP_MISSION =
  'To deliver exceptional premium mineral water across Pakistan — with refined presentation, reliable logistics, and uncompromising quality — so every client enjoys purity, elegance, and confidence in every bottle.';

export const DISTRIBUTORS_INTRO =
  'Elegancía offers a strong brand appeal, positioning itself as a high-margin premium product that truly resonates with luxury consumers. Our distributors benefit from comprehensive marketing support, including access to professional media, digital campaigns, and in-store promotional assets that strengthen brand presence.';

export interface Distributor {
  name: string;
  city: string;
  phone?: string;
  email?: string | null;
  address?: string;
  image?: string;
}

export const DISTRIBUTORS: Distributor[] = [
  { name: 'Waleed Iqbal', city: 'Kohat', phone: '03055255234', email: 'ume9197@gmail.com', image: '/assets/distributors/waleed-iqbal.png' },
  { name: 'Farhad Ullah Khan', city: 'District Bannu', phone: '03330525827', email: 'farhadullahkhan690@gmail.com', image: '/assets/distributors/farhad-ullah-khan.png' },
  { name: 'Muhammad Farooq', city: 'Dera Ismail Khan', phone: '03339929039', email: 'farooqmarwat96@gmail.com', image: '/assets/distributors/muhammad-farooq.png' },
  { name: 'Abdul Waheed', city: 'Minakhel Bazar Lakki Marwat', phone: '03009061283, 03139061283', image: '/assets/distributors/abdul-waheed.png' },
  { name: 'Muhammad Ibrahim', city: 'Faisalabad', phone: '03000937749', image: '/assets/distributors/muhammad-ibrahim.png' },
  { name: 'Murad Khan', city: 'Temergarah', phone: '03479620775', email: 'Muradkhan775.mk@gmail.com', image: '/assets/distributors/murad-khan.png' },
  { name: 'Sajjad Khan', city: 'Chakdara Swat', phone: '03416664217', image: '/assets/distributors/sajjad-khan.png' },
  { name: 'Madar Khan', city: 'Kalam Swat', phone: '03149703644', email: 'Madarsangamhotel@gmail.com', image: '/assets/distributors/madar-khan.png' },
  { name: 'Imran Jamil Khan', city: 'Lahore', phone: '03151918113', email: 'imranqari577@gmail.com', image: '/assets/distributors/imran-jamil-khan.png' },
  { name: 'Muhammad Ijaz Swati', city: 'Mingora Swat', phone: '03473925491', image: '/assets/distributors/muhammad-ijaz-swati.png' },
  { name: 'Engr Javed Marwat', city: 'Rawalpindi', phone: '03101112277', email: 'Javedjamilone@gmail.com', image: '/assets/distributors/engr-javed-marwat.png' },
  { name: 'Pervaz Gill', city: 'District Lahore', phone: '03014557725', email: 'gillpervez271@gmail.com', image: '/assets/distributors/pervaz-gill.png' },
  { name: 'Iftikhar Khan', city: 'Bunair', phone: '03489086437', email: 'Iftookhan4@gmail.com', image: '/assets/distributors/iftikhar-khan.png' },
  { name: 'Waseem', city: 'District Nowshera', phone: '03451955295', email: 'waseemabbas17201@gmail.com', image: '/assets/distributors/waseem.png' },
  { name: 'Muhammad Anees Khan', city: 'Peshawar', phone: '03051991919', email: 'honeykhan387@gmail.com', image: '/assets/distributors/muhammad-anees-khan.png' },
  { name: 'Saddam Khan', city: 'Taxila Wah Cantt', phone: '03459333540', email: 'tabidaar@gmail.com', image: '/assets/distributors/saddam-khan.png' },
  { name: 'Muhammad Sajjad', city: 'Islamabad', phone: '03377227227', image: '/assets/distributors/muhammad-sajjad.png' },
  { name: 'Aqib Ali', city: 'Abbottabad', phone: '03345183548', image: '/assets/distributors/aqib-ali.png' },
  {
    name: 'Seth Enterprises #0004',
    city: 'Hyderabad',
    address: 'Office # 88, Pan Chowk, Hyderabad, Sindh, Pakistan',
    image: '/assets/logo.png',
  },
  {
    name: 'General Distributors #0005',
    city: 'Multan',
    address: 'Silk Way Road, Narrian Chowk, Multan, Pakistan',
    image: '/assets/logo.png',
  },
  {
    name: 'Shahzada Corporation #0006',
    city: 'Karachi',
    address: 'Peer Widai Road, Near Railway Station, Karachi, Pakistan',
    image: '/assets/logo.png',
  },
];

export const DISTRIBUTOR_BENEFITS = [
  'Exclusive territory partnerships across Pakistan and beyond',
  'Premium branding assets and point-of-sale materials',
  'Dedicated account management and logistics support',
  'Marketing co-investment for launch campaigns',
  'Certified quality assurance and compliance documentation',
];

export const STATS = [
  { value: '50,000+', label: 'Satisfied Customers' },
  { value: '200+', label: 'Partner Outlets' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '25+', label: 'Cities Served' },
];

export const WATER_CATEGORIES = [
  {
    title: 'Premium Collection',
    desc: 'Signature glass bottles crafted for elite tables, homes, and refined lifestyles.',
    path: '/products',
  },
  {
    title: 'Corporate Supply',
    desc: 'Bulk orders for offices, boardrooms, and executive meetings that reflect your brand.',
    path: '/partner',
  },
  {
    title: 'Events & Hospitality',
    desc: 'Hotels, restaurants, and ceremonies — premium hydration for memorable occasions.',
    path: '/distributors',
  },
];

export const WHY_CHOOSE = [
  {
    title: 'Certified Purity',
    desc: 'Every bottle meets rigorous mineral balance and safety standards — purity you can trust.',
  },
  {
    title: 'Premium Presentation',
    desc: 'Elegant glass packaging and refined branding designed for those who value detail.',
  },
  {
    title: 'Nationwide Reach',
    desc: 'Dedicated distribution network across Pakistan with reliable logistics and partner support.',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Browse collection',
    desc: 'Explore our 500ml and 1500ml premium glass bottles — crafted for elegance in every sip.',
  },
  {
    step: '02',
    title: 'Choose your volume',
    desc: 'Select the size and quantity that fits your home, office, or event requirements.',
  },
  {
    step: '03',
    title: 'Partner or order',
    desc: 'Become a distributor or place a direct order — our team confirms availability instantly.',
  },
  {
    step: '04',
    title: 'Enjoy pure elegance',
    desc: 'Receive premium mineral water bottled with care — The Water of Elites, delivered.',
  },
];
