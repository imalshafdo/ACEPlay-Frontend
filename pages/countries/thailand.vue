<template>
  <div class="page">
    <header class="navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="brand" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
          <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Flogo%2Fhero.png&w=1536&q=100" alt="ACEPlay logo" style="height: 35px; object-fit: contain;" />
          <span style="font-weight: 800; font-size: 1.25rem; letter-spacing: 0.04em; color: #ffffff;">ACE<span style="color: #ff2d2d;">Play</span></span>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          <NuxtLink class="nav-link" to="/countries/country">Countries</NuxtLink>
          <NuxtLink class="nav-link" to="/providers">Game Details</NuxtLink>
          <NuxtLink class="nav-link" to="/countries/philippinespg">Philippine Casinos</NuxtLink>
          <NuxtLink class="nav-link" to="/countries/bangladesh">Bangladesh Casinos</NuxtLink>
        </nav>

        <div class="nav-actions">
          <button class="btn btn-join primary">Join Now</button>
        </div>
      </div>
    </header>

    <main class="main-layout">

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2d2d" stroke-width="2" stroke-linecap="round" class="filter-icon">
              <path d="M4 6h16M7 12h10M10 18h4"/>
            </svg>
            Filters
          </div>
          <button @click="resetFilters" class="reset-btn">Reset</button>
        </div>

        <div class="filter-group">
          <h4 class="filter-label">MINIMUM RATING</h4>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedRatings" :value="4" class="custom-checkbox" />
            <span>4+ Stars <span class="text-red">★★★★</span></span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedRatings" :value="3" class="custom-checkbox" />
            <span>3+ Stars <span class="text-red">★★★</span></span>
          </label>
        </div>

        <div class="filter-group">
          <h4 class="filter-label">BONUS TYPES</h4>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedBonusTypes" value="welcome" class="custom-checkbox" />
            <span>Welcome Bonus</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedBonusTypes" value="no_deposit" class="custom-checkbox" />
            <span>No Deposit Bonus</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedBonusTypes" value="low_deposit" class="custom-checkbox" />
            <span>Low Deposit Bonus</span>
          </label>
        </div>

        <div class="filter-group">
          <h4 class="filter-label">PAYMENT METHODS</h4>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedPayments" value="truemoney" class="custom-checkbox" />
            <span class="icon-text"><span class="icon-placeholder payment-icon" style="color:red">💳</span> TrueMoney Wallet</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedPayments" value="bank_transfer" class="custom-checkbox" />
            <span class="icon-text"><span class="icon-placeholder payment-icon" style="color:red">🏦</span> Thai Bank Transfer</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedPayments" value="qr_payment" class="custom-checkbox" />
            <span class="icon-text"><span class="icon-placeholder payment-icon" style="color:red">📱</span> QR Payment</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedPayments" value="cryptocurrency" class="custom-checkbox" />
            <span class="icon-text"><span class="icon-placeholder payment-icon" style="color:red">₿</span> Cryptocurrency</span>
          </label>
        </div>
      </aside>

      <!-- Content -->
      <section class="content">
        
        <h1 class="page-title"><span class="highlight text-red" style="color:red">{{ countryName }} </span> Top Online Casinos</h1>
        <p class="page-subtitle" style="color:aliceblue">
          We have reviewed the latest bonuses from the top online casinos in {{ countryName }}. Compare great offers like welcome
          bonuses and no deposit pros — so you can get the most out of playing games for real money.
        </p>

        <div class="sort-bar">
          <div class="sort-tabs">
            <button 
              @click="activeSortTab = 'popular'" 
              :class="['sort-tab', { active: activeSortTab === 'popular' }]"
            >
              Most Popular
            </button>
            <button 
              @click="activeSortTab = 'newest'" 
              :class="['sort-tab', { active: activeSortTab === 'newest' }]"
            >
              Newest
            </button>
            <button 
              @click="activeSortTab = 'rating'" 
              :class="['sort-tab', { active: activeSortTab === 'rating' }]"
            >
              Highest Rated
            </button>
          </div>
          <div class="results-text">Showing {{ filteredCasinos.length }} verified casinos</div>
        </div>

        <div class="casino-list">
          <article v-for="c in filteredCasinos" :key="c.name" class="casino-card-long">
            <span class="bonus-badge">BONUS PACKAGE</span>
            
            <div class="card-inner">
              <div class="card-logo-col">
                <img :src="c.logo" alt="" class="card-logo" />
              </div>
              
              <div class="card-main-col">
                <div class="card-title-row">
                  <h3 class="casino-name">{{ c.name }}</h3>
                  <span class="casino-since">{{ c.since }}</span>
                </div>
                
                <div class="card-rating">
                  <span class="stars">
                    <span v-for="n in Math.floor(c.rating)" :key="'full-' + n" class="text-red">★</span>
                    <span v-if="c.rating % 1 >= 0.5" class="star-half text-red">★</span>
                    <span v-for="n in (5 - Math.ceil(c.rating))" :key="'empty-' + n" class="star-gray">★</span>
                  </span>
                  <span class="rating-val">({{ c.rating }}/5)</span>
                </div>
                
                <div class="card-promo">
                  <span class="promo-label">Promotion:</span> {{ c.promo }}
                </div>
                
                <div class="card-transfer">
                  {{ c.transfer }}
                </div>
                
                <div class="card-terms">
                  {{ c.terms }}
                </div>
              </div>
              
              <div class="card-action-col">
                <div class="range-info">
                  <div class="range-row">
                    <span class="range-label">Deposit range :</span>
                    <span class="range-val">{{ c.depositRange }}</span>
                  </div>
                  <div class="range-row">
                    <span class="range-label">Withdrawal Range :</span>
                    <span class="range-val">{{ c.withdrawalRange }}</span>
                  </div>
                </div>
                
                <div class="card-buttons">
                  <NuxtLink :to="'/casinopage/' + c.slug" class="btn primary full-width py" style="text-decoration:none">More Reviews</NuxtLink>
                  <button class="btn secondary full-width py">Get Promotions Now</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

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
import { ref, computed } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const countrySlug = computed(() => String(route.params.slug || 'thailand').replace(/-/g, ' '))

const countryName = computed(() =>
  countrySlug.value
    ? countrySlug.value
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Thailand'
)

// Filters State
const selectedRatings = ref([])
const selectedBonusTypes = ref([])
const selectedPayments = ref([])
const activeSortTab = ref('popular')

const resetFilters = () => {
  selectedRatings.value = []
  selectedBonusTypes.value = []
  selectedPayments.value = []
}

// Dynamically fetch casinos from local backend API
const { data: apiResponse } = await useFetch('http://localhost:5000/api/public/casinos?countryGroup=thailand')

const casinos = computed(() => {
  const raw = apiResponse.value?.data || []
  return raw.map(c => {
    const sinceYear = c.launchYear || '2018'
    const yearsActive = new Date().getFullYear() - parseInt(sinceYear)
    
    // Assign rating deterministically for filtering demo
    const nameLower = c.name.toLowerCase()
    let rating = 4.7
    if (nameLower.includes('betso') || nameLower.includes('gxy') || nameLower.includes('luk')) {
      if (nameLower.includes('gxy')) rating = 3.5
      else if (nameLower.includes('betso')) rating = 3.8
      else if (nameLower.includes('luk')) rating = 3.9
    } else {
      if (nameLower.includes('88fed')) rating = 4.7
      else if (nameLower.includes('777ww')) rating = 4.7
      else if (nameLower.includes('ubet89')) rating = 4.8
      else if (nameLower.includes('jilino')) rating = 4.6
      else if (nameLower.includes('milyon')) rating = 4.5
      else rating = 4.4
    }

    // Default channels mapping
    const defaultChannels = {
      'ubet89': ['truemoney wallet', 'thai bank transfer', 'qr payment', 'e-wallet', 'bank transfer'],
      '777ww': ['truemoney wallet', 'qr payment', 'e-wallet'],
      '88fed': ['thai bank transfer', 'qr payment', 'cryptocurrency', 'bank transfer'],
      'luk666': ['truemoney wallet', 'thai bank transfer', 'e-wallet', 'bank transfer'],
      'gxy888': ['qr payment', 'cryptocurrency'],
      'jilino1': ['e-wallet', 'bank transfer'],
      'milyon88': ['e-wallet', 'qr payment', 'cryptocurrency'],
      'betso88': ['bank transfer', 'qr payment'],
      'borojeet': ['e-wallet', 'bank transfer', 'qr payment']
    }

    const channels = c.payment?.channel && c.payment.channel.length > 0
      ? c.payment.channel.map(ch => ch.toLowerCase())
      : defaultChannels[nameLower] || ['e-wallet', 'bank transfer', 'qr payment']

    return {
      name: c.name,
      slug: c.name.toLowerCase().replace(/\s+/g, '-'),
      since: `since ${sinceYear} (${yearsActive} years)`,
      rating: rating,
      launchYear: parseInt(sinceYear),
      tier: c.tier || '1',
      channels: channels,
      bonusDetails: {
        deposit: c.welcomeBonus?.deposit !== undefined ? c.welcomeBonus.deposit : null
      },
      rawWelcomeBonus: c.welcomeBonus,
      promo: c.welcomeBonus?.title || 'New Members Challenge to Try Get a free bonus in full',
      transfer: c.welcomeBonus?.deposit && c.welcomeBonus?.bonus 
        ? `Deposit ${c.welcomeBonus.deposit} → Bonuses ${c.welcomeBonus.bonus} → Receive ${c.welcomeBonus.deposit + c.welcomeBonus.bonus}`
        : 'Deposit20 → Bonuses200 → Receive220',
      terms: c.welcomeBonus?.turnover 
        ? `(Turnover ${c.welcomeBonus.turnover}x • Maximum withdrawal ${c.welcomeBonus.maxWithdrawal || 'No Limit'})`
        : '(Turnover 6000x • Maximum withdrawal 200)',
      depositRange: c.payment?.minDepositPerTime !== undefined && c.payment?.maxDepositPerTime !== undefined
        ? `${c.payment.minDepositPerTime} - ${c.payment.maxDepositPerTime}`
        : '1 - 100,000',
      withdrawalRange: c.payment?.minWithdrawalPerTime !== undefined && c.payment?.maxWithdrawalPerTime !== undefined
        ? `${c.payment.minWithdrawalPerTime} - ${c.payment.maxWithdrawalPerTime}`
        : '100 - 500,000',
      logo: c.url?.logo || 'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/ubet89.png'
    }
  })
})

const filteredCasinos = computed(() => {
  let list = [...casinos.value]

  // Filter by Rating
  if (selectedRatings.value.length > 0) {
    const minRating = Math.min(...selectedRatings.value)
    list = list.filter(c => c.rating >= minRating)
  }

  // Filter by Bonus Type
  if (selectedBonusTypes.value.length > 0) {
    list = list.filter(c => {
      return selectedBonusTypes.value.some(type => {
        if (type === 'welcome') {
          return !!c.rawWelcomeBonus
        }
        if (type === 'no_deposit') {
          return c.bonusDetails?.deposit === 0 || c.bonusDetails?.deposit === '0'
        }
        if (type === 'low_deposit') {
          const dep = parseInt(c.bonusDetails?.deposit)
          return !isNaN(dep) && dep > 0 && dep <= 100
        }
        return false
      })
    })
  }

  // Filter by Payment Method
  if (selectedPayments.value.length > 0) {
    list = list.filter(c => {
      return selectedPayments.value.some(pm => {
        const channels = c.channels || []
        if (pm === 'truemoney') {
          return channels.includes('truemoney wallet') || channels.includes('e-wallet')
        }
        if (pm === 'bank_transfer') {
          return channels.includes('thai bank transfer') || channels.includes('bank transfer')
        }
        if (pm === 'qr_payment') {
          return channels.includes('qr payment')
        }
        if (pm === 'cryptocurrency') {
          return channels.includes('cryptocurrency')
        }
        return false
      })
    })
  }

  // Sort
  if (activeSortTab.value === 'popular') {
    list.sort((a, b) => {
      const tierA = parseInt(a.tier) || 99
      const tierB = parseInt(b.tier) || 99
      if (tierA !== tierB) return tierA - tierB
      return a.name.localeCompare(b.name)
    })
  } else if (activeSortTab.value === 'newest') {
    list.sort((a, b) => b.launchYear - a.launchYear)
  } else if (activeSortTab.value === 'rating') {
    list.sort((a, b) => b.rating - a.rating)
  }

  return list
})
</script>

<style scoped>
:root {
  --bg-gradient: radial-gradient(circle at top, #22324a 0, #071227 55%, #03050b 100%);
  --accent: #e53935;
  --text-main: #f1f5f9;
  --text-muted: #9ca3af;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: linear-gradient(
    to bottom,
    rgba(7, 12, 24, 0.94),
    rgba(7, 12, 24, 0.78),
    transparent
  );
  border-bottom: 1px solid rgba(82, 108, 145, 0.28);
}

.navbar-inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-right: 20px;
}

.brand-mark {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 0%, var(--accent), #0b1220 70%);
}

.brand-text {
  font-size: 1.1rem;
}

.brand-accent {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 24px;
  font-size: 0.9rem;
  color: #fff;
  font-weight: 600;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.nav-link:hover {
  color: rgba(229, 231, 235, 0.7);
}

.nav-actions {
  margin-left: auto;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn.primary {
  background: #576890;
  color: white;
}
.btn.primary:hover {
  background: #d32f2f;
}

.btn.secondary {
  background: transparent;
  color: #acbed8;
  border: 1px solid rgba(148, 163, 184, 0.3);
}
.btn.secondary:hover {
  border-color: #64748b;
  color: #cbd5e1;
}

.btn-join {
  padding: 8px 24px;
  border-radius: 8px;
}

.full-width {
  width: 100%;
}
.py {
  padding: 10px 0;
}

.text-red {
  color: var(--accent);
}

/* Main Layout */
.main-layout {
  max-width: 1300px;
  margin: 40px auto;
  padding: 0 24px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* Sidebar */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background: #1e1515;
  border-radius: 12px;
  padding: 24px 20px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.reset-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 600;
}

.filter-group {
  margin-bottom: 24px;
}
.filter-group:last-child {
  margin-bottom: 0;
}

.filter-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #e2e8f0;
}
.checkbox-label:last-child {
  margin-bottom: 0;
}

.custom-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid #475569;
  background: #0f172a;
  outline: none;
  cursor: pointer;
  position: relative;
}

.custom-checkbox:checked {
  background: var(--accent);
  border-color: var(--accent);
}

.custom-checkbox:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}

.icon-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.payment-icon {
  font-size: 1.1rem;
}

/* Content */
.content {
  flex: 1;
  min-width: 0;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.page-subtitle {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 800px;
  margin-bottom: 32px;
}

.sort-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e1515;
  border-radius: 12px;
  padding: 6px 20px 6px 6px;
  margin-bottom: 24px;
}

.sort-tabs {
  display: flex;
  gap: 6px;
}

.sort-tab {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.sort-tab.active {
  background: var(--accent);
  color: #fff;
}

.results-text {
  font-size: 0.85rem;
  color: #64748b;
}

/* Card layout */
.casino-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
}

.casino-card-long {
  background: #111a28;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  padding: 24px;
  padding-top: 32px; /* space for absolute badge */
}

.bonus-badge {
  position: absolute;
  top: 12px;
  right: 24px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.05em;
}

.card-inner {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

.card-logo-col {
  width: 160px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-logo {
  width: 140px;
  height: 140px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.card-main-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 4px;
}

.casino-name {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  color: #fff;
}

.casino-since {
  font-size: 0.8rem;
  color: #94a3b8;
}

.card-rating {
  font-size: 0.85rem;
  margin-bottom: 16px;
  display: flex;
  color:red;
  align-items: center;
  gap: 8px;
}

.stars {
  letter-spacing: 2px;
}

.star-half {
  color: rgba(229, 57, 53, 0.4);
}

.rating-val {
  color: #94a3b8;
}

.card-promo {
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 16px;
}

.promo-label {
  font-weight: 700;
}

.card-transfer {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 6px;
}

.card-terms {
  font-size: 0.85rem;
  color: #64748b;
}

.card-action-col {
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.range-info {
  margin-bottom: 20px;
}

.range-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.85rem;
}
.range-row:last-child {
  margin-bottom: 0;
}

.range-label {
  color: #fff;
  font-weight: 600;
}

.range-val {
  color: #fff;
  font-weight: 700;
}

.card-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .card-inner {
    flex-wrap: wrap;
  }
  .card-action-col {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 20px;
  }
}

@media (max-width: 640px) {
  .card-logo-col {
    width: 100%;
    margin-bottom: 20px;
  }
  .card-logo {
    width: 100px;
    height: 100px;
  }
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

.star-gray {
  color: #475569;
}
</style>
