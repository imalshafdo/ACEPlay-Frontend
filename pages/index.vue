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
          <a href="#casinos">Casinos</a>
          <a href="#games">Games</a>
          <a href="#promotions">Promotions</a>
          <a href="#about">About</a>
        </nav>

        <div class="nav-actions" style="color:aliceblue">
          <button class="btn ghost">Log in</button>
          <button class="btn primary" style="color:snow">Sign up</button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <p class="hero-eyebrow"style="color:darkgray">Trusted reviews   • Real player insights</p>
        <h1 class="hero-title" style="color:white">
          Online Casino Hub
          <span class="hero-highlight" style="color:red">ACEPlay</span>
        </h1>
        <p class="subtitle"style="color:white">
          Find the "right casino" for you. Ranked according to international standards, transparent and verifiable, with free bonuses and exclusive promotions — ACEPlay is leading the way in online gaming!
        </p>

        <div class="hero-actions">
          <div class="country-selector">
            <button class="btn primary large" @click="toggleDropdown">
              {{ selectedCountry === 'default' ? 'See Top Casinos' : `Top Casinos - ${selectedCountry}` }}
              <span class="dropdown-arrow">▼</span>
            </button>
            <div v-if="showDropdown" class="dropdown-menu" @click.stop>
              <div 
                v-for="country in countries" 
                :key="country.code"
                class="dropdown-item"
                @click="selectCountry(country.code)"
                :class="{ active: selectedCountry === country.code }"
              >
                <span class="flag">{{ country.flag }}</span>
                <span>{{ country.name }}</span>
              </div>
            </div>
          </div>
          <NuxtLink class="btn secondary large" to="/countries/country" style="color:aliceblue">All Countries</NuxtLink>
        </div>

        <div class="hero-meta">
          <div class="meta-item" style="color:rgb(193, 187, 187)">
            <span class="meta-label" >Casinos reviewed</span>
            <span class="meta-value">120+</span>
          </div>
          <div class="meta-divider" />
          <div class="meta-item" style="color:darkgray">
            <span class="meta-label">Exclusive bonuses</span>
            <span class="meta-value">฿2,490,000+</span>
          </div>
          <div class="meta-divider" />
          <div class="meta-item" style="color:darkgray">
            <span class="meta-label">Players in Thailand</span>
            <span class="meta-value">85,000+</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Top casinos -->
    <section id="casinos" class="section">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Top Casinos in {{ currentCountryData.name }}</h2>
        <p class="section-subtitle" style="color:white">
          {{ currentCountryData.subtitle }}
        </p>
      </div>

      <div class="casino-scroller" ref="casinoScroller" @scroll="onCasinoScroll" aria-label="Top casinos horizontal scroller">
        <div class="casino-track">
          <article v-for="casino in currentCountryData.casinos" :key="casino.name" class="casino-card">
            <div class="casino-logo">
              <template v-if="casino.logoUrl">
                <img :src="casino.logoUrl" :alt="casino.name + ' logo'" class="casino-logo-img" />
              </template>
              <template v-else>
                <span>{{ casino.short }}</span>
              </template>
            </div>

            <div class="casino-content" style="color:darkgray">
              <div class="casino-header">
                <h3 class="casino-name">{{ casino.name }}</h3>
                <div class="casino-rating">
                  <span class="stars"> ★★★★ </span>
                  <span class="rating-score">{{ casino.rating }}</span>
                </div>
              </div>

              <p class="casino-bonus">
                {{ casino.bonus }}
              </p>

              <ul class="casino-tags">
                <li v-for="tag in casino.tags" :key="tag">{{ tag }}</li>
              </ul>

              <div class="casino-actions">
                <button class="btn small primary">Play now</button>
                <button class="btn small ghost">Review</button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Navigation slider / scroll track indicator -->
      <div class="casinos-nav-control">
        <button class="nav-arrow left" @click="scrollCasinos('left')">◀</button>
        <div class="custom-scroll-bar">
          <div class="custom-scroll-thumb" :style="{ left: `${casinoScrollPercent * 0.85}%` }"></div>
        </div>
        <button class="nav-arrow right" @click="scrollCasinos('right')">▶</button>
      </div>
    </section>

    <!-- Beginner's guide -->
    <section id="guide" class="section section-muted">
      <div class="section-header">
        <h2 class="section-title" style="color:white">Online Betting Beginner's Guide</h2>
        <p class="section-subtitle" style="color:white">
          New to online casinos? Follow these simple steps to play safely and responsibly.
        </p>
      </div>

      <div class="guide-grid" style="color:lightblue">
        <article v-for="step in guideSteps" :key="step.title" class="guide-card">
          <div class="guide-icon">{{ step.icon }}</div>
          <h3 class="guide-title">{{ step.title }}</h3>
          <p class="guide-text">{{ step.text }}</p>
        </article>
      </div>
    </section>

    <!-- Popular games -->
    <section id="games" class="section">
      <div class="section-header" style="text-align: center; margin-bottom: 24px;">
        <h2 class="section-title" style="color: white; font-size: 2.2rem; font-weight: 800; text-align: center; margin-bottom: 8px;">Popular games in {{ currentCountryData.name }}</h2>
      
        <p class="section-subtitle" style="color:white">
         Explore the most popular games in {{ currentCountryData.name }}! Play with confidence and maximize your chances of winning!
        </p>
      </div>

      <!-- Game grid/scroller -->
      <div class="game-scroller" ref="gameScroller" @scroll="onGameScroll" aria-label="Popular games horizontal scroller">
        <div class="game-track">
          <article v-for="game in currentGames" :key="game.title" class="game-card">
            <div class="game-image">
              <img v-if="game.casinoLogo" :src="game.casinoLogo" :alt="game.casino" class="game-casino-badge" />
              <img
                v-if="game.img"
                :src="game.img"
                :alt="game.title"
                class="game-image-img"
                loading="lazy"
              >
            </div>
            <div class="game-info">
              <h3 class="game-card-header">{{ game.provider }} - {{ game.title }} • <span class="game-casino-name">{{ game.casino }}</span></h3>
              
              <div class="game-stat-row">
                <span class="game-stat-label">Win Rate:</span>
                <span class="game-stat-value">{{ game.winRate }}</span>
              </div>
              
              <div class="game-highest-win-row">
                <span class="win-green-text">{{ game.highestWinText }}</span>
                <span class="win-separator"> • </span>
                <span class="win-date">{{ game.highestWinDate }}</span>
                <span class="trophy-icon"> 🏆</span>
              </div>

              <div class="game-wager-row">
                <div class="wager-winnings">
                  <span class="wager-label">Wager:</span>
                  <span class="wager-value">{{ game.wager }}</span>
                  <span class="winnings-label">Winnings:</span>
                  <span class="winnings-value">{{ game.winnings }}</span>
                </div>
                <div class="multiplier-badge">{{ game.multiplier }}</div>
              </div>

              <button class="btn-play-now">Play Now</button>
            </div>
          </article>
        </div>
      </div>

      <!-- Navigation slider / scroll track indicator -->
      <div class="games-nav-control">
        <button class="nav-arrow left" @click="scrollGames('left')">◀</button>
        <div class="custom-scroll-bar">
          <div class="custom-scroll-thumb" :style="{ left: `${scrollPercent * 0.85}%` }"></div>
        </div>
        <button class="nav-arrow right" @click="scrollGames('right')">▶</button>
      </div>
    </section>

    <!-- Promotions -->
    <section id="promotions" class="section section-muted">
      <div class="section-header" style="color:white">
        <h2 class="section-title" style="font-size: 2.2rem; font-weight: 800; text-align: left; margin-bottom: 8px;">Exclusive promotions with full bonuses</h2>
        <p class="section-subtitle" style="color: #64748b; font-size: 1.05rem; text-align: left; margin-bottom: 24px;">
          Meet the most popular casino promotions, great welcome bonuses. Daily rewards and exclusive deals just for you.
        </p>
      </div>

      <div class="promo-scroll-wrapper">
        <div class="promo-list">
          <article v-for="promo in currentCountryData.promotions" :key="promo.title" class="promo-card">
            <div class="promo-banner-wrapper">
              <img :src="promo.image" :alt="promo.title" class="promo-banner-img" />
            </div>

            <div class="promo-content">
              <h3 class="promo-title">{{ promo.title }}</h3>
              
              <div class="promo-casino-info">
                <img :src="promo.casinoLogo" :alt="promo.casinoName" class="casino-logo-mini" />
                <span class="casino-name-mini">{{ promo.casinoName }}</span>
              </div>

              <div class="promo-details-grid">
                <div class="detail-item">
                  <span class="detail-label">Deposit:</span>
                  <span class="detail-value">{{ promo.deposit }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Bonuses:</span>
                  <span class="detail-value">{{ promo.bonus }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Turnover Amount:</span>
                  <span class="detail-value">{{ promo.turnover }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Game Wins:</span>
                  <span class="detail-value">{{ promo.gameWins }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Maximum Withdrawal:</span>
                  <span class="detail-value highlight-green">{{ promo.maxWithdrawal }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Game Type:</span>
                  <div class="detail-value game-types-icons">
                    <span>{{ promo.gameType }}</span>
                    <img v-if="promo.casinoLogo" :src="promo.casinoLogo" class="game-type-mini-logo" />
                  </div>
                </div>
              </div>

              <div class="promo-actions">
                <a :href="promo.joinUrl" target="_blank" class="promo-btn join-btn">Join Now</a>
                <a :href="promo.joinUrl" target="_blank" class="promo-btn all-promo-btn">All Promotions</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="about" class="footer">
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
        <span>© Copyright 2018 - 2026, ACEPlay All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Reactive state for country selection
const selectedCountry = ref('thailand')
const showDropdown = ref(false)

// Reactive state and methods for horizontal games scroll
const gameScroller = ref(null)
const scrollPercent = ref(0)

const scrollGames = (direction) => {
  if (gameScroller.value) {
    const scrollAmount = gameScroller.value.clientWidth * 0.75
    gameScroller.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

const onGameScroll = (event) => {
  const target = event.target
  const maxScroll = target.scrollWidth - target.clientWidth
  if (maxScroll > 0) {
    scrollPercent.value = (target.scrollLeft / maxScroll) * 100
  }
}

// Reactive state and methods for horizontal casinos scroll
const casinoScroller = ref(null)
const casinoScrollPercent = ref(0)

const scrollCasinos = (direction) => {
  if (casinoScroller.value) {
    const scrollAmount = casinoScroller.value.clientWidth * 0.75
    casinoScroller.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

const onCasinoScroll = (event) => {
  const target = event.target
  const maxScroll = target.scrollWidth - target.clientWidth
  if (maxScroll > 0) {
    casinoScrollPercent.value = (target.scrollLeft / maxScroll) * 100
  }
}

// Country data
const countries = [
  { code: 'thailand', name: 'Thailand', flag: '🇹🇭' },
  { code: 'philippines', name: 'Philippines', flag: '🇵🇭' },
  { code: 'bangladesh', name: 'Bangladesh', flag: '🇧🇩' }
]

// Country-specific data
const countryData = {
  thailand: {
    name: 'Thailand',
    subtitle: 'Hand-picked, licensed operators with generous welcome bonuses and fast payouts.',
    promoSubtitle: 'Sign up through ACEPlay and unlock special deposit offers you will not find anywhere else.',
    casinos: [
      {
        name: 'BETLUCKMAK',
        short: 'RT',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/betluckmak.jpg',
        rating: '4.9',
        bonus: '100% up to ฿20,000 + 100 Free Spins',
        tags: ['Fast payouts', '24/7 support', 'Mobile friendly'],
      },
      {
        name: 'GXY888',
        short: 'BS',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/gxy888.png',
        rating: '4.8',
        bonus: '150% up to ฿15,000 + Cashback',
        tags: ['Thai language', 'VIP program', 'Live dealers'],
      },
      {
        name: 'Heng9999',
        short: 'LB',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/heng9999.png',
        rating: '4.7',
        bonus: '250% welcome bundle + Free Bets',
        tags: ['Sports & casino', 'High limits', 'Local payments'],
      },
      {
        name: 'LUK666',
        short: 'SJ',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/luk666.jpg',
        rating: '4.7',
        bonus: 'Mega jackpot slots & daily drops',
        tags: ['Jackpot slots', 'Tournaments', 'Crypto friendly'],
      },
      {
        name: '777WW',
        short: 'W1',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/777ww.png',
        rating: '4.6',
        bonus: 'Welcome bonus up to ฿10,000 + Free Spins',
        tags: ['Fast registration', 'Local banks', 'Slots focus'],
      },
      {
        name: '88FED',
        short: 'TW',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/88fed.png',
        rating: '4.6',
        bonus: 'Cashback deals + weekly reload bonuses',
        tags: ['Cashback', 'Promotions', 'Mobile optimized'],
      },
      {
        name: 'Ubet89',
        short: 'KB',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/ubet89.png',
        rating: '4.5',
        bonus: 'Sports + casino combo bonus up to ฿12,000',
        tags: ['Sportsbook', 'Live casino', 'Quick payouts'],
      },
      {
        name: '550WW',
        short: 'L9',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/550ww.png',
        rating: '4.5',
        bonus: 'Daily drops + VIP perks for regular players',
        tags: ['VIP perks', 'Daily rewards', 'Slots & live'],
      },
    ],
    promotions: [
      {
        title: '88FED Comprehensive casino website',
        casinoName: '88FED',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/88fed.png',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/777ww/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%20%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%A5%E0%B8%AD%E0%B8%87%20%E0%B8%9D%E0%B8%B2%E0%B8%8120%E0%B8%A3%E0%B8%B1%E0%B8%9A200.jpg',
        deposit: 'NZ฿20',
        bonus: 'NZ฿15',
        turnover: '฿5,000',
        gameWins: '-',
        maxWithdrawal: 'NZ฿10',
        gameType: '🎰 🎣 🎥',
        joinUrl: 'https://88fed.com',
        allPromoUrl: 'https://88fed.com/promotions'
      },
      {
        title: 'Ubet89 Trending Casinos 2025',
        casinoName: 'Ubet89',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/ubet89.png',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/ubet89/%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%20ubet89.jpg',
        deposit: 'NZ฿20',
        bonus: 'NZ฿15',
        turnover: '฿5,000',
        gameWins: '-',
        maxWithdrawal: 'NZ฿10',
        gameType: '🎰',
        joinUrl: 'https://ub8989ub8989.com/register?pid=636',
        allPromoUrl: 'https://ub8989ub8989.com/register?pid=636'
      },
      {
        title: 'สมัครรับเครดิตฟรีวันนี้้ ไม่ต้องฝากก่อน...',
        casinoName: 'BETLUCKMAK',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/betluckmak.jpg',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/betluckmak/%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%2024%20%E0%B8%8A%E0%B8%A1.jpg',
        deposit: 'NZ฿10',
        bonus: 'NZ฿50',
        turnover: 'NZ฿50',
        gameWins: '-',
        maxWithdrawal: 'Unlimited',
        gameType: '🎰',
        joinUrl: 'https://www.betluckmak.club/register?pid=aceplay',
        allPromoUrl: 'https://www.betluckmak.club/promotion?pid=aceplay'
      },
      {
        title: 'Welcome to LUK666 Full Sign-Up Bon...',
        casinoName: 'LUK666',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/luk666.jpg',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/luk666/%E0%B8%A2%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B8%B5%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg',
        deposit: 'NZ฿50',
        bonus: 'NZ฿10',
        turnover: 'NZ฿500',
        gameWins: '-',
        maxWithdrawal: '฿1,000',
        gameType: '🎰 🎣',
        joinUrl: 'https://www.luk666.icu/promotion/?pid=AdsAcePlay%3Fpid%3DAdsAcePlay',
        allPromoUrl: 'https://www.luk666.icu/promotion?pid=AdsAcePlay'
      },
      {
        title: 'New Member 550ww',
        casinoName: '550ww',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/550ww.png',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/550ww/welcome-bonus.jpg',
        deposit: 'NZ฿10',
        bonus: 'NZ฿100',
        turnover: '-',
        gameWins: '-',
        maxWithdrawal: 'NZ฿50',
        gameType: '🎰',
        joinUrl: 'https://550ww.com',
        allPromoUrl: 'https://550ww.com/promotions'
      },
      {
        title: 'First Deposit Get 2,490 Free Bonus',
        casinoName: 'Heng9999',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/heng9999.png',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/heng9999/welcome-bonus.jpg',
        deposit: 'NZ฿10',
        bonus: 'NZ฿39',
        turnover: 'X5',
        gameWins: '-',
        maxWithdrawal: 'NZ฿50',
        gameType: '🎰',
        joinUrl: 'https://www.heng666.fun/en/promotion?version=6.46.3-fc',
        allPromoUrl: 'https://www.heng666.fun/en/promotion?pid=ACEPAY99&version=6.46.3-fc'
      }
    ],
    games: [
      {
        provider: 'SEXY',
        title: 'Baccarat Classic',
        casino: '777WW',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/777ww.png',
        winRate: '97.00%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: '29 Jul 2025 - 12:06',
        wager: '฿1,800',
        winnings: '฿100,000',
        multiplier: '30x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/777ww/sexy-baccarat-classic-%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B8%AE%E0%B8%B4%E0%B8%95-%E0%B9%81%E0%B8%88%E0%B8%81%E0%B9%82%E0%B8%AB%E0%B8%94.jpg',
        category: 'Slots'
      },
      {
        provider: 'AWC',
        title: 'Sexy Baccarat',
        casino: '88FED',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/88fed.png',
        winRate: '98.12%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: '25 Jul 2025 - 19:20',
        wager: '฿20,000',
        winnings: '฿40,000',
        multiplier: '2x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/88fed/sexy-baccarat.jpg',
        category: 'Live Casino'
      },
      {
        provider: 'PG',
        title: 'Caishen Wins',
        casino: 'LUK666',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/luk666.jpg',
        winRate: '96.20%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: '2 Sep 2025 - 6:18:23',
        wager: '฿100',
        winnings: '฿10,000',
        multiplier: '4,982x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/luk666/pg-caishen-wins.webp',
        category: 'Slots'
      },
      {
        provider: 'PP',
        title: 'Super Niubi',
        casino: '550WW',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/550ww.png',
        winRate: '96.20%',
        highestWinText: 'Highest Wins in Casino',
        highestWinDate: '2 Dec 2024 - 3:43:45',
        wager: '฿1000',
        winnings: '฿1000,000',
        multiplier: '2,691x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/gxy888/gxy888-pp-slot-sugar-rush-1000.webp',
        category: 'Slots'
      },
      {
        provider: 'JILI',
        title: ' Jackpot Joker',
        casino: 'BETLUCKMAK',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/betluckmak.jpg',
        winRate: '96.70%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: ' 6 Jun 2025 - 23:41',
        wager: '฿100',
        winnings: '฿100,000',
        multiplier: '1000x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/betluckmak/%E0%B9%81%E0%B8%95%E0%B8%81%E0%B8%AD%E0%B8%B5%E0%B8%81%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%20500x300.jpg',
        category: 'Slots'
      },
      {
        provider: 'JDB',
        title: 'Super Niubi',
        casino: '550WW',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/550ww.png',
        winRate: '120.00%',
        highestWinText: 'Highest Wins in Casino',
        highestWinDate: '12 Aug 2025 - 15:45',
        wager: '฿50',
        winnings: '฿6,000',
        multiplier: '120x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/550ww/top-game.jpg',
        category: 'Slots'
      },
      {
        provider: 'PG',
        title: 'Fortune Rabbit',
        casino: 'Heng9999',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/heng9999.png',
        winRate: '97.40%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: '8 Jun 2025 - 12:30',
        wager: '฿200',
        winnings: '฿50,000',
        multiplier: '250x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/heng9999/top-game.jpg',
        category: 'Slots'
      }
    ]
  },
  philippines: {
    name: 'Philippines',
    subtitle: 'Top-rated Filipino casinos with GCash support and localized payment methods.',
    promoSubtitle: 'Exclusive bonuses for Filipino players with fast peso withdrawals.',
    casinos: [
      {
        name: 'JILINO.1',
        short: 'MC',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/jilino1.png',
        rating: '4.9',
        bonus: '200% up to ₱50,000 + 200 Free Spins',
        tags: ['GCash support', 'Tagalog language', '24/7 support'],
      },
      {
        name: 'BetSo88',
        short: 'LB',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/betso88.png',
        rating: '4.8',
        bonus: '150% up to ₱30,000 + Cashback',
        tags: ['Mobile app', 'Live dealers', 'Fast payouts'],
      },
      {
        name: '7Spin',
        short: 'PW',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/7spin.png',
        rating: '4.7',
        bonus: '100% up to ₱25,000 + Welcome Package',
        tags: ['Local banks', 'VIP program', 'Sports betting'],
      },
      {
        name: 'Milyon88',
        short: 'MS',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/milyon88.png',
        rating: '4.6',
        bonus: 'Free ₱500 no deposit + 100% match',
        tags: ['No deposit bonus', 'Slot tournaments', 'Mobile friendly'],
      },
      {
        name: 'SSBet77',
        short: 'MS',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/ssbet77.webp',
        rating: '4.6',
        bonus: 'Free ₱500 no deposit + 100% match',
        tags: ['No deposit bonus', 'Slot tournaments', 'Mobile friendly'],
      }
    ],
    promotions: [
      {
        title: 'Welcome to the casino 🎁 Get free 500 ',
        casinoName: 'JiliNo1',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/jilino1.png',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/gxy888/%E0%B8%9F%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95%20100%20%E0%B8%9A%E0%B8%B2%E0%B8%97.jpg',
        deposit: 'US฿ 10.00',
        bonus: 'NZ฿50',
        turnover: 'X 10',
        gameWins: '-',
        maxWithdrawal: 'NZ฿50',
        gameType: '🎰 🎣',
        joinUrl: 'https://download.ocms.cloud/v2/bjt/PromotionInfoLanguage.89_3_1.webp?version=1',
        allPromoUrl: 'https://download.ocms.cloud/v2/bjt/PromotionInfoLanguage.89_3_1.webp?version=1'
      },
      {
        title: 'JILINO.1 Free PHP 100 on Sign-Up',
        casinoName: 'JILINO.1',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/jilino1.png',
        image: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/promotion/thailand/luk666/%E0%B8%A2%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B8%B5%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg',
        deposit: '₱0',
        bonus: '₱100',
        turnover: '₱1,000',
        gameWins: '-',
        maxWithdrawal: '₱200',
        gameType: '🎰 🎥',
        joinUrl: 'https://jilino1.com',
        allPromoUrl: 'https://jilino1.com/promotions'
      }
    ],
    games: [
      {
        provider: 'JILI',
        title: 'Super Ace',
        casino: ' 7SPIN',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/7spin.png',
        winRate: '97.00%',
        highestWinText: 'Highest Wins in Casino',
        highestWinDate: '2 Nov 2025 - 11:59:15',
        wager: '₱200',
        winnings: '₱174,400',
        multiplier: '872x',
        img: 'https://download.ocms.cloud/v2/common/JILIV2/PlatformGameList.7489.3.webp?version=15',
        category: 'Slots'
      },
      {
        provider: 'PG',
        title: 'Fortune Gems',
        casino: 'BetSo88',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/betso88.png',
        winRate: '96.85%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: '4 Sep 2025 - 18:45',
        wager: '₱100',
        winnings: '₱50,000',
        multiplier: '500x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/luk666/pg-caishen-wins.webp',
        category: 'Slots'
      },
      {
        provider: 'Evolution',
        title: 'Crazy Time',
        casino: 'Milyon88',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/milyon88.png',
        winRate: '96.08%',
        highestWinText: 'Highest Winnings in Casino',
        highestWinDate: '12 Aug 2025 - 20:15',
        wager: '₱200',
        winnings: '₱160,000',
        multiplier: '800x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/88fed/sexy-baccarat.jpg',
        category: 'Live Casino'
      },
      {
        provider: 'JILI',
        title: 'Super Ace',
        casino: 'SSBet77',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/ssbet77.webp',
        winRate: '97.60%',
        highestWinText: 'Highest Win in Casino',
        highestWinDate: '8 Jun 2025 - 09:30',
        wager: '₱80',
        winnings: '₱96,000',
        multiplier: '1,200x',
        img: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/game/thailand/550ww/top-game.jpg',
        category: 'Slots'
      }
    ]
  },
  bangladesh: {
    name: 'Bangladesh',
    subtitle: 'Trusted Bangladeshi casinos with BDT support and local banking options.',
    promoSubtitle: 'Special offers for Bangladeshi players with convenient payment methods.',
    casinos: [
      {
        name: 'BORO JEET',
        short: 'DC',
        logoUrl: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/bangladesh/borojeet.png',
        rating: '4.9',
        bonus: '150% up to ৳30,000 + 150 Free Spins',
        tags: ['BDT support', 'Bengali language', 'Local banks'],
      }
    ],
    promotions: [
      {
        title: 'Welcome to BoroJeet 🇧🇩',
        casinoName: 'BORO JEET',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/bangladesh/borojeet.png',
        image: 'https://download.ocms.cloud/v2/bjt/PromotionInfoLanguage.3_3_1.webp?version=2',
        deposit: 'US฿ 10.00',
        bonus: 'NZ฿50',
        turnover: 'X 10',
        gameWins: '-',
        maxWithdrawal: '৳100',
        gameType: '🎰 🎣',
        joinUrl: 'https://www.borojeet.com/promotion/?pid=aceplay%3Fpid%3Daceplay',
        allPromoUrl: 'https://www.borojeet.com/promotion?pid=aceplay'
      }
    ],
    games: [
      {
        provider: 'YB',
        title: 'Royal Ace',
        casino: 'BORO JEET',
        casinoLogo: 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/bangladesh/borojeet.png',
        winRate: '96.70%',
        highestWinText: 'Highest Win in Casino',
        highestWinDate: ' 8 July 2025 - 14:08:12',
        wager: '৳3,000',
        winnings: '৳668,550',
        multiplier: '223x',
        img: 'https://download.ocms.cloud/v2/common/YB/PlatformGameList.33843.3.webp?version=8',
        category: 'Slots'
      }
    ]
  }
}

// Computed property for current country data
const currentCountryData = computed(() => {
  return countryData[selectedCountry.value] || countryData.thailand
})

// Dropdown methods
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectCountry = (countryCode) => {
  selectedCountry.value = countryCode
  showDropdown.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.country-selector')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const guideSteps = [
  {
    icon: '①',
    title: 'Choose a licensed casino',
    text: 'Compare our trusted partners and pick a site that supports your preferred games and payment methods.'
  },
  {
    icon: '②',
    title: 'Create your account',
    text: 'Complete a quick registration, verify your details and secure your profile with strong authentication.',
  },
  {
    icon: '③',
    title: 'Claim your bonus',
    text: 'Make a qualifying deposit, enter any bonus code if needed and read the wagering requirements carefully.',
  },
  {
    icon: '④',
    title: 'Play responsibly',
    text: 'Set deposit limits, track your sessions and only gamble with money you can afford to lose.',
  },
]

const categories = ['All', 'Slots', 'Live Casino', 'Sports', 'Lottery']

const promotions = [
  {
    title: 'First Deposit Get 2,490 FREE Bonus',
    highlight: '100% up to ฿20,000',
    casinos: 'Selected Thailand casinos',
    text: 'Register within 3 minutes and unlock your matched first deposit bonus plus extra free spins.',
    bonus: '฿20,000 + 100 spins',
    wagering: '35x bonus',
    minDeposit: '฿300',
  },
  {
    title: 'Signup to get free credit, no deposit needed',
    highlight: '฿300 free credit',
    casinos: 'No-deposit partners',
    text: 'Try real money games without risking your own cash. Wager requirements apply.',
    bonus: '฿300 free',
    wagering: '50x free credit',
    minDeposit: 'None',
  },
  {
    title: 'Reload bonuses every weekend',
    highlight: '50% up to ฿5,000',
    casinos: 'VIP & regular players',
    text: 'Top up your balance every Friday–Sunday and receive extra funds for your favorite games.',
    bonus: '฿5,000 reload',
    wagering: '25x bonus',
    minDeposit: '฿500',
  },
]

const activeCategory = ref('All')

const currentGames = computed(() => {
  return currentCountryData.value?.games || []
})

const filteredGames = computed(() => {
  const list = currentGames.value
  if (activeCategory.value === 'All') return list
  return list.filter((game) => game.category === activeCategory.value)
})
</script>

<style scoped>
:root {
  --bg-gradient: radial-gradient(circle at top, #22324a 0, #071227 55%, #03050b 100%);
  --accent: #EC2513;
  --accent-soft: rgba(255, 45, 45, 0.12);
  --accent-secondary:rgb(13, 39, 81);
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

/* Country Selector Dropdown */
.country-selector {
  position: relative;
  display: inline-block;
  
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
 background: linear-gradient(135deg,rgb(218, 32, 32),rgb(194, 39, 39));
  border: 1px solid var(--border-subtle);
  border-radius: 3px;
  box-shadow: var(--shadow-card);
  z-index: 50;
  margin-top: 8px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background var(--transition-fast);
  color: black;
  text-decoration: none;
}

.dropdown-item:hover {
  background: rgba(59, 130, 246, 0.1);
}

.dropdown-item.active {
  background: rgba(236, 37, 19, 0.1);
  color: var(--accent);
}

.flag {
  font-size: 1.2rem;
}

.dropdown-arrow {
  margin-left: 8px;
  font-size: 0.8rem;
  transition: transform var(--transition-fast);
}

.country-selector:hover .dropdown-arrow {
  transform: translateY(2px);
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
  color: #a1b0e2;
  font-size: larger;
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
  background: linear-gradient(135deg,rgb(211, 25, 25),rgb(207, 30, 30));
  color: #0b1220;
  box-shadow: 0 16px 40px rgba(255, 45, 45, 0.32);
  border-color: rgba(157, 169, 188, 0.45);
  border-radius: 5px;
 
}

.btn.primary:hover {
  transform: translateY(2px);
  box-shadow: 0 20px 48px rgba(178, 40, 40, 0.42);
}

.btn.secondary {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgb(70, 102, 153);
  border-radius: 10px; 
}

.btn.secondary:hover {
  background: rgba(117, 129, 156, 0.92);
  transform: translateY(2px);
  box-shadow: 0 20px 48px rgba(84, 66, 157, 0.42);
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

.btn.large {
  padding: 12px 20px;
  font-size: 0.9rem;
}

.btn.small {
  padding: 6px 13px;
  font-size: 0.8rem;
}

.btn.full-width {
  width: 100%;
}

/* Hero */

.hero {
  padding: 70px 20px 40px;
}

.hero-inner {
  max-width: 840px;
  margin: 0 auto;
  text-align: center;
}

.hero-eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(72, 42, 42, 0.78);
  margin-bottom: 10px;
}

.hero-title {
  font-size: clamp(2.4rem, 4vw, 3.3rem);
  line-height: 1.1;
  margin-bottom: 14px;
}

.hero-highlight {
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent));
  -webkit-background-clip: text;
  color: transparent;
  margin-left: 6px;
}

.hero-subtitle {
  max-width: 560px;
  margin: 0 auto 24px;
  font-size: 0.98rem;
  color: var(--text-muted);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 26px;
}

.hero-meta {
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: 999px;
  background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.14), transparent),
    rgba(9, 18, 40, 0.86);
  border: 1px solid rgba(59, 130, 246, 0.28);
  box-shadow: var(--shadow-soft);
  gap: 18px;
}

.meta-item {
  text-align: left;
}

.meta-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

.meta-value {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
}

.meta-divider {
  width: 1px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, rgba(128, 137, 148, 0.6), transparent);
}

/* Top casinos */

.casino-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.casino-scroller {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.casino-scroller::-webkit-scrollbar {
  display: none;
}

.casino-track {
  display: flex;
  gap: 18px;
  scroll-snap-type: x mandatory;
}

.casino-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: var(--radius-lg);
  background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.85), #020617);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-med), box-shadow var(--transition-med), border-color var(--transition-med);
  flex: 0 0 calc((100% - (18px * 3)) / 4);
  scroll-snap-align: start;
  align-items: stretch;
  min-height: 200px;
}

.casino-card:hover {
  transform: translateY(-4px);
  border-color: rgba(188, 56, 56, 0.75);
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.9);
}

.casino-logo {
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  align-self: center;
  border-radius: 22px;
  background: radial-gradient(circle at 30% 0%, rgba(203, 30, 30, 0.95), #020617 65%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  overflow: hidden;
}

.casino-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.casino-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  gap: 10px;
}

.casino-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 6px;
}

.casino-name {
  font-size: 1rem;
  font-weight: 600;
}

.casino-rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars {
  font-size: 0.8rem;
  color: #facc15;
}

.rating-score {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.casino-bonus {
  font-size: 0.85rem;
  color: #e5e7eb;
}

.casino-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.casino-tags li {
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.4);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.casino-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  width: 100%;
}

.casino-actions .btn {
  flex: 1;
  justify-content: center;
  text-align: center;
}

/* Guide */

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.guide-card {
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(17, 24, 39, 0.9));
  border-radius: var(--radius-md);
  padding: 16px 16px 18px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.8);
}

.guide-icon {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.guide-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.guide-text {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Filters & games */

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-pill {
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(105, 113, 130, 0.8);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-pill.active {
  color: #020617;
  border-color: transparent;
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent));
  box-shadow: 0 14px 36px rgba(59, 130, 246, 0.32);
}

.filter-pill:hover:not(.active) {
  border-color: rgba(255, 45, 45, 0.7);
  color: #e5e7eb;
}

.game-scroller {
  overflow-x: auto;
  overflow-y: hidden;      
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.game-scroller::-webkit-scrollbar {
  display: none;
}

.game-track {
  display: flex;
  gap: 18px;
  scroll-snap-type: x mandatory;
}

.game-card {
  border-radius: 12px;
  background: radial-gradient(circle at top left, rgba(20, 30, 50, 0.95), #020617);
  border: 1px solid rgba(148, 163, 184, 0.2);
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  height: 450px;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  flex: 0 0 330px;
  scroll-snap-align: start;
}

@media (max-width: 767px) {
  .game-card {
    flex: 0 0 285px;
    height: 430px;
  }
}

.game-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 45, 45, 0.6);
  box-shadow: 0 20px 45px rgba(255, 45, 45, 0.15);
}

.game-image {
  height: 180px;
  position: relative;
  overflow: hidden;
  background: #020617;
}

.game-casino-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.game-image-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  transition: transform 0.3s ease;
}

.game-card:hover .game-image-img {
  transform: scale(1.05);
}

.game-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.game-card-header {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-casino-name {
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 500;
  text-transform: uppercase;
}

.game-stat-row {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 6px;
}

.game-stat-label {
  font-weight: 500;
}

.game-stat-value {
  color: #f1f5f9;
  font-weight: 700;
  margin-left: 4px;
}

.game-highest-win-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.win-green-text {
  color: #10b981;
}

.win-separator {
  color: #475569;
}

.win-date {
  color: #64748b;
  font-weight: 500;
}

.trophy-icon {
  font-size: 0.85rem;
}

.game-wager-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
}

.wager-winnings {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wager-label, .winnings-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 500;
}

.wager-value, .winnings-value {
  font-size: 0.82rem;
  color: #f1f5f9;
  font-weight: 700;
  margin-bottom: 2px;
}

.multiplier-badge {
  background: #ff9f1c;
  color: #020617;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(255, 159, 28, 0.2);
}

.btn-play-now {
  width: 100%;
  background: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

.btn-play-now:hover {
  background: #ff2d2d;
  border-color: #ff2d2d;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 45, 45, 0.3);
}

/* Scroller Controls */
.games-nav-control,
.casinos-nav-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.nav-arrow {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
}

.nav-arrow:hover {
  color: #ff2d2d;
  transform: scale(1.1);
}

.custom-scroll-bar {
  width: 300px;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  position: relative;
  overflow: hidden;
}

.custom-scroll-thumb {
  position: absolute;
  top: 0;
  height: 100%;
  width: 60px;
  background: #64748b;
  border-radius: 99px;
  transition: left 0.1s ease-out;
}

/* Promotions */

.promo-scroll-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px 5px 15px 5px;
  scrollbar-width: thin;
  scrollbar-color: #ff2d2d rgba(255, 255, 255, 0.05);
  -webkit-overflow-scrolling: touch;
}

/* Custom Webkit scrollbar for premium look */
.promo-scroll-wrapper::-webkit-scrollbar {
  height: 6px;
}
.promo-scroll-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 99px;
}
.promo-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #ff2d2d;
  border-radius: 99px;
}
.promo-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: #ff5555;
}

.promo-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 16px;
}

.promo-card {
  border-radius: 12px;
  background: radial-gradient(circle at top left, rgba(20, 30, 50, 0.95), #020617);
  border: 1px solid rgba(148, 163, 184, 0.2);
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  height: 520px;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  
  /* Desktop: Exactly 3 visible cards */
  flex: 0 0 calc((100% - 32px) / 3);
}

@media (max-width: 1023px) and (min-width: 640px) {
  .promo-card {
    /* Tablet: Exactly 2 visible cards */
    flex: 0 0 calc((100% - 16px) / 2);
  }
}

@media (max-width: 639px) {
  .promo-card {
    /* Mobile: 1 card + partial peeking of the next */
    flex: 0 0 85%;
  }
}

.promo-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 45, 45, 0.6);
  box-shadow: 0 20px 45px rgba(255, 45, 45, 0.15);
}

.promo-banner-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #020617;
  overflow: hidden;
}

.promo-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.promo-card:hover .promo-banner-img {
  transform: scale(1.05);
}

.promo-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.promo-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #ffffff;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6em;
}

.promo-casino-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.casino-logo-mini {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.casino-name-mini {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #94a3b8;
  text-transform: uppercase;
}

.promo-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  margin-bottom: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 500;
}

.detail-value {
  font-size: 0.82rem;
  font-weight: 600;
  color: #f1f5f9;
}

.detail-value.highlight-green {
  color: #10b981;
}

.game-types-icons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.game-type-mini-logo {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  object-fit: cover;
  opacity: 0.8;
}

.promo-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.promo-btn {
  flex: 1;
  text-align: center;
  padding: 8px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.join-btn {
  background: #000000;
  color: #ffffff;
  border: 1px solid #000000;
}

.join-btn:hover {
  background: #ff2d2d;
  border-color: #ff2d2d;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 45, 45, 0.3);
}

.all-promo-btn {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.all-promo-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* Footer */
.footer {
  margin-top: 80px;
  background: linear-gradient(180deg, rgba(25, 33, 56, 0.7), #050509);
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
  background: rgba(216, 208, 208, 0.05);
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

  .hero-meta {
    width: 100%;
    justify-content: space-between;
  }

  .casino-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 980px) {
  .casino-card {
    flex-basis: calc((100% - 18px) / 2);
  }
}

@media (max-width: 520px) {
  .casino-card {
    flex-basis: 100%;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 56px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-meta {
    flex-direction: column;
    align-items: stretch;
  }

  .footer-inner {
    flex-direction: column;
  }

  .footer-columns {
    flex-direction: column;
  }
}

</style>

