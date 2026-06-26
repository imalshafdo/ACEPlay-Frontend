<template>
  <div class="page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="logo" style="color:aliceblue; display: flex; align-items: center; gap: 8px; text-decoration: none;">
          <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Flogo%2Fhero.png&w=1536&q=100" alt="ACEPlay logo" style="height: 35px; object-fit: contain;" />
          <span style="font-weight: 800; font-size: 1.25rem; letter-spacing: 0.04em; color: #ffffff;">ACE<span style="color: #ff2d2d;">Play</span></span>
        </NuxtLink>

        <nav class="nav-links" style="color:aliceblue">
          <NuxtLink to="/">Home</NuxtLink>
          <a href="#trending games" class="active"> Trending Games</a>
          <a href="#pros&cons">Pros & Cons</a>
          <a href="#faq">FAQ</a>
          <a href="#player-reviews">Player Reviews</a>
        </nav>

        <div class="nav-actions" style="color:aliceblue">
          <button class="btn ghost">Log in</button>
          <button class="btn primary" style="color:snow">Join Now</button>
        </div>
      </div>
    </header>

    <!-- Game Providers Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Game Providers</h2>
      </div>

      <div class="providers-grid">
        <div v-for="provider in gameProviders" :key="provider.name" class="provider-card">
          <div class="provider-header">
         
            <h3>{{ provider.name }}</h3>
          </div>
          <div class="provider-games">
            <NuxtLink v-for="(game, index) in provider.games" :key="game" :to="`/game/${getGameSlug(provider.name, index)}`" class="mini-game-icon">
              <img :src="game" :alt="provider.name" />
            </NuxtLink>
             <NuxtLink to="/gamedetails" style="color:#71adf6">GameDetails</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="search-filters">
        <div class="search-bar">
          <input type="text" placeholder="Search by game name or provider" />
          <button class="search-btn">🔍</button>
        </div>
        <div class="filter-dropdowns">
          <select>
            <option>Volatility</option>
            <option>All Levels</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select>
            <option>Max Win</option>
            <option>Any</option>
            <option>1000x</option>
            <option>5000x</option>
            <option>10000x+</option>
          </select>
          <select>
            <option>RTP</option>
            <option>All</option>
            <option>90-95%</option>
            <option>95-97%</option>
            <option>97%+</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Trending Games Section -->
    <section class="section section-muted">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Trending Games</h2>
      </div>

      <div class="games-grid">
        <NuxtLink v-for="game in trendingGames" :key="game.title" :to="`/game/${game.title.toLowerCase().replace(/\s+/g, '-')}`" class="game-card">
          <div class="game-image">
            <img :src="game.image" :alt="game.title" />
          </div>
          <div class="game-info">
            <h3 class="game-title">{{ game.title }}</h3>
            <p class="game-provider">{{ game.provider }}</p>
          </div>
        </NuxtLink>
      </div>
      <div class="loading-more" style="color:rgb(202, 196, 196)">Loading more games...</div>
    </section>

    <!-- Pros & Cons Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Pros & Cons</h2>
        <p class="section-subtitle" style="color:white">
          We analyze games objectively to help you decide if this category matches your playstyle.
        </p>
      </div>

      <div class="pros-cons-grid">
        <div class="pros-card">
          <h3>Advantages (Pros)</h3>
          <ul>
            <li>Potential for massive payouts relative to stake</li>
            <li>Easy to learn with no complex strategies needed</li>
            <li>Incredible visual and audio experience</li>
            <li>Thousands of diverse games to choose from</li>
          </ul>
        </div>
        <div class="cons-card">
          <h3>Disadvantages (Cons)</h3>
          <ul>
            <li>High volatility can lead to fast losing streaks</li>
            <li>House edge is generally higher than blackjack</li>
            <li>Less skill-based gameplay compared to poker/RNG</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Player Experience Analysis Section -->
    <section class="section section-muted">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Player Experience Analysis</h2>
      </div>

      <div class="analysis-grid">
        <div class="analysis-item">
          <div class="analysis-label">SKILL LEVEL REQUIRED</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 20%"></div>
          </div>
          <div class="analysis-value">LOW (CASUAL)</div>
        </div>
        <div class="analysis-item">
          <div class="analysis-label">LEVEL ON DURATION AVG.</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 50%"></div>
          </div>
          <div class="analysis-value">MEDIUM (20M)</div>
        </div>
        <div class="analysis-item">
          <div class="analysis-label">RISK ASSESSMENT</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 30%"></div>
          </div>
          <div class="analysis-value">LOW (CASUAL)</div>
        </div>
        <div class="analysis-item">
          <div class="analysis-label">ENTERTAINMENT VALUE</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 95%"></div>
          </div>
          <div class="analysis-value">EXCEPTIONAL (95%)</div>
        </div>
      </div>
      <p class="analysis-note">Data based on aggregated player feedback and internal analysis.</p>
    </section>

    <!-- FAQ Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Frequently Asked Questions</h2>
      </div>

      <div class="faq-list">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item" @click="toggleFaq(index)">
          <div class="faq-question">
            <h3>{{ faq.question }}</h3>
            <span class="faq-toggle">{{ faq.open ? '−' : '+' }}</span>
          </div>
          <div v-if="faq.open" class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Winners Section -->
    <section class="section section-muted">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Latest Winners</h2>
      </div>

      <div class="winners-list">
        <div v-for="winner in latestWinners" :key="winner.player" class="winner-item">
          <div class="winner-info">
            <span class="winner-player">{{ winner.player }}</span>
            <span class="winner-game">{{ winner.game }}</span>
          </div>
          <span class="winner-amount">+{{ winner.amount }}</span>
        </div>
      </div>
    </section>

    <!-- Player Reviews Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Player Reviews</h2>
      </div>

      <div class="reviews-grid">
        <div v-for="review in playerReviews" :key="review.player" class="review-card">
          <div class="review-header">
            <div class="review-avatar">
              <img :src="review.avatar" :alt="review.player" />
            </div>
            <div class="review-info">
              <h4>{{ review.player }}</h4>
              <div class="review-rating">
                <span v-for="i in 5" :key="i" class="star">★</span>
              </div>
            </div>
          </div>
          <p class="review-text">{{ review.text }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo" style="display: flex; align-items: center; gap: 8px;">
            <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Flogo%2Fhero.png&w=1536&q=100" alt="ACEPlay logo" style="height: 35px; object-fit: contain;" />
            <span style="font-weight: 800; font-size: 1.25rem; letter-spacing: 0.04em; color: #ffffff;">ACE<span style="color: #ff2d2d;">Play</span></span>
          </div>
          <p class="footer-text">
            ACEPlay is your premier source for unbiased casino reviews, exclusive bonuses, and expert gambling
            strategies. We help you play smarter and stay safe.
          </p>
          <div class="footer-socials">
            <span class="social-icon">📎</span>
            <span class="social-icon">✉</span>
          </div>
        </div>

        <div class="footer-columns">
          <div class="footer-column">
            <h4>Quick Links</h4>
            <a href="#">New Casinos</a>
            <a href="#">Games</a>
            <a href="#">Reviews</a>
            <a href="#">Game details</a>
          </div>
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">T&amp;Cs</a>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 20px;">
        <span>ACEPlay website is endorsed by: </span>
        <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Fcertify%2Ftruste.webp&w=1536&q=100" alt="TRUSTe" style="height: 15px; object-fit: contain;">
        <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Fcertify%2Fsucun.webp&w=1536&q=100" alt="Sucuri" style="height: 15px; object-fit: contain;">
        <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Fcertify%2Fnorton.webp&w=1536&q=100" alt="Norton" style="height: 15px; object-fit: contain;">
        <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Fcertify%2Fgpwa.webp&w=1536&q=100" alt="GPWA" style="height: 15px; object-fit: contain;">
        <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Fcertify%2Fdmca.webp&w=1536&q=100" alt="DMCA" style="height: 15px; object-fit: contain;">
      </div>

      <div class="footer-bottom">
        <span>© Copyright 2018 - 2025, ACEPlay All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const gameProviders = [
  {
    name: 'JILI Games',
    gameNames: ['Super Ace', 'Golden Empire', 'Wild Bounty Showdown', 'Charge Buffalo'],
    games: [
      'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7489.3.webp?version=176',
      'https://download.ocms.cloud/v2/common/VA/PlatformGameList.35810.3.webp?version=18https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.7489.4.webp?version=21',
      'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.39003.3.webp?version=3',
      'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.36142.3.webp?version=12',
    ]
  },
  {
    name: 'VP Games',
    gameNames: ['Mega Fortune', 'Lucky Wheel', 'Golden Tiger', 'Dragon Pearl'],
    games: [
      'https://download.ocms.cloud/v2/common2/VP/PlatformGameList.35802.3.webp?version=17',
      'https://download.ocms.cloud/v2/common2/VP/PlatformGameList.35801.3.webp?version=13',
      'https://download.ocms.cloud/v2/common2/VP/PlatformGameList.37688.3.webp?version=7',
      'https://download.ocms.cloud/v2/common2/VP/PlatformGameList.20701.3.webp?version=14',
    ]
  },
  {
    name: 'YB Games',
    gameNames: ['Fortune Gems', 'Lucky Panda', 'Golden Phoenix', 'Mystic Dragon'],
    games: [
      'https://download.ocms.cloud/v2/common2/FCV2/PlatformGameList.18266.3.webp?version=19',
      'https://download.ocms.cloud/v2/common2/FCV2/PlatformGameList.18267.3.webp?version=19',
      'https://download.ocms.cloud/v2/common2/FCV2/PlatformGameList.18270.3.webp?version=18',
      'https://download.ocms.cloud/v2/common2/FCV2/PlatformGameList.18268.3.webp?version=19',
    ]
  },
  {
    name: 'KA Games',
    gameNames: ['Royal King', 'Lucky Seven', 'Golden Crown', 'Diamond Rush'],
    games: [
      'https://download.ocms.cloud/v2/common2/KA/PlatformGameList.12168.4.webp?version=32',
      'https://download.ocms.cloud/v2/common2/KA/PlatformGameList.31301.4.webp?version=17',
      'https://download.ocms.cloud/v2/common2/KA/PlatformGameList.32399.4.webp?version=17',
      'https://download.ocms.cloud/v2/common2/KA/PlatformGameList.33830.3.webp?version=20',
    ]
  },
  {
    name: 'AW Games',
    gameNames: ['Ocean Treasure', 'Sky Palace', 'Crystal Cave', 'Magic Forest'],
    games: [
      'https://download.ocms.cloud/v2/common2/AWV2/PlatformGameList.20813.3.webp?version=9',
      'https://download.ocms.cloud/v2/common2/AWV2/PlatformGameList.20817.3.webp?version=10',
      'https://download.ocms.cloud/v2/common2/AWV2/PlatformGameList.41304.3.webp?version=16',
      'https://download.ocms.cloud/v2/common2/AWV2/PlatformGameList.20814.3.webp?version=10',
    ]
  },
  {
    name: 'JOKER Games',
    gameNames: ['Joker\'s Treasure', 'Lucky Joker', 'Royal Joker', 'Mega Joker'],
    games: [
      'https://download.ocms.cloud/v2/common2/JOKER/PlatformGameList.5658.4.webp?version=25',
      'https://download.ocms.cloud/v2/common2/JOKER/PlatformGameList.5654.4.webp?version=23',
      'https://download.ocms.cloud/v2/common2/JOKER/PlatformGameList.5655.4.webp?version=26',
      'https://download.ocms.cloud/v2/common2/JOKER/PlatformGameList.5653.4.webp?version=23',
    ]
  }
]

// Function to generate game slug from provider name and index
const getGameSlug = (providerName, gameIndex) => {
  const gameNames = {
    'JILI Games': ['golden-empire', 'super-ace','wild-bounty-showdown', 'charge-buffalo'],
    'VP Games': ['mega-fortune', 'lucky-wheel', 'golden-tiger', 'dragon-pearl'],
    'YB Games': ['fortune-gems', 'lucky-panda', 'golden-phoenix', 'mystic-dragon'],
    'KA Games': ['royal-king', 'lucky-seven', 'golden-crown', 'diamond-rush'],
    'AW Games': ['ocean-treasure', 'sky-palace', 'crystal-cave', 'magic-forest'],
    'JOKER Games': ['jokers-treasure', 'lucky-joker', 'royal-joker', 'mega-joker']
  }
  
  return gameNames[providerName]?.[gameIndex] || 'game'
}

const trendingGames = [
  { title: 'Cash God X4096', provider: 'Pragmatic Play', image: 'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17' },
  { title: 'Golden Empire', provider: 'Evolution Gaming', image: 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7444.3.webp?version=22' },
  { title: 'Lucky Nek', provider: 'Big Time Gaming', image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32614.3.webp?version=6' },
  { title: 'Mahjong Ways2', provider: 'SA Gaming', image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32616.3.webp?version=6' },
  { title: 'Circus Joker', provider: 'ACEPlay Sports', image: 'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.39003.3.webp?version=3' },
  { title: '777', provider: 'ACEPlay', image: 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7476.3.webp?version=18' },
  { title: 'Super Niubi', provider: 'Ubet89', image: 'https://download.ocms.cloud/v2/common2/JDBV2/PlatformGameList.7391.3.webp?version=25' },
  { title: 'Treasures of AZTEC', provider: 'Pragmatic Play', image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32615.3.webp?version=6' },
  { title: 'Rich Mahjong', provider: 'Evolution Gaming', image: 'https://download.ocms.cloud/v2/common2/RSG/PlatformGameList.31697.3.webp?version=26' },
  { title: 'Royale House', provider: 'Big Time Gaming', image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.7592.3.webp?version=6' },
  { title: 'Mahjong Phoenix', provider: 'SA Gaming', image: 'https://download.ocms.cloud/v2/common/NS/PlatformGameList.34194.3.webp?version=18' },
  { title: 'Romax', provider: 'ACEPlay Sports', image: 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7443.3.webp?version=20' }
]

const faqs = ref([
  {
    question: 'How fast are withdrawals at ACEPlay?',
    answer: 'Withdrawals at ACEPlay are processed within 24 hours for most payment methods. E-wallets like Skrill and Neteller are typically processed instantly, while bank transfers may take 2-5 business days. We prioritize fast payouts to ensure you receive your winnings quickly.',
    open: false
  },
  {
    question: 'Is my data secure with ACEPlay?',
    answer: 'Yes, absolutely. ACEPlay uses industry-standard SSL encryption to protect all your personal and financial information. We are fully licensed and regulated, and we never share your data with third parties without your consent. Your security and privacy are our top priorities.',
    open: false
  },
  {
    question: 'Can I play ACEPlay on my mobile phone?',
    answer: 'Yes, ACEPlay is fully optimized for mobile play. You can access all our games and features on smartphones and tablets running iOS or Android. No download is required - simply visit our website through your mobile browser and enjoy seamless gaming on the go.',
    open: false
  }
])

const latestWinners = [
  { player: 'Player_420', game: 'Mega Moolah', amount: '12.100' },
  { player: 'LuckyRY', game: 'Lightning Roulette', amount: '10.900' },
  { player: 'AceKing_9', game: 'Default Omnia', amount: '8.880' }
]

const playerReviews = [
  {
    player: 'John D.',
    avatar: 'https://www.bing.com/th/id/OIP.rblV8bkbI-lti1vZFq1A_QHaFv?w=231&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    text: 'Great selection of games and fast withdrawals. The customer support is also very helpful!',
    rating: 5
  },
  {
    player: 'Sarah M.',
    avatar: 'data:image/webp;base64,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',
    text: 'Love the variety of slot games here. The bonuses are generous and the site is easy to navigate.',
    rating: 4
  },
  {
    player: 'Mike R.',
    avatar: 'https://www.bing.com/th/id/OIP.MtMdbjX2qocGDLlqi58CBAHaE7?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    text: 'Best casino site I\'ve used. Fast payouts and great game selection. Highly recommend!',
    rating: 5
  },
  {
    player: 'Enderson L.',
    avatar: 'https://www.bing.com/th/id/OIP.Z22b4YULHv9kZUxy7DZRJQHaEJ?w=249&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    text: '“The platform is engaging, and both deposits and withdrawals are straightforward, which makes the overall experience more trustworthy.”',
    rating: 5
  },
  {
    player: 'Enderson L.',
    avatar: 'data:image/webp;base64,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',
    text: '“I was impressed with how fast the withdrawal process was. It didn’t take too long, and the steps were clearly explained.”',
    rating: 5
  }
]

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<style scoped>
:root {
  --bg-gradient: radial-gradient(circle at top, #22324a 0, #071227 55%, #03050b 100%);
  --accent: #EC2513;
  --accent-soft: rgba(255, 45, 45, 0.12);
  --accent-secondary: rgb(13, 39, 81);
  --accent-secondary-soft: rgba(59, 130, 246, 0.14);
  --text-main: #e5e7eb;
  --text-muted: #9ca3af;
  --card-bg: #020617;
  --card-elevated: #020617;
  --border-subtle: rgba(150, 170, 198, 0.22);
  --danger: #facc15;
  --radius-lg: 18px;
  --radius-md: 14px;
  --radius-pill: 999px;
  --shadow-soft: 0 24px 60px rgba(15, 23, 42, 0.75);
  --shadow-card: 0 20px 40px rgba(15, 23, 42, 0.7);
  --transition-fast: 0.18s ease-out;
  --transition-med: 0.24s ease-out;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: rgb(47, 65, 100);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
}

/* Layout helpers */
.section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 20px;
}

.section-muted {
  background: radial-gradient(circle at top, rgba(15, 23, 42, 0.5), transparent);
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 8px;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 0.90rem;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(20px);
  background: linear-gradient(to bottom, rgba(2, 6, 23, 0.92), rgba(2, 6, 23, 0.8), transparent);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.navbar-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
}

.logo-badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: conic-gradient(from 180deg, var(--accent), #ff6b6b, var(--accent-secondary), #60a5fa, var(--accent), #ff6b6b);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #020617;
}

.logo-text {
  font-size: 1.05rem;
}

.nav-links {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.nav-links a {
  text-decoration: none;
  color: inherit;
  position: relative;
  padding-bottom: 2px;
}

.nav-links a.active {
  color: #e5e7eb;
}

.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(to right, var(--accent), var(--accent-secondary));
  border-radius: 999px;
  transition: width var(--transition-fast);
}

.nav-links a:hover {
  color: #a4bae2;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

/* Buttons */
.btn {
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all var(--transition-fast);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn.primary {
  background: linear-gradient(135deg, rgb(175, 34, 34), rgb(197, 85, 85));
  color: #0b1220;
  box-shadow: 0 16px 40px rgba(255, 45, 45, 0.32);
  border-color: rgba(157, 169, 188, 0.45);
  border-radius: 5px;
}

.btn.primary:hover {
  transform: translateY(2px);
  box-shadow: 0 20px 48px rgba(178, 40, 40, 0.42);
}

.btn.ghost {
  background: transparent;
  color: var(--text-main);
  border-color: rgba(148, 163, 184, 0.3);
}

.btn.ghost:hover {
  border-color: rgba(59, 130, 246, 0.8);
  color: rgba(255, 255, 255, 0.94);
}

/* Game Providers */
.providers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.provider-card {
  background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.85), #020617);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-card);
}

.provider-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #e5e7eb;
}

.provider-games {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.mini-game-icon {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-med);
}

.mini-game-icon:hover {
  transform: scale(1.05);
}

.mini-game-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Search and Filters */
.search-filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.search-bar {
  display: flex;
  gap: 8px;
}

.search-bar input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: var(--radius-md);
  background: rgba(15, 23, 42, 0.7);
  color: #e5e7eb;
  font-size: 0.9rem;
}

.search-btn {
  padding: 12px 16px;
  background: var(--accent-secondary);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
}

.filter-dropdowns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-dropdowns select {
  padding: 8px 12px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: var(--radius-md);
  background: rgba(15, 23, 42, 0.7);
  color: #e5e7eb;
  font-size: 0.85rem;
}

/* Games Grid */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.game-card {
  border-radius: var(--radius-lg);
  background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.9), #020617);
  border: 1px solid rgba(33, 47, 65, 0.9);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-med), box-shadow var(--transition-med);
  flex: 0 0 calc((100% - 16px) / 4);
  scroll-snap-align: start;
  text-decoration: none;
  color: inherit;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(88, 104, 143, 0.95);
}

.game-image {
  height: 120px;
  position: relative;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-info {
  padding: 12px;
}

.game-title {
  font-size: 1rem;
  font-weight: 600;
  color: #d3d8e2;
  margin-bottom: 2px;
}

.game-provider {
  font-size: 0.8rem;
  color: gray;
}

.loading-more {
  text-align: center;
  color: var(--text-muted);
  font-size: 1rem;
  padding: 5px;
}

/* Pros & Cons */
.pros-cons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.pros-card,
.cons-card {
  background: radial-gradient(circle at top left, rgba(139, 142, 148, 0.85), #3f4f96);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 24px;
  box-shadow: var(--shadow-card);
}

.pros-card {
  border-color: rgba(34, 197, 94, 0.3);
}

.cons-card {
  border-color: rgba(239, 68, 68, 0.3);
}

.pros-card h3,
.cons-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #e5e7eb;
}

.pros-card ul,
.cons-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros-card li,
.cons-card li {
  padding: 8px 0;
  position: relative;
  padding-left: 24px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.pros-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #18c557;
}

.cons-card li::before {
  content: '✗';
  position: absolute;
  left: 0;
  color: #ef4444;
}

/* Player Experience Analysis */
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 16px;
}

.analysis-item {
  background: radial-gradient(circle at top left, rgba(131, 99, 219, 0.774), #855050);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-card);
}

.analysis-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.progress-bar {
  height: 8px;
  background: rgba(243, 244, 245, 0.2);
  border-radius: 4px;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-secondary), var(--accent));
  border-radius: 4px;
  transition: width 0.3s ease;
}

.analysis-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e5e7eb;
}

.analysis-note {
  text-align: center;
  color: #b1b4b9;
  font-size: 0.8rem;
  margin-top: 12px;
}

/* FAQ */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.85), #020617);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.faq-question {
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background var(--transition-fast);
}

.faq-question:hover {
  background: rgba(59, 130, 246, 0.1);
}

.faq-question h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #d4d6d8ef;
  margin: 0;
}

.faq-toggle {
  font-size: 1.5rem;
  color: var(--accent);
  font-weight: 300;
}

.faq-answer {
  padding: 0 20px 20px;
  color: #c7cbd4;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Latest Winners */
.winners-list {
  max-width: 600px;
  margin: 0 auto;
}

.winner-item {
  background: radial-gradient(circle at top left, #565c79, #253169);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-card);
}

.winner-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.winner-player {
  font-weight: 600;
  color: #e5e7eb;
}

.winner-game {
  font-size: 0.85rem;
  color: #eff3fd86;
}

.winner-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #22c55e;
}

/* Player Reviews */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.review-card {
  background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.85), #020617);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 20px;
  box-shadow: var(--shadow-card);
}

.review-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.review-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-info h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e5e7eb;
  margin: 0 0 4px 0;
}

.review-rating {
  color: #facc15;
  font-size: 0.8rem;
}

.review-text {
  font-size: 0.85rem;
  color: #cbcccf;
  line-height: 1.5;
}

/* Footer */
.footer {
  margin-top: 80px;
  background: linear-gradient(180deg, rgba(10, 12, 18, 0.7), #050509);
  border-top: 1px solid rgba(15, 23, 42, 0.9);
  padding: 50px 24px 20px;
  color: rgba(229, 231, 235, 0.64);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: space-between;
}

.footer-brand {
  flex: 1 1 300px;
  max-width: 380px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
}

.footer-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 16px;
}

.footer-socials {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #cbd5e1;
  transition: all 0.2s;
}

.social-icon:hover {
  background: #ff2d2d;
  color: #fff;
}

.footer-columns {
  display: flex;
  gap: 60px;
}

.footer-column h4 {
  font-size: 0.9rem;
  color: #fff;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-column a {
  display: block;
  font-size: 0.85rem;
  color: #94a3b8;
  text-decoration: none;
  margin-bottom: 10px;
}

.footer-column a:hover {
  color: #ff2d2d;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.05);
  font-size: 0.78rem;
  color: #64748b;
  text-align: center;
}

/* Responsive */
@media (max-width: 880px) {
  .navbar-inner {
    gap: 14px;
  }

  .nav-links {
    display: none;
  }

  .providers-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

@media (max-width: 640px) {
  .section {
    padding: 40px 16px;
  }

  .footer-inner {
    flex-direction: column;
  }

  .footer-columns {
    flex-direction: column;
  }

  .search-filters {
    gap: 12px;
  }

  .filter-dropdowns {
    flex-direction: column;
  }

  .filter-dropdowns select {
    width: 100%;
  }
}
</style>
