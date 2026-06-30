// "Bengal Feed" — a read-only, threads-style feed of facts about Bengal, past and
// present. Each thread has one or more connected posts (1/n style). The Feed
// component reshuffles the order once per day so it feels fresh on return visits.
// category ∈ history | modern | culture.

export const FEED_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'history', label: 'History' },
  { id: 'modern', label: 'Modern' },
  { id: 'culture', label: 'Culture' },
]

export const THREADS = [
  {
    id: 't-mld',
    category: 'history',
    author: { name: 'Bhasha Bot', handle: 'bangla_bhasha', emoji: '🔤', color: 'indigo' },
    posts: [
      '🧵 Why is 21 February a worldwide observance? On this day in 1952, students in Dhaka were killed protesting for the right to use their mother tongue, Bangla. (1/3)',
      'Their sacrifice fuelled the Bengali Language Movement — and Bangla became a state language of what was then East Pakistan. (2/3)',
      'Decades later UNESCO named 21 Feb “International Mother Language Day”. So a day now honoured for every language on Earth traces back to Bengal. একুশে ফেব্রুয়ারি 🕊️ (3/3)',
    ],
  },
  {
    id: 't-tagore',
    category: 'history',
    author: { name: 'Itihaas Daily', handle: 'bengal_history', emoji: '📜', color: 'terracotta' },
    posts: [
      'In 1913, Rabindranath Tagore became the FIRST non-European to win the Nobel Prize in Literature — for his collection গীতাঞ্জলি (Gitanjali).',
      'He later composed the national anthems of TWO countries: India’s “Jana Gana Mana” and Bangladesh’s “Amar Shonar Bangla”. Still the only person ever to do so. 🇮🇳🇧🇩',
    ],
  },
  {
    id: 't-bose',
    category: 'history',
    author: { name: 'Science Adda', handle: 'boson_facts', emoji: '⚛️', color: 'teal' },
    posts: [
      'Ever heard of the “boson”? It’s named after Satyendra Nath Bose, a Bengali physicist whose 1924 work with Einstein gave us Bose–Einstein statistics. 🧪',
      'Another Bengali, Jagadish Chandra Bose, demonstrated radio waves before Marconi’s patent and pioneered the study of how plants respond to stimuli. 🌱',
    ],
  },
  {
    id: 't-metro',
    category: 'modern',
    author: { name: 'Kolkata Now', handle: 'cityofjoy', emoji: '🏙️', color: 'indigo' },
    posts: [
      'Kolkata opened India’s FIRST underground metro in 1984 — years ahead of any other Indian city. 🚇',
      'In 2024 it added India’s first under-river metro, running through a tunnel beneath the Hooghly. The network keeps growing.',
    ],
  },
  {
    id: 't-pujo',
    category: 'culture',
    author: { name: 'Pujo Vibes', handle: 'durga_pujo', emoji: '🪔', color: 'marigold' },
    posts: [
      'In 2021, UNESCO added Kolkata’s Durga Puja to its list of Intangible Cultural Heritage of Humanity. 🎉',
      'For five days the whole city turns into an open-air art gallery — pandals recreate temples, spaceships, even social-justice themes. শুভ পুজো!',
    ],
  },
  {
    id: 't-rosogolla',
    category: 'culture',
    author: { name: 'Mishti Map', handle: 'sweet_bengal', emoji: '🍮', color: 'terracotta' },
    posts: [
      'The রসগোল্লা (rosogolla) wars were real. West Bengal and Odisha both claimed the sweet — in 2017, Bengal won a Geographical Indication tag for “Banglar Rosogolla”. 🥇',
      'Pair it with a clay cup of কড়া দুধের চা, or finish a meal the Bengali way with মিষ্টি দই (sweet yogurt).',
    ],
  },
  {
    id: 't-muslin',
    category: 'history',
    author: { name: 'Itihaas Daily', handle: 'bengal_history', emoji: '📜', color: 'terracotta' },
    posts: [
      'Before polyester, Bengal wove “Dhaka muslin” — cotton so fine a full sari could be drawn through a finger ring. 🪡',
      'It was prized across the Roman and Mughal worlds. The craft was nearly lost under colonial rule, but weavers in Bangladesh are reviving it today.',
    ],
  },
  {
    id: 't-sundarban',
    category: 'modern',
    author: { name: 'Sundarban Watch', handle: 'royal_bengal', emoji: '🐅', color: 'good' },
    posts: [
      'Shared by India and Bangladesh, the Sundarbans is the world’s largest mangrove forest — and the only mangrove home of the Royal Bengal Tiger. 🐅🌿',
      'It’s a natural storm-shield for millions of people, and a UNESCO World Heritage Site on both sides of the border.',
    ],
  },
  {
    id: 't-quote',
    category: 'culture',
    author: { name: 'Robi Thakur Lines', handle: 'tagore_lines', emoji: '🎼', color: 'indigo' },
    posts: [
      '“যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই” — wherever you see ash, blow on it and look; you may yet find a gem. A line from Tagore on seeking value everywhere. ✨',
    ],
  },
  {
    id: 't-online',
    category: 'modern',
    author: { name: 'Digital Bangla', handle: 'digital_bangla', emoji: '📱', color: 'teal' },
    posts: [
      'Bangla is among the top 7 most-spoken languages on Earth, with 270M+ speakers across Bangladesh and eastern India — and one of the fastest-growing language communities online. 🌐',
    ],
  },
]
