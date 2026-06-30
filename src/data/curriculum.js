// ─────────────────────────────────────────────────────────────────────────
//  Bornomala curriculum — embedded Bengali content, aimed at a solid A2 base
//  (script → vocabulary → grammar → conversation → reading/writing).
//
//  Exercise kinds the lesson engine understands:
//   • mcq    — multiple choice           { kind, prompt, big?, options:[{bn?,label}], answer }
//   • match  — match Bengali ⇄ meaning   { kind, prompt, pairs:[{bn,sound}] }
//   • type   — type the Bengali word     { kind, prompt, big?, answer, accept?:[] }
//   • listen — audio recognition         { kind, prompt, say, roman?, options:[{bn}], answer }
//   • build  — tap-to-build a sentence   { kind, prompt, translation, answer:[...], pool?:[...] }
//   • trace  — trace-the-letter writing  { kind, char, romanization, note }
//   • speak  — speaking practice         { kind, prompt, target, romanization, translation? }
// ─────────────────────────────────────────────────────────────────────────

export const LEVELS = [
  // ══ LEVEL 1 · VOWELS ══════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Bengali Vowels',
    titleBn: 'স্বরবর্ণ',
    blurb: 'Meet all 11 vowels — the soul of every syllable.',
    color: 'teal',
    icon: '🪷',
    badge: { name: 'Vowel Voyager', emoji: '🪷', tagline: 'Learned all 11 Bengali vowels' },
    lessons: [
      {
        id: '1-1',
        title: 'অ and আ',
        exercises: [
          { kind: 'mcq', prompt: 'This is the very first letter of the alphabet. How is it read?', big: 'অ', options: [{ label: 'ô (as in “among”)' }, { label: 'i (as in “bee”)' }, { label: 'u (as in “boot”)' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which letter makes the long “a” sound, as in “father”?', options: [{ bn: 'অ' }, { bn: 'আ' }, { bn: 'ই' }], answer: 1 },
          { kind: 'match', prompt: 'Match each vowel to its sound', pairs: [{ bn: 'অ', sound: 'ô' }, { bn: 'আ', sound: 'a' }] },
          { kind: 'type', prompt: 'Type the vowel that sounds like “a” in father', big: 'a', answer: 'আ' },
          { kind: 'trace', char: 'অ', romanization: 'ô', note: 'Start with the loop on the left, then the upright on the right.' },
        ],
      },
      {
        id: '1-2',
        title: 'ই ঈ উ ঊ',
        exercises: [
          { kind: 'mcq', prompt: 'Which letter makes the “u” sound, as in “boot”?', options: [{ bn: 'উ' }, { bn: 'এ' }, { bn: 'ই' }], answer: 0 },
          { kind: 'listen', prompt: 'Tap the vowel you hear', say: 'ই', roman: 'i', options: [{ bn: 'উ' }, { bn: 'ই' }, { bn: 'আ' }], answer: 1 },
          { kind: 'match', prompt: 'Match each vowel to its sound', pairs: [{ bn: 'ই', sound: 'i (short)' }, { bn: 'ঈ', sound: 'ee (long)' }, { bn: 'উ', sound: 'u (short)' }, { bn: 'ঊ', sound: 'oo (long)' }] },
          { kind: 'mcq', prompt: 'Which is the long “ee” vowel?', options: [{ bn: 'ই' }, { bn: 'ঈ' }, { bn: 'এ' }], answer: 1 },
          { kind: 'type', prompt: 'Type the short “i” vowel', big: 'i', answer: 'ই' },
        ],
      },
      {
        id: '1-3',
        title: 'এ ঐ ও ঔ ঋ',
        exercises: [
          { kind: 'mcq', prompt: 'Which letter sounds like “e” in “bed”?', options: [{ bn: 'এ' }, { bn: 'ও' }, { bn: 'ঐ' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which letter sounds like “o” in “go”?', options: [{ bn: 'ঐ' }, { bn: 'ও' }, { bn: 'ঔ' }], answer: 1 },
          { kind: 'match', prompt: 'Match the diphthongs and ঋ', pairs: [{ bn: 'এ', sound: 'e' }, { bn: 'ঐ', sound: 'oi' }, { bn: 'ও', sound: 'o' }, { bn: 'ঔ', sound: 'ou' }, { bn: 'ঋ', sound: 'ri' }] },
          { kind: 'listen', prompt: 'Tap the vowel you hear', say: 'ও', roman: 'o', options: [{ bn: 'এ' }, { bn: 'ও' }, { bn: 'ঔ' }], answer: 1 },
        ],
      },
      {
        id: '1-4',
        title: 'All 11 vowels',
        exercises: [
          { kind: 'mcq', prompt: 'How many vowels are in the Bengali alphabet?', options: [{ label: '7' }, { label: '11' }, { label: '14' }], answer: 1 },
          { kind: 'mcq', prompt: 'Put them in order — which comes right after আ?', options: [{ bn: 'ই' }, { bn: 'উ' }, { bn: 'এ' }], answer: 0 },
          { kind: 'match', prompt: 'Match each vowel to its sound', pairs: [{ bn: 'অ', sound: 'ô' }, { bn: 'আ', sound: 'a' }, { bn: 'ই', sound: 'i' }, { bn: 'উ', sound: 'u' }, { bn: 'এ', sound: 'e' }, { bn: 'ও', sound: 'o' }] },
          { kind: 'type', prompt: 'Type the first vowel of the alphabet', answer: 'অ' },
        ],
      },
      {
        id: '1-5',
        title: 'Trace & write',
        exercises: [
          { kind: 'trace', char: 'আ', romanization: 'a', note: 'Like অ, plus an extra upright stroke on the far right.' },
          { kind: 'trace', char: 'এ', romanization: 'e', note: 'A single flowing curve under the headstroke.' },
          { kind: 'trace', char: 'উ', romanization: 'u', note: 'A small body with a tail curling down.' },
          { kind: 'trace', char: 'ও', romanization: 'o', note: 'Like এ with a small flag added on the right.' },
        ],
      },
      {
        id: '1-6',
        title: 'Listen & review',
        exercises: [
          { kind: 'listen', prompt: 'Tap the vowel you hear', say: 'উ', roman: 'u', options: [{ bn: 'অ' }, { bn: 'উ' }, { bn: 'এ' }], answer: 1 },
          { kind: 'listen', prompt: 'Tap the vowel you hear', say: 'আ', roman: 'a', options: [{ bn: 'আ' }, { bn: 'ই' }, { bn: 'ও' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which two vowels are the short/long “i” pair?', options: [{ bn: 'ই / ঈ' }, { bn: 'উ / ঊ' }, { bn: 'এ / ঐ' }], answer: 0 },
          { kind: 'speak', prompt: 'Say this vowel aloud', target: 'আ', romanization: 'a' },
        ],
      },
    ],
  },

  // ══ LEVEL 2 · CONSONANTS I ════════════════════════════════════════════════
  {
    id: 2,
    title: 'Consonants I',
    titleBn: 'ব্যঞ্জনবর্ণ ১',
    blurb: 'The first three families: the ক, চ and ট groups.',
    color: 'terracotta',
    icon: '🐚',
    badge: { name: 'Consonant Starter', emoji: '🐚', tagline: 'Learned your first 15 consonants' },
    lessons: [
      {
        id: '2-1',
        title: 'ক খ গ ঘ ঙ',
        exercises: [
          { kind: 'mcq', prompt: 'This consonant is “kô”. Which one is it?', big: 'ক', options: [{ label: 'kô' }, { label: 'gô' }, { label: 'chô' }], answer: 0 },
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'ক', sound: 'kô' }, { bn: 'খ', sound: 'khô' }, { bn: 'গ', sound: 'gô' }, { bn: 'ঘ', sound: 'ghô' }, { bn: 'ঙ', sound: 'ngô' }] },
          { kind: 'mcq', prompt: 'Which letter is “gô” (as in “go”)?', options: [{ bn: 'ক' }, { bn: 'গ' }, { bn: 'ঘ' }], answer: 1 },
          { kind: 'listen', prompt: 'Tap the consonant you hear', say: 'খ', roman: 'khô', options: [{ bn: 'ক' }, { bn: 'খ' }, { bn: 'গ' }], answer: 1 },
          { kind: 'mcq', prompt: 'খ is the “breathy” version of which letter?', options: [{ bn: 'ক' }, { bn: 'গ' }, { bn: 'ঙ' }], answer: 0 },
        ],
      },
      {
        id: '2-2',
        title: 'চ ছ জ ঝ ঞ',
        exercises: [
          { kind: 'mcq', prompt: 'This consonant is “chô” (as in “chair”). Which one?', big: 'চ', options: [{ label: 'chô' }, { label: 'jô' }, { label: 'tô' }], answer: 0 },
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'চ', sound: 'chô' }, { bn: 'ছ', sound: 'chhô' }, { bn: 'জ', sound: 'jô' }, { bn: 'ঝ', sound: 'jhô' }] },
          { kind: 'mcq', prompt: 'Which letter is “jô” (as in “jam”)?', options: [{ bn: 'চ' }, { bn: 'জ' }, { bn: 'ঝ' }], answer: 1 },
          { kind: 'type', prompt: 'Type the letter “chô”', big: 'chô', answer: 'চ' },
        ],
      },
      {
        id: '2-3',
        title: 'ট ঠ ড ঢ ণ (retroflex)',
        exercises: [
          { kind: 'mcq', prompt: 'These are the “retroflex” sounds — the tongue curls back. ট is…', big: 'ট', options: [{ label: 'ṭô (hard t)' }, { label: 'tô (soft t)' }, { label: 'dô' }], answer: 0 },
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'ট', sound: 'ṭô' }, { bn: 'ঠ', sound: 'ṭhô' }, { bn: 'ড', sound: 'ḍô' }, { bn: 'ঢ', sound: 'ḍhô' }, { bn: 'ণ', sound: 'ṇô' }] },
          { kind: 'mcq', prompt: 'Which is the hard “ḍô”?', options: [{ bn: 'ট' }, { bn: 'ড' }, { bn: 'ঢ' }], answer: 1 },
          { kind: 'listen', prompt: 'Tap the consonant you hear', say: 'গ', roman: 'gô', options: [{ bn: 'ক' }, { bn: 'গ' }, { bn: 'ট' }], answer: 1 },
        ],
      },
      {
        id: '2-4',
        title: 'Trace consonants',
        exercises: [
          { kind: 'trace', char: 'ক', romanization: 'kô', note: 'A loop, a vertical stroke, then the headstroke on top.' },
          { kind: 'trace', char: 'গ', romanization: 'gô', note: 'Note the small hook at the lower left.' },
          { kind: 'trace', char: 'চ', romanization: 'chô', note: 'A rounded body sitting under the headstroke.' },
          { kind: 'trace', char: 'ট', romanization: 'ṭô', note: 'A bowl shape — the retroflex “t”.' },
        ],
      },
      {
        id: '2-5',
        title: 'Mix & review',
        exercises: [
          { kind: 'listen', prompt: 'Tap the consonant you hear', say: 'খ', roman: 'khô', options: [{ bn: 'ক' }, { bn: 'খ' }, { bn: 'গ' }], answer: 1 },
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'ক', sound: 'kô' }, { bn: 'চ', sound: 'chô' }, { bn: 'গ', sound: 'gô' }, { bn: 'জ', sound: 'jô' }, { bn: 'ট', sound: 'ṭô' }] },
          { kind: 'mcq', prompt: 'Each consonant has a built-in vowel. ক is read…', options: [{ label: 'just “k”' }, { label: '“kô”' }, { label: '“ka”' }], answer: 1 },
          { kind: 'speak', prompt: 'Say this letter aloud', target: 'ক', romanization: 'kô' },
        ],
      },
    ],
  },

  // ══ LEVEL 3 · CONSONANTS II & MATRA ═══════════════════════════════════════
  {
    id: 3,
    title: 'Consonants II & Matra',
    titleBn: 'মাত্রা ও যুক্তবর্ণ',
    blurb: 'The rest of the consonants, the vowel-sign system, and conjuncts.',
    color: 'marigold',
    icon: '➖',
    badge: { name: 'Matra Master', emoji: '➖', tagline: 'Cracked vowel-signs and conjuncts' },
    lessons: [
      {
        id: '3-1',
        title: 'ত থ দ ধ ন',
        exercises: [
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'ত', sound: 'tô' }, { bn: 'থ', sound: 'thô' }, { bn: 'দ', sound: 'dô' }, { bn: 'ধ', sound: 'dhô' }, { bn: 'ন', sound: 'nô' }] },
          { kind: 'mcq', prompt: 'Which letter is “nô”?', options: [{ bn: 'ত' }, { bn: 'দ' }, { bn: 'ন' }], answer: 2 },
          { kind: 'mcq', prompt: 'ত (soft t) vs ট (hard t) — which is the soft, dental one?', options: [{ bn: 'ত' }, { bn: 'ট' }], answer: 0 },
        ],
      },
      {
        id: '3-2',
        title: 'প ফ ব ভ ম',
        exercises: [
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'প', sound: 'pô' }, { bn: 'ফ', sound: 'phô' }, { bn: 'ব', sound: 'bô' }, { bn: 'ভ', sound: 'bhô' }, { bn: 'ম', sound: 'mô' }] },
          { kind: 'mcq', prompt: 'Which letter is “mô”?', options: [{ bn: 'ব' }, { bn: 'ম' }, { bn: 'ন' }], answer: 1 },
          { kind: 'mcq', prompt: 'Which letter is “bhô” (breathy b)?', options: [{ bn: 'ব' }, { bn: 'ভ' }, { bn: 'ফ' }], answer: 1 },
        ],
      },
      {
        id: '3-3',
        title: 'য র ল শ ষ স হ',
        exercises: [
          { kind: 'match', prompt: 'Match consonant to sound', pairs: [{ bn: 'য', sound: 'jô/ya' }, { bn: 'র', sound: 'rô' }, { bn: 'ল', sound: 'lô' }, { bn: 'হ', sound: 'hô' }] },
          { kind: 'mcq', prompt: 'Bengali has three “sh/s” letters. Which sound do শ ষ স usually make?', options: [{ label: 'like “sh”' }, { label: 'like “z”' }, { label: 'like “f”' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which letter is “lô”?', options: [{ bn: 'র' }, { bn: 'ল' }, { bn: 'শ' }], answer: 1 },
          { kind: 'mcq', prompt: 'There are also extra letters: ড় (ṛô), ঢ়, য় (yô) and ং (ng). ং is called…', options: [{ label: 'anusvar (ng sound)' }, { label: 'a vowel' }, { label: 'a number' }], answer: 0 },
        ],
      },
      {
        id: '3-4',
        title: 'The matra (vowel signs)',
        exercises: [
          { kind: 'mcq', prompt: 'ক alone is “kô”. Add the আ-sign → কা. How is it read now?', big: 'কা', options: [{ label: 'ki' }, { label: 'ka' }, { label: 'ku' }], answer: 1 },
          { kind: 'mcq', prompt: 'কি — what sound is this?', big: 'কি', options: [{ label: 'ka' }, { label: 'ki' }, { label: 'ku' }], answer: 1 },
          { kind: 'mcq', prompt: 'কু — what sound is this?', big: 'কু', options: [{ label: 'ku' }, { label: 'ko' }, { label: 'ke' }], answer: 0 },
          { kind: 'match', prompt: 'Match the syllable to its sound', pairs: [{ bn: 'কা', sound: 'ka' }, { bn: 'কি', sound: 'ki' }, { bn: 'কু', sound: 'ku' }, { bn: 'কে', sound: 'ke' }, { bn: 'কো', sound: 'ko' }] },
        ],
      },
      {
        id: '3-5',
        title: 'Building syllables',
        exercises: [
          { kind: 'mcq', prompt: 'ম + আ-sign = ?', options: [{ bn: 'মি' }, { bn: 'মা' }, { bn: 'মু' }], answer: 1 },
          { kind: 'type', prompt: 'Type the syllable “ma” (as in mother)', big: 'ma', answer: 'মা' },
          { kind: 'match', prompt: 'Match the syllable to its sound', pairs: [{ bn: 'বা', sound: 'ba' }, { bn: 'বি', sound: 'bi' }, { bn: 'বে', sound: 'be' }, { bn: 'বো', sound: 'bo' }] },
          { kind: 'listen', prompt: 'Tap the syllable you hear', say: 'কে', roman: 'ke', options: [{ bn: 'কা' }, { bn: 'কি' }, { bn: 'কে' }], answer: 2 },
          { kind: 'type', prompt: 'Type the syllable “bi”', big: 'bi', answer: 'বি' },
        ],
      },
      {
        id: '3-6',
        title: 'Conjuncts (যুক্তবর্ণ)',
        exercises: [
          { kind: 'mcq', prompt: 'Two consonants can fuse into one shape. ক+ষ becomes ক্ষ. In পরীক্ষা (exam) it sounds like…', big: 'ক্ষ', options: [{ label: '“kkho”' }, { label: '“ksh” → roughly “kkho”' }, { label: '“sô”' }], answer: 1 },
          { kind: 'match', prompt: 'Match the conjunct word to its meaning', pairs: [{ bn: 'জ্ঞান', sound: 'knowledge' }, { bn: 'রক্ত', sound: 'blood' }, { bn: 'আনন্দ', sound: 'joy' }, { bn: 'বন্ধু', sound: 'friend' }] },
          { kind: 'mcq', prompt: 'রাস্তা (road) contains the conjunct স্ত (s+t). Which letters fuse?', options: [{ label: 'স + ত' }, { label: 'র + ত' }, { label: 'ন + দ' }], answer: 0 },
          { kind: 'mcq', prompt: 'ঠান্ডা means “cold”. The conjunct ন্ড is…', options: [{ label: 'ন + ড' }, { label: 'ন + দ' }, { label: 'ণ + ট' }], answer: 0 },
        ],
      },
      {
        id: '3-7',
        title: 'Trace with matra',
        exercises: [
          { kind: 'trace', char: 'কা', romanization: 'ka', note: 'Write ক, then the upright আ-sign to its right.' },
          { kind: 'trace', char: 'কি', romanization: 'ki', note: 'The ই-sign hooks in FRONT of the letter.' },
          { kind: 'trace', char: 'মা', romanization: 'ma', note: 'You just wrote “mother”!' },
          { kind: 'speak', prompt: 'Read this syllable aloud', target: 'মা', romanization: 'ma' },
        ],
      },
    ],
  },

  // ══ LEVEL 4 · FIRST WORDS ═════════════════════════════════════════════════
  {
    id: 4,
    title: 'First Words',
    titleBn: 'শব্দভাণ্ডার',
    blurb: 'Build a real vocabulary: people, home, nature, body, food, animals.',
    color: 'teal',
    icon: '🏡',
    badge: { name: 'Word Weaver', emoji: '🧶', tagline: 'Built a starter Bengali vocabulary' },
    lessons: [
      {
        id: '4-1',
        title: 'Family',
        exercises: [
          { kind: 'mcq', prompt: 'What does মা mean?', big: 'মা', options: [{ label: 'mother' }, { label: 'father' }, { label: 'sister' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which word means “father”?', options: [{ bn: 'মা' }, { bn: 'বাবা' }, { bn: 'ভাই' }], answer: 1 },
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'মা', sound: 'mother' }, { bn: 'বাবা', sound: 'father' }, { bn: 'ভাই', sound: 'brother' }, { bn: 'বোন', sound: 'sister' }] },
          { kind: 'type', prompt: 'Type the Bengali word for “mother”', answer: 'মা' },
          { kind: 'listen', prompt: 'Tap the word you hear', say: 'বাবা', roman: 'baba', options: [{ bn: 'মা' }, { bn: 'বাবা' }, { bn: 'বোন' }], answer: 1 },
        ],
      },
      {
        id: '4-2',
        title: 'More people',
        exercises: [
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'ছেলে', sound: 'boy/son' }, { bn: 'মেয়ে', sound: 'girl/daughter' }, { bn: 'বন্ধু', sound: 'friend' }, { bn: 'লোক', sound: 'person' }] },
          { kind: 'mcq', prompt: 'What does বন্ধু mean?', big: 'বন্ধু', options: [{ label: 'friend' }, { label: 'enemy' }, { label: 'teacher' }], answer: 0 },
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'দাদা', sound: 'elder brother' }, { bn: 'দিদি', sound: 'elder sister' }, { bn: 'কাকা', sound: 'uncle' }, { bn: 'মাসি', sound: 'aunt (mother’s sister)' }] },
          { kind: 'type', prompt: 'Type the word for “girl / daughter”', answer: 'মেয়ে' },
        ],
      },
      {
        id: '4-3',
        title: 'Home & objects',
        exercises: [
          { kind: 'mcq', prompt: 'What does ঘর mean?', big: 'ঘর', options: [{ label: 'house / room' }, { label: 'book' }, { label: 'water' }], answer: 0 },
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'ঘর', sound: 'house/room' }, { bn: 'দরজা', sound: 'door' }, { bn: 'জানালা', sound: 'window' }, { bn: 'চেয়ার', sound: 'chair' }, { bn: 'টেবিল', sound: 'table' }] },
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'বই', sound: 'book' }, { bn: 'কলম', sound: 'pen' }, { bn: 'চাবি', sound: 'key' }, { bn: 'বিছানা', sound: 'bed' }] },
          { kind: 'type', prompt: 'Type the Bengali word for “book”', answer: 'বই' },
          { kind: 'listen', prompt: 'Tap the word you hear', say: 'জল', roman: 'jol', options: [{ bn: 'ঘর' }, { bn: 'জল' }, { bn: 'বই' }], answer: 1 },
        ],
      },
      {
        id: '4-4',
        title: 'Nature',
        exercises: [
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'ফুল', sound: 'flower' }, { bn: 'গাছ', sound: 'tree' }, { bn: 'নদী', sound: 'river' }, { bn: 'আকাশ', sound: 'sky' }, { bn: 'সূর্য', sound: 'sun' }] },
          { kind: 'mcq', prompt: 'What does ফুল mean?', big: 'ফুল', options: [{ label: 'flower' }, { label: 'fish' }, { label: 'bird' }], answer: 0 },
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'চাঁদ', sound: 'moon' }, { bn: 'বৃষ্টি', sound: 'rain' }, { bn: 'মেঘ', sound: 'cloud' }, { bn: 'পাহাড়', sound: 'mountain' }] },
          { kind: 'type', prompt: 'Type the Bengali word for “tree”', answer: 'গাছ' },
        ],
      },
      {
        id: '4-5',
        title: 'The body',
        exercises: [
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'চোখ', sound: 'eye' }, { bn: 'হাত', sound: 'hand' }, { bn: 'মুখ', sound: 'face/mouth' }, { bn: 'মাথা', sound: 'head' }, { bn: 'পা', sound: 'foot/leg' }] },
          { kind: 'mcq', prompt: 'What does হাত mean?', big: 'হাত', options: [{ label: 'hand' }, { label: 'eye' }, { label: 'head' }], answer: 0 },
          { kind: 'listen', prompt: 'Tap the word you hear', say: 'চোখ', roman: 'chokh', options: [{ bn: 'হাত' }, { bn: 'চোখ' }, { bn: 'মুখ' }], answer: 1 },
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'কান', sound: 'ear' }, { bn: 'নাক', sound: 'nose' }, { bn: 'চুল', sound: 'hair' }, { bn: 'দাঁত', sound: 'tooth' }] },
        ],
      },
      {
        id: '4-6',
        title: 'Food & drink',
        exercises: [
          { kind: 'match', prompt: 'Match the food word', pairs: [{ bn: 'ভাত', sound: 'rice' }, { bn: 'রুটি', sound: 'bread' }, { bn: 'মাছ', sound: 'fish' }, { bn: 'ডিম', sound: 'egg' }, { bn: 'ডাল', sound: 'lentils' }] },
          { kind: 'match', prompt: 'Match the drink/word', pairs: [{ bn: 'জল', sound: 'water' }, { bn: 'দুধ', sound: 'milk' }, { bn: 'চা', sound: 'tea' }, { bn: 'চিনি', sound: 'sugar' }] },
          { kind: 'mcq', prompt: 'Which word means “rice” (cooked)?', options: [{ bn: 'ডাল' }, { bn: 'ভাত' }, { bn: 'চা' }], answer: 1 },
          { kind: 'type', prompt: 'Type the Bengali word for “fish”', answer: 'মাছ' },
          { kind: 'match', prompt: 'Match the fruit', pairs: [{ bn: 'আম', sound: 'mango' }, { bn: 'কলা', sound: 'banana' }, { bn: 'মিষ্টি', sound: 'sweets' }] },
        ],
      },
      {
        id: '4-7',
        title: 'Animals',
        exercises: [
          { kind: 'match', prompt: 'Match the animal', pairs: [{ bn: 'মাছ', sound: 'fish' }, { bn: 'পাখি', sound: 'bird' }, { bn: 'কুকুর', sound: 'dog' }, { bn: 'বিড়াল', sound: 'cat' }, { bn: 'গরু', sound: 'cow' }] },
          { kind: 'mcq', prompt: 'Which word means “bird”?', options: [{ bn: 'গাছ' }, { bn: 'পাখি' }, { bn: 'ফুল' }], answer: 1 },
          { kind: 'match', prompt: 'Match the animal', pairs: [{ bn: 'বাঘ', sound: 'tiger' }, { bn: 'হাতি', sound: 'elephant' }, { bn: 'ঘোড়া', sound: 'horse' }, { bn: 'সাপ', sound: 'snake' }] },
          { kind: 'listen', prompt: 'Tap the word you hear', say: 'কুকুর', roman: 'kukur (dog)', options: [{ bn: 'গরু' }, { bn: 'কুকুর' }, { bn: 'বিড়াল' }], answer: 1 },
        ],
      },
      {
        id: '4-8',
        title: 'Vocabulary review',
        exercises: [
          { kind: 'match', prompt: 'Match the word to its meaning', pairs: [{ bn: 'মা', sound: 'mother' }, { bn: 'ঘর', sound: 'house' }, { bn: 'ফুল', sound: 'flower' }, { bn: 'মাছ', sound: 'fish' }, { bn: 'চোখ', sound: 'eye' }, { bn: 'দুধ', sound: 'milk' }] },
          { kind: 'type', prompt: 'Type the Bengali word for “water”', answer: 'জল', accept: ['পানি'] },
          { kind: 'mcq', prompt: 'Which of these is a drink?', options: [{ bn: 'চেয়ার' }, { bn: 'চা' }, { bn: 'কলম' }], answer: 1 },
          { kind: 'speak', prompt: 'Say the word for “flower”', target: 'ফুল', romanization: 'phul', translation: 'flower' },
        ],
      },
    ],
  },

  // ══ LEVEL 5 · NUMBERS, COLORS & TIME ══════════════════════════════════════
  {
    id: 5,
    title: 'Numbers, Colors & Time',
    titleBn: 'সংখ্যা, রং ও সময়',
    blurb: 'Count, name colors, use classifiers, and tell the days and times.',
    color: 'marigold',
    icon: '🌈',
    badge: { name: 'Rainbow Counter', emoji: '🌈', tagline: 'Numbers, colors, days & classifiers' },
    lessons: [
      {
        id: '5-1',
        title: 'One to five',
        exercises: [
          { kind: 'mcq', prompt: 'What number is এক?', big: 'এক', options: [{ label: '1' }, { label: '2' }, { label: '3' }], answer: 0 },
          { kind: 'match', prompt: 'Match the number word', pairs: [{ bn: 'এক', sound: '1' }, { bn: 'দুই', sound: '2' }, { bn: 'তিন', sound: '3' }, { bn: 'চার', sound: '4' }, { bn: 'পাঁচ', sound: '5' }] },
          { kind: 'mcq', prompt: 'Which word means “three”?', options: [{ bn: 'দুই' }, { bn: 'তিন' }, { bn: 'চার' }], answer: 1 },
          { kind: 'type', prompt: 'Type the Bengali word for “two”', answer: 'দুই' },
        ],
      },
      {
        id: '5-2',
        title: 'Six to ten',
        exercises: [
          { kind: 'match', prompt: 'Match the number word', pairs: [{ bn: 'ছয়', sound: '6' }, { bn: 'সাত', sound: '7' }, { bn: 'আট', sound: '8' }, { bn: 'নয়', sound: '9' }, { bn: 'দশ', sound: '10' }] },
          { kind: 'mcq', prompt: 'What number is দশ?', big: 'দশ', options: [{ label: '8' }, { label: '9' }, { label: '10' }], answer: 2 },
          { kind: 'listen', prompt: 'Tap the number you hear', say: 'সাত', roman: 'shat (7)', options: [{ bn: 'ছয়' }, { bn: 'সাত' }, { bn: 'আট' }], answer: 1 },
          { kind: 'mcq', prompt: 'Which means “nine”?', options: [{ bn: 'নয়' }, { bn: 'দশ' }, { bn: 'ছয়' }], answer: 0 },
        ],
      },
      {
        id: '5-3',
        title: 'Bigger numbers',
        exercises: [
          { kind: 'match', prompt: 'Match the number word', pairs: [{ bn: 'এগারো', sound: '11' }, { bn: 'বারো', sound: '12' }, { bn: 'পনেরো', sound: '15' }, { bn: 'কুড়ি', sound: '20' }] },
          { kind: 'match', prompt: 'Match the tens', pairs: [{ bn: 'ত্রিশ', sound: '30' }, { bn: 'পঞ্চাশ', sound: '50' }, { bn: 'একশো', sound: '100' }] },
          { kind: 'mcq', prompt: 'কুড়ি (also বিশ) means…', options: [{ label: '12' }, { label: '20' }, { label: '50' }], answer: 1 },
          { kind: 'mcq', prompt: 'একশো means…', options: [{ label: '10' }, { label: '100' }, { label: '1000' }], answer: 1 },
        ],
      },
      {
        id: '5-4',
        title: 'Numerals & classifiers',
        exercises: [
          { kind: 'match', prompt: 'Match the Bengali numeral to its value', pairs: [{ bn: '১', sound: '1' }, { bn: '২', sound: '2' }, { bn: '৩', sound: '3' }, { bn: '৫', sound: '5' }, { bn: '৭', sound: '7' }] },
          { kind: 'mcq', prompt: 'Bengali uses counter words. একটা বই means…', options: [{ label: 'one book' }, { label: 'one person' }, { label: 'a few books' }], answer: 0 },
          { kind: 'mcq', prompt: 'For people you use জন. তিনজন লোক means…', options: [{ label: 'three people' }, { label: 'third person' }, { label: 'three books' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which counter goes with a countable object like a pen?', big: 'একটা কলম', options: [{ label: 'টা / টি' }, { label: 'জন' }, { label: 'বার' }], answer: 0 },
          { kind: 'type', prompt: 'Type the Bengali numeral for 3', big: '3', answer: '৩' },
        ],
      },
      {
        id: '5-5',
        title: 'Colors',
        exercises: [
          { kind: 'match', prompt: 'Match the color', pairs: [{ bn: 'লাল', sound: 'red' }, { bn: 'নীল', sound: 'blue' }, { bn: 'সবুজ', sound: 'green' }, { bn: 'হলুদ', sound: 'yellow' }] },
          { kind: 'mcq', prompt: 'What color is লাল?', big: 'লাল', options: [{ label: 'red' }, { label: 'blue' }, { label: 'green' }], answer: 0 },
          { kind: 'match', prompt: 'Match the color', pairs: [{ bn: 'কালো', sound: 'black' }, { bn: 'সাদা', sound: 'white' }, { bn: 'কমলা', sound: 'orange' }, { bn: 'গোলাপি', sound: 'pink' }] },
          { kind: 'type', prompt: 'Type the Bengali word for “blue”', answer: 'নীল' },
          { kind: 'listen', prompt: 'Tap the color you hear', say: 'সবুজ', roman: 'sobuj (green)', options: [{ bn: 'লাল' }, { bn: 'সবুজ' }, { bn: 'হলুদ' }], answer: 1 },
        ],
      },
      {
        id: '5-6',
        title: 'Days of the week',
        exercises: [
          { kind: 'match', prompt: 'Match the day', pairs: [{ bn: 'সোমবার', sound: 'Monday' }, { bn: 'মঙ্গলবার', sound: 'Tuesday' }, { bn: 'বুধবার', sound: 'Wednesday' }, { bn: 'শুক্রবার', sound: 'Friday' }, { bn: 'রবিবার', sound: 'Sunday' }] },
          { kind: 'mcq', prompt: 'All weekday names end in the same word. What does -বার mean here?', options: [{ label: 'day (of the week)' }, { label: 'time' }, { label: 'month' }], answer: 0 },
          { kind: 'mcq', prompt: 'Which is “Sunday”?', options: [{ bn: 'রবিবার' }, { bn: 'শনিবার' }, { bn: 'সোমবার' }], answer: 0 },
        ],
      },
      {
        id: '5-7',
        title: 'Time & day-parts',
        exercises: [
          { kind: 'match', prompt: 'Match parts of the day', pairs: [{ bn: 'সকাল', sound: 'morning' }, { bn: 'দুপুর', sound: 'noon' }, { bn: 'বিকেল', sound: 'afternoon' }, { bn: 'সন্ধ্যা', sound: 'evening' }, { bn: 'রাত', sound: 'night' }] },
          { kind: 'match', prompt: 'Match the time word', pairs: [{ bn: 'আজ', sound: 'today' }, { bn: 'গতকাল', sound: 'yesterday' }, { bn: 'আগামীকাল', sound: 'tomorrow' }, { bn: 'এখন', sound: 'now' }] },
          { kind: 'mcq', prompt: 'What does এখন mean?', big: 'এখন', options: [{ label: 'now' }, { label: 'later' }, { label: 'never' }], answer: 0 },
          { kind: 'mcq', prompt: 'সময় means…', options: [{ label: 'time' }, { label: 'morning' }, { label: 'week' }], answer: 0 },
        ],
      },
      {
        id: '5-8',
        title: 'Review & build',
        exercises: [
          { kind: 'build', prompt: 'Build: “the sky is blue”', translation: 'The sky is blue. (sky blue)', answer: ['আকাশ', 'নীল'], pool: ['আকাশ', 'নীল', 'লাল', 'গাছ'] },
          { kind: 'build', prompt: 'Build: “I have two books”', translation: 'I have two books. (My two-CL book there-is)', answer: ['আমার', 'দুটো', 'বই', 'আছে'], pool: ['আমার', 'দুটো', 'বই', 'আছে', 'তিনটে', 'নেই'] },
          { kind: 'mcq', prompt: 'Which word means “white”?', options: [{ bn: 'কালো' }, { bn: 'সাদা' }, { bn: 'লাল' }], answer: 1 },
          { kind: 'speak', prompt: 'Say the word for “red”', target: 'লাল', romanization: 'lal', translation: 'red' },
        ],
      },
    ],
  },

  // ══ LEVEL 6 · GRAMMAR & SENTENCES ═════════════════════════════════════════
  {
    id: 6,
    title: 'Grammar & Sentences',
    titleBn: 'ব্যাকরণ ও বাক্য',
    blurb: 'Pronouns, verb tenses, plurals, postpositions, questions & negation.',
    color: 'terracotta',
    icon: '🧱',
    badge: { name: 'Grammar Builder', emoji: '🧱', tagline: 'Mastered the core of Bengali grammar' },
    lessons: [
      {
        id: '6-1',
        title: 'Pronouns',
        exercises: [
          { kind: 'match', prompt: 'Match the pronoun', pairs: [{ bn: 'আমি', sound: 'I' }, { bn: 'তুমি', sound: 'you' }, { bn: 'সে', sound: 'he/she' }, { bn: 'আমরা', sound: 'we' }, { bn: 'তারা', sound: 'they' }] },
          { kind: 'mcq', prompt: 'সে can mean…', options: [{ label: 'only “he”' }, { label: 'only “she”' }, { label: 'either “he” or “she”' }], answer: 2 },
          { kind: 'mcq', prompt: 'Which is the polite/formal “you”?', options: [{ bn: 'তুই' }, { bn: 'তুমি' }, { bn: 'আপনি' }], answer: 2 },
          { kind: 'match', prompt: 'Match the demonstrative', pairs: [{ bn: 'এটা', sound: 'this' }, { bn: 'ওটা', sound: 'that' }, { bn: 'এখানে', sound: 'here' }, { bn: 'ওখানে', sound: 'there' }] },
        ],
      },
      {
        id: '6-2',
        title: 'Present tense',
        exercises: [
          { kind: 'mcq', prompt: 'The verb খাওয়া = “to eat”. “I eat” is আমি ___', options: [{ bn: 'খাই' }, { bn: 'খাও' }, { bn: 'খায়' }], answer: 0 },
          { kind: 'mcq', prompt: '“He/she eats” is সে ___', options: [{ bn: 'খাই' }, { bn: 'খাও' }, { bn: 'খায়' }], answer: 2 },
          { kind: 'match', prompt: 'Match the form of করা (to do)', pairs: [{ bn: 'করি', sound: 'I do' }, { bn: 'করো', sound: 'you do' }, { bn: 'করে', sound: 's/he does' }, { bn: 'করেন', sound: 'you/he does (formal)' }] },
          { kind: 'build', prompt: 'Build: “I eat rice”', translation: 'I eat rice. (I rice eat)', answer: ['আমি', 'ভাত', 'খাই'], pool: ['আমি', 'ভাত', 'খাই', 'খায়', 'পড়ি'] },
          { kind: 'mcq', prompt: 'In Bengali, the verb usually comes…', options: [{ label: 'first' }, { label: 'in the middle' }, { label: 'last' }], answer: 2 },
        ],
      },
      {
        id: '6-3',
        title: '“To be”, have & this-is',
        exercises: [
          { kind: 'mcq', prompt: 'For “this is a book”, Bengali often uses NO verb: এটা একটা বই. Why?', options: [{ label: 'the present “is” is usually dropped' }, { label: 'বই means “is”' }, { label: 'it’s a question' }], answer: 0 },
          { kind: 'mcq', prompt: 'আছে means…', big: 'আছে', options: [{ label: 'there is / have' }, { label: 'there is not' }, { label: 'goes' }], answer: 0 },
          { kind: 'mcq', prompt: 'নেই means…', big: 'নেই', options: [{ label: 'have / there is' }, { label: 'have not / there isn’t' }, { label: 'comes' }], answer: 1 },
          { kind: 'build', prompt: 'Build: “this is my house”', translation: 'This is my house.', answer: ['এটা', 'আমার', 'ঘর'], pool: ['এটা', 'আমার', 'ঘর', 'তোমার', 'বই'] },
          { kind: 'build', prompt: 'Build: “I have a book”', translation: 'I have a book. (My book there-is)', answer: ['আমার', 'বই', 'আছে'], pool: ['আমার', 'বই', 'আছে', 'নেই', 'ঘর'] },
        ],
      },
      {
        id: '6-4',
        title: 'Possessives & plurals',
        exercises: [
          { kind: 'match', prompt: 'Match the possessive', pairs: [{ bn: 'আমার', sound: 'my' }, { bn: 'তোমার', sound: 'your' }, { bn: 'তার', sound: 'his/her' }, { bn: 'আমাদের', sound: 'our' }] },
          { kind: 'mcq', prompt: '“Father’s book” adds -র/-এর to the owner: বাবা → বাবার বই. So “Riya’s book” is…', options: [{ bn: 'রিয়ার বই' }, { bn: 'রিয়া বই' }, { bn: 'বই রিয়া' }], answer: 0 },
          { kind: 'mcq', prompt: 'Plural of animate nouns adds -রা: ছেলে → ছেলেরা. What does ছেলেরা mean?', options: [{ label: 'the boys' }, { label: 'a boy' }, { label: 'boy’s' }], answer: 0 },
          { kind: 'mcq', prompt: 'For things, -গুলো makes a plural. বইগুলো means…', options: [{ label: 'the books' }, { label: 'a book' }, { label: 'my book' }], answer: 0 },
          { kind: 'type', prompt: 'Type “my” in Bengali', answer: 'আমার' },
        ],
      },
      {
        id: '6-5',
        title: 'Adjectives',
        exercises: [
          { kind: 'match', prompt: 'Match the adjective', pairs: [{ bn: 'বড়', sound: 'big' }, { bn: 'ছোট', sound: 'small' }, { bn: 'ভালো', sound: 'good' }, { bn: 'নতুন', sound: 'new' }, { bn: 'সুন্দর', sound: 'beautiful' }] },
          { kind: 'mcq', prompt: 'Adjectives come BEFORE the noun, like English. “a big house” is…', options: [{ bn: 'একটা বড় ঘর' }, { bn: 'একটা ঘর বড়' }, { bn: 'বড় একটা' }], answer: 0 },
          { kind: 'build', prompt: 'Build: “a new book”', translation: 'a new book', answer: ['একটা', 'নতুন', 'বই'], pool: ['একটা', 'নতুন', 'বই', 'পুরনো', 'ঘর'] },
          { kind: 'match', prompt: 'Match the opposite-pair word', pairs: [{ bn: 'গরম', sound: 'hot' }, { bn: 'ঠান্ডা', sound: 'cold' }, { bn: 'সহজ', sound: 'easy' }, { bn: 'কঠিন', sound: 'hard' }] },
        ],
      },
      {
        id: '6-6',
        title: 'Postpositions',
        exercises: [
          { kind: 'mcq', prompt: 'Bengali uses POST-positions (after the noun). “in the house” is ঘর + এ →', options: [{ bn: 'ঘরে' }, { bn: 'এ ঘর' }, { bn: 'ঘর এ' }], answer: 0 },
          { kind: 'match', prompt: 'Match the postposition', pairs: [{ bn: 'উপরে', sound: 'on/above' }, { bn: 'নিচে', sound: 'under' }, { bn: 'ভিতরে', sound: 'inside' }, { bn: 'পাশে', sound: 'beside' }] },
          { kind: 'match', prompt: 'Match the postposition', pairs: [{ bn: 'থেকে', sound: 'from' }, { bn: 'সাথে', sound: 'with' }, { bn: 'জন্য', sound: 'for' }, { bn: 'কাছে', sound: 'near/to' }] },
          { kind: 'build', prompt: 'Build: “the book is on the table”', translation: 'The book is on the table. (book table-of on is)', answer: ['বই', 'টেবিলের', 'উপরে', 'আছে'], pool: ['বই', 'টেবিলের', 'উপরে', 'আছে', 'নিচে', 'ঘরে'] },
          { kind: 'mcq', prompt: '“for you” is তোমার ___', options: [{ bn: 'জন্য' }, { bn: 'থেকে' }, { bn: 'উপরে' }], answer: 0 },
        ],
      },
      {
        id: '6-7',
        title: 'Negation',
        exercises: [
          { kind: 'mcq', prompt: 'To negate a present verb, add না AFTER it. “I don’t know” = আমি জানি ___', options: [{ bn: 'না' }, { bn: 'নেই' }, { bn: 'নয়' }], answer: 0 },
          { kind: 'mcq', prompt: '“I don’t have time” uses নেই: আমার সময় ___', options: [{ bn: 'নেই' }, { bn: 'না' }, { bn: 'আছে' }], answer: 0 },
          { kind: 'build', prompt: 'Build: “I don’t eat fish”', translation: 'I don’t eat fish. (I fish eat not)', answer: ['আমি', 'মাছ', 'খাই', 'না'], pool: ['আমি', 'মাছ', 'খাই', 'না', 'নেই', 'খায়'] },
          { kind: 'mcq', prompt: 'For “this is NOT a book”, use নয়/না: এটা বই ___', options: [{ bn: 'নয়' }, { bn: 'আছে' }, { bn: 'খাই' }], answer: 0 },
        ],
      },
      {
        id: '6-8',
        title: 'Asking questions',
        exercises: [
          { kind: 'match', prompt: 'Match the question word', pairs: [{ bn: 'কী', sound: 'what' }, { bn: 'কে', sound: 'who' }, { bn: 'কোথায়', sound: 'where' }, { bn: 'কখন', sound: 'when' }, { bn: 'কেন', sound: 'why' }] },
          { kind: 'mcq', prompt: 'কি (no accent) at the start/with a verb marks a YES/NO question. “Will you go?” = তুমি কি যাবে? Here কি means…', options: [{ label: 'a yes/no marker' }, { label: 'what' }, { label: 'why' }], answer: 0 },
          { kind: 'build', prompt: 'Build the question: “what is this?”', translation: 'What is this? (this what)', answer: ['এটা', 'কী'], pool: ['এটা', 'কী', 'কে', 'কোথায়'] },
          { kind: 'mcq', prompt: 'To ask a price you say এর দাম কত? — কত means…', options: [{ label: 'how much/many' }, { label: 'where' }, { label: 'who' }], answer: 0 },
          { kind: 'build', prompt: 'Build: “where do you go?”', translation: 'Where do you go? (you where go)', answer: ['তুমি', 'কোথায়', 'যাও'], pool: ['তুমি', 'কোথায়', 'যাও', 'কখন', 'যায়'] },
        ],
      },
      {
        id: '6-9',
        title: 'Present continuous',
        exercises: [
          { kind: 'mcq', prompt: '“-ing” adds -ছি/-ছ/-ছে. “I am eating” = আমি ___', options: [{ bn: 'খাচ্ছি' }, { bn: 'খাই' }, { bn: 'খাব' }], answer: 0 },
          { kind: 'match', prompt: 'Match the -ing form of পড়া (to read)', pairs: [{ bn: 'পড়ছি', sound: 'I am reading' }, { bn: 'পড়ছ', sound: 'you are reading' }, { bn: 'পড়ছে', sound: 's/he is reading' }] },
          { kind: 'build', prompt: 'Build: “I am reading a book”', translation: 'I am reading a book. (I book reading)', answer: ['আমি', 'বই', 'পড়ছি'], pool: ['আমি', 'বই', 'পড়ছি', 'পড়ি', 'পড়ব'] },
          { kind: 'mcq', prompt: '“S/he is going” = সে ___', options: [{ bn: 'যাচ্ছে' }, { bn: 'যায়' }, { bn: 'যাবে' }], answer: 0 },
        ],
      },
      {
        id: '6-10',
        title: 'Grammar review',
        exercises: [
          { kind: 'build', prompt: 'Build: “I am drinking tea”', translation: 'I am drinking tea. (I tea drinking)', answer: ['আমি', 'চা', 'খাচ্ছি'], pool: ['আমি', 'চা', 'খাচ্ছি', 'খাই', 'জল'] },
          { kind: 'build', prompt: 'Build: “the cat is under the chair”', translation: 'The cat is under the chair. (cat chair-of under is)', answer: ['বিড়াল', 'চেয়ারের', 'নিচে', 'আছে'], pool: ['বিড়াল', 'চেয়ারের', 'নিচে', 'আছে', 'উপরে', 'কুকুর'] },
          { kind: 'mcq', prompt: '“I don’t have a brother” = আমার ভাই ___', options: [{ bn: 'নেই' }, { bn: 'না' }, { bn: 'নয়' }], answer: 0 },
          { kind: 'speak', prompt: 'Say the sentence aloud', target: 'আমি ভাত খাই', romanization: 'ami bhat khai', translation: 'I eat rice' },
        ],
      },
    ],
  },

  // ══ LEVEL 7 · CONVERSATION ════════════════════════════════════════════════
  {
    id: 7,
    title: 'Conversation',
    titleBn: 'কথোপকথন',
    blurb: 'Greet, introduce yourself, shop, ask directions, and talk about your day.',
    color: 'teal',
    icon: '💬',
    badge: { name: 'Conversation Star', emoji: '⭐', tagline: 'Can hold everyday conversations' },
    lessons: [
      {
        id: '7-1',
        title: 'Greetings',
        exercises: [
          { kind: 'mcq', prompt: 'নমস্কার is used to…', big: 'নমস্কার', options: [{ label: 'greet someone' }, { label: 'say sorry' }, { label: 'say goodbye only' }], answer: 0 },
          { kind: 'match', prompt: 'Match the phrase', pairs: [{ bn: 'নমস্কার', sound: 'hello' }, { bn: 'ধন্যবাদ', sound: 'thank you' }, { bn: 'শুভ সকাল', sound: 'good morning' }, { bn: 'শুভ রাত্রি', sound: 'good night' }] },
          { kind: 'listen', prompt: 'Tap the phrase you hear', say: 'ধন্যবাদ', roman: 'dhonyobad (thanks)', options: [{ bn: 'নমস্কার' }, { bn: 'ধন্যবাদ' }, { bn: 'শুভ সকাল' }], answer: 1 },
          { kind: 'speak', prompt: 'Greet someone aloud', target: 'নমস্কার', romanization: 'nômôshkar', translation: 'hello / greetings' },
        ],
      },
      {
        id: '7-2',
        title: 'How are you?',
        exercises: [
          { kind: 'mcq', prompt: 'কেমন আছেন? means…', big: 'কেমন আছেন?', options: [{ label: 'How are you? (formal)' }, { label: 'What is your name?' }, { label: 'Where are you?' }], answer: 0 },
          { kind: 'match', prompt: 'Match the phrase', pairs: [{ bn: 'কেমন আছেন?', sound: 'how are you? (formal)' }, { bn: 'ভালো আছি', sound: 'I am well' }, { bn: 'হ্যাঁ', sound: 'yes' }, { bn: 'না', sound: 'no' }] },
          { kind: 'build', prompt: 'Reply that you are well', translation: 'I am well.', answer: ['ভালো', 'আছি'], pool: ['ভালো', 'আছি', 'নমস্কার', 'না'] },
          { kind: 'speak', prompt: 'Ask “how are you?” (formal)', target: 'কেমন আছেন', romanization: 'kemon achhen', translation: 'how are you?' },
        ],
      },
      {
        id: '7-3',
        title: 'Introducing yourself',
        exercises: [
          { kind: 'mcq', prompt: 'আপনার নাম কী? means…', big: 'আপনার নাম কী?', options: [{ label: 'What is your name?' }, { label: 'How old are you?' }, { label: 'Where do you live?' }], answer: 0 },
          { kind: 'build', prompt: 'Say “my name is Riya”', translation: 'My name is Riya. (My name Riya)', answer: ['আমার', 'নাম', 'রিয়া'], pool: ['আমার', 'নাম', 'রিয়া', 'তোমার', 'কী'] },
          { kind: 'match', prompt: 'Match the word', pairs: [{ bn: 'নাম', sound: 'name' }, { bn: 'দেশ', sound: 'country' }, { bn: 'কাজ', sound: 'work/job' }, { bn: 'বয়স', sound: 'age' }] },
          { kind: 'mcq', prompt: '“Where are you from?” = আপনি কোথা থেকে এসেছেন? কোথা থেকে means…', options: [{ label: 'from where' }, { label: 'to where' }, { label: 'why' }], answer: 0 },
        ],
      },
      {
        id: '7-4',
        title: 'Polite vs familiar',
        exercises: [
          { kind: 'mcq', prompt: 'Bengali changes the verb by politeness. With আপনি (formal), “you go” is আপনি ___', options: [{ bn: 'যান' }, { bn: 'যাও' }, { bn: 'যাস' }], answer: 0 },
          { kind: 'mcq', prompt: 'With তুমি (familiar), “you go” is তুমি ___', options: [{ bn: 'যান' }, { bn: 'যাও' }, { bn: 'যায়' }], answer: 1 },
          { kind: 'match', prompt: 'Match the register to its “you”', pairs: [{ bn: 'আপনি', sound: 'formal/respectful' }, { bn: 'তুমি', sound: 'friendly/equal' }, { bn: 'তুই', sound: 'intimate/close' }] },
          { kind: 'mcq', prompt: 'Talking to an elder or stranger, you should use…', options: [{ bn: 'আপনি' }, { bn: 'তুই' }], answer: 0 },
        ],
      },
      {
        id: '7-5',
        title: 'At the market',
        exercises: [
          { kind: 'mcq', prompt: 'এর দাম কত? means…', big: 'এর দাম কত?', options: [{ label: 'How much does this cost?' }, { label: 'What is this?' }, { label: 'Where is the shop?' }], answer: 0 },
          { kind: 'match', prompt: 'Match the shopping word', pairs: [{ bn: 'দোকান', sound: 'shop' }, { bn: 'বাজার', sound: 'market' }, { bn: 'টাকা', sound: 'money/taka' }, { bn: 'দাম', sound: 'price' }] },
          { kind: 'build', prompt: 'Build: “I want two mangoes”', translation: 'I want two mangoes. (I two-CL mango want)', answer: ['আমি', 'দুটো', 'আম', 'চাই'], pool: ['আমি', 'দুটো', 'আম', 'চাই', 'কলা', 'চাও'] },
          { kind: 'mcq', prompt: '“It’s too expensive” — দাম বেশি. বেশি means…', options: [{ label: 'too much / a lot' }, { label: 'cheap' }, { label: 'enough' }], answer: 0 },
        ],
      },
      {
        id: '7-6',
        title: 'Directions',
        exercises: [
          { kind: 'match', prompt: 'Match the direction', pairs: [{ bn: 'ডান', sound: 'right' }, { bn: 'বাম', sound: 'left' }, { bn: 'সোজা', sound: 'straight' }, { bn: 'কাছে', sound: 'near' }, { bn: 'দূরে', sound: 'far' }] },
          { kind: 'mcq', prompt: 'স্টেশন কোথায়? means…', big: 'স্টেশন কোথায়?', options: [{ label: 'Where is the station?' }, { label: 'When is the train?' }, { label: 'How far is it?' }], answer: 0 },
          { kind: 'build', prompt: 'Build: “go straight”', translation: 'Go straight. (straight go)', answer: ['সোজা', 'যান'], pool: ['সোজা', 'যান', 'ডান', 'বাম'] },
          { kind: 'mcq', prompt: '“Turn right” — ডান দিকে ঘুরুন. দিকে means…', options: [{ label: 'towards / in the direction' }, { label: 'behind' }, { label: 'stop' }], answer: 0 },
        ],
      },
      {
        id: '7-7',
        title: 'Food & ordering',
        exercises: [
          { kind: 'mcq', prompt: 'A waiter asks কী খাবেন? — what does it mean?', big: 'কী খাবেন?', options: [{ label: 'What will you eat?' }, { label: 'Where will you sit?' }, { label: 'Who are you?' }], answer: 0 },
          { kind: 'build', prompt: 'Build: “I will eat rice and fish”', translation: 'I will eat rice and fish. (I rice and fish will-eat)', answer: ['আমি', 'ভাত', 'আর', 'মাছ', 'খাব'], pool: ['আমি', 'ভাত', 'আর', 'মাছ', 'খাব', 'খাই'] },
          { kind: 'mcq', prompt: 'আর means…', options: [{ label: 'and' }, { label: 'but' }, { label: 'or' }], answer: 0 },
          { kind: 'mcq', prompt: 'এটা খুব সুস্বাদু! means…', options: [{ label: 'This is very tasty!' }, { label: 'This is too cold.' }, { label: 'I am full.' }], answer: 0 },
        ],
      },
      {
        id: '7-8',
        title: 'My day (past tense)',
        exercises: [
          { kind: 'mcq', prompt: 'Past tense adds -লাম/-লে/-ল. “I did” (করা) = আমি ___', options: [{ bn: 'করলাম' }, { bn: 'করি' }, { bn: 'করব' }], answer: 0 },
          { kind: 'match', prompt: 'Match the past form', pairs: [{ bn: 'গেলাম', sound: 'I went' }, { bn: 'খেলাম', sound: 'I ate' }, { bn: 'দেখলাম', sound: 'I saw' }, { bn: 'পড়লাম', sound: 'I read' }] },
          { kind: 'build', prompt: 'Build: “yesterday I went to the market”', translation: 'Yesterday I went to the market. (yesterday I market-to went)', answer: ['গতকাল', 'আমি', 'বাজারে', 'গেলাম'], pool: ['গতকাল', 'আমি', 'বাজারে', 'গেলাম', 'যাব', 'আজ'] },
          { kind: 'mcq', prompt: '“S/he ate” = সে ___', options: [{ bn: 'খেল' }, { bn: 'খায়' }, { bn: 'খাবে' }], answer: 0 },
        ],
      },
      {
        id: '7-9',
        title: 'Plans (future tense)',
        exercises: [
          { kind: 'mcq', prompt: 'Future adds -ব/-বে. “I will go” = আমি ___', options: [{ bn: 'যাব' }, { bn: 'যাই' }, { bn: 'গেলাম' }], answer: 0 },
          { kind: 'match', prompt: 'Match the future form', pairs: [{ bn: 'করব', sound: 'I will do' }, { bn: 'খাব', sound: 'I will eat' }, { bn: 'পড়ব', sound: 'I will read' }, { bn: 'আসবে', sound: 's/he will come' }] },
          { kind: 'build', prompt: 'Build: “tomorrow I will read a book”', translation: 'Tomorrow I will read a book. (tomorrow I book will-read)', answer: ['আগামীকাল', 'আমি', 'বই', 'পড়ব'], pool: ['আগামীকাল', 'আমি', 'বই', 'পড়ব', 'পড়লাম', 'গতকাল'] },
          { kind: 'mcq', prompt: '“Will you come?” (familiar) = তুমি কি ___?', options: [{ bn: 'আসবে' }, { bn: 'এলে' }, { bn: 'আসি' }], answer: 0 },
        ],
      },
      {
        id: '7-10',
        title: 'Conversation review',
        exercises: [
          { kind: 'build', prompt: 'Build: “my name is Riya, I am well”', translation: 'My name is Riya, I am well.', answer: ['আমার', 'নাম', 'রিয়া', 'আমি', 'ভালো', 'আছি'], pool: ['আমার', 'নাম', 'রিয়া', 'আমি', 'ভালো', 'আছি', 'কী'] },
          { kind: 'mcq', prompt: 'You want to thank a shopkeeper. You say…', options: [{ bn: 'ধন্যবাদ' }, { bn: 'দুঃখিত' }, { bn: 'কোথায়' }], answer: 0 },
          { kind: 'build', prompt: 'Build: “where is the market?”', translation: 'Where is the market? (market where)', answer: ['বাজার', 'কোথায়'], pool: ['বাজার', 'কোথায়', 'কখন', 'দোকান'] },
          { kind: 'speak', prompt: 'Say “thank you”', target: 'ধন্যবাদ', romanization: 'dhonyobad', translation: 'thank you' },
        ],
      },
    ],
  },

  // ══ LEVEL 8 · READING & WRITING ═══════════════════════════════════════════
  {
    id: 8,
    title: 'Reading & Writing',
    titleBn: 'পড়া ও লেখা',
    blurb: 'Read graded passages across tenses, and write Bengali from memory.',
    color: 'marigold',
    icon: '📖',
    badge: { name: 'Young Scholar', emoji: '🎓', tagline: 'Read and wrote real Bengali' },
    lessons: [
      {
        id: '8-1',
        title: 'About me',
        passage: {
          bn: 'আমার নাম রিয়া। আমি একজন ছাত্রী। আমি কলকাতায় থাকি। আমার একটি ছোট পরিবার আছে।',
          en: 'My name is Riya. I am a student. I live in Kolkata. I have a small family.',
        },
        exercises: [
          { kind: 'mcq', prompt: 'What is her name?', options: [{ label: 'Riya' }, { label: 'Maya' }, { label: 'Tina' }], answer: 0 },
          { kind: 'mcq', prompt: 'Where does she live?', options: [{ label: 'Dhaka' }, { label: 'Kolkata' }, { label: 'Delhi' }], answer: 1 },
          { kind: 'mcq', prompt: 'ছাত্রী means…', options: [{ label: 'student (female)' }, { label: 'teacher' }, { label: 'doctor' }], answer: 0 },
          { kind: 'type', prompt: 'Type the verb “(I) live/stay” from the passage', answer: 'থাকি' },
        ],
      },
      {
        id: '8-2',
        title: 'My home',
        passage: {
          bn: 'এটা আমার ঘর। ঘরে একটি টেবিল আর দুটি চেয়ার আছে। টেবিলের উপরে আমার বইগুলো আছে।',
          en: 'This is my room. In the room there is a table and two chairs. My books are on the table.',
        },
        exercises: [
          { kind: 'mcq', prompt: 'How many chairs are there?', options: [{ label: 'one' }, { label: 'two' }, { label: 'three' }], answer: 1 },
          { kind: 'mcq', prompt: 'Where are the books?', options: [{ label: 'on the table' }, { label: 'under the bed' }, { label: 'in the bag' }], answer: 0 },
          { kind: 'mcq', prompt: 'বইগুলো means…', options: [{ label: 'the books (plural)' }, { label: 'one book' }, { label: 'my book' }], answer: 0 },
          { kind: 'type', prompt: 'Type the word for “table”', answer: 'টেবিল' },
        ],
      },
      {
        id: '8-3',
        title: 'Right now',
        passage: {
          bn: 'এখন সকাল। মা রান্না করছেন। বাবা চা খাচ্ছেন। আমি বই পড়ছি।',
          en: 'It is morning now. Mother is cooking. Father is drinking tea. I am reading a book.',
        },
        exercises: [
          { kind: 'mcq', prompt: 'What time of day is it?', options: [{ label: 'morning' }, { label: 'night' }, { label: 'noon' }], answer: 0 },
          { kind: 'mcq', prompt: 'What is the father doing?', options: [{ label: 'cooking' }, { label: 'drinking tea' }, { label: 'reading' }], answer: 1 },
          { kind: 'mcq', prompt: 'রান্না করছেন is which tense?', options: [{ label: 'present continuous (-ing), formal' }, { label: 'past' }, { label: 'future' }], answer: 0 },
          { kind: 'type', prompt: 'Type “(I am) reading” from the passage', answer: 'পড়ছি' },
        ],
      },
      {
        id: '8-4',
        title: 'A day out (past)',
        passage: {
          bn: 'গতকাল আমি আর আমার বন্ধু বাজারে গেলাম। আমরা আম আর মাছ কিনলাম। তারপর বাড়ি ফিরলাম।',
          en: 'Yesterday my friend and I went to the market. We bought mangoes and fish. Then we returned home.',
        },
        exercises: [
          { kind: 'mcq', prompt: 'When did this happen?', options: [{ label: 'yesterday' }, { label: 'tomorrow' }, { label: 'now' }], answer: 0 },
          { kind: 'mcq', prompt: 'What did they buy?', options: [{ label: 'mangoes and fish' }, { label: 'rice and milk' }, { label: 'books' }], answer: 0 },
          { kind: 'mcq', prompt: 'গেলাম, কিনলাম, ফিরলাম are all in the…', options: [{ label: 'past tense' }, { label: 'future tense' }, { label: 'present tense' }], answer: 0 },
          { kind: 'mcq', prompt: 'তারপর means…', options: [{ label: 'then / after that' }, { label: 'before' }, { label: 'never' }], answer: 0 },
        ],
      },
      {
        id: '8-5',
        title: 'Plans (future)',
        passage: {
          bn: 'আগামীকাল শনিবার। আমি সকালে নদীর পাশে হাঁটব। বিকেলে বন্ধুর সাথে খেলব। রাতে একটা বই পড়ব।',
          en: 'Tomorrow is Saturday. In the morning I will walk by the river. In the afternoon I will play with a friend. At night I will read a book.',
        },
        exercises: [
          { kind: 'mcq', prompt: 'What day is tomorrow?', options: [{ label: 'Saturday' }, { label: 'Sunday' }, { label: 'Friday' }], answer: 0 },
          { kind: 'mcq', prompt: 'হাঁটব, খেলব, পড়ব are in the…', options: [{ label: 'future tense' }, { label: 'past tense' }, { label: 'present tense' }], answer: 0 },
          { kind: 'mcq', prompt: 'Where will the walk be?', options: [{ label: 'by the river' }, { label: 'in the market' }, { label: 'at school' }], answer: 0 },
          { kind: 'type', prompt: 'Type “(I) will read” from the passage', answer: 'পড়ব' },
        ],
      },
      {
        id: '8-6',
        title: 'Writing from memory',
        exercises: [
          { kind: 'type', prompt: 'Write “mother” in Bengali', answer: 'মা' },
          { kind: 'type', prompt: 'Write “water” in Bengali', answer: 'জল', accept: ['পানি'] },
          { kind: 'type', prompt: 'Write “I” in Bengali', answer: 'আমি' },
          { kind: 'type', prompt: 'Write “friend” in Bengali', answer: 'বন্ধু' },
          { kind: 'type', prompt: 'Write “red” in Bengali', answer: 'লাল' },
        ],
      },
      {
        id: '8-7',
        title: 'Write sentences',
        exercises: [
          { kind: 'build', prompt: 'Build: “I have a red flower”', translation: 'I have a red flower. (My red flower there-is)', answer: ['আমার', 'লাল', 'ফুল', 'আছে'], pool: ['আমার', 'লাল', 'ফুল', 'আছে', 'নীল', 'বই'] },
          { kind: 'build', prompt: 'Build: “tomorrow I will go to the market”', translation: 'Tomorrow I will go to the market.', answer: ['আগামীকাল', 'আমি', 'বাজারে', 'যাব'], pool: ['আগামীকাল', 'আমি', 'বাজারে', 'যাব', 'গেলাম', 'আজ'] },
          { kind: 'build', prompt: 'Build: “I don’t drink tea”', translation: 'I don’t drink tea. (I tea drink not)', answer: ['আমি', 'চা', 'খাই', 'না'], pool: ['আমি', 'চা', 'খাই', 'না', 'নেই', 'খাব'] },
          { kind: 'speak', prompt: 'Read this sentence aloud', target: 'আমার একটি লাল ফুল আছে', romanization: 'amar ekti lal phul achhe', translation: 'I have a red flower' },
        ],
      },
      {
        id: '8-8',
        title: 'A taste of Tagore',
        passage: {
          bn: 'রবীন্দ্রনাথ লিখেছেন: “যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই; পাইলেও পাইতে পার অমূল্য রতন।”',
          en: 'Tagore wrote: “Wherever you see ash, blow on it and look — you just might find a priceless gem.” (A line urging us to search everywhere for value.)',
        },
        exercises: [
          { kind: 'mcq', prompt: 'Who wrote this line?', options: [{ label: 'Rabindranath Tagore' }, { label: 'Kazi Nazrul Islam' }, { label: 'Sarat Chandra' }], answer: 0 },
          { kind: 'mcq', prompt: 'রতন (ratan) here means…', options: [{ label: 'gem / jewel' }, { label: 'ash' }, { label: 'river' }], answer: 0 },
          { kind: 'mcq', prompt: 'The line encourages you to…', options: [{ label: 'look for value everywhere' }, { label: 'give up easily' }, { label: 'stay home' }], answer: 0 },
          { kind: 'speak', prompt: 'You finished the course! Say “thank you” one last time', target: 'ধন্যবাদ', romanization: 'dhonyobad', translation: 'thank you' },
        ],
      },
    ],
  },
]

// Insert a "Did You Know?" card on the path after these level ids.
export const FACT_AFTER_LEVEL = {
  1: 'f-abugida',
  2: 'f-matra',
  3: 'f-numerals',
  4: 'f-speakers',
  5: 'f-dialects',
  6: 'f-nogender',
  7: 'f-tagore',
}

export const TOTAL_LESSONS = LEVELS.reduce((n, lv) => n + lv.lessons.length, 0)
