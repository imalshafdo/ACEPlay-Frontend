<template>
  <div class="page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="logo" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
          <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Flogo%2Fhero.png&w=1536&q=100" alt="ACEPlay logo" style="height: 35px; object-fit: contain;" />
          <span style="font-weight: 800; font-size: 1.25rem; letter-spacing: 0.04em; color: #ffffff;">ACE<span style="color: #ff2d2d;">Play</span></span>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/providers" class="active">Games</NuxtLink>
          <NuxtLink to="/countries/country">Countries</NuxtLink>
          <a href="#how-to-play">How to play</a>
          <a href="#pros-cons">Pros &amp; Cons</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div class="nav-actions">
          <button class="btn btn-join primary">Join Now</button>
        </div>
      </div>
    </header>

    <!-- Game Hero Section -->
    <section class="game-hero">
      <div class="hero-bg-wrapper">
        <img 
          src="https://png.pngtree.com/thumb_back/fw800/background/20230718/pngtree-a-3d-realistic-online-casino-slot-machine-with-roulette-flying-chips-image_3905105.jpg" 
          alt="Hero background image" 
          class="hero-bg-image" 
        />
        <div class="hero-overlay"></div>
      </div>
      
      <div class="game-hero-inner">
        <div class="hero-top-row">
          <div class="hero-left-content">
            <div class="game-breadcrumbs">
              <NuxtLink to="/providers">Games</NuxtLink>
              <span class="breadcrumb-separator">></span>
              <span class="provider-link">{{ game.provider }}</span>
              <span class="breadcrumb-separator">></span>
              <span class="current-game">{{ game.title }}</span>
            </div>

            <div class="hero-badges">
              <span class="badge badge-red">TOP RATED 2026</span>
              <span class="badge badge-grey">{{ game.provider.toUpperCase() }}</span>
            </div>

            <h1 class="hero-game-title">{{ game.title }}</h1>
          </div>
          
          <div class="hero-right-image-wrapper">
            <img :src="getGameThumbnail(game.title)" :alt="game.title" class="hero-game-image" />
          </div>
        </div>

        <!-- Stats Row -->
        <div class="hero-stats-row">
          <div class="stat-box">
            <span class="stat-label">RETURN TO PLAYER</span>
            <span class="stat-value">{{ game.rtp }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">VOLATILITY</span>
            <span class="stat-value text-red">{{ game.volatility }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">MAX WIN</span>
            <span class="stat-value text-gold">{{ game.maxWin }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">PLAYLINES</span>
            <span class="stat-value">{{ game.playlines }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Container -->
    <main class="main-container">
      <div class="columns-wrapper">
        
        <!-- Left Column -->
        <div class="col-left">
          
          <!-- Game Overview Card -->
          <div class="details-card overview-card">
            <h2 class="card-title">
              <span class="info-icon">ⓘ</span> Game Overview
            </h2>
            <p class="overview-desc">{{ game.overview }}</p>
            <p class="overview-desc mt-12">{{ game.overview2 }}</p>
          </div>

          <!-- How to Play Card -->
          <div id="how-to-play" class="details-card how-to-play-card">
            <h2 class="card-title">How to Play {{ game.title }}</h2>
            <div class="steps-list">
              <div v-for="(step, index) in game.steps" :key="index" class="step-row">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-info">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-desc">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pros & Cons Container -->
          <div id="pros-cons" class="pros-cons-container">
            <!-- Pros Card -->
            <div class="pros-card">
              <h3 class="pros-title">✓ Pros</h3>
              <ul class="pros-cons-list">
                <li v-for="pro in game.pros" :key="pro" class="pro-item">
                  <span class="list-bullet bullet-green">✓</span>
                  <span class="item-text">{{ pro }}</span>
                </li>
              </ul>
            </div>

            <!-- Cons Card -->
            <div class="cons-card">
              <h3 class="cons-title">✗ Cons</h3>
              <ul class="pros-cons-list">
                <li v-for="con in game.cons" :key="con" class="con-item">
                  <span class="list-bullet bullet-red">✗</span>
                  <span class="item-text">{{ con }}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Right Column -->
        <div class="col-right">
          
          <!-- Top Pick Card -->
          <div class="top-pick-card">
            <div class="top-pick-header">OUT TOP PICK</div>
            <div class="top-pick-body">
              <div class="provider-logo-badge">{{ game.provider.toUpperCase() }}</div>
              <span class="bonus-label">EXCLUSIVE BONUS</span>
              <span class="bonus-value">{{ game.topPick.bonus }}</span>
              <button class="btn btn-cta">{{ game.topPick.cta }}</button>
              <span class="terms-subtext">TERMS &amp; CONDITIONS APPLY</span>
            </div>
          </div>

          <!-- More From Provider Card -->
          <div class="more-games-card">
            <h3 class="more-games-title">MORE FROM {{ game.provider.split(' ')[0].toUpperCase() }}</h3>
            <div class="more-games-list">
              <NuxtLink 
                v-for="related in relatedGames" 
                :key="related.title" 
                :to="'/gamedetails?title=' + encodeURIComponent(related.title)" 
                class="related-game-item"
              >
                <div class="related-thumb-wrapper">
                  <img :src="getGameThumbnail(related.title)" :alt="related.title" class="related-thumb-img" />
                </div>
                <div class="related-game-details">
                  <span class="related-title">{{ related.title }}</span>
                  <span class="related-rtp">RTP: {{ related.rtp }}</span>
                </div>
                <span class="arrow-right">→</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Who Is This Game For Card -->
          <div class="who-for-card">
            <h3 class="who-for-title">
              <span class="watch-icon">⏱</span> Who Is This Game For?
            </h3>
            <ul class="who-for-list">
              <li v-for="item in game.whoIsFor" :key="item" class="who-for-item">
                <span class="bullet-dot">•</span>
                <span class="who-for-text">{{ item }}</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </main>

    <!-- Frequently Asked Questions -->
    <section id="faq" class="section faq-section">
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
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const gameTitleQuery = computed(() => {
  return route.query.title || 'Super Ace'
})

const gamesDatabase = {
  'Super Ace': {
    title: 'Super Ace',
    provider: 'JILI Games',
    rtp: '97.0%',
    volatility: 'HIGH',
    maxWin: 'X1500',
    playlines: '1024',
    overview: "Super Ace is JILI Games' most iconic contribution to the online slot world. Embracing a sophisticated card-game aesthetic, this 5-reel, 4-row masterpiece offers a massive 1,024 ways to win. What sets it apart is the \"Golden Card\" elimination mechanic, which transforms ordinary symbols into wild jokers, triggering chain reactions of wins.",
    overview2: "The game's visual fidelity is matched only by its mathematical precision. High volatility ensures that while wins might not happen on every spin, when they do land, they tend to be substantial, especially when the progressive multipliers kick in.",
    steps: [
      {
        title: 'Adjust Your Bet',
        desc: "Use the '+' and '-' buttons at the bottom of the game screen to set your wager (typically ranging from $0.10 to $100 per spin)."
      },
      {
        title: 'Spin and Eliminate',
        desc: "Click the Spin button. Symbols in winning combinations disappear, and new symbols fall from above in an 'elimination' sequence."
      },
      {
        title: 'Unlock Free Spins',
        desc: "Land 3 Scatters (Ace symbols) anywhere on the reels to trigger 10 Free Spins with double the usual multipliers."
      }
    ],
    pros: [
      "Exceptional RTP of 97% for better long-term value.",
      "Dynamic 1,024 ways to win system.",
      "Engaging progressive multipliers up to x10.",
      "Mobile-optimized UI for seamless play on the go."
    ],
    cons: [
      "High volatility may not suit casual 'play-safe' players.",
      "Maximum win capped at x1,500, lower than some competitors.",
      "Sound effects can become repetitive during long sessions."
    ],
    whoIsFor: [
      "Suitable for high-risk players",
      "Good for players who enjoy high volatility",
      "Not ideal for low-budget players",
      "Great for fast-paced gameplay lovers"
    ],
    topPick: {
      bonus: "200% UPTO $500",
      cta: "Play Super Ace Now 🚀"
    }
  },
  'Super Ace Deluxe': {
    title: 'Super Ace Deluxe',
    provider: 'JILI Games',
    rtp: '96.5%',
    volatility: 'HIGH',
    maxWin: 'X3000',
    playlines: '1024',
    overview: "Super Ace Deluxe is the enhanced sequel to JILI Games' iconic classic. It maintains the elegant card-game motif but amps up the volatility and action, offering even larger jackpot opportunities.",
    overview2: "Enjoy revamped graphics, crisper audio loops, and an improved interface designed for professional players looking for a more intense gaming session.",
    steps: [
      {
        title: 'Adjust Your Bet',
        desc: "Set your wagering parameters carefully before spinning. Golden cards are active on all reels."
      },
      {
        title: 'Spin and Match',
        desc: "Initiate spins. Winning combinations trigger cascading drops with multiplier increases."
      },
      {
        title: 'Trigger Deluxe Spins',
        desc: "Collect 3 or more Scatters to enter the Deluxe Free Games round with progressive multipliers."
      }
    ],
    pros: [
      "Higher maximum payout limit of X3000.",
      "Enhanced card elimination animations.",
      "Higher multiplier limits during Deluxe free games."
    ],
    cons: [
      "Deluxe mode increases risk and volatility.",
      "Minimum bet thresholds are slightly higher."
    ],
    whoIsFor: [
      "High-stakes slot enthusiasts",
      "Experienced players chasing bigger multipliers",
      "Fans of the original Super Ace looking for more thrill"
    ],
    topPick: {
      bonus: "250% UPTO $600",
      cta: "Play Super Ace Deluxe Now 🚀"
    }
  },
  'Golden Empire': {
    title: 'Golden Empire',
    provider: 'JILI Games',
    rtp: '96.1%',
    volatility: 'MEDIUM',
    maxWin: 'X2000',
    playlines: '32400',
    overview: "Golden Empire transports players back to the magnificent Aztec civilization. This unique slot game features a Megaways-like mechanic offering up to 32,400 ways to win, along with golden frame symbols that turn wild.",
    overview2: "The game features vibrant graphics, thematic background music, and a high-frequency hit rate that makes for an exceptionally engaging casual play experience.",
    steps: [
      {
        title: 'Set Wager Limits',
        desc: "Adjust your stake size. High lines are active by default to maximize Megaways potential."
      },
      {
        title: 'Match Aztec Relics',
        desc: "Match consecutive symbols from left to right. Golden-framed relics transform into wilds."
      },
      {
        title: 'Unlock Temple Free Spins',
        desc: "Get 4 Temple Scatter symbols to win 8 free spins with unlimited rising multipliers."
      }
    ],
    pros: [
      "Up to 32,400 dynamic ways to win.",
      "Wild card replacement with unlimited stack multiplier.",
      "Medium volatility is perfect for longer gameplay sessions."
    ],
    cons: [
      "Aztec theme is somewhat common in slots.",
      "Bonus rounds require 4 scatters instead of 3."
    ],
    whoIsFor: [
      "Casual players wanting frequent action",
      "Megaways mechanism enthusiasts",
      "History and ancient civilization slot fans"
    ],
    topPick: {
      bonus: "150% UPTO $400",
      cta: "Play Golden Empire Now 🚀"
    }
  },
  'Cash God X4096': {
    title: 'Cash God X4096',
    provider: 'JILI Games',
    rtp: '96.8%',
    volatility: 'HIGH',
    maxWin: 'X4096',
    playlines: '4096',
    overview: "Cash God X4096 features a vibrant Eastern deity theme where players are showered with wealth, lucky envelopes, and massive multipliers. With 4,096 paylines, the potential for huge consecutive payouts is incredibly high.",
    overview2: "Enjoy rich gold colors, immersive traditional soundscapes, and the blessing of the Cash God offering randomly triggered multipliers during any standard spin.",
    steps: [
      {
        title: 'Position Wager',
        desc: "Choose a coin value. High payout ways are locked in automatically."
      },
      {
        title: 'Seek Lucky Symbols',
        desc: "Spin to line up gold ingots, scrolls, and dynamic Wild symbols."
      },
      {
        title: 'Summon Cash God Free Spins',
        desc: "Match 3 Golden Envelopes to receive 12 Free Games with locked wild reels."
      }
    ],
    pros: [
      "Massive 4,096 paylines layout.",
      "Random Cash God blessing multipliers in base game.",
      "Highly rewarding envelope bonus collection."
    ],
    cons: [
      "High volatility can quickly drain smaller stakes.",
      "Graphics can be extremely flashy."
    ],
    whoIsFor: [
      "Players who love traditional oriental wealth themes",
      "High variance gameplay seekers",
      "Players who enjoy random base game events"
    ],
    topPick: {
      bonus: "200% UPTO $777",
      cta: "Play Cash God Now 🚀"
    }
  }
}

const game = computed(() => {
  const title = gameTitleQuery.value
  return gamesDatabase[title] || gamesDatabase['Super Ace']
})

const relatedGames = computed(() => {
  return Object.values(gamesDatabase).filter(g => g.title !== game.value.title).slice(0, 2)
})

const getGameThumbnail = (title) => {
  if (title === 'Golden Empire') return 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7444.3.webp?version=22'
  if (title === 'Cash God X4096') return 'https://download.ocms.cloud/v2/common2/VA/PlatformGameList.41402.3.webp?version=17'
  if (title === 'Super Ace Deluxe') return 'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.39003.3.webp?version=3'
  if (title === 'Super Ace') return 'https://download.ocms.cloud/v2/common2/PGV2/PlatformGameList.32615.3.webp?version=6'
  return 'https://download.ocms.cloud/v2/common2/JILIV2/PlatformGameList.7443.3.webp?version=20'
}

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

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<style scoped>
:root {
  --accent: #ff2d2d;
  --accent-dark: #d32f2f;
  --bg-dark: #070d19;
  --card-bg: #111a2e;
  --border-color: rgba(255, 255, 255, 0.06);
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
}

.page {
  min-height: 100vh;
  background: #070d19;
  color: #f1f5f9;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
  padding-bottom: 0px;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(7, 13, 25, 0.85);
  border-bottom: 1px solid rgba(82, 108, 145, 0.15);
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
  color: #94a3b8;
  font-weight: 600;
}

.nav-links a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.active {
  color: #ff2d2d;
}

.nav-actions {
  display: flex;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
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
}

/* Hero Section */
.game-hero {
  position: relative;
  padding: 80px 24px 60px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.hero-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
  filter: blur(12px);
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 30%, #070d19 100%),
              linear-gradient(to bottom, transparent, #070d19 95%);
}

.game-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.game-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 24px;
}

.game-breadcrumbs a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.game-breadcrumbs a:hover {
  color: #ff2d2d;
}

.breadcrumb-separator {
  color: #475569;
}

.hero-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 4px;
  letter-spacing: 0.05em;
}

.badge-red {
  background: #ff2d2d;
  color: #fff;
}

.badge-grey {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.hero-game-title {
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 32px 0;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.hero-stats-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-box {
  flex: 1;
  min-width: 150px;
  background: rgba(17, 26, 46, 0.65);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f8fafc;
}

.stat-value.text-red {
  color: #ff2d2d;
}

.stat-value.text-gold {
  color: #fbbf24;
}

/* Main Layout columns */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.columns-wrapper {
  display: flex;
  gap: 30px;
}

.col-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.col-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Cards styling */
.details-card {
  background: #111a2e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.card-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-icon {
  color: #ff2d2d;
}

.overview-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #cbd5e1;
}

.mt-12 {
  margin-top: 12px;
}

/* How to play steps */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step-row {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.step-number {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ff2d2d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(255, 45, 45, 0.3);
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.step-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #94a3b8;
  margin: 0;
}

/* Pros and Cons side-by-side */
.pros-cons-container {
  display: flex;
  gap: 20px;
}

.pros-card, .cons-card {
  flex: 1;
  background: #111a2e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.pros-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #10b981;
  margin: 0 0 16px 0;
}

.cons-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ef4444;
  margin: 0 0 16px 0;
}

.pros-cons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pro-item, .con-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.list-bullet {
  font-weight: 700;
  flex-shrink: 0;
  font-size: 0.95rem;
}

.bullet-green {
  color: #10b981;
}

.bullet-red {
  color: #ef4444;
}

.item-text {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #94a3b8;
}

/* Right Column Widgets */
.top-pick-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.top-pick-header {
  background: #ff2d2d;
  color: white;
  text-align: center;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  padding: 12px;
  text-transform: uppercase;
}

.top-pick-body {
  background: #111a2e;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.provider-logo-badge {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 900;
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
}

.bonus-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.bonus-value {
  font-size: 1.6rem;
  font-weight: 900;
  color: #fff;
}

.btn-cta {
  width: 100%;
  padding: 14px;
  background: #ff2d2d;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.95rem;
  text-transform: uppercase;
  margin: 20px 0 8px;
}

.btn-cta:hover {
  background: #d32f2f;
}

.terms-subtext {
  font-size: 0.65rem;
  color: #475569;
  letter-spacing: 0.03em;
}

/* Hero Top Row / Image Layout */
.hero-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
}

.hero-left-content {
  flex: 1;
}

.hero-right-image-wrapper {
  flex-shrink: 0;
  width: 300px;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  margin-top: 10px; /* shift down slightly to align with the text flow */
}

.hero-game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* More from provider */
.more-games-card {
  background: #111a2e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.more-games-title {
  font-size: 1rem;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.05em;
  margin: 0 0 16px 0;
}

.more-games-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related-game-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(7, 13, 25, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.related-game-item:hover {
  background: rgba(7, 13, 25, 0.7);
  border-color: rgba(255, 45, 45, 0.15);
}

.related-thumb-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: #070d19;
  display: flex;
  align-items: center;
  justify-content: center;
}

.related-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-icon-placeholder {
  font-size: 1.2rem;
}

.related-game-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.related-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #cbd5e1;
}

.related-rtp {
  font-size: 0.75rem;
  color: #10b981;
  font-weight: 600;
}

.arrow-right {
  color: #475569;
  font-weight: bold;
}

/* Who for card */
.who-for-card {
  background: #111a2e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.who-for-title {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.watch-icon {
  color: #ff2d2d;
}

.who-for-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.who-for-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.bullet-dot {
  color: #ff2d2d;
  font-weight: bold;
}

.who-for-text {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #94a3b8;
}

/* FAQ Section */
.faq-section {
  max-width: 1200px;
  margin: 40px auto 60px;
  padding: 0 24px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #fff;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: #111a2e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.faq-question-header {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.faq-question-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.faq-icon-toggle {
  font-size: 0.8rem;
  color: #64748b;
}

.faq-answer-body {
  padding: 0 24px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.02);
}

.faq-answer-body p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #94a3b8;
  margin: 12px 0 0 0;
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

/* Responsive breakpoint */
@media (max-width: 900px) {
  .columns-wrapper {
    flex-direction: column;
  }
  
  .pros-cons-container {
    flex-direction: column;
  }

  .hero-game-title {
    font-size: 2.2rem;
  }

  .stat-box {
    padding: 12px;
  }

  .footer-columns {
    justify-content: flex-start;
  }
}
</style>
