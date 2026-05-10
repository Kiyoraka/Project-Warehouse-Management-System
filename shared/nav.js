/* ============================================================
   Sheepy Farm — Shared Navigation Partials
   Inject sidebar (desktop) + bottom nav (mobile) + topbar
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  //  Nav definitions per dashboard
  // ============================================================
  const SIDEBARS = {
    admin: {
      brand: { name: 'Sheepy Farm', sub: 'Admin HQ', logo: 'S' },
      items: [
        { icon: '⌂',  label: 'Dashboard',   href: 'dashboard.html', key: 'dashboard' },
        { icon: '▦',  label: 'Products',    href: 'products.html',  key: 'products'  },
        { icon: '▣',  label: 'Stock',       href: 'stock.html',     key: 'stock'     },
        { icon: '📊', label: 'Analysis',    href: 'analysis.html',  key: 'analysis'  },
        { icon: '📑', label: 'Reports',     href: 'reports.html',   key: 'reports'   },
        { icon: '🏭', label: 'Warehouses',  href: 'warehouses.html', key: 'warehouses' },
        { icon: '👥', label: 'Wholesalers', href: 'wholesalers.html', key: 'wholesalers' },
        { icon: '🛡️', label: 'Staff & RBAC', href: 'staff.html',    key: 'staff'     },
        { icon: '⚙️', label: 'Settings',    href: 'settings.html',  key: 'settings'  },
      ],
    },
    warehouse: {
      brand: { name: 'Sheepy Farm', sub: 'Warehouse · KL', logo: 'W' },
      items: [
        { icon: '⌂',  label: 'Home',         href: 'home.html',          key: 'home' },
        { icon: '📦', label: 'Stock In',     href: 'stock-receive.html', key: 'stock-receive' },
        { icon: '📋', label: 'Orders',       href: 'orders.html',        key: 'orders' },
        { icon: '💬', label: 'Quotes',       href: 'quotes.html',        key: 'quotes' },
        { icon: '👥', label: 'Staff Status', href: 'staff.html',         key: 'staff' },
      ],
    },
    wholesaler: {
      brand: { name: 'Sheepy Farm', sub: 'Wholesaler', logo: 'B' },
      items: [
        { icon: '🛒', label: 'Catalog',         href: 'catalog.html',       key: 'catalog' },
        { icon: '🧺', label: 'Cart',            href: 'cart.html',          key: 'cart',  badge: 'cart' },
        { icon: '📋', label: 'My Orders',       href: 'orders.html',        key: 'orders' },
        { icon: '💬', label: 'Custom Quotes',   href: 'quote-request.html', key: 'quotes' },
        { icon: '📑', label: 'Invoices',        href: 'invoice.html',       key: 'invoice' },
        { icon: '👤', label: 'Profile',         href: '#',                  key: 'profile' },
      ],
    },
    // Packing + Driver are mobile-only → no sidebar, only bottom-nav
    packing: null,
    driver:  null,
  };

  const BOTTOM_NAVS = {
    admin: null, // admin is desktop-only
    warehouse: [
      { icon: '⌂',  label: 'Home',     href: 'home.html',          key: 'home' },
      { icon: '📋', label: 'Orders',   href: 'orders.html',        key: 'orders' },
      { icon: '💬', label: 'Quotes',   href: 'quotes.html',        key: 'quotes' },
      { icon: '👥', label: 'Staff',    href: 'staff.html',         key: 'staff' },
      { icon: '☰',  label: 'More',     href: '#',                  key: 'more' },
    ],
    wholesaler: [
      { icon: '🛒', label: 'Shop',     href: 'catalog.html',       key: 'catalog' },
      { icon: '🧺', label: 'Cart',     href: 'cart.html',          key: 'cart',  badge: 'cart' },
      { icon: '📋', label: 'Orders',   href: 'orders.html',        key: 'orders' },
      { icon: '💬', label: 'Quotes',   href: 'quote-request.html', key: 'quotes' },
      { icon: '👤', label: 'Me',       href: '#',                  key: 'profile' },
    ],
    packing: [
      { icon: '📋', label: 'Queue',     href: 'queue.html',  key: 'queue' },
      { icon: '▶️', label: 'Active',   href: 'active.html', key: 'active' },
      { icon: '✓',  label: 'Done',      href: 'done.html',   key: 'done' },
      { icon: '👤', label: 'Me',        href: 'me.html',     key: 'me' },
    ],
    driver: [
      { icon: '🗺️', label: 'Routes',   href: 'routes.html', key: 'routes' },
      { icon: '▶️', label: 'Active',   href: 'active.html', key: 'active' },
      { icon: '✓',  label: 'Done',      href: 'done.html',   key: 'done' },
      { icon: '👤', label: 'Me',        href: 'me.html',     key: 'me' },
    ],
  };

  // ============================================================
  //  Render functions
  // ============================================================
  function renderSidebar(role, activeKey) {
    const cfg = SIDEBARS[role];
    if (!cfg) return '';

    const userName = (window.SheepyMock && window.SheepyMock.state && window.SheepyMock.state.currentUserName) || 'User';
    const cartCount = (window.SheepyMock && window.SheepyMock.state.cart || []).reduce((s, i) => s + i.qty, 0);

    const items = cfg.items.map(it => {
      const active = it.key === activeKey ? ' active' : '';
      const badge = it.badge === 'cart' && cartCount > 0
        ? `<span class="badge" style="margin-left:auto">${cartCount}</span>`
        : '';
      return `
        <a href="${it.href}" class="sidebar-item${active}">
          <span class="icon">${it.icon}</span>
          <span class="label">${it.label}</span>
          ${badge}
        </a>`;
    }).join('');

    return `
      <aside class="sidebar app-sidebar">
        <div class="sidebar-brand">
          <div class="logo">${cfg.brand.logo}</div>
          <div>
            <div class="name">${cfg.brand.name}</div>
            <div class="sub">${cfg.brand.sub}</div>
          </div>
        </div>
        <nav class="sidebar-nav">
          ${items}
        </nav>
        <div class="sidebar-divider"></div>
        <div class="sidebar-user">
          <div class="avatar">${userName.charAt(0)}</div>
          <div class="info">
            <div class="name">${userName}</div>
            <div class="role">${role.charAt(0).toUpperCase() + role.slice(1)}</div>
          </div>
          <a href="../login.html" title="Logout" style="color:var(--gray-500); padding:6px;">🚪</a>
        </div>
      </aside>`;
  }

  function renderTopbar(opts = {}) {
    const title = opts.title || '';
    const showSearch = opts.showSearch !== false;
    return `
      <header class="topbar app-topbar glass-nav">
        ${title ? `<div class="fw-semibold">${title}</div>` : ''}
        ${showSearch ? `
          <div class="topbar-search">
            <span>🔍</span>
            <input type="text" placeholder="Search..." />
          </div>` : ''}
        <div class="topbar-spacer"></div>
        <div class="topbar-actions">
          <button class="topbar-action" title="Notifications">🔔</button>
          <button class="topbar-action" title="Help">？</button>
        </div>
      </header>`;
  }

  function renderBottomNav(role, activeKey) {
    const items = BOTTOM_NAVS[role];
    if (!items) return '';
    const cartCount = (window.SheepyMock && window.SheepyMock.state.cart || []).reduce((s, i) => s + i.qty, 0);

    const html = items.map(it => {
      const active = it.key === activeKey ? ' active' : '';
      const badge = it.badge === 'cart' && cartCount > 0
        ? `<span class="badge" style="position:absolute;top:0;right:8px">${cartCount}</span>`
        : '';
      return `
        <a href="${it.href}" class="bottom-nav-item${active}" style="position:relative">
          ${badge}
          <span class="icon">${it.icon}</span>
          <span>${it.label}</span>
        </a>`;
    }).join('');
    return `<nav class="bottom-nav">${html}</nav>`;
  }

  // ============================================================
  //  Mount helper — call from each page
  // ============================================================
  function mountShell(opts) {
    const { role, activeKey, title, showSearch, content } = opts;
    document.body.classList.add('app-shell');
    document.body.innerHTML =
      renderSidebar(role, activeKey) +
      renderTopbar({ title, showSearch }) +
      `<main class="app-content">${content || ''}</main>` +
      renderBottomNav(role, activeKey);
  }

  // Insert nav into existing pages where the body has a content container
  function insertNav(role, activeKey, opts = {}) {
    const sidebarHost = document.querySelector('[data-slot="sidebar"]');
    const topbarHost  = document.querySelector('[data-slot="topbar"]');
    const bottomHost  = document.querySelector('[data-slot="bottom-nav"]');
    if (sidebarHost) sidebarHost.outerHTML = renderSidebar(role, activeKey);
    if (topbarHost)  topbarHost.outerHTML  = renderTopbar(opts);
    if (bottomHost)  bottomHost.outerHTML  = renderBottomNav(role, activeKey);
  }

  // ============================================================
  //  Modal helpers
  // ============================================================
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  }
  // close modal on backdrop click
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(el => el.classList.remove('open'));
    }
  });

  // ============================================================
  //  Public API
  // ============================================================
  window.SheepyNav = {
    renderSidebar,
    renderTopbar,
    renderBottomNav,
    mountShell,
    insertNav,
    openModal,
    closeModal,
    SIDEBARS,
    BOTTOM_NAVS,
  };

})();
