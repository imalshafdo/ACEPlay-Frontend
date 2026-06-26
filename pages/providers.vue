<template>
  <div class="page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-badge">♤</span>
          <span class="logo-text">ACE<span class="logo-accent">Play</span></span>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink to="/">Home</NuxtLink>
          <a href="#trending-games">Trending Games</a>
          <a href="#player-reviews">Player Reviews</a>
          <a href="#pros-cons">Pros &amp; Cons</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div class="nav-actions">
          <button class="btn btn-join primary">Join Now</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Game Providers Section -->
      <section class="section">
        <h1 class="page-title">Game Providers</h1>

        <div class="providers-grid">
          <div v-for="provider in gameProviders" :key="provider.name" class="provider-card">
            <div class="provider-header">
              <span class="provider-logo-img">{{ provider.logo }}</span>
              <h3 class="provider-name">{{ provider.name }}</h3>
            </div>
            <div class="provider-games">
              <NuxtLink 
                v-for="(game, index) in provider.games" 
                :key="index" 
                :to="'/gamedetails?title=' + encodeURIComponent(getGameTitleByUrl(game))"
                class="mini-game-icon"
              >
                <img :src="game" alt="Game preview" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Search and Filters Bar -->
        <div class="search-filters">
          <div class="search-group">
            <span class="search-label">SEARCH MORE GAME PROVIDERS</span>
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Find Best Games..." 
                class="search-input" 
              />
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">VOLATILITY</span>
            <select v-model="selectedVolatility" class="filter-select">
              <option value="all">All Levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="filter-group">
            <span class="filter-label">MIN RTP</span>
            <select v-model="selectedRtp" class="filter-select">
              <option value="any">Any RTP</option>
              <option value="95">95%+</option>
              <option value="96">96%+</option>
              <option value="97">97%+</option>
            </select>
          </div>

          <div class="filter-group flex-category">
            <span class="filter-label">CATEGORY</span>
            <div class="category-buttons">
              <button 
                @click="selectedCategory = 'all'" 
                :class="['cat-btn', { active: selectedCategory === 'all' }]"
              >
                All
              </button>
              <button 
                @click="selectedCategory = 'slots'" 
                :class="['cat-btn', { active: selectedCategory === 'slots' }]"
              >
                Slots
              </button>
              <button 
                @click="selectedCategory = 'live'" 
                :class="['cat-btn', { active: selectedCategory === 'live' }]"
              >
                Live
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Trending Games Section -->
      <section id="trending-games" class="section">
        <h2 class="section-title">Trending Games</h2>
        
        <div class="games-grid">
          <NuxtLink 
            v-for="game in filteredGames" 
            :key="game.title" 
            :to="'/gamedetails?title=' + encodeURIComponent(game.title)"
            class="game-card"
          >
            <img :src="game.image" :alt="game.title" class="game-image" />
            <div class="game-title-overlay">{{ game.title }}</div>
          </NuxtLink>
        </div>

        <div class="loading-more">
          <span class="dots">•••</span>
          LOADING MORE GAMES..
        </div>
      </section>

      <!-- Player Reviews Section -->
      <section id="player-reviews" class="section">
        <h2 class="section-title text-left">Player Reviews</h2>

        <div class="reviews-grid">
          <div v-for="(review, index) in playerReviews" :key="index" class="review-card">
            <div class="review-card-inner">
              <div class="review-avatar-col">
                <img :src="review.avatar" alt="User avatar" class="review-avatar" />
              </div>
              <div class="review-body-col">
                <p class="review-text">“{{ review.text }}”</p>
                <div class="review-footer">
                  <div class="game-tag">
                    <img :src="review.gameIcon" alt="Game icon" class="game-tag-icon" />
                  </div>
                  <div class="review-rating-stars">
                    <span class="stars-red">★★★★★</span>
                    <span class="rating-text">({{ review.rating }}/5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pros & Cons Section -->
      <section id="pros-cons" class="section">
        <h2 class="section-title text-left">Pros &amp; Cons</h2>
        <p class="section-desc">We analyze games objectively to help you decide if this category matches your playstyle.</p>

        <div class="pros-cons-layout">
          <div class="pros-cons-left">
            <div class="pros-box">
              <h3 class="pros-box-title text-green">
                <span class="pros-icon">✓</span> Advantages (Pros)
              </h3>
              <ul class="pros-cons-list">
                <li>Potential for massive jackpots relative to stake</li>
                <li>Easy to learn with no complex strategies needed</li>
                <li>Incredible visual and auditory themes</li>
                <li>Thousands of diverse titles to choose from</li>
              </ul>
            </div>

            <div class="cons-box">
              <h3 class="pros-box-title text-red">
                <span class="cons-icon">✗</span> Drawbacks (Cons)
              </h3>
              <ul class="pros-cons-list">
                <li>High volatility can lead to fast bankroll swings</li>
                <li>House edge is generally higher than blackjack</li>
                <li>Low control over game outcomes (Pure RNG)</li>
              </ul>
            </div>
          </div>

          <div class="pros-cons-right">
            <div class="analysis-box">
              <h3 class="analysis-box-title">Player Experience Analysis</h3>

              <div class="analysis-item">
                <div class="analysis-info">
                  <span class="analysis-label">SKILL LEVEL REQUIRED</span>
                  <span class="analysis-val text-red">LOW (15%)</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 15%"></div>
                </div>
              </div>

              <div class="analysis-item">
                <div class="analysis-info">
                  <span class="analysis-label">SESSION DURATION AVG.</span>
                  <span class="analysis-val text-red">MEDIUM (45M)</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 45%"></div>
                </div>
              </div>

              <div class="analysis-item">
                <div class="analysis-info">
                  <span class="analysis-label">RISK ASSESSMENT</span>
                  <span class="analysis-val text-red">HIGH (85%)</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 85%"></div>
                </div>
              </div>

              <div class="analysis-item">
                <div class="analysis-info">
                  <span class="analysis-label">ENTERTAINMENT VALUE</span>
                  <span class="analysis-val text-red">EXCEPTIONAL (95%)</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 95%"></div>
                </div>
              </div>

              <p class="analysis-footer">Data based on aggregated player telemetry from Q3 2023.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Frequently Asked Questions -->
      <section id="faq" class="section">
        <div class="faq-layout">
          <div class="faq-left">
            <h2 class="section-title text-left">Frequently Asked Questions</h2>
            
            <div class="faq-list">
              <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
                <div @click="toggleFaq(index)" class="faq-question-header">
                  <h3>{{ faq.question }}</h3>
                  <span class="faq-icon-toggle">{{ faq.open ? '▲' : '▼' }}</span>
                </div>
                <div v-show="faq.open" class="faq-answer-body">
                  <p>{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="faq-right">
            <div class="winners-box">
              <h3 class="winners-title">
                <span class="announcement-icon">📢</span> Latest Winners
              </h3>
              <div class="winners-list">
                <div v-for="(winner, idx) in latestWinners" :key="idx" class="winner-row">
                  <div class="winner-info-col">
                    <span class="winner-username">{{ winner.username }}</span>
                    <span class="winner-game-name">{{ winner.game }}</span>
                  </div>
                  <div class="winner-amount text-green">+{{ winner.amount }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-badge">♤</span>
            <span class="logo-text">ACE<span class="logo-accent">Play</span></span>
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
import { ref, computed } from 'vue'

// Search & filter state
const searchQuery = ref('')
const selectedVolatility = ref('all')
const selectedRtp = ref('any')
const selectedCategory = ref('all')

const getGameTitleByUrl = (url) => {
  if (!url) return 'Super Ace'
  if (url.includes('41402')) return 'Cash God X4096'
  if (url.includes('32615')) return 'Super Ace'
  if (url.includes('7444')) return 'Golden Empire'
  if (url.includes('39003')) return 'Super Ace Deluxe'
  if (url.includes('7443')) return 'Lucky Meow'
  if (url.includes('7476')) return 'Dragon Treasure 4'
  if (url.includes('7592')) return 'Royale House'
  if (url.includes('31697')) return 'Wild Coin Plunder'
  if (url.includes('7391')) return 'Fortune Overflow'
  if (url.includes('34194')) return 'Royal Ace'
  if (url.includes('32616')) return 'Lucky Penny'
  if (url.includes('32614')) return 'Wild Bounty Showdown'
  return 'Super Ace'
}

const gameProviders = [
  {
    name: 'JILI Games',
    logo: 'JILI NO.1',
    games: [
      'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17', // Cash God
      'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32615.3.webp?version=6', // Super Ace
      'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7444.3.webp?version=22', // Golden Empire
      'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.39003.3.webp?version=3' // Super Ace Deluxe
    ]
  },
  {
    name: 'VP Games',
    logo: 'VP',
    games: [
      'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7443.3.webp?version=20', // Lucky Meow
      'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7476.3.webp?version=18', // Dragon Treasure
      'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.7592.3.webp?version=6', // Royale House
      'https://download.ocms.cloud/v2/common2/RSG/PlatformGameList.31697.3.webp?version=26' // Wild Coin Plunder
    ]
  },
  {
    name: 'YB Games',
    logo: 'YB',
    games: [
      'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.7592.3.webp?version=6', // Royale House
      'https://download.ocms.cloud/v2/common2/JDBV2/PlatformGameList.7391.3.webp?version=25', // Fortune Overflow
      'https://download.ocms.cloud/v2/common/NS/PlatformGameList.34194.3.webp?version=18', // Royal Ace
      'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17' // Cash God
    ]
  },
  {
    name: 'KA Games',
    logo: 'KA',
    games: [
      'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32616.3.webp?version=6', // Lucky Penny
      'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.39003.3.webp?version=3', // Wild Bounty
      'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32615.3.webp?version=6', // Super Ace Deluxe
      'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7476.3.webp?version=18' // Dragon Treasure
    ]
  }
]

const trendingGames = [
  { title: 'Cash God X4096', provider: 'jili', category: 'slots', volatility: 'high', rtp: 96.8, image: 'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17' },
  { title: 'Super Crown', provider: 'jili', category: 'slots', volatility: 'medium', rtp: 95.5, image: 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7444.3.webp?version=22' },
  { title: 'Wild Bounty Showdown', provider: 'vp', category: 'slots', volatility: 'high', rtp: 97.2, image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32614.3.webp?version=6' },
  { title: 'Lucky Penny', provider: 'ka', category: 'slots', volatility: 'low', rtp: 94.8, image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32616.3.webp?version=6' },
  { title: 'Golden Empire', provider: 'jili', category: 'slots', volatility: 'medium', rtp: 96.1, image: 'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.39003.3.webp?version=3' },
  { title: 'Dragon Treasure 4', provider: 'vp', category: 'live', volatility: 'medium', rtp: 97.0, image: 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7476.3.webp?version=18' },
  { title: 'Fortune Overflow', provider: 'yb', category: 'slots', volatility: 'low', rtp: 95.0, image: 'https://download.ocms.cloud/v2/common2/JDBV2/PlatformGameList.7391.3.webp?version=25' },
  { title: 'Super Ace Deluxe', provider: 'jili', category: 'slots', volatility: 'high', rtp: 96.5, image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32615.3.webp?version=6' },
  { title: 'Wild Coin Plunder', provider: 'vp', category: 'slots', volatility: 'high', rtp: 95.8, image: 'https://download.ocms.cloud/v2/common2/RSG/PlatformGameList.31697.3.webp?version=26' },
  { title: 'Royale House', provider: 'yb', category: 'slots', volatility: 'medium', rtp: 96.4, image: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.7592.3.webp?version=6' },
  { title: 'Royal Ace', provider: 'yb', category: 'live', volatility: 'high', rtp: 97.4, image: 'https://download.ocms.cloud/v2/common/NS/PlatformGameList.34194.3.webp?version=18' },
  { title: 'Lucky Meow', provider: 'vp', category: 'slots', volatility: 'low', rtp: 95.2, image: 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7443.3.webp?version=20' }
]

const playerReviews = [
  {
    avatar: 'https://www.bing.com/th/id/OIP.rblV8bkbI-lti1vZFq1A_QHaFv?w=231&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    text: 'The deposit process was quick and simple. My funds were credited instantly, and the games ran smoothly without any issues.',
    gameIcon: 'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17',
    rating: '4.9'
  },
  {
    avatar: 'data:image/webp;base64,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',
    text: 'Depositing money was very easy, but I think the withdrawal instructions could be explained more clearly for new users.',
    gameIcon: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32616.3.webp?version=6',
    rating: '4.9'
  },
  {
    avatar: 'https://www.bing.com/th/id/OIP.MtMdbjX2qocGDLlqi58CBAHaE7?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    text: 'I was impressed with how fast the withdrawal process was. It didn’t take too long, and the steps were clearly explained.',
    gameIcon: 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32614.3.webp?version=6',
    rating: '4.9'
  },
  {
    avatar: 'https://www.bing.com/th/id/OIP.Z22b4YULHv9kZUxy7DZRJQHaEJ?w=249&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    text: 'The platform is engaging, and both deposits and withdrawals are straightforward, which makes the overall experience more trustworthy.',
    gameIcon: 'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17',
    rating: '4.9'
  }
]

const faqs = ref([
  {
    question: 'How fast are withdrawals at JILI NO1?',
    answer: 'Most e-wallet and crypto withdrawals are processed within 2–6 hours. Bank transfers may take up to 3 business days depending on your region and bank\'s processing time.',
    open: true
  },
  {
    question: 'Is my data secure with JILI?',
    answer: 'Yes, JILI games are fully certified by leading industry testing labs (GLI, iTech Labs) and use advanced security standards to guarantee player safety and fair play.',
    open: false
  },
  {
    question: 'Can I play JILI on my mobile phone?',
    answer: 'Absolutely! All JILI games are built on HTML5 technology, making them completely compatible with mobile browsers on both iOS and Android devices.',
    open: false
  }
])

const latestWinners = [
  { username: 'Player_4221', game: 'Mega Moolah', amount: '12,450' },
  { username: 'LuckJ77', game: 'Lightning Roulette', amount: '3,200' },
  { username: 'AceKing_9', game: 'Gates of Olympus', amount: '850' }
]

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}

const filteredGames = computed(() => {
  return trendingGames.filter(g => {
    // Search query filter
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          g.provider.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Category filter
    const matchesCategory = selectedCategory.value === 'all' || g.category === selectedCategory.value

    // Volatility filter
    const matchesVolatility = selectedVolatility.value === 'all' || g.volatility === selectedVolatility.value

    // RTP filter
    const minRtp = selectedRtp.value === 'any' ? 0 : parseFloat(selectedRtp.value)
    const matchesRtp = g.rtp >= minRtp

    return matchesSearch && matchesCategory && matchesVolatility && matchesRtp
  })
})
</script>

<style scoped>
:root {
  --accent: #ff2d2d;
  --bg-gradient: radial-gradient(circle at top, #22324a 0%, #071227 55%, #03050b 100%);
  --text-main: #f1f5f9;
  --text-muted: #9ca3af;
}

.page {
  min-height: 100vh;
  background: #0f172a;
  background-image: radial-gradient(circle at top, #1e293b 0%, #0f172a 60%, #020617 100%);
  color: #f1f5f9;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding-bottom: 0px;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(15, 23, 42, 0.85);
  border-bottom: 1px solid rgba(82, 108, 145, 0.2);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.logo-badge {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: radial-gradient(circle at 30% 0%, #ff2d2d, #0b1220 70%);
}

.logo-text {
  font-size: 1.1rem;
}

.logo-accent {
  color: #ff2d2d;
}

.nav-links {
  display: flex;
  gap: 24px;
  font-size: 0.9rem;
  color: #fff;
  font-weight: 600;
}

.nav-links a {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.nav-links a:hover {
  color: rgba(255, 45, 45, 0.85);
}

.nav-actions {
  display: flex;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn.primary {
  background: #ff2d2d;
  color: white;
}
.btn.primary:hover {
  background: #d32f2f;
}

.btn-join {
  padding: 8px 24px;
  border-radius: 8px;
}

/* Main Layout */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.section {
  margin-bottom: 70px;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #fff;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #fff;
}

.section-title.text-left {
  text-align: left;
}

.section-desc {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 30px;
  margin-top: -12px;
}

/* Providers Grid */
.providers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.provider-card {
  background: #231616;
  border: 1px solid rgba(255, 45, 45, 0.15);
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.provider-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.provider-logo-img {
  background: #ffbc0d;
  color: #000;
  font-weight: 900;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 4px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.provider-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.provider-games {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.mini-game-icon {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.mini-game-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Search and Filters */
.search-filters {
  background: #181c2b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 16px;
}

.search-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1.5;
  min-width: 180px;
}

.search-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 0.9rem;
  color: #64748b;
}

.search-input {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 8px 12px 8px 36px;
  color: #fff;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #ff2d2d;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 120px;
}

.filter-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.05em;
}

.filter-select {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 8px 32px 8px 12px;
  color: #fff;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
}

.filter-select:focus {
  border-color: #ff2d2d;
}

.flex-category {
  flex: 1.5 !important;
  min-width: 180px;
}

.category-buttons {
  display: flex;
  gap: 8px;
}

.cat-btn {
  flex: 1;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 8px;
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-btn.active {
  background: #ff2d2d;
  color: #fff;
  border-color: #ff2d2d;
}

/* Trending Games Grid */
.games-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.game-card {
  display: block;
  position: relative;
  aspect-ratio: 16/10;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-image {
  transform: scale(1.05);
}

.game-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
  padding: 16px 12px 10px 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.loading-more {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.08em;
  margin-top: 30px;
}

.loading-more .dots {
  color: #ff2d2d;
  margin-right: 4px;
}

/* Reviews Grid */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.review-card {
  background: #231616;
  border: 1px solid rgba(255, 45, 45, 0.1);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
}

.review-card-inner {
  display: flex;
  gap: 20px;
}

.review-avatar-col {
  flex-shrink: 0;
}

.review-avatar {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  object-fit: cover;
  border: 2px solid rgba(255, 45, 45, 0.3);
}

.review-body-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.review-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #cbd5e1;
  margin: 0 0 16px 0;
  font-style: italic;
}

.review-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.game-tag {
  width: 56px;
  height: 36px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
}

.game-tag-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-rating-stars {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.stars-red {
  color: #ff2d2d;
  letter-spacing: 2px;
  font-size: 0.9rem;
}

.rating-text {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

/* Pros & Cons Layout */
.pros-cons-layout {
  display: flex;
  gap: 30px;
}

.pros-cons-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pros-box {
  background: rgba(24, 197, 87, 0.03);
  border: 1px solid rgba(24, 197, 87, 0.3);
  border-radius: 12px;
  padding: 24px;
}

.cons-box {
  background: rgba(255, 45, 45, 0.03);
  border: 1px solid rgba(255, 45, 45, 0.3);
  border-radius: 12px;
  padding: 24px;
}

.text-green {
  color: #22c55e !important;
}

.text-red {
  color: #ff2d2d !important;
}

.pros-box-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pros-icon {
  background: rgba(34, 197, 94, 0.15);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.cons-icon {
  background: rgba(255, 45, 45, 0.15);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.pros-cons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pros-cons-list li {
  font-size: 0.9rem;
  color: #cbd5e1;
  position: relative;
  padding-left: 20px;
}

.pros-cons-list li::before {
  content: "•";
  position: absolute;
  left: 4px;
  color: #64748b;
  font-size: 1.1rem;
  top: -1px;
}

.pros-cons-right {
  flex: 1;
}

.analysis-box {
  background: #231616;
  border: 1px solid rgba(255, 45, 45, 0.1);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.analysis-box-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #fff;
}

.analysis-item {
  margin-bottom: 18px;
}

.analysis-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.analysis-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.analysis-val {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.progress-bar {
  height: 6px;
  background: #111a28;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #ff2d2d;
  border-radius: 999px;
}

.analysis-footer {
  font-size: 0.8rem;
  color: #64748b;
  margin: auto 0 0 0;
  padding-top: 16px;
}

/* FAQ Accordion & Winners Layout */
.faq-layout {
  display: flex;
  gap: 30px;
}

.faq-left {
  flex: 1.2;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: #231616;
  border: 1px solid rgba(255, 45, 45, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.faq-question-header {
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ff2d2d;
  margin: 0;
}

.faq-icon-toggle {
  font-size: 0.8rem;
  color: #ff2d2d;
}

.faq-answer-body {
  padding: 0 20px 18px 20px;
  border-top: 1px solid rgba(255, 45, 45, 0.05);
  font-size: 0.88rem;
  line-height: 1.6;
  color: #cbd5e1;
}

.faq-answer-body p {
  margin: 10px 0 0 0;
}

.faq-right {
  flex: 1;
}

.winners-box {
  background: #111a28;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
  height: 100%;
}

.winners-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.announcement-icon {
  font-size: 1.2rem;
}

.winners-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.winner-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.winner-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.winner-info-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.winner-username {
  font-size: 0.9rem;
  font-weight: 700;
  color: #f1f5f9;
}

.winner-game-name {
  font-size: 0.78rem;
  color: #64748b;
}

.winner-amount {
  font-size: 1.05rem;
  font-weight: 800;
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

/* Responsive design */
@media (max-width: 1024px) {
  .providers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .games-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .pros-cons-layout {
    flex-direction: column;
  }
  .faq-layout {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
  .filter-dropdowns {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 640px) {
  .providers-grid {
    grid-template-columns: 1fr;
  }
  .games-grid {
    grid-template-columns: 1fr;
  }
  .navbar-inner {
    padding: 12px 16px;
  }
  .nav-links {
    display: none;
  }
}
</style>
