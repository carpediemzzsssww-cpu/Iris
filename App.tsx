import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { Learning } from '@/pages/Learning';
import { AILab } from '@/pages/AILab';
import { About } from '@/pages/About';

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Main app content with routing
function AppContent() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // Check system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <TopNav isDark={isDark} onThemeToggle={toggleTheme} />
      <ScrollToTop />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              } 
            />
            <Route 
              path="/projects/:slug" 
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              } 
            />
            <Route 
              path="/learning" 
              element={
                <PageTransition>
                  <Learning />
                </PageTransition>
              } 
            />
            <Route 
              path="/ai-lab" 
              element={
                <PageTransition>
                  <AILab />
                </PageTransition>
              } 
            />
            <Route 
              path="/about" 
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
      
      <Footer />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border-color)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
