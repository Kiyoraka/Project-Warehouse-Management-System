/* ============================================================
   Sheepy Farm — Mock Data Store
   In-memory state shared across pages (window.SheepyMock)
   Persists within tab session via sessionStorage
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'sheepy_mock_state_v1';

  const seed = {
    // ===== Warehouses (regions) =====
    warehouses: [
      { id: 'wh-kl',  code: 'KL',  name: 'Klang Valley',     region: 'Selangor',     address: 'Jln Industri 5, Shah Alam',  lat: 3.073, lng: 101.518, deliveryRadiusKm: 60, active: true },
      { id: 'wh-pen', code: 'PEN', name: 'Penang',            region: 'Penang',       address: 'Bayan Lepas FTZ, Penang',     lat: 5.297, lng: 100.272, deliveryRadiusKm: 50, active: true },
      { id: 'wh-jb',  code: 'JB',  name: 'Johor Bahru',       region: 'Johor',        address: 'Tmn Industri Pasir Gudang',   lat: 1.471, lng: 103.886, deliveryRadiusKm: 55, active: true },
      { id: 'wh-kch', code: 'KCH', name: 'Kuching (Sarawak)', region: 'Sarawak',      address: 'Pending Industrial Estate',   lat: 1.557, lng: 110.345, deliveryRadiusKm: 45, active: false },
    ],

    // ===== Suppliers (with halal cert) =====
    suppliers: [
      { id: 'sup-1', code: 'ABC',  name: 'ABC Halal Sdn Bhd',         contact: '03-7711-1234', leadTimeDays: 5,  halalCertNo: 'JAKIM-2024-0142', halalCertIssuer: 'JAKIM', halalCertValidUntil: '2027-08-15', halalCertDocUrl: '#' },
      { id: 'sup-2', code: 'NUS',  name: 'Nusantara Frozen Food',     contact: '03-9201-5678', leadTimeDays: 7,  halalCertNo: 'JAKIM-2024-0098', halalCertIssuer: 'JAKIM', halalCertValidUntil: '2026-11-30', halalCertDocUrl: '#' },
      { id: 'sup-3', code: 'OCN',  name: 'Ocean Halal Seafood',       contact: '04-263-9988',  leadTimeDays: 4,  halalCertNo: 'JAKIM-2025-0011', halalCertIssuer: 'JAKIM', halalCertValidUntil: '2026-05-22', halalCertDocUrl: '#' },
      { id: 'sup-4', code: 'GRN',  name: 'Greenleaf Frozen Veg',      contact: '07-3550-2244', leadTimeDays: 6,  halalCertNo: 'JAKIM-2024-0303', halalCertIssuer: 'JAKIM', halalCertValidUntil: '2027-02-10', halalCertDocUrl: '#' },
    ],

    // ===== Products (with variants + per-warehouse stock) =====
    products: [
      {
        id: 'p-001', sku: 'FL-001', name: 'Frozen Lamb Shoulder', slug: 'frozen-lamb-shoulder',
        category: 'Frozen Meat', brand: 'Sheepy Farm Premium',
        countryOfOrigin: 'New Zealand', allergens: [], storageZone: 'Frozen -18°C', shelfLifeDays: 365,
        description: 'Premium grass-fed New Zealand lamb shoulder, vacuum-sealed for cold-chain delivery.',
        image: '🥩',
        supplierId: 'sup-1',
        variants: [
          { id: 'p-001-v1', sku: 'FL-001-1KG', size: '1 kg', wholesalePrice: 35.00, retailPrice: 48.00, costPrice: 24.00, moq: 5,  packSize: 'vacuum sealed' },
          { id: 'p-001-v2', sku: 'FL-001-2KG', size: '2 kg', wholesalePrice: 68.00, retailPrice: 92.00, costPrice: 47.00, moq: 3,  packSize: 'vacuum sealed' },
          { id: 'p-001-v3', sku: 'FL-001-5KG', size: '5 kg', wholesalePrice: 165.00, retailPrice: 220.00, costPrice: 115.00, moq: 1, packSize: 'box' },
        ],
        status: 'active',
      },
      {
        id: 'p-002', sku: 'FB-002', name: 'Frozen Beef Cubes', slug: 'frozen-beef-cubes',
        category: 'Frozen Meat', brand: 'Sheepy Farm Premium',
        countryOfOrigin: 'Australia', allergens: [], storageZone: 'Frozen -18°C', shelfLifeDays: 270,
        description: 'Tender Australian beef cubes, ready for stew or curry.',
        image: '🥩',
        supplierId: 'sup-2',
        variants: [
          { id: 'p-002-v1', sku: 'FB-002-1KG', size: '1 kg', wholesalePrice: 32.00, retailPrice: 44.00, costPrice: 22.00, moq: 5, packSize: 'vacuum sealed' },
          { id: 'p-002-v2', sku: 'FB-002-2KG', size: '2 kg', wholesalePrice: 60.00, retailPrice: 82.00, costPrice: 42.00, moq: 3, packSize: 'vacuum sealed' },
        ],
        status: 'active',
      },
      {
        id: 'p-003', sku: 'FS-003', name: 'Frozen Squid Rings', slug: 'frozen-squid-rings',
        category: 'Frozen Seafood', brand: 'Ocean Halal',
        countryOfOrigin: 'Indonesia', allergens: ['shellfish'], storageZone: 'Deep Frozen -25°C', shelfLifeDays: 180,
        description: 'Cleaned and ringed squid, ready to fry or grill.',
        image: '🦑',
        supplierId: 'sup-3',
        variants: [
          { id: 'p-003-v1', sku: 'FS-003-500G', size: '500 g', wholesalePrice: 18.00, retailPrice: 26.00, costPrice: 12.00, moq: 10, packSize: 'pouch' },
          { id: 'p-003-v2', sku: 'FS-003-1KG',  size: '1 kg',  wholesalePrice: 34.00, retailPrice: 48.00, costPrice: 22.00, moq: 5,  packSize: 'pouch' },
        ],
        status: 'active',
      },
      {
        id: 'p-004', sku: 'FC-004', name: 'Frozen Chicken Whole', slug: 'frozen-chicken-whole',
        category: 'Frozen Poultry', brand: 'Sheepy Farm',
        countryOfOrigin: 'Malaysia', allergens: [], storageZone: 'Frozen -18°C', shelfLifeDays: 240,
        description: 'Halal-slaughtered whole chicken, individually packed.',
        image: '🍗',
        supplierId: 'sup-2',
        variants: [
          { id: 'p-004-v1', sku: 'FC-004-1KG', size: '~1 kg', wholesalePrice: 22.00, retailPrice: 30.00, costPrice: 16.00, moq: 5, packSize: 'individual wrap' },
        ],
        status: 'active',
      },
      {
        id: 'p-005', sku: 'FV-005', name: 'Frozen Mixed Vegetables', slug: 'frozen-mixed-vegetables',
        category: 'Frozen Vegetables', brand: 'Greenleaf',
        countryOfOrigin: 'Malaysia', allergens: [], storageZone: 'Frozen -18°C', shelfLifeDays: 365,
        description: 'Carrot, peas, sweet corn, green beans — restaurant-grade blend.',
        image: '🥦',
        supplierId: 'sup-4',
        variants: [
          { id: 'p-005-v1', sku: 'FV-005-1KG', size: '1 kg', wholesalePrice: 12.00, retailPrice: 18.00, costPrice: 8.00, moq: 10, packSize: 'pouch' },
        ],
        status: 'active',
      },
      {
        id: 'p-006', sku: 'FD-006', name: 'Frozen Dim Sum Assortment', slug: 'frozen-dim-sum',
        category: 'Frozen Ready-to-Eat', brand: 'Sheepy Farm',
        countryOfOrigin: 'Malaysia', allergens: ['gluten', 'shellfish'], storageZone: 'Frozen -18°C', shelfLifeDays: 180,
        description: 'Halal dim sum mix — siew mai, har gow style, char siew bao.',
        image: '🥟',
        supplierId: 'sup-1',
        variants: [
          { id: 'p-006-v1', sku: 'FD-006-30P', size: '30 pieces', wholesalePrice: 28.00, retailPrice: 40.00, costPrice: 18.00, moq: 5, packSize: 'tray' },
        ],
        status: 'active',
      },
    ],

    // ===== Per-warehouse stock (variantId × warehouseId) =====
    stock: [
      { variantId: 'p-001-v1', warehouseId: 'wh-kl',  available: 120, reserved: 8,  reorderThreshold: 30 },
      { variantId: 'p-001-v2', warehouseId: 'wh-kl',  available: 85,  reserved: 5,  reorderThreshold: 20 },
      { variantId: 'p-001-v3', warehouseId: 'wh-kl',  available: 45,  reserved: 2,  reorderThreshold: 10 },
      { variantId: 'p-001-v1', warehouseId: 'wh-pen', available: 60,  reserved: 3,  reorderThreshold: 30 },
      { variantId: 'p-001-v1', warehouseId: 'wh-jb',  available: 18,  reserved: 0,  reorderThreshold: 30 }, // low!
      { variantId: 'p-002-v1', warehouseId: 'wh-kl',  available: 95,  reserved: 6,  reorderThreshold: 25 },
      { variantId: 'p-002-v2', warehouseId: 'wh-kl',  available: 55,  reserved: 4,  reorderThreshold: 15 },
      { variantId: 'p-002-v1', warehouseId: 'wh-pen', available: 40,  reserved: 1,  reorderThreshold: 25 },
      { variantId: 'p-003-v1', warehouseId: 'wh-kl',  available: 22,  reserved: 0,  reorderThreshold: 30 }, // low!
      { variantId: 'p-003-v2', warehouseId: 'wh-kl',  available: 38,  reserved: 2,  reorderThreshold: 15 },
      { variantId: 'p-004-v1', warehouseId: 'wh-kl',  available: 200, reserved: 12, reorderThreshold: 40 },
      { variantId: 'p-004-v1', warehouseId: 'wh-pen', available: 110, reserved: 5,  reorderThreshold: 40 },
      { variantId: 'p-004-v1', warehouseId: 'wh-jb',  available: 75,  reserved: 3,  reorderThreshold: 40 },
      { variantId: 'p-005-v1', warehouseId: 'wh-kl',  available: 240, reserved: 14, reorderThreshold: 50 },
      { variantId: 'p-005-v1', warehouseId: 'wh-pen', available: 90,  reserved: 4,  reorderThreshold: 50 },
      { variantId: 'p-006-v1', warehouseId: 'wh-kl',  available: 65,  reserved: 5,  reorderThreshold: 20 },
      { variantId: 'p-006-v1', warehouseId: 'wh-jb',  available: 30,  reserved: 1,  reorderThreshold: 20 },
    ],

    // ===== Batches (FEFO foundation) =====
    batches: [
      { id: 'b-001', variantId: 'p-001-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0421', manufacturedDate: '2026-04-21', expiryDate: '2027-04-21', qtyReceived: 50, qtyRemaining: 38, supplierId: 'sup-1', receivedAt: '2026-04-22' },
      { id: 'b-002', variantId: 'p-001-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0428', manufacturedDate: '2026-04-28', expiryDate: '2027-04-28', qtyReceived: 100, qtyRemaining: 82, supplierId: 'sup-1', receivedAt: '2026-04-29' },
      { id: 'b-003', variantId: 'p-001-v2', warehouseId: 'wh-kl',  batchNo: 'B-2026-0428', manufacturedDate: '2026-04-28', expiryDate: '2027-04-28', qtyReceived: 100, qtyRemaining: 85, supplierId: 'sup-1', receivedAt: '2026-04-29' },
      { id: 'b-004', variantId: 'p-002-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0405', manufacturedDate: '2026-04-05', expiryDate: '2027-01-05', qtyReceived: 80, qtyRemaining: 30, supplierId: 'sup-2', receivedAt: '2026-04-06' }, // older — FEFO priority
      { id: 'b-005', variantId: 'p-002-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0425', manufacturedDate: '2026-04-25', expiryDate: '2027-01-25', qtyReceived: 80, qtyRemaining: 65, supplierId: 'sup-2', receivedAt: '2026-04-26' },
      { id: 'b-006', variantId: 'p-003-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0418', manufacturedDate: '2026-04-18', expiryDate: '2026-10-18', qtyReceived: 30, qtyRemaining: 22, supplierId: 'sup-3', receivedAt: '2026-04-19' }, // expiring soon!
      { id: 'b-007', variantId: 'p-004-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0501', manufacturedDate: '2026-05-01', expiryDate: '2026-12-26', qtyReceived: 200, qtyRemaining: 200, supplierId: 'sup-2', receivedAt: '2026-05-02' },
      { id: 'b-008', variantId: 'p-005-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0420', manufacturedDate: '2026-04-20', expiryDate: '2027-04-20', qtyReceived: 250, qtyRemaining: 240, supplierId: 'sup-4', receivedAt: '2026-04-21' },
      { id: 'b-009', variantId: 'p-006-v1', warehouseId: 'wh-kl',  batchNo: 'B-2026-0427', manufacturedDate: '2026-04-27', expiryDate: '2026-10-27', qtyReceived: 70, qtyRemaining: 65, supplierId: 'sup-1', receivedAt: '2026-04-28' },
    ],

    // ===== Wholesalers (B2B accounts) =====
    wholesalers: [
      { id: 'ws-001', userEmail: 'matfrozen@example.com',     businessName: 'Mat Frozen Mart',         ssmNo: '202301-001234', contact: '012-345-6789', address: '12 Jalan Bangsar, KL', assignedWarehouseId: 'wh-kl',  status: 'active',  createdAt: '2026-01-15' },
      { id: 'ws-002', userEmail: 'kedairunci@example.com',    businessName: 'Kedai Runcit Hjh Aminah',  ssmNo: '202301-005678', contact: '019-555-2210', address: '8 Jalan Damansara, KL', assignedWarehouseId: 'wh-kl',  status: 'active',  createdAt: '2026-02-03' },
      { id: 'ws-003', userEmail: 'sambalsedap@example.com',   businessName: 'Sambal Sedap Resto',      ssmNo: '202302-009988', contact: '011-220-3344', address: '24 Lebuh Chulia, Penang', assignedWarehouseId: 'wh-pen', status: 'active',  createdAt: '2026-02-20' },
      { id: 'ws-004', userEmail: 'azamcatering@example.com',  businessName: 'Azam Catering Sdn Bhd',   ssmNo: '202303-112233', contact: '012-988-7766', address: '101 Jalan Tun Razak, JB', assignedWarehouseId: 'wh-jb',  status: 'active',  createdAt: '2026-03-08' },
      { id: 'ws-005', userEmail: 'pasarmurah@example.com',    businessName: 'Pasar Murah Online',      ssmNo: '202304-445566', contact: '013-777-1212', address: '15 Jln SS2/24, KL', assignedWarehouseId: 'wh-kl',  status: 'pending', createdAt: '2026-04-25' },
    ],

    // Currently logged-in wholesaler (demo only)
    currentWholesalerId: 'ws-001',

    // ===== Orders =====
    orders: [
      { id: 'ord-001', code: 'SF-2026-0501-001', wholesalerId: 'ws-001', warehouseId: 'wh-kl', status: 'delivered',       fulfillmentMethod: 'delivery', total: 425.00, paymentStatus: 'paid', placedAt: '2026-05-01 09:14', deliveredAt: '2026-05-02 14:20',
        items: [
          { variantId: 'p-001-v1', name: 'Frozen Lamb Shoulder 1kg', qty: 8, unitPrice: 35.00, total: 280.00 },
          { variantId: 'p-002-v1', name: 'Frozen Beef Cubes 1kg',    qty: 5, unitPrice: 32.00, total: 160.00 },
        ],
        timeline: [
          { stage: 'Placed',          ts: '2026-05-01 09:14' },
          { stage: 'Picked',          ts: '2026-05-01 13:22' },
          { stage: 'Out for Delivery',ts: '2026-05-02 09:00' },
          { stage: 'Delivered',       ts: '2026-05-02 14:20' },
        ]
      },
      { id: 'ord-002', code: 'SF-2026-0503-002', wholesalerId: 'ws-001', warehouseId: 'wh-kl', status: 'out_for_delivery', fulfillmentMethod: 'delivery', total: 198.00, paymentStatus: 'paid', placedAt: '2026-05-03 16:40',
        items: [
          { variantId: 'p-003-v1', name: 'Frozen Squid Rings 500g', qty: 11, unitPrice: 18.00, total: 198.00 },
        ],
        timeline: [
          { stage: 'Placed',          ts: '2026-05-03 16:40' },
          { stage: 'Picked',          ts: '2026-05-04 09:11' },
          { stage: 'Out for Delivery',ts: '2026-05-05 08:30' },
        ]
      },
      { id: 'ord-003', code: 'SF-2026-0505-003', wholesalerId: 'ws-002', warehouseId: 'wh-kl', status: 'picking',          fulfillmentMethod: 'pickup',   total: 132.00, paymentStatus: 'paid', placedAt: '2026-05-05 09:22',
        items: [
          { variantId: 'p-004-v1', name: 'Frozen Chicken Whole 1kg', qty: 6, unitPrice: 22.00, total: 132.00 },
        ],
        timeline: [
          { stage: 'Placed', ts: '2026-05-05 09:22' },
        ]
      },
      { id: 'ord-004', code: 'SF-2026-0505-004', wholesalerId: 'ws-001', warehouseId: 'wh-kl', status: 'new',              fulfillmentMethod: 'delivery', total: 350.00, paymentStatus: 'paid', placedAt: '2026-05-05 10:08',
        items: [
          { variantId: 'p-001-v2', name: 'Frozen Lamb Shoulder 2kg', qty: 5, unitPrice: 68.00, total: 340.00 },
          { variantId: 'p-005-v1', name: 'Frozen Mixed Vegetables 1kg', qty: 1, unitPrice: 12.00, total: 12.00 },
        ],
        timeline: [
          { stage: 'Placed', ts: '2026-05-05 10:08' },
        ]
      },
    ],

    // ===== Custom quote requests =====
    quotes: [
      {
        id: 'q-001', code: 'Q-2026-0505-001', wholesalerId: 'ws-001', warehouseId: 'wh-kl',
        status: 'pending',
        notes: 'Need for upcoming kenduri event end of May.',
        items: [
          { description: 'Frozen lamb shoulder, custom 8 kg cut for whole-roast', requestedQty: 8, requestedUnit: 'kg' },
        ],
        submittedAt: '2026-05-05 09:30',
        response: null,
      },
      {
        id: 'q-002', code: 'Q-2026-0504-001', wholesalerId: 'ws-002', warehouseId: 'wh-kl',
        status: 'quoted',
        notes: 'Restaurant supply.',
        items: [
          { description: 'Frozen beef cubes 12 kg total, mix of 1kg and 2kg packs', requestedQty: 12, requestedUnit: 'kg' },
        ],
        submittedAt: '2026-05-04 14:15',
        response: {
          fulfillmentDetails: 'Combined 10x 1kg packs + 1x 2kg pack from Batch B-2026-0425. Vacuum-sealed, ready for delivery within 24h.',
          quotedTotal: 386.00,
          validUntil: '2026-05-12',
          respondedBy: 'Manager Aiman',
          respondedAt: '2026-05-04 16:42',
        }
      },
      {
        id: 'q-003', code: 'Q-2026-0428-002', wholesalerId: 'ws-003', warehouseId: 'wh-pen',
        status: 'accepted',
        notes: '',
        items: [
          { description: 'Mixed seafood platter — squid + prawns + fish', requestedQty: 15, requestedUnit: 'kg' },
        ],
        submittedAt: '2026-04-28 11:00',
        response: {
          fulfillmentDetails: '8kg squid rings + 5kg whole prawns + 2kg dory fillet. Triple-pouch vacuum.',
          quotedTotal: 612.00,
          validUntil: '2026-05-05',
          respondedBy: 'Manager Roslan',
          respondedAt: '2026-04-28 15:30',
        }
      },
    ],

    // ===== Drivers (was "riders") — mobile-only role =====
    drivers: [
      { id: 'd-001', name: 'Encik Faizal',  warehouseId: 'wh-kl',  status: 'active',  activeOrderId: 'ord-002' },
      { id: 'd-002', name: 'Encik Hafiz',   warehouseId: 'wh-kl',  status: 'idle',    activeOrderId: null },
      { id: 'd-003', name: 'Encik Razak',   warehouseId: 'wh-kl',  status: 'active',  activeOrderId: 'ord-001' },
      { id: 'd-004', name: 'Encik Rahman',  warehouseId: 'wh-pen', status: 'idle',    activeOrderId: null },
    ],

    // ===== Packing staff — mobile-only role =====
    packingStaff: [
      { id: 'pk-001', name: 'Cik Liyana',  warehouseId: 'wh-kl',  status: 'packing',  activeOrderId: 'ord-003' },
      { id: 'pk-002', name: 'Encik Aiman', warehouseId: 'wh-kl',  status: 'idle',     activeOrderId: null },
      { id: 'pk-003', name: 'Cik Aishah',  warehouseId: 'wh-kl',  status: 'packing',  activeOrderId: 'ord-004' },
      { id: 'pk-004', name: 'Encik Yusof', warehouseId: 'wh-pen', status: 'idle',     activeOrderId: null },
    ],

    // ===== Admin staff (RBAC) =====
    adminStaff: [
      { id: 'a-001', name: 'Tuan Adlin (Super Admin)', email: 'adlin@sheepyfarm.my', role: 'super_admin',  permissions: ['products', 'stock', 'analysis', 'reports', 'warehouses', 'wholesalers', 'staff', 'settings'] },
      { id: 'a-002', name: 'Cik Sarah',                email: 'sarah@sheepyfarm.my', role: 'product_manager', permissions: ['products', 'stock', 'reports'] },
      { id: 'a-003', name: 'Encik Daniel',             email: 'daniel@sheepyfarm.my', role: 'analyst',         permissions: ['analysis', 'reports'] },
      { id: 'a-004', name: 'Cik Iman',                 email: 'iman@sheepyfarm.my', role: 'sales',           permissions: ['wholesalers', 'reports'] },
    ],

    // ===== Settings =====
    settings: {
      site: {
        brandName: 'Sheepy Farm',
        tagline: 'Frozen. Halal. Delivered.',
        contactEmail: 'hello@sheepyfarm.my',
        contactPhone: '03-7711-9988',
        address: 'Lot 5, Industrial Park, Shah Alam, Selangor',
      },
      halal: {
        certNo: 'JAKIM-MS1500/2024-0142',
        certIssuer: 'JAKIM (Department of Islamic Development Malaysia)',
        certValidUntil: '2027-12-31',
        certDocUrl: '#',
      },
      payment: {
        toyyibpay: { enabled: true,  mode: 'live', secretKey: '••••••••••••••••', categoryCode: 'sf-2026' },
        chipin:    { enabled: true,  mode: 'live', secretKey: '••••••••••••••••', brandId: 'sheepy-farm' },
      },
      notifications: {
        emailFromName: 'Sheepy Farm',
        emailFromAddress: 'noreply@sheepyfarm.my',
        whatsappEnabled: false,
      }
    },

    // ===== Cart (wholesaler session) =====
    cart: [
      { variantId: 'p-001-v1', name: 'Frozen Lamb Shoulder 1kg',     qty: 8,  unitPrice: 35.00 },
      { variantId: 'p-005-v1', name: 'Frozen Mixed Vegetables 1kg',  qty: 12, unitPrice: 12.00 },
      { variantId: 'p-006-v1', name: 'Frozen Dim Sum Assortment 30p', qty: 5, unitPrice: 28.00 },
    ],

    // ===== Currently logged-in role (demo) =====
    currentRole: 'admin',  // 'admin' | 'warehouse' | 'wholesaler' | 'rider'
    currentUserName: 'Tuan Adlin',
  };

  // ============================================================
  //  Load / save  (sessionStorage persistence)
  // ============================================================
  function load() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(seed));
  }

  function save(state) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  // ============================================================
  //  Helpers
  // ============================================================
  function formatRM(amount) {
    return 'RM ' + Number(amount).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getProduct(id)        { return state.products.find(p => p.id === id); }
  function getVariant(id) {
    for (const p of state.products) {
      const v = p.variants.find(x => x.id === id);
      if (v) return Object.assign({}, v, { product: p });
    }
    return null;
  }
  function getWarehouse(id)      { return state.warehouses.find(w => w.id === id); }
  function getWholesaler(id)     { return state.wholesalers.find(w => w.id === id); }
  function getSupplier(id)       { return state.suppliers.find(s => s.id === id); }
  function getCurrentWholesaler(){ return getWholesaler(state.currentWholesalerId); }
  function getStockFor(variantId, warehouseId) {
    return state.stock.find(s => s.variantId === variantId && s.warehouseId === warehouseId);
  }
  function getBatchesFor(variantId, warehouseId) {
    return state.batches
      .filter(b => b.variantId === variantId && b.warehouseId === warehouseId && b.qtyRemaining > 0)
      .sort((a, b) => a.expiryDate.localeCompare(b.expiryDate)); // FEFO ordering
  }
  function ordersForWarehouse(warehouseId) {
    return state.orders.filter(o => o.warehouseId === warehouseId);
  }
  function quotesForWarehouse(warehouseId) {
    return state.quotes.filter(q => q.warehouseId === warehouseId);
  }
  function ordersForWholesaler(wholesalerId) {
    return state.orders.filter(o => o.wholesalerId === wholesalerId);
  }
  function quotesForWholesaler(wholesalerId) {
    return state.quotes.filter(q => q.wholesalerId === wholesalerId);
  }
  function totalStockForVariant(variantId) {
    return state.stock.filter(s => s.variantId === variantId).reduce((sum, s) => sum + s.available, 0);
  }
  function expiringBatches(daysAhead = 60) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + daysAhead);
    return state.batches
      .filter(b => b.qtyRemaining > 0 && new Date(b.expiryDate) <= cutoff)
      .sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));
  }
  function lowStockItems() {
    return state.stock.filter(s => s.available <= s.reorderThreshold);
  }
  function cartTotal() {
    return state.cart.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
  }

  // ============================================================
  //  Public API
  // ============================================================
  let state = load();

  // Backward-compat: legacy pages referenced state.riders — alias to drivers
  // Use a getter on the loaded state object after JSON revival
  Object.defineProperty(state, 'riders', { get() { return state.drivers; }, configurable: true });

  window.SheepyMock = {
    state,
    save: () => save(state),
    reset: () => { state = JSON.parse(JSON.stringify(seed)); save(state); window.SheepyMock.state = state; },
    formatRM,
    getProduct, getVariant, getWarehouse, getWholesaler, getSupplier,
    getCurrentWholesaler,
    getStockFor, getBatchesFor,
    ordersForWarehouse, quotesForWarehouse,
    ordersForWholesaler, quotesForWholesaler,
    totalStockForVariant, expiringBatches, lowStockItems,
    cartTotal,
    setRole: (role, userName) => {
      state.currentRole = role;
      if (userName) state.currentUserName = userName;
      save(state);
    },
  };

})();
