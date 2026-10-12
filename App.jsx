import React, { useState, useEffect } from 'react';

// Inject Tailwind CSS via CDN and custom skeuomorphic keyframes / styles into <head>
if (typeof document !== 'undefined' && !document.getElementById('tau-tailwind-cdn')) {
  const tailwindScript = document.createElement('script');
  tailwindScript.id = 'tau-tailwind-cdn';
  tailwindScript.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(tailwindScript);

  const customStyle = document.createElement('style');
  customStyle.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Share+Tech+Mono&display=swap');

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #0d1e16;
      background-image: 
        radial-gradient(circle at 50% 0%, #1c3d2c 0%, #08120d 100%),
        repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px);
      background-size: 100% 100%, 100% 4px;
      color: #e2ece7;
    }

    .font-brand {
      font-family: 'Cinzel', serif;
    }

    .font-mono-tech {
      font-family: 'Share Tech Mono', monospace;
    }

    /* Skeuomorphic Glass & Metallic Panels */
    .skeuo-panel {
      background: linear-gradient(145deg, #1b3829, #102419);
      box-shadow: 
        8px 8px 18px #08120c,
        -6px -6px 14px #224835,
        inset 1px 1px 1px rgba(255, 255, 255, 0.25),
        inset -1px -1px 2px rgba(0, 0, 0, 0.8);
      border: 1px solid #2a553e;
    }

    .skeuo-glass {
      background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 8px 20px rgba(0,0,0,0.4);
    }

    .skeuo-card {
      background: linear-gradient(165deg, #1a3627, #0e1e16);
      border-radius: 18px;
      box-shadow: 
        10px 10px 20px #070d09,
        -6px -6px 15px #1c3e2d,
        inset 0 1px 1px rgba(255,255,255,0.2);
      border: 1px solid #2d5a42;
    }

    /* Tactile 3D Gold & Emerald Buttons */
    .btn-gold {
      background: linear-gradient(180deg, #fcd34d 0%, #d97706 80%, #b45309 100%);
      color: #1a0f00;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
      box-shadow: 
        0 4px 0 #78350f,
        0 6px 10px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
      border: 1px solid #f59e0b;
      transition: all 0.08s ease-in-out;
    }

    .btn-gold:hover {
      background: linear-gradient(180deg, #fef08a 0%, #eab308 80%, #b45309 100%);
    }

    .btn-gold:active {
      transform: translateY(3px);
      box-shadow: 
        0 1px 0 #78350f,
        0 2px 4px rgba(0, 0, 0, 0.4),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    .btn-emerald {
      background: linear-gradient(180deg, #34d399 0%, #059669 80%, #047857 100%);
      color: #ffffff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);
      box-shadow: 
        0 4px 0 #064e3b,
        0 6px 10px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
      border: 1px solid #10b981;
      transition: all 0.08s ease-in-out;
    }

    .btn-emerald:hover {
      background: linear-gradient(180deg, #6ee7b7 0%, #10b981 80%, #047857 100%);
    }

    .btn-emerald:active {
      transform: translateY(3px);
      box-shadow: 
        0 1px 0 #064e3b,
        0 2px 4px rgba(0, 0, 0, 0.4),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    /* Skeuomorphic Inset Input Fields */
    .skeuo-input {
      background: #09150f;
      color: #34d399;
      box-shadow: 
        inset 3px 3px 6px #040906,
        inset -2px -2px 4px #142a1f,
        0 1px 0 rgba(255, 255, 255, 0.1);
      border: 1px solid #1a3828;
    }

    .skeuo-input:focus {
      outline: none;
      border-color: #34d399;
      box-shadow: 
        inset 3px 3px 6px #040906,
        inset -2px -2px 4px #142a1f,
        0 0 10px rgba(52, 211, 153, 0.3);
    }

    /* Skeuomorphic Badge */
    .badge-brass {
      background: linear-gradient(135deg, #f59e0b, #78350f);
      box-shadow: inset 0 1px 1px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.5);
      border: 1px solid #fbbf24;
      color: #fff;
    }

    .embossed-text {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 -1px 0 rgba(255, 255, 255, 0.2);
    }

    /* Receipt Paper Texture */
    .receipt-paper {
      background: #fbf8eb;
      background-image: radial-gradient(#e5deca 10%, transparent 11%);
      background-size: 10px 10px;
      color: #2b2b2b;
      box-shadow: 
        0 10px 25px rgba(0,0,0,0.6),
        inset 0 0 40px rgba(0,0,0,0.05);
      border: 1px solid #d4ceb8;
    }
  `;
  document.head.appendChild(customStyle);
}

const INITIAL_PRODUCTS = [
  { id: 1, name: 'TAU Agricultural Tech Smart Watch', price: 2850, category: 'Electronics', stock: 18, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: 2, name: 'TAU College Leather Jacket', price: 1450, category: 'Clothing', stock: 12, image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400' },
  { id: 3, name: 'High-Precision Scientific Calculator', price: 890, category: 'School Supplies', stock: 35, image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400' },
  { id: 4, name: 'Embossed Brass TAU Crest Keychain', price: 220, category: 'Accessories', stock: 50, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400' },
  { id: 5, name: 'Heavy-Duty Waterproof Canvas Backpack', price: 1120, category: 'School Supplies', stock: 22, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
  { id: 6, name: 'Noise-Canceling Studio Earbuds', price: 1650, category: 'Electronics', stock: 14, image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400' },
];

const INITIAL_ORDERS = [
  { id: 'ORD-TAU-2026-881', product: 'TAU College Leather Jacket', total: 1450, status: 'Completed', date: '2026-10-10' },
  { id: 'ORD-TAU-2026-882', product: 'High-Precision Scientific Calculator (x2)', total: 1780, status: 'Processing', date: '2026-10-12' }
];

const DEMO_USERS = {
  'user@example.com': { name: 'Giovanni Ting', email: 'user@example.com', role: 'customer', idNumber: '2026101890', department: 'College of Engineering and Technology' },
  'seller@example.com': { name: 'William Clair Bailen', email: 'seller@example.com', role: 'seller', idNumber: 'TAU-STAFF-002', store: 'TAU Agri-Engineering Cooperative Store' },
};

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tau_skeuo_user');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    // Always use the current demo profile so stale saved data never shows old names/IDs
    return DEMO_USERS[parsed.email] ? { ...DEMO_USERS[parsed.email] } : parsed;
  });

  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tau_skeuo_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tau_skeuo_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tau_skeuo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tau_skeuo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tau_skeuo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tau_skeuo_user');
    }
  }, [user]);

  const handleLogin = (email, password) => {
    if (email === 'user@example.com' && password === 'user123') {
      setUser({ ...DEMO_USERS['user@example.com'] });
      setActiveTab('home');
      return true;
    } else if (email === 'seller@example.com' && password === 'seller123') {
      setUser({ ...DEMO_USERS['seller@example.com'] });
      setActiveTab('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('login');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Skeuomorphic Header */}
      <header className="skeuo-panel sticky top-0 z-50 px-4 py-3 border-b-2 border-emerald-900/60 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(user.role === 'customer' ? 'home' : 'dashboard')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md flex items-center justify-center border border-amber-300 overflow-hidden">
              <img src="/images/logo.png" alt="TAU Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div className="hidden w-full h-full bg-emerald-950 rounded-full items-center justify-center font-brand font-bold text-amber-400 text-xs">TAU</div>
            </div>
            <div>
              <h1 className="font-brand text-lg sm:text-xl font-bold tracking-wider text-amber-300 embossed-text">
                TARLAC AGRICULTURAL UNIVERSITY
              </h1>
              <p className="text-[10px] font-mono-tech tracking-widest text-emerald-400 uppercase -mt-1">
                Official Tactile E-Marketplace
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-2">
            {user.role === 'customer' ? (
              <>
                <NavButton label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
                <NavButton label="Products" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
                <NavButton label="Categories" active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} />
                <NavButton label={`Cart (${cart.reduce((a, b) => a + b.quantity, 0)})`} active={activeTab === 'cart'} onClick={() => setActiveTab('cart')} badge={cart.length > 0} />
                <NavButton label={`Wishlist (${wishlist.length})`} active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
                <NavButton label="My Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                <NavButton label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
              </>
            ) : (
              <>
                <NavButton label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                <NavButton label="Manage Store" active={activeTab === 'manage-products'} onClick={() => setActiveTab('manage-products')} />
                <NavButton label="+ Add Product" active={activeTab === 'add-product'} onClick={() => setActiveTab('add-product')} />
                <NavButton label="Orders Queue" active={activeTab === 'seller-orders'} onClick={() => setActiveTab('seller-orders')} />
                <NavButton label="Seller Profile" active={activeTab === 'seller-profile'} onClick={() => setActiveTab('seller-profile')} />
              </>
            )}

            <button 
              onClick={handleLogout} 
              className="ml-3 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-900 to-red-700 text-red-100 text-xs font-bold border border-red-500/40 shadow-inner hover:from-red-800 hover:to-red-600 transition active:translate-y-0.5"
            >
              LOGOUT
            </button>
          </nav>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="px-3 py-1.5 rounded-lg btn-emerald text-xs font-bold">
              {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-emerald-950 rounded-xl border border-emerald-700/60 space-y-2 shadow-2xl">
            {user.role === 'customer' ? (
              <>
                <MobileNavItem label="Home" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Products" onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Categories" onClick={() => { setActiveTab('categories'); setMobileMenuOpen(false); }} />
                <MobileNavItem label={`Cart (${cart.length})`} onClick={() => { setActiveTab('cart'); setMobileMenuOpen(false); }} />
                <MobileNavItem label={`Wishlist (${wishlist.length})`} onClick={() => { setActiveTab('wishlist'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="My Orders" onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Profile" onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }} />
              </>
            ) : (
              <>
                <MobileNavItem label="Dashboard" onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Manage Store" onClick={() => { setActiveTab('manage-products'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Add Product" onClick={() => { setActiveTab('add-product'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Orders Queue" onClick={() => { setActiveTab('seller-orders'); setMobileMenuOpen(false); }} />
                <MobileNavItem label="Seller Profile" onClick={() => { setActiveTab('seller-profile'); setMobileMenuOpen(false); }} />
              </>
            )}
            <button onClick={handleLogout} className="w-full text-left py-2 px-3 text-red-400 font-bold border-t border-emerald-800/80 mt-2 text-xs">
              LOGOUT
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        {user.role === 'customer' ? (
          <>
            {activeTab === 'home' && <CustomerHome products={products} setActiveTab={setActiveTab} addToCart={addToCart} />}
            {activeTab === 'products' && <CustomerProducts products={products} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
            {activeTab === 'categories' && <CustomerCategories products={products} addToCart={addToCart} />}
            {activeTab === 'cart' && <CustomerCart cart={cart} setCart={setCart} setOrders={setOrders} setActiveTab={setActiveTab} />}
            {activeTab === 'wishlist' && <CustomerWishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />}
            {activeTab === 'orders' && <CustomerOrders orders={orders} />}
            {activeTab === 'profile' && <CustomerProfile user={user} />}
          </>
        ) : (
          <>
            {activeTab === 'dashboard' && <SellerDashboard products={products} orders={orders} />}
            {activeTab === 'manage-products' && <SellerManageProducts products={products} setProducts={setProducts} />}
            {activeTab === 'add-product' && <SellerAddProduct products={products} setProducts={setProducts} setActiveTab={setActiveTab} />}
            {activeTab === 'seller-orders' && <SellerOrders orders={orders} setOrders={setOrders} />}
            {activeTab === 'seller-profile' && <SellerProfile user={user} />}
          </>
        )}
      </main>

      <footer className="skeuo-panel mt-12 py-6 px-4 border-t-2 border-emerald-800 text-center text-xs text-emerald-400/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <p className="font-bold text-emerald-300">TARLAC AGRICULTURAL UNIVERSITY</p>
            <p className="text-[11px] text-emerald-500">College of Engineering and Technology - Static E-Commerce Engine</p>
          </div>
          <div className="flex items-center space-x-2 font-mono-tech bg-black/40 px-3 py-1.5 rounded-lg border border-emerald-800/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM STATUS: SKEUOMORPHIC ENGINE ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
        active 
          ? 'bg-gradient-to-b from-amber-300 to-amber-600 text-black shadow-md border border-amber-200' 
          : 'text-emerald-200 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/50'
      }`}
    >
      {label}
      {badge && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-black animate-ping"></span>}
    </button>
  );
}

function MobileNavItem({ label, onClick }) {
  return (
    <button onClick={onClick} className="block w-full text-left py-2 px-3 rounded-lg text-emerald-200 hover:bg-emerald-900/60 font-semibold text-xs border border-emerald-800/40">
      {label}
    </button>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('AUTHENTICATION ERROR: Please enter valid credentials.');
      return;
    }
    const success = onLogin(email, password);
    if (!success) {
      setError('AUTHENTICATION FAILED: Access denied for given credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md skeuo-panel p-8 rounded-2xl shadow-2xl relative border-2 border-emerald-700/80">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 px-6 py-1.5 rounded-full shadow-lg border border-amber-200 flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-950"></div>
          <span className="font-brand text-xs font-black text-black tracking-widest uppercase">TAU ACCESS PORTAL</span>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-950"></div>
        </div>

        <div className="mt-4 text-center mb-6">
          <img src="/images/logo.png" alt="TAU Logo" className="w-20 h-20 mx-auto mb-3 rounded-full object-cover border-2 border-amber-400 shadow-lg" onError={(e) => { e.target.style.display = 'none'; }} />
          <h2 className="text-2xl font-brand font-bold text-amber-300 embossed-text">CAMPUS E-MARKET</h2>
          <p className="text-xs font-mono-tech text-emerald-400 mt-1">Authentic Skeuomorphic Interface Engine</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-600 text-red-200 text-xs font-mono-tech">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-emerald-300 mb-1 tracking-wider uppercase">Institutional Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl skeuo-input text-sm font-mono-tech" placeholder="user@example.com" />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-300 mb-1 tracking-wider uppercase">Secure Passcode</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl skeuo-input text-sm font-mono-tech" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl btn-gold text-sm font-black tracking-wider uppercase mt-2">
            INITIALIZE SESSION
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-emerald-800/80">
          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-2">DEMO ACCESS KEYS:</p>
          <div className="p-3 bg-black/40 rounded-xl border border-emerald-800/80 font-mono-tech text-xs text-emerald-300/90 space-y-1">
            <p><span className="text-amber-300 font-bold">CUSTOMER:</span> user@example.com / user123</p>
            <p><span className="text-amber-300 font-bold">SELLER:</span> seller@example.com / seller123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerHome({ products, setActiveTab, addToCart }) {
  return (
    <div className="space-y-8">
      <div className="skeuo-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden border-2 border-emerald-600/60 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="badge-brass px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Tarlac Agricultural University</span>
          <h1 className="text-3xl sm:text-4xl font-brand font-bold text-amber-300 mt-4 embossed-text leading-tight">THE TACTILE CAMPUS SHOPPING EXPERIENCE</h1>
          <p className="mt-3 text-emerald-200 text-sm leading-relaxed font-sans">Explore authentic university apparel, high-precision engineering gear, and essential student supplies crafted with rich tactile depth.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button onClick={() => setActiveTab('products')} className="px-6 py-3 rounded-xl btn-gold font-black text-xs uppercase tracking-wider">BROWSE CATALOG</button>
            <button onClick={() => setActiveTab('categories')} className="px-6 py-3 rounded-xl btn-emerald font-black text-xs uppercase tracking-wider">VIEW CATEGORIES</button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">FEATURED HIGHLIGHTS</h2>
          <div className="h-0.5 flex-grow mx-4 bg-gradient-to-r from-emerald-700 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
        </div>
      </div>
    </div>
  );
}

function CustomerProducts({ products, addToCart, wishlist, toggleWishlist }) {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">CAMPUS STORE INVENTORY</h2>
          <p className="text-xs font-mono-tech text-emerald-400">Tactile item registry with instant search</p>
        </div>
        <div className="w-full md:w-80">
          <input type="text" placeholder="Search items by keyword..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2.5 rounded-xl skeuo-input text-sm font-mono-tech" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => {
          const isWishlisted = wishlist.some(item => item.id === product.id);
          return <ProductCard key={product.id} product={product} addToCart={addToCart} isWishlisted={isWishlisted} onToggleWishlist={() => toggleWishlist(product)} />;
        })}
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart, isWishlisted, onToggleWishlist }) {
  return (
    <div className="skeuo-card p-5 flex flex-col justify-between relative group hover:border-emerald-500/80 transition duration-300">
      <div>
        <div className="relative mb-4 rounded-xl overflow-hidden border-2 border-emerald-900/80 shadow-inner bg-black/60">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover opacity-90 group-hover:scale-105 transition duration-500" />
          <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono-tech font-bold text-amber-400 border border-amber-500/40">{product.category}</span>
          {onToggleWishlist && (
            <button onClick={onToggleWishlist} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border shadow-md transition ${isWishlisted ? 'bg-red-600 border-red-400 text-white' : 'bg-black/70 border-emerald-700 text-emerald-400 hover:text-white'}`}>♥</button>
          )}
        </div>
        <h3 className="font-bold text-base text-amber-100 line-clamp-1">{product.name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-mono-tech font-black text-amber-400 embossed-text">₱{product.price.toLocaleString()}</span>
          <span className="text-xs font-mono-tech text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">STOCK: {product.stock}</span>
        </div>
      </div>
      <button onClick={() => addToCart(product)} className="mt-5 w-full py-2.5 rounded-xl btn-gold text-xs font-black uppercase tracking-wider">ADD TO CART</button>
    </div>
  );
}

function CustomerCategories({ products, addToCart }) {
  const categories = ['Electronics', 'Clothing', 'School Supplies', 'Accessories'];
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const filtered = products.filter(p => p.category === selectedCat);

  return (
    <div className="space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl">
        <h2 className="text-xl font-brand font-bold text-amber-300 embossed-text mb-4">CATEGORIES DIRECTORY</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${selectedCat === cat ? 'btn-gold shadow-lg' : 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
      </div>
    </div>
  );
}

function CustomerCart({ cart, setCart, setOrders, setActiveTab }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `ORD-TAU-2026-${Math.floor(100 + Math.random() * 900)}`,
      product: cart.map(i => `${i.name} (x${i.quantity})`).join(', '),
      total: total,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    alert('ORDER PLACED SUCCESSFULLY! Receipt generated in My Orders.');
    setActiveTab('orders');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl">
        <h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">TACTILE CART LEDGER</h2>
      </div>
      {cart.length === 0 ? (
        <div className="skeuo-card p-10 text-center"><p className="text-emerald-400 font-mono-tech">YOUR CART LEDGER IS EMPTY</p></div>
      ) : (
        <div className="skeuo-card overflow-hidden divide-y divide-emerald-900/80">
          {cart.map(item => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-emerald-800" />
                <div>
                  <h4 className="font-bold text-amber-100">{item.name}</h4>
                  <p className="text-xs font-mono-tech text-emerald-400">₱{item.price} × {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-black/60 rounded-xl border border-emerald-800 px-2 py-1 space-x-3">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-emerald-900 text-amber-300 font-bold text-xs">-</button>
                  <span className="font-mono-tech font-bold text-amber-300">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-emerald-900 text-amber-300 font-bold text-xs">+</button>
                </div>
                <span className="text-lg font-mono-tech font-black text-amber-400 w-28 text-right">₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="p-6 bg-black/40 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs font-mono-tech text-emerald-400 block uppercase">Grand Total Amount</span>
              <span className="text-2xl font-mono-tech font-black text-amber-300">₱{total.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} className="px-8 py-3.5 rounded-xl btn-gold text-sm font-black uppercase tracking-wider">CONFIRM & EXECUTE CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerWishlist({ wishlist, toggleWishlist, addToCart }) {
  return (
    <div className="space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl"><h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">SAVED WISHLIST ITEMS</h2></div>
      {wishlist.length === 0 ? (
        <div className="skeuo-card p-10 text-center"><p className="text-emerald-400 font-mono-tech">NO SAVED ITEMS IN WISHLIST</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="skeuo-card p-5 flex flex-col justify-between">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-xl mb-4 border border-emerald-800" />
                <h3 className="font-bold text-amber-100">{product.name}</h3>
                <p className="text-lg font-mono-tech font-black text-amber-400 mt-1">₱{product.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { addToCart(product); toggleWishlist(product); }} className="flex-1 py-2 rounded-xl btn-gold text-xs font-bold uppercase">MOVE TO CART</button>
                <button onClick={() => toggleWishlist(product)} className="px-3 py-2 rounded-xl bg-red-950 text-red-200 border border-red-700 text-xs font-bold">REMOVE</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomerOrders({ orders }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl"><h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">ORDER RECEIPTS LEDGER</h2></div>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="receipt-paper p-6 rounded-lg relative font-mono-tech shadow-2xl transform rotate-1">
            <div className="border-b-2 border-dashed border-gray-400 pb-3 mb-3 text-center">
              <h3 className="font-bold text-lg text-gray-900 tracking-widest uppercase">TARLAC AGRICULTURAL UNIV.</h3>
              <p className="text-xs text-gray-600">TRANSACTION RECEIPT: {order.id}</p>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>
            <div className="py-2">
              <p className="text-xs text-gray-500 uppercase font-bold">Purchased Items:</p>
              <p className="font-bold text-sm text-gray-900 mt-1">{order.product}</p>
            </div>
            <div className="border-t-2 border-dashed border-gray-400 pt-3 mt-3 flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500 uppercase block">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">₱{order.total.toLocaleString()}</span>
              </div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase border ${order.status === 'Completed' ? 'bg-green-200 text-green-900 border-green-400' : 'bg-amber-200 text-amber-900 border-amber-400'}`}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerProfile({ user }) {
  return (
    <div className="max-w-md mx-auto skeuo-panel p-8 rounded-3xl relative border-2 border-amber-500/60 shadow-2xl">
      <div className="w-12 h-3 bg-amber-400/80 rounded-full mx-auto mb-6 shadow-inner border border-amber-200"></div>
      <div className="text-center pb-6 border-b border-emerald-800">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 mx-auto p-1 shadow-lg overflow-hidden flex items-center justify-center">
          <img src="/profile.jpg" alt="Giovanni Ting" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="hidden w-full h-full bg-emerald-950 rounded-full items-center justify-center font-brand font-bold text-2xl text-amber-300">GT</div>
        </div>
        <h2 className="text-xl font-bold text-amber-100 mt-3">{user.name}</h2>
        <span className="badge-brass text-[10px] px-3 py-0.5 rounded-full font-mono-tech mt-1 inline-block">{user.idNumber}</span>
      </div>
      <div className="mt-6 space-y-4 font-mono-tech text-xs">
        <div>
          <span className="text-emerald-400 uppercase block">Affiliated College</span>
          <span className="text-amber-200 font-bold">{user.department}</span>
        </div>
        <div>
          <span className="text-emerald-400 uppercase block">Email Address</span>
          <span className="text-amber-200 font-bold">{user.email}</span>
        </div>
        <div>
          <span className="text-emerald-400 uppercase block">Role Privilege</span>
          <span className="text-amber-200 font-bold uppercase">{user.role}</span>
        </div>
      </div>
    </div>
  );
}

function SellerDashboard({ products, orders }) {
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl">
        <h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">SELLER STORE DASHBOARD</h2>
        <p className="text-xs font-mono-tech text-emerald-400">Tactile analytical overview of store performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="skeuo-card p-6">
          <span className="text-xs font-mono-tech text-emerald-400 uppercase">Active Inventory</span>
          <p className="text-3xl font-mono-tech font-black text-amber-300 mt-2">{products.length} Products</p>
        </div>
        <div className="skeuo-card p-6">
          <span className="text-xs font-mono-tech text-emerald-400 uppercase">Processed Orders</span>
          <p className="text-3xl font-mono-tech font-black text-amber-300 mt-2">{orders.length} Orders</p>
        </div>
        <div className="skeuo-card p-6">
          <span className="text-xs font-mono-tech text-emerald-400 uppercase">Revenue Accumulated</span>
          <p className="text-3xl font-mono-tech font-black text-amber-300 mt-2">₱{totalSales.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function SellerManageProducts({ products, setProducts }) {
  const handleDelete = (id) => {
    if (confirm('Confirm product deletion from active inventory?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl"><h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">MANAGE PRODUCTS</h2></div>
      <div className="skeuo-card overflow-x-auto">
        <table className="w-full text-left font-mono-tech text-xs">
          <thead className="bg-black/60 border-b border-emerald-800 text-emerald-300 uppercase">
            <tr>
              <th className="p-4">Item Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/60">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-emerald-950/40">
                <td className="p-4 font-bold text-amber-100">{p.name}</td>
                <td className="p-4 text-emerald-400">{p.category}</td>
                <td className="p-4 font-black text-amber-400">₱{p.price.toLocaleString()}</td>
                <td className="p-4 text-emerald-300">{p.stock}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded bg-red-950 border border-red-700 text-red-300 font-bold">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SellerAddProduct({ products, setProducts, setActiveTab }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    const newProd = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
      stock: Number(stock),
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
    };

    setProducts([newProd, ...products]);
    alert('NEW ITEM REGISTERED IN CAMPUS INVENTORY');
    setActiveTab('manage-products');
  };

  return (
    <div className="max-w-lg mx-auto skeuo-panel p-8 rounded-2xl">
      <h2 className="text-xl font-brand font-bold text-amber-300 embossed-text mb-6">REGISTER NEW PRODUCT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono-tech text-emerald-300 uppercase mb-1">Product Title</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl skeuo-input text-xs font-mono-tech" placeholder="Item Name" />
        </div>
        <div>
          <label className="block text-xs font-mono-tech text-emerald-300 uppercase mb-1">Price (PHP ₱)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl skeuo-input text-xs font-mono-tech" placeholder="0" />
        </div>
        <div>
          <label className="block text-xs font-mono-tech text-emerald-300 uppercase mb-1">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl skeuo-input text-xs font-mono-tech">
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="School Supplies">School Supplies</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono-tech text-emerald-300 uppercase mb-1">Stock Quantity</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full px-4 py-2.5 rounded-xl skeuo-input text-xs font-mono-tech" placeholder="0" />
        </div>
        <button type="submit" className="w-full py-3.5 rounded-xl btn-gold text-xs font-black uppercase tracking-wider mt-4">SAVE TO INVENTORY</button>
      </form>
    </div>
  );
}

function SellerOrders({ orders, setOrders }) {
  const markCompleted = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Completed' } : o));
  };

  return (
    <div className="space-y-6">
      <div className="skeuo-panel p-6 rounded-2xl"><h2 className="text-xl font-brand font-bold text-amber-300 embossed-text">CUSTOMER ORDERS QUEUE</h2></div>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="skeuo-card p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs font-mono-tech text-amber-400 font-bold">{order.id}</span>
              <p className="font-bold text-amber-100 mt-1">{order.product}</p>
              <p className="text-xs font-mono-tech text-emerald-400">{order.date}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-mono-tech font-black text-amber-300">₱{order.total.toLocaleString()}</span>
              {order.status !== 'Completed' ? (
                <button onClick={() => markCompleted(order.id)} className="px-4 py-2 rounded-xl btn-emerald text-xs font-bold uppercase">MARK COMPLETED</button>
              ) : (
                <span className="px-3 py-1 rounded-full bg-green-900 border border-green-500 text-green-300 text-xs font-bold">COMPLETED</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SellerProfile({ user }) {
  return (
    <div className="max-w-md mx-auto skeuo-panel p-8 rounded-3xl border-2 border-amber-500/60 shadow-2xl">
      <div className="text-center pb-6 border-b border-emerald-800">
        <h2 className="text-xl font-bold text-amber-100">{user.name}</h2>
        <p className="text-xs font-mono-tech text-amber-400 mt-1">{user.store}</p>
      </div>
      <div className="mt-6 space-y-4 font-mono-tech text-xs">
        <div>
          <span className="text-emerald-400 uppercase block">Staff ID Number</span>
          <span className="text-amber-200 font-bold">{user.idNumber}</span>
        </div>
        <div>
          <span className="text-emerald-400 uppercase block">Contact Email</span>
          <span className="text-amber-200 font-bold">{user.email}</span>
        </div>
      </div>
    </div>
  );
}