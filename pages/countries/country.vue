<template>
  <div class="page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="brand" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
          <img src="https://aceplay.bet/_vercel/image?url=%2Fimg%2Flogo%2Fhero.png&w=1536&q=100" alt="ACEPlay logo" style="height: 35px; object-fit: contain;" />
          <span style="font-weight: 800; font-size: 1.25rem; letter-spacing: 0.04em; color: #ffffff;">ACE<span style="color: #ff2d2d;">Play</span></span>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          <NuxtLink class="nav-link" to="/providers">Game Details</NuxtLink>
          <a class="nav-link" href="/review">Reviews</a>
          
        </nav>

        <div class="nav-actions">
          <NuxtLink to="/countries" class="btn primary" style="color:aliceblue">Join now</NuxtLink>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero" style="color:aliceblue">
      <div class="hero-inner">
        <h1 class="hero-title">Find a Casino near you</h1>
        <p class="subtitle">
          Include recommended casinos in your country! Hot promotions, secure system, easy and fast deposits
          and withdrawals. Only select reliable online casinos. For the peace of mind of the players.
        </p>
      </div>
    </section>

    <!-- Region browser -->
    <section class="section">
      <div class="country-grid">
        <article v-for="c in visibleCountries" :key="c.slug" class="country-card">
          <div class="flag-wrapper">
            <img :src="c.flagUrl" alt="" class="flag-img" referrerpolicy="no-referrer" />
          </div>

          <div class="country-body">
            <h3 class="country-title-row">
              {{ c.name }} <span class="dot-separator">•</span> <span class="casino-count">{{ c.casinos }} Casinos</span>
            </h3>

            <div class="meta-row">
              <span class="row-label">Payment:</span>
              <div class="icon-list">
                <img v-for="icon in c.paymentIcons" :key="icon" :src="icon" class="payment-icon" referrerpolicy="no-referrer" />
              </div>
            </div>

            <div class="meta-row">
              <span class="row-label text-green">Top Casino:</span>
              <div class="icon-list">
                <img v-for="logo in c.casinoLogos" :key="logo" :src="logo" class="casino-icon" referrerpolicy="no-referrer" />
              </div>
            </div>
          </div>

          <div class="country-actions">
            <NuxtLink class="btn-find-local" :to="`/countries/${c.slug}`">
              Find a Local Casino
            </NuxtLink>
          </div>
        </article>
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
        <span>© Copyright 2018 - 2026, ACEPlay All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const { data: apiResponse } = await useFetch('http://localhost:5000/api/public/casinos')

const casinos = computed(() => apiResponse.value?.data || [])

const getCasinoCount = (slug) => {
  if (slug === 'philippinespg') {
    return casinos.value.filter(c => c.countryGroup === 'philippines' || c.countryGroup === 'philippinespg').length;
  }
  return casinos.value.filter(c => c.countryGroup === slug).length;
}

const countries = computed(() => [
  { 
    slug: 'thailand', 
    name: 'Thailand', 
    flagUrl: 'https://flagcdn.com/w160/th.png', 
    casinos: getCasinoCount('thailand'), 
    region: 'Asia', 
    popularity: 95,
    paymentIcons: [
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/promptpay.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/truemoney.png',
      'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    ],
    casinoLogos: [
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/550ww.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/ubet89.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/heng9999.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/luk666.jpg',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/thailand/gxy888.png'
    ]
  },
  { 
    slug: 'philippinespg', 
    name: 'Philippines', 
    flagUrl: 'https://flagcdn.com/w160/ph.png', 
    casinos: getCasinoCount('philippinespg'), 
    region: 'Asia', 
    popularity: 89,
    paymentIcons: [
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/gcash.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/paymaya.jpg',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/gotyme.jpeg',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/grabpay.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/qrph.jpg',
      'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    ],
    casinoLogos: [
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/betso88.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/7spin.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/ssbet77.webp',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/jilino1.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/philippines/milyon88.png'
    ]
  },
  { 
    slug: 'bangladesh', 
    name: 'Bangladesh', 
    flagUrl: 'https://flagcdn.com/w160/bd.png', 
    casinos: getCasinoCount('bangladesh'), 
    region: 'Asia', 
    popularity: 72,
    paymentIcons: [
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/bkash.png',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/nagad.jpeg',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/rocket.jpg',
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/payment/upay.png',
      'https://cryptologos.cc/logos/tether-usdt-logo.png',
      'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    ],
    casinoLogos: [
      'https://j99jfc6l8uchv7rv.public.blob.vercel-storage.com/logo/bangladesh/borojeet.png'
    ]
  }
])

const visibleCountries = computed(() => {
  return [...countries.value].sort((a, b) => b.popularity - a.popularity)
})
</script>

<style scoped>
:root {
  /* match index.vue blue + red theme */
  --bg: radial-gradient(circle at top, #22324a 0, #071227 55%, #03050b 100%);
  --text: #e5e7eb;
  --muted: rgba(229, 231, 235, 0.68);
  --border: rgba(85, 112, 150, 0.22);
  --shadow: 0 20px 46px rgba(3, 7, 18, 0.75);
  --shadow-soft: 0 18px 34px rgba(15, 23, 42, 0.7);
  --accent: #ff2d2d;
  --accent-2: #3b82f6;
  --card: radial-gradient(circle at top left, rgba(15, 23, 42, 0.96), rgba(3, 7, 18, 0.95));
  --card-border: rgba(82, 108, 145, 0.28);
  --radius-lg: 18px;
  --radius-md: 14px;
  --pill: 999px;
  --t-fast: 0.18s ease-out;
  --t-med: 0.24s ease-out;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: rgb(47, 65, 100);
  color: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--t-fast, 0.18s) ease-out;
  text-decoration: none;
}

.btn.primary {
  background: var(--accent, #ff2d2d);
  box-shadow: 0 10px 24px rgba(255, 45, 45, 0.24);
  border: 1px solid transparent;
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(255, 45, 45, 0.35);
  background: #253063;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(7, 12, 24, 0.94);
  border-bottom: 1px solid rgba(30, 64, 175, 0.6);
}

.navbar-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 26px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.brand-mark {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 0%, var(--accent),rgb(30, 54, 101) 70%);
  box-shadow: 0 14px 34px rgba(255, 45, 45, 0.28);
}

.brand-text {
  font-size: 1.05rem;
}

.brand-accent {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 18px;
  font-size: 0.9rem;
  color: rgba(229, 231, 235, 0.7);
}

.nav-link {
  text-decoration: none;
  color: inherit;
  position: relative;
  padding: 4px 0;
}

.nav-link:hover {
  color: #92b8e4;
  font-size: 15px;
  font-weight: bold;
}

.nav-actions {
  margin-left: auto;
}

/* Hero */
.hero {
  padding: 84px 20px 46px;
  background: transparent;
  border-bottom: 1px solid rgba(85, 112, 150, 0.15);
}

.hero-inner {
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.2rem, 4.3vw, 3.7rem);
  line-height: 1.05;
  letter-spacing: 0.01em;
  margin: 0 0 10px;
}

.hero-subtitle {
  max-width: 720px;
  margin: 0 auto;
  color: var(--muted);
  font-size: 0.98rem;
}

/* Section */
.section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 20px 70px;
}

/* Cards */
.country-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  margin-top: 18px;
}

.country-card {
  border-radius: 16px;
  background: #aeb5d1;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  transition: transform var(--t-med), box-shadow var(--t-med);
}

.country-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.flag-wrapper {
  width: 100%;
  max-width: 200px;
  height: 115px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin: 0 0 24px;
  display: block;
}

.flag-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-body {
  flex: 1;
}

.country-title-row {
  margin: 0 0 18px;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
}

.dot-separator {
  color: #94a3b8;
  margin: 0 6px;
}

.casino-count {
  font-weight: 500;
  color: #64748b;
  font-size: 0.95rem;
}

.meta-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.row-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

.row-label.text-green {
  color: #16a34a;
}

.icon-list {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  min-height: 32px;
}

.payment-icon {
  height: 24px;
  width: auto;
  object-fit: contain;
}

.casino-icon {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  object-fit: cover;
  background: #111827;
  border: 1px solid #e2e8f0;
}

.country-actions {
  margin-top: auto;
  padding-top: 14px;
}

.btn-find-local {
  display: block;
  width: 100%;
  padding: 14px;
  background: #000000;
  color: #ffffff;
  text-align: center;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  transition: background 0.2s ease;
  letter-spacing: 0.02em;
}

.btn-find-local:hover {
  background: #1e293b;
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

.logo-badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: conic-gradient(from 180deg, var(--accent), #ff6b6b, var(--accent-2), #60a5fa, var(--accent), #ff6b6b);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #020617;
}

.logo-text {
  font-size: 1.05rem;
}

.logo-accent {
  color: var(--accent);
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

@media (max-width: 980px) {
  .country-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 880px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 640px) {
  .section-top {
    flex-direction: column;
    align-items: stretch;
  }

  .controls {
    justify-content: flex-start;
  }

  .country-grid {
    grid-template-columns: 1fr;
  }
}
</style>

