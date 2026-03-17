/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Volume2, 
  Zap, 
  Shield, 
  Eye,
  Star,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

import ampImg from '../images/AMPS.png';
import speakerImg from '../images/SPEAK.png';
import subImg from '../images/WOODER.png';
import wiringImg from '../images/WIRE.png';
import { AwardDemo } from './components/AwardDemo';

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
  description?: string;
  specs?: { label: string; value: string }[];
  suitableCars?: string[];
  priceRange?: string;
}

// --- Data ---
const PACKAGES: Product[] = [
  {
    id: 1,
    name: "The Urban Pulse",
    category: "Compact & Hatchback",
    price: "RM 2,499",
    image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller",
    description: "Our signature entry-level package designed to bring studio-quality clarity to daily drivers. Focused on wide-stage imaging and tight, punchy mid-bass.",
    suitableCars: ["Perodua Myvi", "Honda City", "Toyota Yaris", "Honda Jazz", "Proton Iriz"],
    priceRange: "RM 2,000 - RM 3,000",
    specs: [
      { label: "Speakers", value: "CH-Pro 6.5\" Component Set" },
      { label: "Amplifier", value: "CH-Mini 2-Channel Integrated" },
      { label: "Damping", value: "2-Layer Door Soundproofing" }
    ]
  },
  {
    id: 2,
    name: "The Executive Stage",
    category: "Sedan & Luxury",
    price: "RM 4,899",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    tag: "Premium",
    description: "Engineered for excellence. This setup transforms your luxury sedan into a dynamic concert hall, utilizing high-resolution amplifiers and precision-tuned component speakers.",
    suitableCars: ["BMW 3 Series", "Mercedes C-Class", "Honda Civic FE", "Toyota Camry", "Tesla Model 3"],
    priceRange: "RM 4,500 - RM 5,500",
    specs: [
      { label: "Speakers", value: "CH-Ultra 6.5\" Component + Coaxial" },
      { label: "Subwoofer", value: "CH-X1 10\" Slim Active Sub" },
      { label: "Amplifier", value: "CH-800.4 High-Resolution Digital" }
    ]
  },
  {
    id: 3,
    name: "The Beast Mode",
    category: "SUV & 4x4",
    price: "RM 6,299",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    tag: "High Power",
    description: "Massive output without compromise. Designed for larger cabins, this package delivers thunderous low-end and crystal-clear highs that cut through road noise.",
    suitableCars: ["Toyota Hilux", "Ford Ranger", "Honda CR-V", "Mazda CX-5", "Proton X70"],
    priceRange: "RM 6,000 - RM 7,500",
    specs: [
      { label: "Speakers", value: "CH-Elite 3-Way Front Stage" },
      { label: "Subwoofer", value: "CH-Titan 12\" Ported Enclosure" },
      { label: "Amplifier", value: "CH-Multi 1600W Multi-Channel System" }
    ]
  }
];

const COMPONENTS: Product[] = [
  {
    id: 4,
    name: "CH-800.4 Amp",
    category: "4-Channel Digital",
    price: "RM 1,899",
    image: ampImg,
    description: "A compact powerhouse. The CH-800.4 delivers clean, distortion-free power to your speakers, ensuring every detail of your music is heard with surgical precision.",
    suitableCars: ["All Vehicle Models"],
    priceRange: "RM 1,899",
    specs: [
      { label: "Power Output", value: "4 x 200W RMS @ 2 Ohms" },
      { label: "Frequency Resp", value: "10Hz - 45kHz" },
      { label: "THD", value: "< 0.05%" }
    ]
  },
  {
    id: 5,
    name: "CH-Pro Speakers",
    category: "Component Set",
    price: "RM 999",
    image: speakerImg,
    description: "Superior vocal clarity and rich mid-range. Our CH-Pro series features an advanced silk-dome tweeter and a carbon-fiber reinforced cone for maximum durability.",
    suitableCars: ["All Vehicle Models (6.5\" Standard)"],
    priceRange: "RM 999",
    specs: [
      { label: "Sensitivity", value: "91dB" },
      { label: "Power Handling", value: "120W RMS / 240W Peak" },
      { label: "Tweeter", value: "25mm Silk Dome" }
    ]
  },
  {
    id: 6,
    name: "CH-X1 Woofer",
    category: "12-inch Active",
    price: "RM 1,299",
    image: subImg,
    description: "Deep, controlled bass in a sleek enclosure. The CH-X1 is an active solution that saves space while delivering the low-end performance our brand is famous for.",
    suitableCars: ["SUV", "Sedan", "Hatchback"],
    priceRange: "RM 1,299",
    specs: [
      { label: "Enclosure Type", value: "Slot-Ported / Active" },
      { label: "Built-in Amp", value: "500W RMS Digital Sub-Amp" },
      { label: "Dimensions", value: "340 x 420 x 280 mm" }
    ]
  },
  {
    id: 7,
    name: "CH-Wire Kit",
    category: "0 Gauge Power",
    price: "RM 299",
    image: wiringImg,
    description: "The foundation of a great system. Our premium 0-gauge wiring kit ensures your amplifiers receive the consistent current they need for peak performance.",
    suitableCars: ["All High-Power Installations"],
    priceRange: "RM 299",
    specs: [
      { label: "Gauge", value: "0 AWG Pure Oxygen-Free Copper" },
      { label: "Fuse", value: "250A ANL Gold-Plated" },
      { label: "Inclusions", value: "Power, Ground, Remote, RCAs" }
    ]
  }
];

// --- Components ---

const TransitionOverlay = ({ isTransitioning }: { isTransitioning: boolean }) => (
  <AnimatePresence>
    {isTransitioning && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="carhub-logo"
        >
          <span className="carhub-logo-text text-4xl uppercase">Car</span>
          <span className="carhub-logo-box text-4xl uppercase">hub</span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = ({ setView, currentView }: { setView: (v: 'home' | 'about' | 'product') => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentView === 'about' ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="carhub-logo cursor-pointer" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="carhub-logo-text uppercase">Car</span>
          <span className="carhub-logo-box uppercase">hub</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {['Packages', 'Components', 'Headlights'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleNavClick(item)} 
              className="text-sm font-semibold uppercase tracking-wider hover:text-brand transition-colors"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => setView('about')} 
            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${currentView === 'about' ? 'text-brand' : 'hover:text-brand'}`}
          >
            About
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hover:text-brand transition-colors" onClick={() => alert('Search clicked!')}><Search size={20} /></button>
          <button className="hover:text-brand transition-colors relative" onClick={() => alert('Cart opened!')}>
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-brand text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55]"
            />
            {/* Menu Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] bg-black z-[60] flex flex-col p-8 border-l border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="carhub-logo">
                  <span className="carhub-logo-text">Car</span>
                  <span className="carhub-logo-box">hub</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
              </div>
              <div className="flex flex-col space-y-8">
                {['Packages', 'Components', 'Headlights'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => handleNavClick(item)}
                    className="text-3xl font-extrabold uppercase tracking-tighter hover:text-brand text-left"
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => { setView('about'); setMobileMenuOpen(false); }}
                  className={`text-3xl font-extrabold uppercase tracking-tighter text-left ${currentView === 'about' ? 'text-brand' : 'hover:text-brand'}`}
                >
                  About
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
      
      {/* Background Image/Video Placeholder */}
      <img 
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
        alt="Hero Car" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
            Louder.<br />
            <span className="text-brand">Deeper.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8 max-w-lg">
            Clarity you hear. Power you feel. Not all setups hit the same.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary flex items-center gap-2 z-10 relative" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>
              EXPLORE PACKAGES <ChevronRight size={20} />
            </button>
            <button className="btn-outline z-10 relative" onClick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}>
              VIEW CATALOGUE
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gray-500"
      >
        <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};


const ProductPage = ({ product, onBack }: { product: Product, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-sm mb-12 hover:translate-x-[-10px] transition-transform"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Browse
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <div className="absolute top-8 left-8 bg-brand text-black text-xs font-black uppercase px-4 py-2 rounded-lg">
                {product.tag}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm font-black text-brand uppercase tracking-[0.3em] mb-4">{product.category}</div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
              {product.name}
            </h1>
            
            <div className="text-4xl font-extrabold mb-8 text-white">{product.price}</div>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              {product.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-surface rounded-2xl border border-white/5">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Suitable Cars</h4>
                <div className="flex flex-wrap gap-2">
                  {product.suitableCars?.map((car, i) => (
                    <span key={i} className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-md border border-white/5">
                      {car}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-surface rounded-2xl border border-white/5">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Price Range</h4>
                <div className="text-lg font-bold text-brand uppercase">{product.priceRange}</div>
                <p className="text-[10px] text-gray-500 mt-1 uppercase">Varies by installation complexity</p>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Technical Specs</h4>
              <div className="space-y-4">
                {product.specs?.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 uppercase italic">
                    <span className="text-gray-400 font-bold text-sm tracking-wide">{spec.label}</span>
                    <span className="text-white font-black text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full btn-primary py-6 text-xl" onClick={() => alert(`Enquiry sent for ${product.name}`)}>
              BOOK INSTALLATION NOW
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-brand hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent md:hidden" />
              </div>

              <div className="p-8 md:p-12">
                <div className="text-xs font-black text-brand uppercase tracking-widest mb-4 italic">{product.category}</div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">{product.name}</h2>
                <div className="text-3xl font-extrabold text-white mb-8">{product.price}</div>
                
                <p className="text-gray-400 leading-relaxed mb-8 italic">
                  {product.description}
                </p>

                <div className="space-y-4 mb-10">
                  {product.specs?.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 uppercase text-xs">
                      <span className="text-gray-500 font-bold tracking-widest">{spec.label}</span>
                      <span className="text-white font-black italic">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 btn-primary py-4" onClick={() => alert(`Enquiry sent for ${product.name}`)}>
                    ENQUIRE NOW
                  </button>
                  <button className="sm:w-16 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-xl hover:bg-brand hover:text-black transition-colors">
                    <ShoppingCart size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};



function ProductCard({ product, onClick }: { product: Product, onClick: (p: Product) => void, key?: React.Key }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={() => onClick(product)}
      className="group bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-brand/30 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.tag && (
          <div className="absolute top-4 left-4 bg-brand text-black text-[10px] font-black uppercase px-2 py-1 rounded">
            {product.tag}
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-black p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform" onClick={() => alert(`Added ${product.name} to cart!`)}>
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="text-[10px] font-bold text-brand uppercase tracking-widest mb-1">{product.category}</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold">{product.price}</span>
          <button className="text-xs font-bold uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); onClick(product); }}>
            Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle: string, light?: boolean }) => (
  <div className="mb-12">
    <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 ${light ? 'text-white' : 'text-white'}`}>
      {title}
    </h2>
    <div className="flex items-center gap-4">
      <div className="h-1 w-12 bg-brand" />
      <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">{subtitle}</p>
    </div>
  </div>
);

const ServiceSection = () => {
  return (
    <section id="headlights" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader 
            title="Visual Clarity." 
            subtitle="Headlight Restoration"
          />
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Presence you can't ignore. Our headlight cover replacement service doesn't just fix yellowing—it restores the sharp, aggressive look your car deserves.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              { icon: <Eye size={20} />, text: "Enhanced Night Visibility" },
              { icon: <Shield size={20} />, text: "UV-Resistant Coating" },
              { icon: <Zap size={20} />, text: "Factory-Fresh Finish" }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-gray-400">
                <span className="text-brand">{item.icon}</span>
                <span className="font-semibold uppercase text-sm tracking-wide">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="bg-surface p-6 rounded-xl border border-white/5 inline-block">
            <div className="text-sm text-gray-400 uppercase font-bold mb-1">Installed Price</div>
            <div className="text-4xl font-black text-brand">RM 499</div>
            <button className="mt-4 w-full btn-primary" onClick={() => alert('Booking installation...')}>BOOK INSTALLATION</button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-brand/20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000" 
              alt="Headlight Restoration" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-8">
              <div className="flex items-center gap-2 text-brand mb-2">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="italic text-white font-medium">"Once you try it, there's no going back. The difference is night and day."</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ setView }: { setView: (v: 'home' | 'about') => void }) => {
  return (
    <footer className="bg-surface pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="carhub-logo mb-6 cursor-pointer" onClick={() => setView('home')}>
              <span className="carhub-logo-text">Car</span>
              <span className="carhub-logo-box">hub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Precision-focused car audio for real drivers. Built for the experience, engineered for the soul.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><button onClick={() => setView('home')} className="hover:text-brand transition-colors relative z-10">Audio Packages</button></li>
              <li><button onClick={() => setView('home')} className="hover:text-brand transition-colors relative z-10">Subwoofers</button></li>
              <li><button onClick={() => setView('home')} className="hover:text-brand transition-colors relative z-10">Amplifiers</button></li>
              <li><button onClick={() => setView('home')} className="hover:text-brand transition-colors relative z-10">Speakers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><button onClick={() => alert('Custom Tuning')} className="hover:text-brand transition-colors text-left relative z-10 w-full">Custom Tuning</button></li>
              <li><button onClick={() => setView('home')} className="hover:text-brand transition-colors text-left relative z-10 w-full">Headlight Restoration</button></li>
              <li><button onClick={() => alert('Sound Proofing')} className="hover:text-brand transition-colors text-left relative z-10 w-full">Sound Proofing</button></li>
              <li><button onClick={() => alert('Installation')} className="hover:text-brand transition-colors text-left relative z-10 w-full">Installation</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-gray-500 text-xs mb-4 uppercase font-bold">Get the latest drops.</p>
            <form className="flex" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter!'); }}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                required
                className="bg-black border border-white/10 px-4 py-2 text-xs w-full focus:outline-none focus:border-brand relative z-10"
              />
              <button type="submit" className="bg-brand text-black px-4 py-2 font-black text-xs relative z-10 hover:bg-white transition-colors">JOIN</button>
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            © 2026 CARHUB AUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AboutPage = ({ setView }: { setView: (v: 'home' | 'about') => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader 
            title="The Heritage." 
            subtitle="Built for the experience"
          />
          
          <div className="grid md:grid-cols-2 gap-16 mt-16 items-center">
            <div className="space-y-8">
              <p className="text-2xl font-medium text-white leading-tight">
                Carhub Audio started with a simple belief: <span className="text-brand">Hearing isn't enough.</span>
              </p>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p>
                  We don't just sell speakers. We engineer sound stages. Since our inception, Timefall Studios has pushed the boundaries of automotive acoustic engineering, focusing on the raw emotion that only precision-tuned clarity can provide.
                </p>
                <p>
                  Every component in our catalogue is hand-selected for its ability to reproduce sound as the artist intended—untouched, powerful, and deeply moving.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-4xl font-black text-white mb-2">100+</div>
                  <div className="text-xs font-bold text-brand uppercase tracking-widest">Custom Builds</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-2">15k</div>
                  <div className="text-xs font-bold text-brand uppercase tracking-widest">Happy Drivers</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-brand/10 blur-3xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1558232108-9bd65399583b?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio setup" 
                className="relative rounded-2xl border border-white/10"
              />
            </div>
          </div>

          <div className="mt-32 grid sm:grid-cols-3 gap-12">
            {[
              { title: "Precision", icon: <Zap size={32} />, desc: "Every decibel accounted for. Every frequency optimized." },
              { title: "Passion", icon: <Star size={32} />, desc: "We build for the drivers who live for the commute." },
              { title: "Performance", icon: <Shield size={32} />, desc: "Rugged engineering that withstands the test of time." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-surface rounded-xl border border-white/5"
              >
                <div className="text-brand mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold mb-4 uppercase">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-12 bg-brand rounded-2xl text-black text-center">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
              CRAFTED BY TIMEFALL STUDIOS
            </h3>
            <p className="text-xl font-bold uppercase tracking-widest mb-10 opacity-80">
              Join the elite circle of drivers.
            </p>
            <button 
              className="bg-black text-white font-black px-12 py-5 rounded-full text-lg hover:scale-105 transition-transform"
              onClick={() => setView('home')}
            >
              BROWSE OUR WORK
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState<'home' | 'about' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsTransitioning(true);
    
    // Pulse animation timing
    setTimeout(() => {
      setView('product');
    }, 1200);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 2200);
  };

  const handleCatalogueClick = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const filteredComponents = COMPONENTS.filter(product => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Speakers') return product.name.includes('Tweeters') || product.name.includes('Mids');
    if (activeCategory === 'Amps') return product.name.includes('Amp');
    if (activeCategory === 'Subs') return product.name.includes('Subwoofer');
    return true;
  });

  return (
    <div className="min-h-screen selection:bg-brand selection:text-black">
      <TransitionOverlay isTransitioning={isTransitioning} />
      <ProductModal 
        product={modalProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Navbar setView={setView} currentView={view} />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero />

            {/* Feature Banner */}
            <section className="py-24 bg-brand text-black overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="flex whitespace-nowrap text-[20vw] font-black uppercase leading-none select-none">
                    CARHUB CARHUB CARHUB CARHUB
                 </div>
              </div>
              <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                  NOT ALL SETUPS<br />HIT THE SAME.
                </h2>
                <p className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                  Precision-focused audio engineering for those who demand more.
                </p>
                <button 
                  className="bg-black text-white font-black px-12 py-5 rounded-full text-lg hover:scale-105 transition-transform"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  START YOUR BUILD
                </button>
              </div>
            </section>

            {/* Catalogue Section */}
            <section id="components" className="py-24 bg-black">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <SectionHeader 
                    title="The Catalogue." 
                    subtitle="Precision components"
                  />
                  <div className="flex gap-4 z-10 relative">
                    {['All', 'Speakers', 'Amps', 'Subs'].map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${activeCategory === cat ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-brand'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredComponents.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={handleCatalogueClick} />
                  ))}
                </div>
                <div className="mt-16 text-center z-10 relative">
                  <button className="btn-outline inline-flex items-center gap-2 hover:bg-white hover:text-black transition-colors" onClick={() => alert('Loading full catalogue...')}>
                    VIEW FULL CATALOGUE <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </section>

            <ServiceSection />

            {/* Packages Section */}
            <section id="packages" className="py-24 bg-black">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeader 
                  title="Curated Packages." 
                  subtitle="Tailored for your drive"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PACKAGES.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-surface relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent" />
              <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                <Volume2 className="mx-auto text-brand mb-8" size={64} />
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                  READY TO FEEL<br />THE DIFFERENCE?
                </h2>
                <p className="text-xl text-gray-400 mb-12">
                  Join the elite circle of drivers who don't just listen, but experience.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button className="btn-primary px-12 py-5 text-xl" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>GET STARTED</button>
                  <button className="btn-outline px-12 py-5 text-xl hover:bg-white hover:text-black transition-colors" onClick={() => alert('Locating nearest dealer...')}>LOCATE DEALER</button>
                </div>
              </div>
            </section>

            <AwardDemo />
          </>
        ) : view === 'about' ? (
          <>
            <AboutPage setView={setView} />
            <AwardDemo />
          </>
        ) : (
          <>
            <ProductPage 
              product={selectedProduct!} 
              onBack={() => setView('home')} 
            />
            <AwardDemo />
          </>
        )}
      </main>

      <Footer setView={setView} />
    </div>
  );
}

