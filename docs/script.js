// ============================================================================
// BEGGY — ORDER IT. TRACK IT. IT NEVER COMES.
// Swiggy. But the food is fake. You keep the money.
// ============================================================================

(function () {
  'use strict';

  // ── HTML Entity Escaper for XSS Defense ─────────────────────────────────────
  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str ?? '');
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── 4 City Packs & 32+ Fictional Kitchens ───────────────────────────────────
  const CITIES = {
    bengaluru: {
      name: 'Bengaluru',
      area: 'Indiranagar, 100ft Road',
      center: [12.9716, 77.5946],
      dest: [12.9784, 77.6408], // Indiranagar
      kitchens: [
        {
          id: 'blr-1',
          name: 'Koramangala Midnight Biryani Club',
          rating: '4.6 ★',
          cuisines: 'Biryani, Kebabs, Mughlai',
          eta: '25-35 mins',
          satire: '50% OFF up to ₹0',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
          coords: [12.9352, 77.6245],
          dishes: [
            { id: 'b1', title: 'Midnight Special Chicken Dum Biryani', price: 349, veg: false },
            { id: 'b2', title: 'Mutton Seekh Kebab (4 pcs)', price: 289, veg: false }
          ]
        },
        {
          id: 'blr-2',
          name: 'Indiranagar Smashed Burger Cartel',
          rating: '4.5 ★',
          cuisines: 'Gourmet Burgers, Truffle Fries',
          eta: '20-30 mins',
          satire: 'Surge Fee Active (+₹25)',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
          coords: [12.9784, 77.6408],
          dishes: [
            { id: 'b3', title: 'Double Smash Bacon Cheese Melt', price: 399, veg: false },
            { id: 'b4', title: 'Crispy Peri Peri Fries', price: 179, veg: true }
          ]
        },
        {
          id: 'blr-3',
          name: 'The Butter Chicken Project',
          rating: '4.7 ★',
          cuisines: 'North Indian, Naan, Dal Makhani',
          eta: '30-40 mins',
          satire: 'Free Delivery above ₹499',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80',
          coords: [12.9750, 77.6050],
          dishes: [
            { id: 'b5', title: 'Old Delhi Velvet Butter Chicken', price: 380, veg: false },
            { id: 'b6', title: 'Garlic Butter Naan (2 pcs)', price: 120, veg: true }
          ]
        },
        {
          id: 'blr-4',
          name: 'Rameshwaram Ghee Corner',
          rating: '4.8 ★',
          cuisines: 'South Indian, Dosas, Ghee Podi',
          eta: '15-25 mins',
          satire: '2-for-1 (Min Order ₹599)',
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80',
          coords: [12.9719, 77.6412],
          dishes: [
            { id: 'b7', title: 'Ghee Podi Masala Dosa', price: 195, veg: true },
            { id: 'b8', title: 'Crispy Button Idlis with Sambar', price: 140, veg: true }
          ]
        },
        {
          id: 'blr-5',
          name: 'Bangalore Kathi Roll Co.',
          rating: '4.3 ★',
          cuisines: 'Kathi Rolls, Shawarma, Wraps',
          eta: '20-30 mins',
          satire: 'Rain Fee Added',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80',
          coords: [12.9698, 77.6150],
          dishes: [
            { id: 'b9', title: 'Double Chicken Egg Roll', price: 220, veg: false },
            { id: 'b10', title: 'Paneer Tikka Kathi Roll', price: 185, veg: true }
          ]
        },
        {
          id: 'blr-6',
          name: 'Corner Scoop Death By Chocolate',
          rating: '4.9 ★',
          cuisines: 'Desserts, Hot Fudge Sundaes',
          eta: '15-20 mins',
          satire: '0 Calories (Fake)',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
          coords: [12.9345, 77.6189],
          dishes: [
            { id: 'b11', title: 'Classic Death By Chocolate Sundae', price: 260, veg: true },
            { id: 'b12', title: 'Warm Brownie Fudge Bowl', price: 210, veg: true }
          ]
        },
        {
          id: 'blr-7',
          name: 'Church Street Momos Garage',
          rating: '4.4 ★',
          cuisines: 'Tibetan Momos, Thukpa, Wings',
          eta: '20-30 mins',
          satire: 'Night Craving Special',
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
          coords: [12.9740, 77.6070],
          dishes: [
            { id: 'b13', title: 'Crispy Fried Chicken Momos (8 pcs)', price: 240, veg: false },
            { id: 'b14', title: 'Steamed Cheese Corn Momos', price: 190, veg: true }
          ]
        },
        {
          id: 'blr-8',
          name: 'HSR Midnight Pizza Syndicate',
          rating: '4.5 ★',
          cuisines: 'Woodfired Pizza, Garlic Bread',
          eta: '30-40 mins',
          satire: 'Cheesy Overload',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
          coords: [12.9121, 77.6446],
          dishes: [
            { id: 'b15', title: 'Loaded Pepperoni & Jalapeno Pizza', price: 460, veg: false },
            { id: 'b16', title: 'Cheesy Garlic Pull-Apart Bread', price: 199, veg: true }
          ]
        }
      ]
    },
    mumbai: {
      name: 'Mumbai',
      area: 'Bandra West, Hill Road',
      center: [19.0596, 72.8295],
      dest: [19.0600, 72.8350],
      kitchens: [
        {
          id: 'mum-1',
          name: 'Bandra Midnight Butter Pav',
          rating: '4.7 ★',
          cuisines: 'Pav Bhaji, Tawa Pulao, Chaat',
          eta: '20-30 mins',
          satire: 'Extra Butter Alert',
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
          coords: [19.0550, 72.8300],
          dishes: [
            { id: 'm1', title: 'Cheese Burst Pav Bhaji (4 Pav)', price: 270, veg: true },
            { id: 'm2', title: 'Spicy Mumbai Tawa Pulao', price: 220, veg: true }
          ]
        },
        {
          id: 'mum-2',
          name: 'Carter Road Shawarma Mafia',
          rating: '4.6 ★',
          cuisines: 'Lebanese Shawarma, Hummus, Fries',
          eta: '20-25 mins',
          satire: 'Open till 4 AM',
          image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
          coords: [19.0680, 72.8220],
          dishes: [
            { id: 'm3', title: 'Jumbo Chicken Garlic Shawarma', price: 249, veg: false },
            { id: 'm4', title: 'Loaded Cheese Fries', price: 180, veg: true }
          ]
        },
        {
          id: 'mum-3',
          name: 'Lower Parel Biryani Engine',
          rating: '4.5 ★',
          cuisines: 'Dum Biryani, Raita, Kebabs',
          eta: '30-40 mins',
          satire: 'Platform Fee ₹10',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
          coords: [18.9950, 72.8300],
          dishes: [
            { id: 'm5', title: 'Hyderabadi Dum Chicken Biryani', price: 360, veg: false },
            { id: 'm6', title: 'Reshmi Malai Kebab (6 pcs)', price: 310, veg: false }
          ]
        },
        {
          id: 'mum-4',
          name: 'Colaba Burger Republic',
          rating: '4.8 ★',
          cuisines: 'Gourmet Sliders, Shakes',
          eta: '25-35 mins',
          satire: 'High Calorie Sin',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
          coords: [18.9067, 72.8147],
          dishes: [
            { id: 'm7', title: 'Truffle Mushroom Swiss Burger', price: 420, veg: true },
            { id: 'm8', title: 'Nutella Belgian Thick Shake', price: 230, veg: true }
          ]
        }
      ]
    },
    delhi: {
      name: 'Delhi NCR',
      area: 'Connaught Place / Cyber Hub',
      center: [28.6304, 77.2177],
      dest: [28.6328, 77.2197],
      kitchens: [
        {
          id: 'del-1',
          name: 'Connaught Midnight Darbar',
          rating: '4.8 ★',
          cuisines: 'Makhani Gravy, Garlic Naan, Dal',
          eta: '25-35 mins',
          satire: 'Pure Dilli Swag',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80',
          coords: [28.6320, 77.2180],
          dishes: [
            { id: 'd1', title: 'Boneless Butter Chicken & 2 Naans', price: 440, veg: false },
            { id: 'd2', title: 'Dal Makhani Slow Cooked 24hrs', price: 320, veg: true }
          ]
        },
        {
          id: 'del-2',
          name: 'Hauz Khas Momos Garage',
          rating: '4.6 ★',
          cuisines: 'Afghani Momos, Kurkure Gravy',
          eta: '20-30 mins',
          satire: 'Spicy Red Chutney',
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
          coords: [28.5530, 77.1940],
          dishes: [
            { id: 'd3', title: 'Tandoori Afghani Chicken Momos', price: 260, veg: false },
            { id: 'd4', title: 'Kurkure Paneer Momos with Dip', price: 210, veg: true }
          ]
        },
        {
          id: 'del-3',
          name: 'Cyber Hub Roll Corporation',
          rating: '4.5 ★',
          cuisines: 'Mutton Seekh, Egg Rolls, Kebabs',
          eta: '20-25 mins',
          satire: 'Tech Worker Late Fuel',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80',
          coords: [28.4950, 77.0890],
          dishes: [
            { id: 'd5', title: 'Double Mutton Seekh Kathi Roll', price: 290, veg: false },
            { id: 'd6', title: 'Rumali Roti & Galouti Kebab', price: 340, veg: false }
          ]
        },
        {
          id: 'del-4',
          name: 'GK-II Midnight Pizza Syndicate',
          rating: '4.7 ★',
          cuisines: 'Woodfired Slices, Stuffed Crust',
          eta: '30-40 mins',
          satire: 'Late Night Addiction',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
          coords: [28.5350, 77.2400],
          dishes: [
            { id: 'd7', title: 'Spicy Pepperoni & Hot Honey Pizza', price: 470, veg: false },
            { id: 'd8', title: 'Garlic Parmesan Dough Knots', price: 180, veg: true }
          ]
        }
      ]
    },
    hyderabad: {
      name: 'Hyderabad',
      area: 'Jubilee Hills, Road No. 36',
      center: [17.4319, 78.4073],
      dest: [17.4350, 78.4090],
      kitchens: [
        {
          id: 'hyd-1',
          name: 'Charminar Zafrani Dum Biryani',
          rating: '4.9 ★',
          cuisines: 'Authentic Hyderabadi Dum Biryani',
          eta: '25-35 mins',
          satire: 'Nawabi Taste, ₹0 Bill',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
          coords: [17.3616, 78.4747],
          dishes: [
            { id: 'h1', title: 'Special Zafrani Chicken Dum Biryani', price: 360, veg: false },
            { id: 'h2', title: 'Double Ka Meetha (Royal Dessert)', price: 150, veg: true }
          ]
        },
        {
          id: 'hyd-2',
          name: 'Madhapur Arabian Mandi Engine',
          rating: '4.7 ★',
          cuisines: 'Arabian Mandi, Juicy Chicken',
          eta: '30-40 mins',
          satire: 'Night Rush Active',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
          coords: [17.4483, 78.3915],
          dishes: [
            { id: 'h3', title: 'Al Faham Chicken Mandi with Soup', price: 430, veg: false },
            { id: 'h4', title: 'Crispy Garlic Fish Bites', price: 310, veg: false }
          ]
        },
        {
          id: 'hyd-3',
          name: 'Gachibowli Midnight Shawarma Vault',
          rating: '4.5 ★',
          cuisines: 'Shawarma, Falafel, Rumali',
          eta: '15-25 mins',
          satire: 'Extra Mayo Guaranteed',
          image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
          coords: [17.4401, 78.3489],
          dishes: [
            { id: 'h5', title: 'Rumali Jumbo Chicken Shawarma', price: 230, veg: false },
            { id: 'h6', title: 'Peri Peri Crispy Chicken Strips', price: 210, veg: false }
          ]
        },
        {
          id: 'hyd-4',
          name: 'Banjara Spice Dosa Project',
          rating: '4.6 ★',
          cuisines: 'Guntur Karam Dosa, Vada, Upma',
          eta: '15-20 mins',
          satire: 'Ghee Podi Fire',
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80',
          coords: [17.4156, 78.4350],
          dishes: [
            { id: 'h7', title: 'Fire Guntur Karam Ghee Dosa', price: 180, veg: true },
            { id: 'h8', title: 'Cheese Corn Podi Dosa', price: 210, veg: true }
          ]
        }
      ]
    }
  };

  // ── Global App State ────────────────────────────────────────────────────────
  let currentCityKey = 'bengaluru';
  let activeDuel = null; // { from: 'Arun', amount: 340, dish: 'Biryani' }
  let cart = {}; // dishId -> { item, restaurant, qty }
  let lastOrderSummary = { amount: 457, dish: 'Midnight Biryani', restaurant: 'Koramangala Club', time: '11:42 PM' };

  // User Local Storage State: "The Bill You Kept"
  let userKeptState = {
    totalKept: 0,
    streak: 0,
    lastKeptDate: '',
    history: []
  };

  function loadUserKeptState() {
    try {
      const raw = localStorage.getItem('beggy_bill_kept');
      if (raw) {
        const parsed = JSON.parse(raw);
        userKeptState.totalKept = Number(parsed.totalKept) || 0;
        userKeptState.streak = Number(parsed.streak) || 0;
        userKeptState.lastKeptDate = parsed.lastKeptDate || '';
        userKeptState.history = Array.isArray(parsed.history) ? parsed.history : [];
      }
    } catch (e) {
      console.warn('Could not parse userKeptState', e);
    }
    updateHeaderBillUI();
  }

  function saveUserKeptState() {
    try {
      localStorage.setItem('beggy_bill_kept', JSON.stringify(userKeptState));
    } catch (e) {}
    updateHeaderBillUI();
  }

  function updateHeaderBillUI() {
    const el = document.getElementById('header-saved-val');
    if (el) el.textContent = `₹${Math.floor(userKeptState.totalKept)}`;
  }

  // ── Live Rupee Ticker (Honest counter from real API) ────────────────────────
  function initLiveTicker() {
    const tickerEl = document.getElementById('live-hero-ticker');
    const subtitleEl = document.getElementById('ticker-subtitle');
    if (!tickerEl) return;

    fetch('/api/stats')
      .then(r => r.json())
      .then(d => {
        if (d && d.ok && typeof d.totalSaved === 'number' && d.totalSaved > 0) {
          tickerEl.textContent = Number(d.totalSaved).toLocaleString('en-IN');
          if (subtitleEl) subtitleEl.textContent = 'kept so far';
        } else {
          tickerEl.textContent = '0';
          if (subtitleEl) subtitleEl.textContent = 'kept so far — be the first tonight';
        }
      })
      .catch(() => {
        tickerEl.textContent = '0';
        if (subtitleEl) subtitleEl.textContent = 'kept so far — be the first tonight';
      });
  }

  // ── URL Duel Parser (?c=610&dish=Butter+Chicken&from=Priya) ──────────────────
  function parseUrlDuel() {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('c');
    const dish = params.get('dish');
    const from = params.get('from');

    if (c && !isNaN(parseFloat(c))) {
      const amount = Math.min(Math.max(Math.round(parseFloat(c)), 10), 50000);
      const challenger = (from || 'A friend').slice(0, 30);
      const food = (dish || 'biryani').slice(0, 40);

      activeDuel = { from: challenger, amount, dish: food };

      // Render Duel Screen
      const duelScreen = document.getElementById('duel-screen');
      const heroSection = document.getElementById('hero-ticker-section');
      const nameEl = document.getElementById('duel-sender-name');
      const dishEl = document.getElementById('duel-dish-name');
      const amtEl = document.getElementById('duel-saved-amount');
      const btnAmtEl = document.getElementById('duel-btn-amt');

      if (nameEl) nameEl.textContent = challenger;
      if (dishEl) dishEl.textContent = food;
      if (amtEl) amtEl.textContent = `₹${amount}`;
      if (btnAmtEl) btnAmtEl.textContent = `₹${amount}`;

      if (duelScreen) duelScreen.style.display = 'flex';
      if (heroSection) heroSection.style.display = 'none';
      return true;
    }
    return false;
  }

  // ── City Switcher ───────────────────────────────────────────────────────────
  function initCitySwitcher() {
    const btn = document.getElementById('city-selector-btn');
    const dropdown = document.getElementById('city-dropdown');
    const label = document.getElementById('current-city-label');
    const cityTitle = document.getElementById('kitchens-city-title');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.style.display === 'block';
      dropdown.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', !open);
    });

    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    });

    dropdown.querySelectorAll('.city-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const city = opt.getAttribute('data-city');
        if (CITIES[city]) {
          currentCityKey = city;
          dropdown.querySelectorAll('.city-option').forEach(o => o.classList.remove('active'));
          opt.classList.add('active');

          if (label) label.textContent = CITIES[city].name;
          if (cityTitle) cityTitle.textContent = CITIES[city].name;

          const locInfo = document.getElementById('cart-location-info');
          if (locInfo) locInfo.textContent = `Delivering to: ${CITIES[city].area} • ~11 mins`;

          renderKitchens();
        }
      });
    });
  }

  // ── Kitchens & Dishes Renderer ──────────────────────────────────────────────
  let activeFilter = 'all';
  let searchQuery = '';

  function renderKitchens() {
    const grid = document.getElementById('kitchens-grid');
    const countBadge = document.getElementById('kitchens-count-badge');
    if (!grid) return;

    const cityData = CITIES[currentCityKey] || CITIES.bengaluru;
    let kitchens = cityData.kitchens;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      kitchens = kitchens.filter(k =>
        k.name.toLowerCase().includes(q) ||
        k.cuisines.toLowerCase().includes(q) ||
        k.dishes.some(d => d.title.toLowerCase().includes(q))
      );
    } else if (activeFilter !== 'all') {
      kitchens = kitchens.filter(k => {
        const text = (k.name + ' ' + k.cuisines).toLowerCase();
        if (activeFilter === 'biryani') return text.includes('biryani') || text.includes('mandi');
        if (activeFilter === 'burger') return text.includes('burger') || text.includes('fries');
        if (activeFilter === 'pizza') return text.includes('pizza');
        if (activeFilter === 'rolls') return text.includes('roll') || text.includes('shawarma');
        if (activeFilter === 'south') return text.includes('dosa') || text.includes('idli');
        if (activeFilter === 'north') return text.includes('north') || text.includes('naan') || text.includes('butter chicken');
        if (activeFilter === 'dessert') return text.includes('dessert') || text.includes('chocolate') || text.includes('shake');
        return true;
      });
    }

    if (countBadge) countBadge.textContent = `${kitchens.length} kitchens`;

    if (kitchens.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 16px; color: var(--text-muted);">
          <span style="font-size: 2rem;">🍽️</span>
          <p style="margin-top: 10px; font-weight: 700;">No cravings match "${escapeHtml(searchQuery)}".</p>
          <p style="font-size: 0.8rem;">Try searching for biryani, burgers, pizza, rolls, or momos.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = kitchens.map(k => `
      <div class="kitchen-card" data-kitchen-id="${escapeHtml(k.id)}">
        <div class="kc-banner-wrap">
          <img src="${escapeHtml(k.image)}" alt="${escapeHtml(k.name)}" class="kc-banner-img" loading="lazy" />
          <span class="kc-satire-badge">${escapeHtml(k.satire)}</span>
          <span class="kc-eta-badge">⏱️ ${escapeHtml(k.eta)}</span>
        </div>

        <div class="kc-info">
          <div class="kc-name-row">
            <h3 class="kc-name">${escapeHtml(k.name)}</h3>
            <span class="kc-rating">${escapeHtml(k.rating)}</span>
          </div>
          <p class="kc-cuisines">${escapeHtml(k.cuisines)}</p>

          <div class="kc-dishes-list">
            ${k.dishes.map(d => {
              const inCart = cart[d.id];
              return `
                <div class="kc-dish-row">
                  <div class="dish-text-col">
                    <span class="dish-veg-tag">${d.veg ? '🟢' : '🔴'}</span>
                    <strong class="dish-title">${escapeHtml(d.title)}</strong>
                    <div class="dish-price">₹${d.price}</div>
                  </div>
                  <div class="dish-action-col">
                    ${inCart ? `
                      <div class="qty-stepper">
                        <button class="qty-btn btn-qty-minus" data-dish-id="${escapeHtml(d.id)}">−</button>
                        <span class="qty-val">${inCart.qty}</span>
                        <button class="qty-btn btn-qty-plus" data-dish-id="${escapeHtml(d.id)}">+</button>
                      </div>
                    ` : `
                      <button class="btn-add-dish" data-dish-id="${escapeHtml(d.id)}" data-kitchen-id="${escapeHtml(k.id)}">ADD</button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `).join('');

    bindDishEvents(kitchens);
  }

  function bindDishEvents(kitchens) {
    document.querySelectorAll('.btn-add-dish').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-dish-id');
        const kitchenId = e.currentTarget.getAttribute('data-kitchen-id');

        let foundDish = null;
        let foundKitchen = null;
        for (const k of kitchens) {
          const d = k.dishes.find(x => x.id === dishId);
          if (d) { foundDish = d; foundKitchen = k; break; }
        }

        if (foundDish) {
          cart[dishId] = {
            item: foundDish,
            restaurant: foundKitchen,
            qty: 1
          };
          updateCartUI();
          renderKitchens();
        }
      });
    });

    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-dish-id');
        if (cart[dishId]) {
          cart[dishId].qty += 1;
          updateCartUI();
          renderKitchens();
        }
      });
    });

    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-dish-id');
        if (cart[dishId]) {
          cart[dishId].qty -= 1;
          if (cart[dishId].qty <= 0) {
            delete cart[dishId];
          }
          updateCartUI();
          renderKitchens();
        }
      });
    });
  }

  // ── Cart & The Painful Swiggy Math ──────────────────────────────────────────
  function calculateCartMath() {
    let subtotal = 0;
    let itemCount = 0;
    let firstDish = '';
    let firstRest = '';

    for (const id in cart) {
      const entry = cart[id];
      subtotal += entry.item.price * entry.qty;
      itemCount += entry.qty;
      if (!firstDish) firstDish = entry.item.title;
      if (!firstRest && entry.restaurant) firstRest = entry.restaurant.name;
    }

    if (itemCount === 0) {
      return {
        itemCount: 0,
        subtotal: 0,
        delivery: 0,
        platform: 0,
        gst: 0,
        surge: 0,
        total: 0,
        firstDish: '',
        firstRest: ''
      };
    }

    const delivery = 49;
    const platform = 10;
    const gst = Math.round(subtotal * 0.05) + 8; // Packaging + 5% GST
    const surge = 25; // Rain / late night surge
    const total = subtotal + delivery + platform + gst + surge;

    return {
      itemCount,
      subtotal,
      delivery,
      platform,
      gst,
      surge,
      total,
      firstDish,
      firstRest
    };
  }

  function updateCartUI() {
    const math = calculateCartMath();

    // Floating cart bar
    const floatingBar = document.getElementById('floating-cart-bar');
    const fcCount = document.getElementById('fc-count');
    const fcTotal = document.getElementById('fc-total');
    const headerCartBadge = document.getElementById('header-cart-count');

    if (math.itemCount > 0) {
      if (floatingBar) floatingBar.style.display = 'flex';
      if (fcCount) fcCount.textContent = `${math.itemCount} ${math.itemCount === 1 ? 'Item' : 'Items'}`;
      if (fcTotal) fcTotal.textContent = `₹${math.total.toFixed(2)}`;
      if (headerCartBadge) {
        headerCartBadge.textContent = math.itemCount;
        headerCartBadge.style.display = 'flex';
      }
    } else {
      if (floatingBar) floatingBar.style.display = 'none';
      if (headerCartBadge) headerCartBadge.style.display = 'none';
    }

    // Cart Drawer items
    const container = document.getElementById('cart-items-container');
    if (container) {
      if (math.itemCount === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
            <span style="font-size: 2.4rem;">🍛</span>
            <p style="margin-top: 10px; font-weight: 700; color: #FFFFFF;">Your cart is empty.</p>
            <p style="font-size: 0.8rem;">Select dishes from midnight kitchens to simulate the bill.</p>
          </div>
        `;
      } else {
        container.innerHTML = Object.keys(cart).map(id => {
          const entry = cart[id];
          return `
            <div class="cart-item-row">
              <div class="ci-info">
                <strong class="ci-title">${escapeHtml(entry.item.title)}</strong>
                <span class="ci-price">₹${entry.item.price} each</span>
              </div>
              <div class="qty-stepper">
                <button class="qty-btn drawer-qty-minus" data-dish-id="${escapeHtml(id)}">−</button>
                <span class="qty-val">${entry.qty}</span>
                <button class="qty-btn drawer-qty-plus" data-dish-id="${escapeHtml(id)}">+</button>
              </div>
            </div>
          `;
        }).join('');

        // Bind drawer buttons
        container.querySelectorAll('.drawer-qty-plus').forEach(btn => {
          btn.addEventListener('click', () => {
            const did = btn.getAttribute('data-dish-id');
            if (cart[did]) { cart[did].qty += 1; updateCartUI(); renderKitchens(); }
          });
        });
        container.querySelectorAll('.drawer-qty-minus').forEach(btn => {
          btn.addEventListener('click', () => {
            const did = btn.getAttribute('data-dish-id');
            if (cart[did]) {
              cart[did].qty -= 1;
              if (cart[did].qty <= 0) delete cart[did];
              updateCartUI();
              renderKitchens();
            }
          });
        });
      }
    }

    // Bill lines
    const billSubtotal = document.getElementById('bill-subtotal');
    const billDelivery = document.getElementById('bill-delivery');
    const billPlatform = document.getElementById('bill-platform');
    const billGst = document.getElementById('bill-gst');
    const billSurge = document.getElementById('bill-surge');
    const billTotal = document.getElementById('bill-total');
    const drawerBtn = document.getElementById('drawer-checkout-btn');

    if (billSubtotal) billSubtotal.textContent = `₹${math.subtotal.toFixed(2)}`;
    if (billDelivery) billDelivery.textContent = `₹${math.delivery.toFixed(2)}`;
    if (billPlatform) billPlatform.textContent = `₹${math.platform.toFixed(2)}`;
    if (billGst) billGst.textContent = `₹${math.gst.toFixed(2)}`;
    if (billSurge) billSurge.textContent = `₹${math.surge.toFixed(2)}`;
    if (billTotal) billTotal.textContent = `₹${math.total.toFixed(2)}`;

    if (drawerBtn) {
      drawerBtn.disabled = (math.itemCount === 0);
    }
  }

  // ── Checkout & The Slam ─────────────────────────────────────────────────────
  function initCheckout() {
    const drawerCheckoutBtn = document.getElementById('drawer-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeBtn = document.getElementById('co-close-btn');
    const placeOrderBtn = document.getElementById('co-place-order-btn');
    const bigTotalEl = document.getElementById('co-big-total');

    if (drawerCheckoutBtn) {
      drawerCheckoutBtn.addEventListener('click', () => {
        closeCartDrawer();
        const math = calculateCartMath();
        if (bigTotalEl) bigTotalEl.textContent = `₹${math.total.toFixed(2)}`;
        if (checkoutModal) checkoutModal.style.display = 'flex';
      });
    }

    if (closeBtn && checkoutModal) {
      closeBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
      });
    }

    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', () => {
        const math = calculateCartMath();
        const finalAmount = math.total;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

        lastOrderSummary = {
          amount: finalAmount,
          dish: math.firstDish || 'Midnight Biryani',
          restaurant: math.firstRest || 'Koramangala Midnight Biryani Club',
          time: timeStr
        };

        // The Laugh: Strike through the bill to ₹0.00
        if (bigTotalEl) {
          bigTotalEl.classList.add('slammed');
          setTimeout(() => {
            bigTotalEl.textContent = '₹0.00 SAVED!';
          }, 200);
        }

        // Transition into tracking mini-movie after brief pause
        setTimeout(() => {
          if (checkoutModal) checkoutModal.style.display = 'none';
          if (bigTotalEl) bigTotalEl.classList.remove('slammed');
          cart = {}; // Clear cart
          updateCartUI();
          renderKitchens();
          startTrackingMovie(lastOrderSummary);
        }, 800);
      });
    }
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }

  // ── Tracking Screen — The 11-Minute Rider Mini-Movie ─────────────────────────
  let trackingMap = null;
  let riderMarker = null;
  let trackingTimer = null;
  let simSpeedMultiplier = 1; // 1 = 11 mins, 6 = ~2 mins, skip = instant
  let totalSimSeconds = 660; // 11 minutes
  let elapsedSimSeconds = 0;
  let currentTileLayer = null;

  function getMapTileUrl() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
  }

  function updateMapTiles() {
    if (!trackingMap) return;
    if (currentTileLayer) {
      trackingMap.removeLayer(currentTileLayer);
    }
    currentTileLayer = L.tileLayer(getMapTileUrl(), {
      maxZoom: 19,
      attribution: '&copy; Esri'
    }).addTo(trackingMap);
  }

  function startTrackingMovie(order) {
    const trackingScreen = document.getElementById('tracking-screen');
    const dishNameEl = document.getElementById('track-dish-name');
    const restNameEl = document.getElementById('track-restaurant-name');
    const savedValEl = document.getElementById('track-saved-val');

    if (dishNameEl) dishNameEl.textContent = order.dish;
    if (restNameEl) restNameEl.textContent = order.restaurant;
    if (savedValEl) savedValEl.textContent = `₹${order.amount.toFixed(2)}`;

    if (trackingScreen) trackingScreen.style.display = 'flex';

    // Init or refresh map
    initTrackingMap();

    // Reset timeline & countdown
    elapsedSimSeconds = 0;
    simSpeedMultiplier = 1;
    updateSpeedControlsUI();

    if (trackingTimer) clearInterval(trackingTimer);

    trackingTimer = setInterval(() => {
      elapsedSimSeconds += simSpeedMultiplier;
      updateTrackingProgress();

      if (elapsedSimSeconds >= totalSimSeconds) {
        clearInterval(trackingTimer);
        finishTrackingMovie();
      }
    }, 1000);

    updateTrackingProgress();
  }

  function updateSpeedControlsUI() {
    document.querySelectorAll('.speed-btn').forEach(btn => {
      const sp = btn.getAttribute('data-speed');
      if (sp === String(simSpeedMultiplier)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function initTrackingMap() {
    const mapContainer = document.getElementById('tracking-map');
    if (!mapContainer) return;

    const cityData = CITIES[currentCityKey] || CITIES.bengaluru;
    const start = cityData.kitchens[0].coords;
    const end = cityData.dest;

    if (!trackingMap) {
      trackingMap = L.map('tracking-map', {
        zoomControl: false,
        attributionControl: false
      }).setView(start, 14);

      updateMapTiles();

      // Destination Pin
      const destIcon = L.divIcon({
        className: 'dest-map-pin',
        html: `<div style="font-size: 28px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));">📍</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });
      L.marker(end, { icon: destIcon }).addTo(trackingMap);

      // Rider Marker
      const riderIcon = L.divIcon({
        className: 'rider-map-icon',
        html: `<div style="font-size: 32px; filter: drop-shadow(0 4px 12px rgba(252,128,25,0.6));">🛵</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
      riderMarker = L.marker(start, { icon: riderIcon }).addTo(trackingMap);
    } else {
      updateMapTiles();
      trackingMap.invalidateSize();
      riderMarker.setLatLng(start);
      trackingMap.setView(start, 14);
    }
  }

  function updateTrackingProgress() {
    const remaining = Math.max(0, totalSimSeconds - elapsedSimSeconds);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const etaEl = document.getElementById('eta-countdown');
    if (etaEl) etaEl.textContent = timeStr;

    // Move Rider: scooter stays stationary at kitchen until order picked up (progress >= 0.45)
    const cityData = CITIES[currentCityKey] || CITIES.bengaluru;
    const start = cityData.kitchens[0].coords;
    const end = cityData.dest;
    const progress = Math.min(1, elapsedSimSeconds / totalSimSeconds);

    if (progress < 0.45) {
      if (riderMarker) riderMarker.setLatLng(start);
    } else {
      const travelProgress = (progress - 0.45) / 0.55;
      const curLat = start[0] + (end[0] - start[0]) * travelProgress;
      const curLng = start[1] + (end[1] - start[1]) * travelProgress;
      if (riderMarker) riderMarker.setLatLng([curLat, curLng]);
    }

    // Update Staged Timeline Dots & Status
    const headingEl = document.getElementById('track-status-heading');
    const subEl = document.getElementById('track-status-sub');
    const chatBubble = document.getElementById('rider-chat-bubble');
    const chatText = document.getElementById('rc-text');

    const s1 = document.getElementById('tl-step-1');
    const s2 = document.getElementById('tl-step-2');
    const s3 = document.getElementById('tl-step-3');
    const s4 = document.getElementById('tl-step-4');

    [s1, s2, s3, s4].forEach(s => s && s.classList.remove('active'));

    if (progress < 0.15) {
      if (s1) s1.classList.add('active');
      if (headingEl) headingEl.textContent = 'Rahul is assigned';
      if (subEl) subEl.textContent = 'Hero Splendor • 4.8★ (1,420 orders)';
      if (chatBubble) chatBubble.style.display = 'none';
    } else if (progress < 0.45) {
      if (s2) s2.classList.add('active');
      if (headingEl) headingEl.textContent = 'At restaurant. Waiting for food.';
      if (subEl) subEl.textContent = 'Order is being packed in the kitchen';

      // Chat bubble 1
      if (progress >= 0.20 && progress <= 0.40) {
        if (chatBubble) chatBubble.style.display = 'flex';
        if (chatText) chatText.textContent = 'Bhaiya 2 min, kitchen me thoda rush hai.';
      } else {
        if (chatBubble) chatBubble.style.display = 'none';
      }
    } else if (progress < 0.85) {
      if (s3) s3.classList.add('active');
      if (headingEl) headingEl.textContent = 'Order picked up · On the way';
      if (subEl) subEl.textContent = 'Rider moving along your city roads';

      // Chat bubble 2
      if (progress >= 0.55 && progress <= 0.75) {
        if (chatBubble) chatBubble.style.display = 'flex';
        if (chatText) chatText.textContent = 'Bhaiya location main gate pe delivery chalega na?';
      } else {
        if (chatBubble) chatBubble.style.display = 'none';
      }
    } else {
      if (s4) s4.classList.add('active');
      if (headingEl) headingEl.textContent = 'Arriving at your doorstep';
      if (subEl) subEl.textContent = 'Delivery partner is outside your building';
      if (chatBubble) chatBubble.style.display = 'none';
    }
  }

  function finishTrackingMovie() {
    const trackingScreen = document.getElementById('tracking-screen');
    if (trackingScreen) trackingScreen.style.display = 'none';

    // Log savings to local ledger
    userKeptState.totalKept += lastOrderSummary.amount;
    userKeptState.streak += 1;
    userKeptState.history.unshift({
      amount: lastOrderSummary.amount,
      dish: lastOrderSummary.dish,
      restaurant: lastOrderSummary.restaurant,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      time: lastOrderSummary.time
    });
    saveUserKeptState();

    // POST /api/stats with amount (once)
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: lastOrderSummary.amount })
    })
      .then(r => r.json())
      .then(d => {
        if (d && d.ok && typeof d.totalSaved === 'number' && d.totalSaved > 0) {
          const tickerEl = document.getElementById('live-hero-ticker');
          const subtitleEl = document.getElementById('ticker-subtitle');
          if (tickerEl) tickerEl.textContent = Number(d.totalSaved).toLocaleString('en-IN');
          if (subtitleEl) subtitleEl.textContent = 'kept so far';
        }
      })
      .catch(() => {});

    // Trigger Post-Delivery Celebration Modal & Reveal!
    showPostDeliveryModal();
  }

  // ── Share Toast Notification ───────────────────────────────────────────────
  let shareToastTimer = null;
  function showShareToast(message) {
    const toast = document.getElementById('share-toast');
    const msgEl = document.getElementById('st-msg');
    if (!toast) return;
    if (msgEl) msgEl.textContent = message;
    toast.style.display = 'flex';
    if (shareToastTimer) clearTimeout(shareToastTimer);
    shareToastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 2800);
  }

  // ── Post-Delivery Celebration Modal (Founder Support & Amazon Recipe Kit) ──
  let pdmTipAmount = 10;

  function updatePdmTipUI(amount) {
    let amNum = Number(amount);
    if (isNaN(amNum) || !isFinite(amNum) || amNum <= 0) amNum = 10;
    pdmTipAmount = Math.min(50000, Math.max(1, amNum));
    const uri = `upi://pay?pa=arunking156-2@oksbi&pn=Arunachalam%20Venkatachalapathy&am=${pdmTipAmount}&cu=INR&tn=Fund%20the%20young%20founder`;

    const upiBtn = document.getElementById('pdm-upi-btn');
    const upiMain = document.getElementById('pdm-upi-btn-main');
    const qrImg = document.getElementById('pdm-qr-img');

    if (upiBtn) {
      upiBtn.href = uri;
    }
    if (upiMain) {
      upiMain.textContent = `Fund the Young Founder • ₹${pdmTipAmount.toLocaleString('en-IN')}`;
    }
    if (qrImg) {
      const encoded = encodeURIComponent(uri);
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encoded}`;
    }
  }

  function showPostDeliveryModal() {
    const modal = document.getElementById('post-delivery-modal');
    const savedVal = document.getElementById('pdm-saved-val');
    const dishTitle = document.getElementById('pdm-dish-title');
    const dishDesc = document.getElementById('pdm-dish-desc');

    const amt = lastOrderSummary.amount || 458;
    const dish = lastOrderSummary.dish || 'Biryani';

    if (savedVal) savedVal.textContent = `₹${amt.toFixed(2)}`;
    if (dishTitle) dishTitle.textContent = `Cook ${dish} at Home for ₹85!`;
    if (dishDesc) dishDesc.textContent = `Get fresh gourmet ingredients for authentic ${dish} delivered via Amazon India Pantry. Total prep: 15 mins.`;

    // Reset Founder tip to default ₹10 and sync pills UI
    updatePdmTipUI(10);
    const pdmPillsRow = document.getElementById('pdm-pills-row');
    if (pdmPillsRow) {
      pdmPillsRow.querySelectorAll('.pdm-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-amount') === '10');
      });
    }
    const pdmCustomWrap = document.getElementById('pdm-custom-wrap');
    if (pdmCustomWrap) pdmCustomWrap.style.display = 'none';
    const pdmQrBox = document.getElementById('pdm-qr-box');
    if (pdmQrBox) pdmQrBox.style.display = 'none';

    // Always ensure reveal screen underneath is loaded and populated
    showRevealScreen();

    // Show celebration popup
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  function hidePostDeliveryModal() {
    const modal = document.getElementById('post-delivery-modal');
    if (modal) modal.style.display = 'none';
  }

  // ── Name Sanitizer & Viral Challenge Formatter ──────────────────────────────
  function sanitizeName(s) {
    return String(s || '')
      .replace(/[<>"'&]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 24);
  }

  let activeTemplateTab = 'whatsapp';

  function getChallengeData() {
    const nameInput = document.getElementById('reveal-name-input');
    const rawName = nameInput ? nameInput.value : '';
    const cleanName = sanitizeName(rawName);
    const amt = Math.round(lastOrderSummary.amount || 458);
    const dish = lastOrderSummary.dish || 'Biryani';
    const origin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : 'https://beggy.vercel.app';
    const challengeUrl = `${origin}/?c=${amt}&dish=${encodeURIComponent(dish)}&from=${encodeURIComponent(cleanName || 'Someone')}`;

    let whatsappText = '';
    if (activeDuel && activeDuel.from) {
      whatsappText = `I just beat ${activeDuel.from}!\nTracked a fake rider for ₹${amt} ${dish}. Never arrived.\nBeat me: ${challengeUrl}`;
    } else {
      whatsappText = `I just tracked a rider for food that doesn't exist.\n₹${amt} ${dish}. Never came.\nBeat me: ${challengeUrl}`;
    }

    const twitterText = `Tracked a Swiggy rider for 20 mins for ${dish}.\nRider arrived at my gate.\nPlot twist: food was fake, I kept ₹${amt} in my bank account.\n\nTry it before your next 2 AM order:\n${challengeUrl}`;

    const instagramText = `₹${amt} kept in account. ${dish} ghosted. Beggy stood its ground 🛵💨\nChallenge link: ${challengeUrl}`;

    const linkedinText = `Saved ₹${amt} today with an unconventional financial hack: ordered ${dish}, tracked the rider across the city, and discovered the food is completely fake.\n\nCash kept: 100%.\nCalories: 0.\nDiscipline: 10/10.\n\nDare you to resist your next takeout impulse: ${challengeUrl}`;

    return {
      name: cleanName,
      amt,
      dish,
      challengeUrl,
      whatsappText,
      twitterText,
      instagramText,
      linkedinText
    };
  }

  function updateSharePreview() {
    const previewEl = document.getElementById('rtb-preview-text');
    if (!previewEl) return;
    const data = getChallengeData();

    if (activeTemplateTab === 'whatsapp') {
      previewEl.value = data.whatsappText;
    } else if (activeTemplateTab === 'twitter') {
      previewEl.value = data.twitterText;
    } else if (activeTemplateTab === 'instagram') {
      previewEl.value = data.instagramText;
    } else if (activeTemplateTab === 'linkedin') {
      previewEl.value = data.linkedinText;
    }
  }

  function updateWhatsAppLink() {
    const nameInput = document.getElementById('reveal-name-input');
    const waBtn = document.getElementById('btn-reveal-whatsapp');
    if (!waBtn) return;

    const rawName = nameInput ? nameInput.value : '';
    const cleanName = sanitizeName(rawName);

    // Disable / dim the WhatsApp button until the name field has >= 2 letters
    if (cleanName.length < 2) {
      waBtn.classList.add('disabled');
      waBtn.removeAttribute('href');
    } else {
      waBtn.classList.remove('disabled');
      const data = getChallengeData();
      waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(data.whatsappText)}`;
    }

    updateSharePreview();
  }

  // ── The Reveal Screen ───────────────────────────────────────────────────────
  function showRevealScreen() {
    const reveal = document.getElementById('reveal-screen');
    if (!reveal) return;

    const rupeeVal = document.getElementById('reveal-rupee-val');
    const dishTag = document.getElementById('reveal-dish-tag');
    const timeTag = document.getElementById('reveal-time-tag');
    const receiptAmt = document.getElementById('r-receipt-amt');
    const nameInput = document.getElementById('reveal-name-input');
    const racDishTitle = document.getElementById('rac-dish-title');
    const racDishDesc = document.getElementById('rac-dish-desc');

    const amt = Math.round(lastOrderSummary.amount || 458);
    const dish = lastOrderSummary.dish || 'Biryani';

    if (rupeeVal) rupeeVal.textContent = amt;
    if (dishTag) dishTag.textContent = dish;
    if (timeTag) timeTag.textContent = lastOrderSummary.time || '11:42 pm';
    if (receiptAmt) receiptAmt.textContent = `INR ${lastOrderSummary.amount.toFixed(2)} NOT DEBITED`;

    if (racDishTitle) racDishTitle.textContent = `Cook ${dish} at Home for ₹85!`;
    if (racDishDesc) racDishDesc.textContent = `Stock up on fresh spices, basmati rice & pantry essentials for ${dish} on Amazon India Pantry. Real food delivered tomorrow for 1/4th the price!`;

    if (nameInput) {
      const saved = localStorage.getItem('beggyName') || '';
      if (saved) nameInput.value = saved;
    }

    updateWhatsAppLink();
    updateSharePreview();
    reveal.style.display = 'flex';
  }

  // ── Canvas Receipt Generator for 9:16 Instagram Stories ─────────────────────
  function generateReceiptImage() {
    const canvas = document.getElementById('receipt-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1080 x 1920 (9:16)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle orange accent line
    ctx.strokeStyle = '#FC8019';
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, 960, 1800);

    // Logo & Header
    ctx.fillStyle = '#FC8019';
    ctx.font = '900 64px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('beggy', 540, 220);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ORDER IT. TRACK IT. IT NEVER COMES.', 540, 270);

    // Giant Headline
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 62px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('YOUR FOOD WAS NEVER ORDERED.', 540, 480);

    // Giant Rupees
    ctx.fillStyle = '#10B981';
    ctx.font = '900 160px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`₹${Math.round(lastOrderSummary.amount)}`, 540, 660);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('is still in your account.', 540, 740);

    // Detail Box
    ctx.fillStyle = '#111520';
    ctx.fillRect(140, 860, 800, 360);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(140, 860, 800, 360);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '800 40px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(lastOrderSummary.dish, 540, 950);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${lastOrderSummary.restaurant} • ${lastOrderSummary.time}`, 540, 1020);

    // Stamped: "NEVER ARRIVED"
    ctx.save();
    ctx.translate(540, 1120);
    ctx.rotate(-0.08);
    ctx.fillStyle = '#EF4444';
    ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 4;
    ctx.strokeRect(-240, -45, 480, 80);
    ctx.fillText('NEVER ARRIVED', 0, 12);
    ctx.restore();

    // Footer Challenge CTA
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Can your willpower beat this?', 540, 1500);

    ctx.fillStyle = '#FC8019';
    ctx.font = '900 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('beggy.vercel.app', 540, 1580);

    // Convert to image & trigger download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `beggy-receipt-saved-${Math.round(lastOrderSummary.amount)}.png`;
      a.click();
    } catch (e) {
      alert('Screenshot saved! Take a quick screenshot of this screen to post.');
    }
  }

  // ── "The Bill You Kept" Passbook Modal ──────────────────────────────────────
  function initPassbookModal() {
    const billBtn = document.getElementById('header-bill-btn');
    const modal = document.getElementById('passbook-modal');
    const closeBtn = document.getElementById('pb-close-btn');
    const doneBtn = document.getElementById('pb-done-btn');
    const resetBtn = document.getElementById('pb-reset-btn');
    const copyUpiBtn = document.getElementById('btn-copy-upi');
    const founderChaiBtn = document.getElementById('founder-chai-btn');

    function openModal() {
      const totalEl = document.getElementById('pb-total-val');
      const streakEl = document.getElementById('pb-streak-val');
      const roastEl = document.getElementById('pb-roast-banner');
      const listEl = document.getElementById('pb-history-list');

      if (totalEl) totalEl.textContent = `₹${Math.floor(userKeptState.totalKept)}`;
      if (streakEl) streakEl.textContent = `🔥 ${userKeptState.streak} ${userKeptState.streak === 1 ? 'Night' : 'Nights'}`;

      if (roastEl) {
        if (userKeptState.totalKept > 0) {
          roastEl.textContent = `"This month you didn't spend ₹${Math.floor(userKeptState.totalKept)} on food that would have been cold anyway. Don't be the clown who opens Swiggy tonight."`;
        } else {
          roastEl.textContent = `"Your bill is ₹0. Order your first fake takeout and keep the rupees in your pocket."`;
        }
      }

      if (listEl) {
        if (userKeptState.history.length === 0) {
          listEl.innerHTML = `<p style="font-size:0.75rem; color:var(--text-muted); text-align:center; padding:12px;">No avoided orders yet. Go crave something.</p>`;
        } else {
          listEl.innerHTML = userKeptState.history.slice(0, 15).map(h => `
            <div class="pb-item">
              <div>
                <div class="pb-item-dish">${escapeHtml(h.dish)}</div>
                <div class="pb-item-meta">${escapeHtml(h.restaurant)} • ${escapeHtml(h.date)}</div>
              </div>
              <div class="pb-item-amt">₹${Math.round(h.amount)}</div>
            </div>
          `).join('');
        }
      }

      if (modal) modal.style.display = 'flex';
    }

    if (billBtn) billBtn.addEventListener('click', openModal);
    if (founderChaiBtn) founderChaiBtn.addEventListener('click', openModal);

    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    if (doneBtn && modal) doneBtn.addEventListener('click', () => modal.style.display = 'none');

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset your saved bills and streak?')) {
          userKeptState = { totalKept: 0, streak: 0, lastKeptDate: '', history: [] };
          saveUserKeptState();
          openModal();
        }
      });
    }

    if (copyUpiBtn) {
      copyUpiBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('arunking156-2@oksbi').then(() => {
          copyUpiBtn.textContent = '✓ Copied UPI!';
          setTimeout(() => { copyUpiBtn.textContent = '📋 Copy UPI'; }, 2000);
        }).catch(() => {
          alert('UPI ID: arunking156-2@oksbi');
        });
      });
    }
  }

  // ── Event Handlers & Page Initialization ────────────────────────────────────
  function initEvents() {
    // Craving button scrolls to kitchens
    const cravingBtn = document.getElementById('hero-craving-btn');
    if (cravingBtn) {
      cravingBtn.addEventListener('click', () => {
        const browseSec = document.getElementById('browse-section');
        if (browseSec) browseSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Duel Accept Button
    const duelAcceptBtn = document.getElementById('duel-accept-btn');
    if (duelAcceptBtn) {
      duelAcceptBtn.addEventListener('click', () => {
        const duelScreen = document.getElementById('duel-screen');
        const activeDuelStrip = document.getElementById('active-duel-strip');
        const adsName = document.getElementById('ads-name');
        const adsTarget = document.getElementById('ads-target');

        if (duelScreen) duelScreen.style.display = 'none';

        if (activeDuel && activeDuelStrip) {
          if (adsName) adsName.textContent = activeDuel.from;
          if (adsTarget) adsTarget.textContent = `₹${activeDuel.amount}`;
          activeDuelStrip.style.display = 'flex';
        }

        const browseSec = document.getElementById('browse-section');
        if (browseSec) browseSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Dismiss active duel strip
    const adsDismiss = document.getElementById('ads-dismiss');
    if (adsDismiss) {
      adsDismiss.addEventListener('click', () => {
        const strip = document.getElementById('active-duel-strip');
        if (strip) strip.style.display = 'none';
        activeDuel = null;
      });
    }

    // Search filter
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (searchClear) searchClear.style.display = searchQuery ? 'block' : 'none';
        renderKitchens();
      });
    }
    if (searchClear && searchInput) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        renderKitchens();
      });
    }

    // Cuisine Chips
    document.querySelectorAll('.c-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.c-chip').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        renderKitchens();
      });
    });

    // Cart Open / Close
    const headerCartBtn = document.getElementById('header-cart-btn');
    const floatingProceedBtn = document.getElementById('fc-proceed-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');

    if (headerCartBtn) headerCartBtn.addEventListener('click', openCartDrawer);
    if (floatingProceedBtn) floatingProceedBtn.addEventListener('click', openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

    // Tracking Speed Controls
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sp = btn.getAttribute('data-speed');
        if (sp === 'skip') {
          if (trackingTimer) clearInterval(trackingTimer);
          finishTrackingMovie();
        } else {
          simSpeedMultiplier = Number(sp) || 1;
          updateSpeedControlsUI();
        }
      });
    });

    // Reveal Name Input Listener
    const nameInput = document.getElementById('reveal-name-input');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        const val = sanitizeName(e.target.value);
        localStorage.setItem('beggyName', val);
        updateWhatsAppLink();
      });
    }

    // Panic Button & Modal
    const btnPanic = document.getElementById('btn-panic');
    const panicModal = document.getElementById('panic-modal');
    const panicResume = document.getElementById('panic-resume-btn');
    if (btnPanic && panicModal) {
      btnPanic.addEventListener('click', () => {
        panicModal.style.display = 'flex';
      });
    }
    if (panicResume && panicModal) {
      panicResume.addEventListener('click', () => {
        panicModal.style.display = 'none';
      });
    }

    // Reveal Screen Actions
    const btnDownload = document.getElementById('btn-reveal-download');
    if (btnDownload) {
      btnDownload.addEventListener('click', generateReceiptImage);
    }

    const btnRestart = document.getElementById('btn-reveal-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        const reveal = document.getElementById('reveal-screen');
        if (reveal) reveal.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Post-Delivery Celebration Modal Controls
    const pdmClose = document.getElementById('pdm-close-btn');
    const pdmNext = document.getElementById('pdm-next-btn');
    const pdmDismiss = document.getElementById('pdm-dismiss-btn');
    const pdmModal = document.getElementById('post-delivery-modal');

    if (pdmClose) pdmClose.addEventListener('click', hidePostDeliveryModal);
    if (pdmNext) pdmNext.addEventListener('click', hidePostDeliveryModal);
    if (pdmDismiss) pdmDismiss.addEventListener('click', hidePostDeliveryModal);
    if (pdmModal) {
      pdmModal.addEventListener('click', (e) => {
        if (e.target === pdmModal) hidePostDeliveryModal();
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hidePostDeliveryModal();
    });

    // Post-Delivery Modal Founder Tip Controls
    const pdmPillsRow = document.getElementById('pdm-pills-row');
    const pdmCustomWrap = document.getElementById('pdm-custom-wrap');
    const pdmCustomInput = document.getElementById('pdm-custom-input');
    const pdmCustomApplyBtn = document.getElementById('pdm-custom-apply-btn');
    const pdmAnyToggle = document.getElementById('pdm-any-toggle');

    if (pdmPillsRow) {
      const pills = pdmPillsRow.querySelectorAll('.pdm-pill:not(#pdm-any-toggle)');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pdmPillsRow.querySelectorAll('.pdm-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          if (pdmCustomWrap) pdmCustomWrap.style.display = 'none';
          const amt = Number(pill.getAttribute('data-amount')) || 10;
          updatePdmTipUI(amt);
        });
      });
    }

    if (pdmAnyToggle) {
      pdmAnyToggle.addEventListener('click', () => {
        if (pdmPillsRow) {
          pdmPillsRow.querySelectorAll('.pdm-pill').forEach(p => p.classList.remove('active'));
        }
        pdmAnyToggle.classList.add('active');
        if (pdmCustomWrap) {
          const isHidden = pdmCustomWrap.style.display === 'none' || !pdmCustomWrap.style.display;
          pdmCustomWrap.style.display = isHidden ? 'flex' : 'none';
          if (isHidden && pdmCustomInput) {
            pdmCustomInput.focus();
            const amt = Number(pdmCustomInput.value) || 500;
            updatePdmTipUI(amt);
          }
        }
      });
    }

    if (pdmCustomApplyBtn && pdmCustomInput) {
      pdmCustomApplyBtn.addEventListener('click', () => {
        const amt = Math.max(1, Math.min(50000, Number(pdmCustomInput.value) || 500));
        pdmCustomInput.value = amt;
        updatePdmTipUI(amt);
      });
      pdmCustomInput.addEventListener('input', () => {
        const val = Number(pdmCustomInput.value);
        if (val && val > 0) updatePdmTipUI(Math.min(50000, val));
      });
    }

    // Desktop QR code toggle in Post-Delivery Modal
    const pdmQrToggleBtn = document.getElementById('pdm-qr-toggle-btn');
    const pdmQrBox = document.getElementById('pdm-qr-box');
    if (pdmQrToggleBtn && pdmQrBox) {
      pdmQrToggleBtn.addEventListener('click', () => {
        const isHidden = pdmQrBox.style.display === 'none' || !pdmQrBox.style.display;
        pdmQrBox.style.display = isHidden ? 'flex' : 'none';
      });
    }

    // Copy UPI ID in Post-Delivery Modal
    const pdmCopyUpiBtn = document.getElementById('pdm-copy-upi-btn');
    if (pdmCopyUpiBtn) {
      pdmCopyUpiBtn.addEventListener('click', () => {
        const idToCopy = 'arunking156-2@oksbi';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(idToCopy).then(() => {
            showShareToast('✓ UPI ID copied: ' + idToCopy);
            pdmCopyUpiBtn.textContent = '✓ Copied to Clipboard!';
            setTimeout(() => { pdmCopyUpiBtn.textContent = '📋 Copy UPI ID'; }, 2500);
          }).catch(() => {
            showShareToast('UPI ID: ' + idToCopy);
          });
        } else {
          showShareToast('UPI ID: ' + idToCopy);
        }
      });
    }

    // UPI Button Click helper (if desktop, automatically show QR)
    const pdmUpiBtn = document.getElementById('pdm-upi-btn');
    if (pdmUpiBtn) {
      pdmUpiBtn.addEventListener('click', () => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (!isMobile && pdmQrBox) {
          pdmQrBox.style.display = 'flex';
        }
      });
    }

    // Multi-Platform Social Share Buttons
    const twitterBtn = document.getElementById('btn-share-twitter');
    if (twitterBtn) {
      twitterBtn.addEventListener('click', () => {
        const data = getChallengeData();
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.twitterText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    const igBtn = document.getElementById('btn-share-instagram');
    if (igBtn) {
      igBtn.addEventListener('click', () => {
        const data = getChallengeData();
        generateReceiptImage();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(data.instagramText).catch(() => {});
        }
        showShareToast('📸 Receipt downloaded & caption copied! Ready for Insta Story!');
      });
    }

    const tgBtn = document.getElementById('btn-share-telegram');
    if (tgBtn) {
      tgBtn.addEventListener('click', () => {
        const data = getChallengeData();
        const url = `https://t.me/share/url?url=${encodeURIComponent(data.challengeUrl)}&text=${encodeURIComponent(data.whatsappText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    const liBtn = document.getElementById('btn-share-linkedin');
    if (liBtn) {
      liBtn.addEventListener('click', () => {
        const data = getChallengeData();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(data.linkedinText).catch(() => {});
        }
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.challengeUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        showShareToast('💼 Post copied! Paste into LinkedIn share window.');
      });
    }

    const copyBtn = document.getElementById('btn-share-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const data = getChallengeData();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(data.challengeUrl).then(() => {
            showShareToast('📋 Challenge link copied to clipboard!');
          }).catch(() => {
            showShareToast(`Link: ${data.challengeUrl}`);
          });
        } else {
          showShareToast(`Link: ${data.challengeUrl}`);
        }
      });
    }

    const nativeBtn = document.getElementById('btn-share-native');
    if (nativeBtn) {
      nativeBtn.addEventListener('click', async () => {
        const data = getChallengeData();
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Beggy Savings Challenge',
              text: data.whatsappText,
              url: data.challengeUrl
            });
          } catch (err) {
            if (err && err.name !== 'AbortError') {
              showShareToast('📋 Challenge link copied!');
            }
          }
        } else {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(data.challengeUrl).then(() => {
              showShareToast('📋 Challenge link copied to clipboard!');
            });
          }
        }
      });
    }

    // Easy-to-Paste Template Tabs
    const rtbTabs = document.querySelectorAll('.rtb-tab');
    rtbTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        rtbTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTemplateTab = tab.getAttribute('data-tab') || 'whatsapp';
        updateSharePreview();
      });
    });

    // Easy-to-Paste Copy Button
    const copyTplBtn = document.getElementById('btn-copy-template');
    if (copyTplBtn) {
      copyTplBtn.addEventListener('click', () => {
        const previewEl = document.getElementById('rtb-preview-text');
        if (!previewEl) return;
        const textToCopy = previewEl.value;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showShareToast('✓ Template copied! Ready to paste!');
          }).catch(() => {
            previewEl.select();
            document.execCommand('copy');
            showShareToast('✓ Template copied!');
          });
        } else {
          previewEl.select();
          document.execCommand('copy');
          showShareToast('✓ Template copied!');
        }
      });
    }
  }

  // ── Theme Manager (Light theme is default) ───────────────────────────────────
  function getPreferredTheme() {
    const saved = localStorage.getItem('beggyTheme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Light theme default
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('beggyTheme', theme);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    const themeBtn = document.getElementById('header-theme-btn');
    if (themeBtn) {
      themeBtn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    }

    updateMapTiles();
  }

  function initTheme() {
    const current = getPreferredTheme();
    applyTheme(current);

    const themeBtn = document.getElementById('header-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const active = document.documentElement.getAttribute('data-theme') || 'light';
        const next = active === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
    }
  }

  // ── Initialization Entry Point ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadUserKeptState();
    initLiveTicker();
    initCitySwitcher();
    initCheckout();
    initPassbookModal();
    initEvents();

    const isDuel = parseUrlDuel();
    renderKitchens();
    updateCartUI();

    if (!isDuel) {
      // Regular home
      const hero = document.getElementById('hero-ticker-section');
      if (hero) hero.style.display = 'block';
    }
  });

})();
