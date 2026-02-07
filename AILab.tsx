import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Copy, Check, Lightbulb, FlaskConical, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { TagPill } from '@/components/TagPill';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { AILabItem } from '@/types';

// Gallery Item
function GalleryCard({ item, onClick }: { item: AILabItem; onClick: () => void }) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border-color)]">
        {item.media?.[0] ? (
          <img 
            src={item.media[0]} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-[var(--text-muted)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-xs text-white/70">{item.model}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Lightbox
function Lightbox({ 
  items, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}: { 
  items: AILabItem[]; 
  currentIndex: number; 
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const item = items[currentIndex];

  const handleCopy = () => {
    if (item.prompt) {
      navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      toast.success('Prompt copied');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[var(--bg)] border-[var(--border-color)] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-black">
            {item.media?.[0] ? (
              <img 
                src={item.media[0]} 
                alt={item.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-[var(--text-muted)]" />
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[var(--text)]">{item.title}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={onPrev}
                  className="p-2 rounded-lg hover:bg-[var(--surface)]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={onNext}
                  className="p-2 rounded-lg hover:bg-[var(--surface)]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <p className="text-[var(--text-muted)] mb-4">{item.goal}</p>
            
            <div className="mb-4">
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Model</span>
              <p className="text-[var(--text)]">{item.model}</p>
            </div>
            
            {item.prompt && (
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Prompt</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-[var(--surface)]"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <code className="block p-3 rounded-lg bg-[var(--surface)] text-xs text-[var(--text-muted)] overflow-auto max-h-40">
                  {item.prompt}
                </code>
              </div>
            )}
            
            <div className="mt-4 text-xs text-[var(--text-muted)]">
              {item.date} · {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Experiment Card
function ExperimentCard({ item }: { item: AILabItem }) {
  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <h3 className="font-semibold text-[var(--text)] mb-3">{item.title}</h3>
      
      <div className="space-y-3">
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Goal</span>
          <p className="text-sm text-[var(--text)]">{item.goal}</p>
        </div>
        
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Setup</span>
          <p className="text-sm text-[var(--text-muted)]">{item.setup}</p>
        </div>
        
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Result</span>
          <p className="text-sm text-[var(--accent-teal)]">{item.result}</p>
        </div>
        
        {item.next && (
          <div>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Next Steps</span>
            <p className="text-sm text-[var(--text-muted)]">{item.next}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-1">
        {item.tags.map(tag => (
          <TagPill key={tag} variant="filled">{tag}</TagPill>
        ))}
      </div>
    </div>
  );
}

// Idea Card
function IdeaCard({ item }: { item: AILabItem }) {
  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <h3 className="font-semibold text-[var(--text)] mb-2">{item.title}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-4">{item.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {item.tags.map(tag => (
            <TagPill key={tag} variant="outline">{tag}</TagPill>
          ))}
        </div>
        <span className="text-xs text-[var(--text-muted)]">{item.date}</span>
      </div>
    </div>
  );
}

export function AILab() {
  const [items, setItems] = useState<AILabItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('/data/ai-lab.json')
      .then(res => res.json())
      .then((data: AILabItem[]) => setItems(data));
  }, []);

  const galleryItems = items.filter(i => i.type === 'gallery');
  const experimentItems = items.filter(i => i.type === 'experiment');
  const ideaItems = items.filter(i => i.type === 'idea');

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-3">
              AI Lab
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl">
              Experiments with AI tools, generative art, and emerging technologies. 
              A space for exploration and documentation.
            </p>
          </div>
        </RevealOnScroll>

        {/* Gallery Section */}
        <RevealOnScroll>
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-[var(--accent-teal)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">AIGC Gallery</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map((item, index) => (
                <GalleryCard 
                  key={item.slug} 
                  item={item} 
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Experiments Section */}
        <RevealOnScroll>
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <FlaskConical className="w-5 h-5 text-[var(--accent-teal)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Agents & Tools</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {experimentItems.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ExperimentCard item={item} />
                </motion.div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Ideas Section */}
        <RevealOnScroll>
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-[var(--accent-teal)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Ideas & Insights</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {ideaItems.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <IdeaCard item={item} />
                </motion.div>
              ))}
            </div>
          </section>
        </RevealOnScroll>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          items={galleryItems}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </main>
  );
}
