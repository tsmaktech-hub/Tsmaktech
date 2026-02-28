import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Globe, 
  Smartphone, 
  Server, 
  ChevronRight, 
  Play, 
  BookOpen, 
  Search,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { LEARNING_PATHS, FEATURED_TUTORIALS } from './constants';
import { Tutorial } from './types';

import { TsmakLogo } from './components/Logo';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleAiPathfinder = async () => {
    if (!searchQuery) return;
    setIsAiLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `A user wants to learn: "${searchQuery}". Based on Tsmak Tech's focus (Web Apps, Websites, Mobile Apps, Backend), recommend a learning path and explain why in 2-3 sentences. Keep it encouraging and professional.`,
      });
      setAiRecommendation(response.text || "I couldn't generate a recommendation right now. Try focusing on Web or Mobile development!");
    } catch (error) {
      console.error("AI Error:", error);
      setAiRecommendation("Error connecting to AI assistant. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-white/10 bg-zinc-900 group cursor-pointer">
                  <img 
                    src="/logo.png" 
                    alt="Tsmak Tech Logo" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => setLogoError(true)}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <TsmakLogo />
              )}
              <span className="text-xl font-bold tracking-tight text-white">Tsmak Tech</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Courses</a>
              <a href="#" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Tutorials</a>
              <a href="#" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Community</a>
              <button className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-zinc-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-zinc-900 border-b border-white/5 px-4 py-6 space-y-4"
          >
            <a href="#" className="block text-lg font-medium text-white">Courses</a>
            <a href="#" className="block text-lg font-medium text-white">Tutorials</a>
            <a href="#" className="block text-lg font-medium text-white">Community</a>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 md:pt-32 md:pb-48 overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 -z-10 bg-zinc-950">
            <img 
              src="/hero-bg.jpg" 
              alt="Coding Background" 
              className="w-full h-full object-cover scale-105 opacity-40"
              onError={(e) => {
                // Fallback to a similar high-quality coding image if the uploaded image is not found
                e.currentTarget.src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070";
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-500/20">
                <Sparkles size={14} />
                Learn to build the future
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8 leading-[1.1]">
                Master the Art of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                  Modern Development
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
                Tsmak Tech provides world-class tutorials and paths to help you build professional web apps, websites, and mobile applications.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 group">
                  Start Learning Now
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/10 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all backdrop-blur-sm">
                  <Play size={20} className="text-emerald-400" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Pathfinder Section */}
        <section className="py-16 md:py-24 text-white overflow-hidden relative">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 -z-10 bg-zinc-900">
            <img 
              src="/hero-bg.jpg" 
              alt="AI Pathfinder Background" 
              className="w-full h-full object-cover opacity-30"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070";
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Not sure where to start?</h2>
                <p className="text-zinc-400 text-base sm:text-lg mb-8">
                  Tell our AI Pathfinder what you're interested in, and we'll create a custom learning roadmap just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/10 rounded-2xl border border-white/10">
                  <input 
                    type="text" 
                    placeholder="e.g. I want to build a social media app"
                    className="flex-grow bg-transparent border-none focus:ring-0 px-4 py-3 text-white placeholder:text-zinc-500 text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    onClick={handleAiPathfinder}
                    disabled={isAiLoading}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {isAiLoading ? 'Thinking...' : 'Find My Path'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {aiRecommendation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                    >
                      <div className="flex items-start gap-3">
                        <Sparkles className="text-emerald-400 mt-1 shrink-0" size={20} />
                        <p className="text-emerald-50 text-sm leading-relaxed">
                          {aiRecommendation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-indigo-500 blur-3xl opacity-20" />
                <div className="relative bg-zinc-800 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-4">
                      <span className="text-zinc-500">01</span>
                      <span className="text-emerald-400">const</span>
                      <span className="text-white">learningPath = </span>
                      <span className="text-indigo-400">await</span>
                      <span className="text-white"> findPath(</span>
                      <span className="text-amber-300">"your_goals"</span>
                      <span className="text-white">);</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">02</span>
                      <span className="text-emerald-400">if</span>
                      <span className="text-white"> (learningPath.success) {'{'}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">03</span>
                      <span className="text-zinc-500 ml-4">console.log(</span>
                      <span className="text-amber-300">"Welcome to Tsmak Tech!"</span>
                      <span className="text-white">);</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">04</span>
                      <span className="text-white">{'}'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Subtle Background Pattern/Image */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
              alt="Tech Pattern" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Choose Your Focus</h2>
              <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
                Structured paths designed to take you from zero to professional developer in your chosen field.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEARNING_PATHS.map((path) => (
                <motion.div
                  key={path.id}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all group cursor-pointer"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                    path.color === 'emerald' && "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                    path.color === 'indigo' && "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
                    path.color === 'violet' && "bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
                    path.color === 'amber' && "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
                  )}>
                    {path.id === 'web-apps' && <Layout size={28} />}
                    {path.id === 'websites' && <Globe size={28} />}
                    {path.id === 'mobile-apps' && <Smartphone size={28} />}
                    {path.id === 'backend' && <Server size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{path.title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    {path.description}
                  </p>
                  <div className="flex items-center text-sm font-bold text-zinc-900 group-hover:gap-2 transition-all">
                    Explore Path <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tutorials */}
        <section className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden">
          {/* Subtle Background Image */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070" 
              alt="Coding Pattern" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Latest Tutorials</h2>
                <p className="text-zinc-600 text-sm sm:text-base">Fresh content added weekly to keep you ahead of the curve.</p>
              </div>
              <button className="text-zinc-900 font-bold flex items-center gap-2 hover:text-emerald-600 transition-colors text-sm sm:text-base">
                View All Tutorials <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {FEATURED_TUTORIALS.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-emerald-600 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Join the Tsmak Tech community</h2>
                <p className="text-emerald-50 text-base sm:text-lg mb-8 md:mb-10">
                  Get the latest tutorials, tech news, and career tips delivered straight to your inbox. No spam, just value.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-grow px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white border-none focus:ring-2 focus:ring-emerald-400 text-zinc-900 placeholder:text-zinc-400 text-sm sm:text-base"
                  />
                  <button className="px-8 py-3 sm:py-4 bg-zinc-900 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-zinc-800 transition-colors text-sm sm:text-base">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 pt-12 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                {!logoError ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-200 bg-white">
                    <img 
                      src="/logo.png" 
                      alt="Tsmak Tech Logo" 
                      className="w-full h-full object-cover"
                      onError={() => setLogoError(true)}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <TsmakLogo size="sm" />
                )}
                <span className="text-lg font-bold tracking-tight text-zinc-900">Tsmak Tech</span>
              </div>
              <p className="text-zinc-500 max-w-sm mb-8">
                Empowering the next generation of developers with high-quality, accessible tech education. Build anything you can imagine.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Courses</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Roadmaps</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Community</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-400 text-sm">
              © 2024 Tsmak Tech. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-zinc-400 text-sm">Built with React & Gemini</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group"
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={tutorial.image} 
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-900">
            {tutorial.category}
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-500">
            <BookOpen size={14} className="text-emerald-600" />
            {tutorial.difficulty}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="text-xs font-medium text-zinc-500">{tutorial.duration}</span>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-600 transition-colors">
          {tutorial.title}
        </h3>
        <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {tutorial.description}
        </p>
        <button className="w-full py-3 bg-zinc-50 border border-zinc-100 text-zinc-900 font-bold rounded-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
          Start Tutorial
        </button>
      </div>
    </motion.div>
  );
}
