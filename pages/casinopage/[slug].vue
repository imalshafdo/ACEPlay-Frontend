<template>
  <div class="preview-layout">
    <div class="preview-container">
      
      <!-- 1. Accredited Header -->
      <header class="accredited-header">
        <div class="logo-area">
          <span class="ace-icon">♤</span>
          <span class="brand-text">ACE<span class="light-text">Play</span></span>
        </div>
        <div class="accreditation">
          <span class="acc-text">Accredited Casino</span>
          <span class="flag-icon">🇹🇭</span>
        </div>
      </header>

      <!-- 2. Site & Header Section -->
      <section class="site-header-section">
        <div class="site-header-grid">
          <!-- Left Content Column -->
          <div class="header-main-content">
            <h1 class="site-title">{{ siteSettings.siteName || 'LUK666' }}</h1>
            
            <div class="meta-row">
              <span class="meta-badge" v-if="siteSettings.launchYear">
                Start Year: {{ siteSettings.launchYear }}
              </span>
              <span class="meta-divider" v-if="siteSettings.launchYear && (siteSettings.depositMin || siteSettings.depositMax)">|</span>
              <span class="meta-text" v-if="siteSettings.depositMin || siteSettings.depositMax">
                Deposit amount: {{ siteSettings.depositMin || '1 THB' }} - {{ siteSettings.depositMax || '100,000 THB' }}
              </span>
            </div>

            <p class="site-tagline">
              {{ siteSettings.tagline || 'Best Online Casinos with Free Sign-Up Bonuses and Legitimate Licenses' }}
            </p>

            <!-- Endorsement Logos -->
            <div class="endorsements-area" v-if="siteSettings.endorsementLogos && siteSettings.endorsementLogos.length > 0">
              <span class="endorsement-label">Endorsed by:</span>
              <div class="logos-row">
                <img 
                  v-for="(logo, idx) in siteSettings.endorsementLogos" 
                  :key="idx" 
                  :src="logo" 
                  alt="Endorsement partner logo" 
                  class="partner-logo"
                  @error="(e) => (e.target.style.display = 'none')"
                />
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="cta-buttons">
              <a :href="siteSettings.playNowUrl || '#'" class="btn-play-now" target="_blank">
                {{ siteSettings.playNowLabel || 'Play Now' }}
              </a>
              <a :href="siteSettings.alternateLinksUrl || '#'" class="btn-alternate" target="_blank">
                {{ siteSettings.alternateLinksLabel || 'Alternate links' }}
              </a>
              <a :href="siteSettings.viewPromotionsUrl || '#'" class="btn-promotions" target="_blank">
                {{ siteSettings.viewPromotionsLabel || 'View All Promotions' }}
              </a>
            </div>
          </div>

          <!-- Right Graphic Column -->
          <div class="header-graphic-content">
            <div class="logo-box">
              <img 
                v-if="siteSettings.logoUrl" 
                :src="siteSettings.logoUrl" 
                :alt="siteSettings.siteName || 'Logo'" 
                class="brand-big-logo" 
              />
              <div v-else class="fallback-big-logo">
                {{ siteSettings.siteName?.substring(0, 3) || 'LUK' }}
              </div>
            </div>

            <!-- Feature Bullet List -->
            <ul class="features-checklist" v-if="siteSettings.features && siteSettings.features.length > 0">
              <li v-for="(feat, idx) in siteSettings.features" :key="idx" class="feature-item">
                <span class="check-icon">✓</span>
                <span class="feature-text">{{ feat }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 3. Navigation Tabs -->
      <nav class="navigation-menu-bar" v-if="activeNavigation.length > 0">
        <div class="navigation-tabs-scroll">
          <a 
            v-for="nav in activeNavigation" 
            :key="nav._id" 
            class="nav-tab"
            :href="nav.url || '#'"
            target="_blank"
          >
            <span class="tab-emoji" v-if="nav.icon">{{ nav.icon }}</span>
            <span class="tab-label">{{ nav.label }}</span>
          </a>
        </div>
      </nav>

      <!-- 4. Promotion Banners -->
      <section class="promotional-banners-section" v-if="activeBanners.length > 0">
        <div class="banners-carousel">
          <div v-for="banner in activeBanners" :key="banner._id" class="promo-banner-card">
            <!-- Left Banner Image -->
            <div class="banner-image-panel">
              <img :src="banner.image" :alt="banner.title" />
            </div>
            <!-- Right Banner Content -->
            <div class="banner-content-panel">
              <h3 class="banner-title">{{ banner.title }}</h3>
              <p class="banner-subtitle" v-if="banner.subtitle">{{ banner.subtitle }}</p>
              
              <div class="offer-box" v-if="banner.offerText">
                {{ banner.offerText }}
              </div>

              <div class="promo-stats-details" v-if="banner.deposit || banner.bonus || banner.getAmount || banner.turnover || banner.withdraw" style="margin-bottom: 1.25rem;">
                <div class="stat-lbl-val" v-if="banner.deposit">
                  <span class="lbl">Min Deposit:</span>
                  <span class="val">{{ formatAmount(banner.deposit) }} ฿</span>
                </div>
                <div class="stat-lbl-val" v-if="banner.bonus">
                  <span class="lbl">Bonus:</span>
                  <span class="val highlight-bonus">+{{ formatAmount(banner.bonus) }} ฿</span>
                </div>
                <div class="stat-lbl-val" v-if="banner.getAmount">
                  <span class="lbl">Get:</span>
                  <span class="val highlight-bonus">{{ formatAmount(banner.getAmount) }} ฿</span>
                </div>
                <div class="stat-lbl-val" v-if="banner.turnover">
                  <span class="lbl">Turnover Req:</span>
                  <span class="val">{{ banner.turnover }}{{ /[xX]$/.test(String(banner.turnover)) ? '' : 'x' }}</span>
                </div>
                <div class="stat-lbl-val" v-if="banner.withdraw">
                  <span class="lbl">Withdrawal Max:</span>
                  <span class="val">{{ formatAmount(banner.withdraw) }} ฿</span>
                </div>
              </div>
              
              <a :href="banner.link || '#'" class="btn-banner-action" target="_blank">
                {{ banner.buttonText || 'Participate in the promotion' }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Celebrate Big Wins -->
      <section class="big-wins-section" v-if="activeBigWins.length > 0">
        <div class="section-title-wrap">
          <h2 class="section-title">Celebrate Big Wins at {{ siteSettings.siteName || 'LUK666' }}!</h2>
          <p class="section-subtitle">
            Experience the thrill of real player winnings, with big winnings every day — the most popular money-making game awaits you. One spin can change lives! 👍 🔥
          </p>
        </div>

        <div class="big-wins-slider">
          <div v-for="win in activeBigWins" :key="win._id" class="win-card">
            <div class="win-card-image">
              <img :src="win.thumbnailImage" :alt="win.gameName" />
            </div>
            
            <div class="win-card-body">
              <div class="win-timestamp-row" v-if="win.date || win.time">
                {{ win.date }}<span class="timestamp-divider" v-if="win.date && win.time"> • </span>{{ win.time }}
              </div>

              <h3 class="win-game-title">
                {{ win.gameName }}
                <span class="platform-dot" v-if="win.provider">•</span>
                <span class="platform-text" v-if="win.provider">{{ win.provider }}</span>
              </h3>

              <div class="win-bet-row">
                <span class="bet-label">Bet:</span>
                <span class="bet-value">{{ formatCurrency(win.betAmount) }}</span>
              </div>

              <div class="win-winnings-row">
                <span class="winnings-label">Winnings:</span>
                <span class="winnings-value">{{ formatCurrency(win.winnings) }}</span>
                <span class="winnings-trophy">🏆</span>
                <span class="multiplier-badge" v-if="win.multiplier">{{ win.multiplier }}</span>
              </div>

              <a :href="win.playUrl || '#'" class="btn-play-now-black" target="_blank">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Popular Games -->
      <section class="popular-games-section" v-if="activePopularGames.length > 0">
        <div class="section-title-wrap">
          <h2 class="section-title">The most popular game that players love across the country.</h2>
          <p class="section-subtitle">
            Play a high-rated game with millions of players, with endless fun — big wins await you! 🎮 🔥
          </p>
        </div>

        <div class="games-grid">
          <div v-for="game in activePopularGames" :key="game._id" class="popular-game-card">
            <div class="game-thumbnail-wrap">
              <img :src="game.image" :alt="game.gameName" />
            </div>

            <div class="game-card-body">
              <h3 class="game-title-header">
                {{ game.gameName }}
                <span class="platform-dot" v-if="game.gamePlatform">•</span>
                <span class="platform-text" v-if="game.gamePlatform">{{ game.gamePlatform }}</span>
              </h3>
              
              <div class="win-rate-row">
                <span class="rate-label">Win Rate:</span>
                <span class="rate-pill">{{ game.winRate !== undefined && game.winRate !== null ? game.winRate + '%' : '—' }}</span>
              </div>

              <div class="winnings-headline-row" v-if="game.maxWinnings">
                <span class="winnings-badge-text">{{ game.maxWinnings }}</span>
                <template v-if="game.date || game.time">
                  <span class="headline-divider">•</span>
                  <span class="headline-time">{{ game.date }} <span v-if="game.time">- {{ game.time }}</span></span>
                </template>
                <span class="trophy-emoji">🏆</span>
              </div>

              <div class="wager-winnings-row">
                <div class="stat-item">
                  <span class="stat-lbl">Wager:</span>
                  <span class="stat-val wager-val">{{ formatCurrency(game.betAmount) }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-lbl">Winnings:</span>
                  <span class="stat-val winnings-val">{{ formatCurrency(game.winAmount) }}</span>
                </div>
                <span class="multiplier-badge-inline" v-if="game.multiplier">{{ game.multiplier }}</span>
              </div>

              <a :href="game.playUrl || '#'" class="btn-game-play-black" target="_blank">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Exclusive Promotions -->
      <section class="exclusive-promotions-section" v-if="activePromotions.length > 0">
        <div class="section-title-wrap">
          <h2 class="section-title">Exclusive Promotions Don't miss it!</h2>
          <p class="section-subtitle">
            Enjoy your favorite web games and get special bonuses, high cashback, VIP rewards and exciting events every day. Don't miss out on your chance to win big! 🎁 💎 🔥
          </p>
        </div>

        <div class="promotions-slider-grid">
          <div v-for="promo in activePromotions" :key="promo._id" class="promotion-card">
            <div class="promo-image-wrap">
              <img :src="promo.image" :alt="promo.name" />
              <div class="promo-tag" v-if="promo.tag">{{ promo.tag }}</div>
            </div>
            
            <div class="promo-body">
              <h3 class="promo-title">{{ promo.name }}</h3>
              
              <div class="promo-stats-details" v-if="promo.deposit || promo.bonus || promo.turnover || promo.netwin || promo.maxWithdrawal || promo.gameType">
                <div class="stat-lbl-val" v-if="promo.deposit">
                  <span class="lbl">Min Deposit:</span>
                  <span class="val">{{ formatAmount(promo.deposit) }} ฿</span>
                </div>
                <div class="stat-lbl-val" v-if="promo.bonus">
                  <span class="lbl">Bonus:</span>
                  <span class="val highlight-bonus">+{{ formatAmount(promo.bonus) }} ฿</span>
                </div>
                <div class="stat-lbl-val" v-if="promo.turnover">
                  <span class="lbl">Turnover Req:</span>
                  <span class="val">{{ promo.turnover }}{{ /[xX]$/.test(String(promo.turnover)) ? '' : 'x' }}</span>
                </div>
                <div class="stat-lbl-val" v-if="promo.netwin">
                  <span class="lbl">Game wins:</span>
                  <span class="val">{{ formatAmount(promo.netwin) }}</span>
                </div>
                <div class="stat-lbl-val" v-if="promo.maxWithdrawal">
                  <span class="lbl">Max Withdrawal:</span>
                  <span class="val">{{ formatAmount(promo.maxWithdrawal) }}</span>
                </div>
                <div class="stat-lbl-val" v-if="promo.gameType">
                  <span class="lbl">Game Type:</span>
                  <span class="val uppercase-val">{{ promo.gameType }}</span>
                </div>
              </div>

              <div class="promo-actions-row">
                <a 
                  v-if="promo.primaryBtnLabel" 
                  :href="promo.primaryBtnUrl || '#'" 
                  class="btn-promo-primary"
                  target="_blank"
                >
                  {{ promo.primaryBtnLabel }}
                </a>
                <a 
                  v-if="promo.secondaryBtnLabel" 
                  :href="promo.secondaryBtnUrl || '#'" 
                  class="btn-promo-secondary"
                  target="_blank"
                >
                  {{ promo.secondaryBtnLabel }}
                </a>
                <a 
                  v-if="!promo.primaryBtnLabel && promo.url" 
                  :href="promo.url" 
                  class="btn-promo-primary" 
                  target="_blank"
                >
                  Claim Offer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const slug = computed(() => route.params.slug || '')

// Fetch all public data from local backend API
const { data: siteSettingsResponse } = await useFetch('http://localhost:5000/api/public/site-settings')
const { data: navResponse } = await useFetch('http://localhost:5000/api/public/navigation')
const { data: bannersResponse } = await useFetch('http://localhost:5000/api/public/banners')
const { data: bigWinsResponse } = await useFetch('http://localhost:5000/api/public/big-wins')
const { data: popularGamesResponse } = await useFetch('http://localhost:5000/api/public/popular-games')
const { data: promotionsResponse } = await useFetch('http://localhost:5000/api/public/promotions')
const { data: casinosResponse } = await useFetch('http://localhost:5000/api/public/casinos')

// Raw lists from responses
const siteSettingsList = computed(() => siteSettingsResponse.value?.data || [])
const navigationList = computed(() => navResponse.value?.data || [])
const bannersList = computed(() => bannersResponse.value?.data || [])
const bigWinsList = computed(() => bigWinsResponse.value?.data || [])
const popularGamesList = computed(() => popularGamesResponse.value?.data || [])
const promotionsList = computed(() => promotionsResponse.value?.data || [])
const casinosList = computed(() => casinosResponse.value?.data || [])

// Determine active casino by slug or query param
const activeCasino = computed(() => {
  if (casinosList.value.length === 0) return null
  
  const searchSlug = (slug.value || route.query.name || '').toLowerCase()
  if (searchSlug) {
    const matched = casinosList.value.find(c => 
      c.name && 
      (c.name.toLowerCase() === searchSlug || 
       c.name.toLowerCase().replace(/\s+/g, '-') === searchSlug)
    )
    if (matched) return matched
  }
  
  if (route.query.id) {
    const matchedId = casinosList.value.find(c => c._id === route.query.id || c.ownerId === route.query.id)
    if (matchedId) return matchedId
  }
  
  return casinosList.value[0]
})

// Determine the active site settings
const siteSettings = computed(() => {
  if (siteSettingsList.value.length === 0 && !activeCasino.value) return {}
  
  let settings = null
  if (activeCasino.value) {
    // 1. Prioritize matching by siteKey
    settings = siteSettingsList.value.find(s => 
      s.siteKey && activeCasino.value.siteKey && s.siteKey === activeCasino.value.siteKey
    )
    // 2. Fallback to ownerId match
    if (!settings) {
      settings = siteSettingsList.value.find(s => 
        s.ownerId && activeCasino.value.ownerId && s.ownerId === activeCasino.value.ownerId
      )
    }
    // 3. Fallback to exact siteName match
    if (!settings) {
      settings = siteSettingsList.value.find(s => 
        s.siteName && s.siteName.toLowerCase() === activeCasino.value.name.toLowerCase()
      )
    }
  }
  
  // If found, return it
  if (settings) return settings
  
  // Fallback to activeCasino fields if no SiteSettings is created yet
  const casino = activeCasino.value
  if (casino) {
    return {
      siteName: casino.name,
      launchYear: casino.launchYear || '2018',
      depositMin: casino.payment?.minDepositPerTime ? `${casino.payment.minDepositPerTime} ${casino.currency || 'THB'}` : '1 THB',
      depositMax: casino.payment?.maxDepositPerTime ? `${casino.payment.maxDepositPerTime} ${casino.currency || 'THB'}` : '100,000 THB',
      tagline: casino.description || 'Best Online Casinos with Free Sign-Up Bonuses and Legitimate Licenses',
      logoUrl: casino.url?.logo || '',
      endorsementLogos: [],
      features: casino.keyFeatures && casino.keyFeatures.length > 0 ? casino.keyFeatures : [
        'Direct web automatic deposit-withdrawal system',
        'Supports all platforms, play anytime, anywhere',
        '24-hour customer care team'
      ],
      playNowUrl: casino.url?.referral || '#',
      playNowLabel: 'Play Now',
      alternateLinksUrl: casino.url?.referral || '#',
      alternateLinksLabel: 'Alternate links',
      viewPromotionsUrl: casino.url?.promotion || casino.url?.referral || '#',
      viewPromotionsLabel: 'View All Promotions',
      ownerId: casino.ownerId
    }
  }
  
  // Fallback to the first site settings document
  return siteSettingsList.value[0] || {}
})

// Active identifiers used to filter all sections
const activeOwnerId = computed(() => siteSettings.value?.ownerId || null)
const activeSiteKey = computed(() => siteSettings.value?.siteKey || null)

// Filter helper by siteKey with ownerId fallback
const filterBySiteKey = (list) => {
  return list.filter(item => {
    if (activeSiteKey.value) {
      return item.siteKey === activeSiteKey.value
    }
    return item.ownerId === activeOwnerId.value
  })
}

// Filter lists
const activeNavigation = computed(() => {
  const items = filterBySiteKey(navigationList.value)
  return [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
})

const activeBanners = computed(() => {
  return filterBySiteKey(bannersList.value).filter(b => b.placement === 'exclusive')
})

const activeBigWins = computed(() => {
  return filterBySiteKey(bigWinsList.value)
})

const activePopularGames = computed(() => {
  return filterBySiteKey(popularGamesList.value)
})

const activePromotions = computed(() => {
  return filterBySiteKey(promotionsList.value)
})
const formatAmount = (val) => {
  if (val === null || val === undefined || val === '') return '—'
  if (typeof val === 'string' && /[^\d\.]/.test(val)) return val
  const num = Number(val)
  if (!isNaN(num)) {
    return num.toLocaleString()
  }
  return String(val)
}

const formatCurrency = (val) => {
  if (val === null || val === undefined || val === '') return '—'
  if (typeof val === 'string' && /[^\d\.]/.test(val)) return val
  const num = Number(val)
  if (!isNaN(num)) {
    return `฿${num.toLocaleString()}`
  }
  return `฿${val}`
}
</script>

<style scoped>
.preview-layout {
  min-height: 100vh;
  background: #0b0f19;
  color: #f1f5f9;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  position: relative;
}

/* Main Preview Container */
.preview-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Section Header Styles */
.section-title-wrap {
  text-align: center;
  margin: 2.5rem 0 1.5rem;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem;
}

.section-subtitle {
  color: #9ca3af;
  font-size: 0.9rem;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.5;
}

/* 1. Accredited Header */
.accredited-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #1e293b;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.ace-icon {
  font-size: 1.4rem;
  color: #3b82f6;
}

.brand-text {
  font-weight: 800;
  font-size: 1.15rem;
  color: white;
}

.brand-text .light-text {
  color: #94a3b8;
  font-weight: 400;
}

.accreditation {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.acc-text {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}

.flag-icon {
  font-size: 1.1rem;
}

/* 2. Site & Header Section */
.site-header-section {
  padding: 3rem 0;
}

.site-header-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 768px) {
  .site-header-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.site-title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 0.75rem;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.meta-badge {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.meta-divider {
  color: #334155;
}

.meta-text {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
}

.site-tagline {
  font-size: 1.05rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0 0 2rem;
}

.endorsements-area {
  margin-bottom: 2rem;
}

.endorsement-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.5rem;
}

.logos-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.partner-logo {
  height: 24px;
  object-fit: contain;
  filter: grayscale(20%) brightness(95%);
  transition: filter 0.2s;
}

.partner-logo:hover {
  filter: none;
}

.cta-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-play-now,
.btn-alternate,
.btn-promotions {
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-play-now {
  background: white;
  color: black;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
}

.btn-play-now:hover {
  background: #f1f5f9;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.25);
}

.btn-play-now:active {
  transform: translateY(0) scale(1);
}

.btn-alternate,
.btn-promotions {
  background: transparent;
  color: white;
  border: 1px solid #334155;
}

.btn-alternate:hover,
.btn-promotions:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #475569;
  transform: translateY(-2px) scale(1.02);
}

.btn-alternate:active,
.btn-promotions:active {
  transform: translateY(0) scale(1);
}

.logo-box {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 16px;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 1.5rem;
}

.brand-big-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.fallback-big-logo {
  font-size: 3rem;
  font-weight: 900;
  color: #3b82f6;
  letter-spacing: 0.05em;
  text-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
}

.features-checklist {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.check-icon {
  color: #10b981;
  font-weight: 900;
  font-size: 0.95rem;
  line-height: 1.2;
}

.feature-text {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.4;
}

/* 3. Navigation Tabs */
.navigation-menu-bar {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 0.4rem;
  margin: 2rem 0;
}

.navigation-tabs-scroll {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.navigation-tabs-scroll::-webkit-scrollbar {
  display: none; /* Safari & Chrome */
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
  font-size: 0.82rem;
  font-weight: 600;
  color: #94a3b8;
  border: 1px solid transparent;
  text-decoration: none;
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.02);
  color: white;
}

.nav-tab:first-child {
  background: #1e293b;
  color: white;
  border-color: #334155;
}

.tab-emoji {
  font-size: 1.05rem;
}

/* 4. Promotion Banners */
.promotional-banners-section {
  margin: 3rem 0;
}

.banners-carousel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.promo-banner-card {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .promo-banner-card {
    grid-template-columns: 1fr;
  }
}

.banner-image-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 280px;
}

.banner-content-panel {
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem;
  line-height: 1.3;
}

.banner-subtitle {
  color: #a78bfa;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
}

.offer-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed #4b5563;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: 1.75rem;
}

.btn-banner-action {
  background: #a78bfa;
  color: #111827;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  text-align: center;
  align-self: flex-start;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-banner-action:hover {
  background: #c084fc;
  box-shadow: 0 6px 20px rgba(192, 132, 252, 0.5);
  transform: translateY(-2px) scale(1.02);
}

.btn-banner-action:active {
  transform: translateY(0) scale(1);
}

/* 5. Celebrate Big Wins */
.big-wins-section {
  margin: 3.5rem 0;
}

.big-wins-slider {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 1.25rem;
}

.big-wins-slider::-webkit-scrollbar {
  height: 6px;
}
.big-wins-slider::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.big-wins-slider::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.big-wins-slider::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}
.big-wins-slider {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.win-card {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  min-width: 280px;
  flex-shrink: 0;
}

@media (max-width: 1200px) {
  .win-card {
    flex: 0 0 calc((100% - 2 * 1.5rem) / 3);
  }
}
@media (max-width: 900px) {
  .win-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
  }
}
@media (max-width: 600px) {
  .win-card {
    flex: 0 0 280px;
  }
}

.win-card-image {
  position: relative;
  height: 220px;
  background: #030712;
}

.win-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.win-card-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.win-timestamp-row {
  font-size: 0.82rem;
  color: #94a3b8;
}

.timestamp-divider {
  color: #4b5563;
}

.win-game-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.win-bet-row {
  font-size: 0.9rem;
  color: #cbd5e1;
  display: flex;
  gap: 0.25rem;
}

.win-bet-row .bet-label {
  color: #64748b;
}

.win-bet-row .bet-value {
  font-weight: 600;
}

.win-winnings-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.95rem;
  flex-wrap: wrap;
}

.win-winnings-row .winnings-label {
  color: #10b981;
  font-weight: 700;
}

.win-winnings-row .winnings-value {
  color: #10b981;
  font-weight: 700;
}

.win-winnings-row .winnings-trophy {
  font-size: 0.95rem;
}

.win-winnings-row .multiplier-badge {
  background: #f59e0b;
  color: #030712;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.25rem;
}

.btn-play-now-black {
  width: 100%;
  padding: 0.65rem;
  text-align: center;
  background: white;
  color: black;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: auto;
  border: none;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  display: inline-block;
}

.btn-play-now-black:hover {
  background: #f1f5f9;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.25);
}

.btn-play-now-black:active {
  transform: translateY(0) scale(1);
}

/* 6. Popular Games */
.popular-games-section {
  margin: 3.5rem 0;
}

.games-grid {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 1.25rem;
}

.games-grid::-webkit-scrollbar {
  height: 6px;
}
.games-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.games-grid::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.games-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}
.games-grid {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.popular-game-card {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  min-width: 280px;
  flex-shrink: 0;
}

@media (max-width: 1200px) {
  .popular-game-card {
    flex: 0 0 calc((100% - 2 * 1.5rem) / 3);
  }
}
@media (max-width: 900px) {
  .popular-game-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
  }
}
@media (max-width: 600px) {
  .popular-game-card {
    flex: 0 0 280px;
  }
}

.game-thumbnail-wrap {
  position: relative;
  height: 200px;
  background: #030712;
}

.game-thumbnail-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-card-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.game-title-header {
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.platform-dot {
  color: #4b5563;
}

.platform-text {
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.win-rate-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #94a3b8;
}

.rate-pill {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.winnings-headline-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.8rem;
}

.winnings-badge-text {
  color: #10b981;
  font-weight: 700;
}

.headline-divider {
  color: #4b5563;
}

.headline-time {
  color: #94a3b8;
}

.wager-winnings-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-lbl {
  color: #64748b;
}

.stat-val {
  font-weight: 600;
  color: #e2e8f0;
}

.multiplier-badge-inline {
  background: #f59e0b;
  color: #030712;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: auto;
}

.btn-game-play-black {
  width: 100%;
  padding: 0.65rem;
  text-align: center;
  background: white;
  color: black;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: auto;
  border: none;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  display: inline-block;
}

.btn-game-play-black:hover {
  background: #f1f5f9;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.25);
}

.btn-game-play-black:active {
  transform: translateY(0) scale(1);
}

/* 7. Exclusive Promotions */
.exclusive-promotions-section {
  margin: 3.5rem 0;
}

.promotions-slider-grid {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 1.25rem;
}

.promotions-slider-grid::-webkit-scrollbar {
  height: 6px;
}
.promotions-slider-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.promotions-slider-grid::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.promotions-slider-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}
.promotions-slider-grid {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.promotion-card {
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  min-width: 280px;
  flex-shrink: 0;
}

.promotion-card:hover {
  transform: translateY(-2px);
}

@media (max-width: 1200px) {
  .promotion-card {
    flex: 0 0 calc((100% - 2 * 1.5rem) / 3);
  }
}
@media (max-width: 900px) {
  .promotion-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
  }
}
@media (max-width: 600px) {
  .promotion-card {
    flex: 0 0 280px;
  }
}

.promo-image-wrap {
  position: relative;
  height: 150px;
  background: #030712;
}

.promo-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #ec4899;
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.promo-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.promo-title {
  font-size: 1rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.85rem;
  line-height: 1.4;
}

.promo-stats-details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  margin-bottom: 1.25rem;
}

.stat-lbl-val {
  display: flex;
  justify-content: space-between;
}

.stat-lbl-val .lbl {
  color: #94a3b8;
}

.stat-lbl-val .val {
  color: white;
  font-weight: 600;
}

.stat-lbl-val .highlight-bonus {
  color: #f43f5e;
  font-weight: 700;
}

.stat-lbl-val .uppercase-val {
  text-transform: uppercase;
  color: #3b82f6;
  font-size: 0.75rem;
}

.promo-actions-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-promo-primary,
.btn-promo-secondary {
  width: 100%;
  padding: 0.55rem;
  text-align: center;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-promo-primary {
  background: #ec4899;
  color: white;
}

.btn-promo-primary:hover {
  background: #db2777;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.45);
  transform: translateY(-2px) scale(1.02);
}

.btn-promo-primary:active {
  transform: translateY(0) scale(1);
}

.btn-promo-secondary {
  background: transparent;
  color: #ec4899;
  border: 1px solid rgba(236, 72, 153, 0.3);
}

.btn-promo-secondary:hover {
  background: rgba(236, 72, 153, 0.05);
  border-color: #ec4899;
  transform: translateY(-2px) scale(1.02);
}

.btn-promo-secondary:active {
  transform: translateY(0) scale(1);
}
</style>
