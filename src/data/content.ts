// ============================================================
// FOR SAKSHI — All Editable Content
// ============================================================
// This is the ONLY file you need to edit to personalize the experience.
// Every piece of text, photo assignment, song, and secret is here.
// ============================================================

export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/for-sakshi' : '';

export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}

// ── PIN ─────────────────────────────────────────────────────
// Secret PIN to unlock the website
export const UNLOCK_PIN = '1436';

// ── NAMES ───────────────────────────────────────────────────
export const MY_NAME = 'Bhagyaraj';
export const HER_NAME = 'Sakshi';

// ── DATE ────────────────────────────────────────────────────
export const ANNIVERSARY_DATE = 'September 8, 2026';
export const MONTHS_TOGETHER = 9;
export const RELATIONSHIP_START = 'December 8, 2025';

// ── BACKGROUND MUSIC ────────────────────────────────────────
// Exact song: Dooron Dooron by Meghdeep Bose, Paresh Pahuja, and Shiv (2022)
export const backgroundMusic = {
  title: 'Dooron Dooron',
  artist: 'Meghdeep Bose, Paresh Pahuja & Shiv',
  year: '2022',
  src: getAssetPath('/audio/dooron-dooron.mp3'), // Audio file served from public/audio/
  spotifyUrl: 'https://open.spotify.com/search/Dooron%20Dooron%20Paresh%20Pahuja',
  youtubeUrl: 'https://www.youtube.com/results?search_query=Dooron+Dooron+Paresh+Pahuja+Meghdeep+Bose',
};

// ── PHOTOGRAPHS ─────────────────────────────────────────────
export const photos = {
  theSparkle:       { src: getAssetPath('/images/01-the-spark.jpg'),         alt: 'The Sparkle — Us together' },
  canteenTogether:  { src: getAssetPath('/images/01-canteen-together.jpg'),  alt: 'Us at the canteen' },
  cozySelfie:       { src: getAssetPath('/images/02-cozy-selfie.jpg'),       alt: 'Cozy selfie together' },
  coupleCloseup:    { src: getAssetPath('/images/01-the-spark.jpg'),         alt: 'Our favorite moment together' },
  kissMarks:        { src: getAssetPath('/images/04-kiss-marks.jpg'),        alt: 'Fun with kiss mark filter' },
  funnyFace:        { src: getAssetPath('/images/05-funny-face.jpg'),        alt: 'Your cutest silly face' },
  scenicViewpoint:  { src: getAssetPath('/images/06-scenic-viewpoint.jpg'),  alt: 'At the viewpoint' },
  sareCouple:       { src: getAssetPath('/images/07-saree-couple.jpg'),      alt: 'Together in traditional' },
  intimateSelfie:   { src: getAssetPath('/images/08-intimate-selfie.jpg'),   alt: 'Close to you' },
  flowerPortrait:   { src: getAssetPath('/images/09-flower-portrait.jpg'),   alt: 'You with a flower' },
  horseAdventure:   { src: getAssetPath('/images/10-horse-adventure.jpg'),   alt: 'Adventure with horses' },
  flowersBehindEar: { src: getAssetPath('/images/11-flowers-behind-ear.jpg'),alt: 'Flowers in your hair' },
  rustAnarkali:     { src: getAssetPath('/images/12-rust-anarkali.jpg'),     alt: 'Elegant in rust' },
  burgundyRestaurant:{ src: getAssetPath('/images/13-burgundy-restaurant.jpg'),alt: 'Your brightest smile' },
} as const;

// ── OPENING SEQUENCE ────────────────────────────────────────
export const openingLines = [
  'Hey, Sakshi.',
  'Before you scroll…',
  'I made something for you.',
];

// ── UNLOCK MESSAGES ─────────────────────────────────────────
export const unlockPrompt = {
  line1: "There's something here only you should know.",
  line2: "What's our little secret?",
};

export const wrongPinMessages = [
  "Hmm… that's not our secret.",
  "Try again, Sakshi ❤️",
  "Nice try 😌",
  "Almost… but not quite.",
  "Think harder, baby ❤️",
];

// ── STORY SECTIONS ──────────────────────────────────────────
export const storySections = [
  {
    id: 'beginning',
    number: '02',
    title: 'The Beginning',
    photo: photos.canteenTogether,
    caption: "It started somewhere between shared lunches and stolen glances. I didn't know it then, but you were already becoming my favorite part of every day.",
    style: 'polaroid' as const,
  },
  {
    id: 'closer',
    number: '03',
    title: 'Getting Closer',
    photo: photos.cozySelfie,
    caption: "And then you became my favorite person to talk to. About everything. About nothing. It didn't matter — as long as it was with you.",
    style: 'fullbleed' as const,
  },
  {
    id: 'memories',
    number: '04',
    title: 'The Memories',
    photos: [photos.scenicViewpoint, photos.horseAdventure],
    caption: "Every adventure with you became a core memory. Even the ones where nothing went as planned.",
    style: 'collage' as const,
  },
  {
    id: 'chaos',
    number: '05',
    title: 'The Chaos 😂',
    photo: photos.kissMarks,
    hiddenPhoto: photos.funnyFace,
    caption: "And yes, even the chaos. Especially the chaos. The moments nobody else would understand — those are my favorites.",
    style: 'scattered' as const,
  },
];

// ── LITTLE THINGS I LOVE ────────────────────────────────────
export const littleThings = [
  "Your smile that instantly fixes my worst days.",
  "The way you laugh at things that aren't even funny.",
  "How you somehow make ordinary moments feel magical.",
  "The look in your eyes when you're genuinely happy.",
  "How you care with your whole heart, even in the smallest ways.",
  "Your voice when you're half-asleep.",
  "The way you hold my hand without even realizing it.",
  "The little things you probably don't even know I notice.",
];

// ── LOVE LETTER ─────────────────────────────────────────────
export const loveLetter = {
  greeting: 'My Dearest Sakshi,',
  paragraphs: [
    "If you're reading this, it means I actually finished building this website for you. And if I'm being honest, I made this because I wanted you to have something as beautiful, special, and unforgettable as you make me feel every single day.",

    "Nine months. It sounds like a number, but to me, it's a thousand quiet moments that became the best chapter of my life. The late-night talks that never wanted to end. The silly photos. The days that flew by too fast. The silences that said everything.",

    "You came into my life and quietly rearranged my whole world. The way I smile, the things I look forward to, the person I want to be — you changed all of it. Not by asking me to change, but simply by being someone I want to be better for.",

    "I know I'm not perfect. I know there are days when I'm stubborn or say the wrong thing. But I need you to know — even on those days — there is no version of my future that makes sense without you in it.",

    "So here's to nine months of laughter, chaos, and endless love. And to every month that comes after. I am not going anywhere.",
  ],
  closing: `Forever & Always,\n${MY_NAME}`,
  ps: "P.S. You still owe me approximately 847 hugs. I'm keeping count every single day.",
};

// ── SOUNDTRACK PLAYLIST ─────────────────────────────────────
export const soundtrack = {
  title: 'Our Soundtrack',
  subtitle: 'Songs that somehow became us.',
  songs: [
    {
      title: 'Khwaab',
      artist: 'Iqlipse Nova',
      reason: "The song that feels like dreaming with my eyes wide open, with you right beside me.",
      color: '#1a3a2a',
      spotifyUrl: 'https://open.spotify.com/search/Khwaab',
      youtubeUrl: 'https://www.youtube.com/results?search_query=Khwaab+song',
    },
    {
      title: 'Oonchi Jaanu',
      artist: 'Title Track',
      reason: "Because every time this plays, it reminds me of how my heart races whenever I'm with you.",
      color: '#2a1a3a',
      spotifyUrl: 'https://open.spotify.com/search/Oonchi%20Jaanu',
      youtubeUrl: 'https://www.youtube.com/results?search_query=Oonchi+Jaanu+title+track',
    },
    {
      title: 'Dooron Dooron',
      artist: 'Meghdeep Bose, Paresh Pahuja & Shiv',
      reason: "Our song. Every line speaks what my heart whispers when I look at you.",
      color: '#3a1a1a',
      spotifyUrl: 'https://open.spotify.com/search/Dooron%20Dooron%20Paresh%20Pahuja',
      youtubeUrl: 'https://youtu.be/bP8ATWCvqzw?t=12',
    },
    {
      title: 'Tera Ban Jaunga',
      artist: 'Akhil Sachdeva & Tulsi Kumar',
      reason: "Because being yours is the only thing in this world I'm 100% sure about.",
      color: '#1a2a3a',
      spotifyUrl: 'https://open.spotify.com/track/3KkIjVfJjKFDNz4IteSGYK',
      youtubeUrl: 'https://www.youtube.com/watch?v=B2SLLiY9JKk',
    },
  ],
};

// ── NINE MONTHS — 9 REASONS ────────────────────────────────
export const nineReasons = [
  "The way you make even the most ordinary day feel like an adventure.",
  "Your laugh — the genuine, unrestrained one that lights up the room.",
  "How you believe in me, even when I struggle to believe in myself.",
  "The fact that you still give me butterflies. Nine months later.",
  "Your stubbornness — because it means you fight fiercely for what matters.",
  "The way you look at me when you think I'm not paying attention.",
  "How talking to you is effortlessly the highlight of my whole day.",
  "Your kindness — the soft, quiet kind that touches everyone around you.",
  "Because out of everyone in the world, you chose me. And I'd choose you in every lifetime.",
];

// ── FINAL SCENE ─────────────────────────────────────────────
export const finalScene = {
  lines: [
    'Sakshi…',
    'Happy 9 Months.',
    'I love you.',
    'More than this little website could ever explain.',
  ],
  signature: `— ${MY_NAME}`,
  hiddenMessage: "You are the greatest blessing that ever walked into my life. Happy 9 Months, my love.",
};

// ── MONTHLY DATES ───────────────────────────────────────────
export const monthlyDates = [
  { month: 'Dec', year: 2025, day: 8, label: 'Month 1' },
  { month: 'Jan', year: 2026, day: 8, label: 'Month 2' },
  { month: 'Feb', year: 2026, day: 8, label: 'Month 3' },
  { month: 'Mar', year: 2026, day: 8, label: 'Month 4' },
  { month: 'Apr', year: 2026, day: 8, label: 'Month 5' },
  { month: 'May', year: 2026, day: 8, label: 'Month 6' },
  { month: 'Jun', year: 2026, day: 8, label: 'Month 7' },
  { month: 'Jul', year: 2026, day: 8, label: 'Month 8' },
  { month: 'Aug', year: 2026, day: 8, label: 'Month 9' },
];
