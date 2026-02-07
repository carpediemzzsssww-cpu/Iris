import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ChevronDown, BookOpen, Lightbulb, FileText, Bookmark, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import type { LearningItem, LearningType } from '@/types';

const typeConfig: Record<LearningType, { icon: typeof Lightbulb; label: string; color: string }> = {
  prompt: { icon: Lightbulb, label: 'Prompts', color: 'text-amber-500' },
  method: { icon: BookOpen, label: 'Methods', color: 'text-blue-500' },
  note: { icon: FileText, label: 'Notes', color: 'text-green-500' },
  reading: { icon: Bookmark, label: 'Readings', color: 'text-purple-500' },
  tool: { icon: Wrench, label: 'Tools', color: 'text-teal-500' },
};

function PromptCard({ item }: { item: LearningItem }) {
  const [copied, setCopied] = useState(false);
  const [showVariables, setShowVariables] = useState(false);

  const handleCopy = () => {
    if (item.prompt?.template) {
      navigator.clipboard.writeText(item.prompt.template);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-[var(--text)]">{item.title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-[var(--text-muted)] hover:text-[var(--accent-teal)]"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <p className="text-sm text-[var(--text-muted)] mb-4">{item.summary}</p>
      
      {item.prompt?.variables && item.prompt.variables.length > 0 && (
        <div>
          <button
            onClick={() => setShowVariables(!showVariables)}
            className="flex items-center text-sm text-[var(--accent-teal)] hover:underline"
          >
            Variables ({item.prompt.variables.length})
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showVariables ? 'rotate-180' : ''}`} />
          </button>
          {showVariables && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.prompt.variables.map(v => (
                <code key={v} className="px-2 py-0.5 text-xs bg-[var(--bg)] rounded text-[var(--accent)]">
                  {'{{' + v + '}}'}
                </code>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MethodCard({ item }: { item: LearningItem }) {
  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <h3 className="font-semibold text-[var(--text)] mb-2">{item.title}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-3">{item.summary}</p>
      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
        {item.meta.source && <span>Source: {item.meta.source}</span>}
      </div>
    </div>
  );
}

function NoteCard({ item }: { item: LearningItem }) {
  const [expanded, setExpanded] = useState(false);
  const takeaways = item.body.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('1.'));

  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <h3 className="font-semibold text-[var(--text)] mb-2">{item.title}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-3">{item.summary}</p>
      
      <div className="space-y-2">
        {takeaways.slice(0, expanded ? undefined : 3).map((takeaway, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
            <span className="w-1 h-1 rounded-full bg-[var(--accent-teal)] mt-2 flex-shrink-0" />
            {takeaway.replace(/^[-\d.\s]+/, '')}
          </div>
        ))}
      </div>
      
      {takeaways.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-[var(--accent-teal)] hover:underline"
        >
          {expanded ? 'Show less' : `Show all (${takeaways.length})`}
        </button>
      )}
      
      <div className="mt-3 text-xs text-[var(--text-muted)]">
        Source: {item.meta.source}
      </div>
    </div>
  );
}

function ReadingCard({ item }: { item: LearningItem }) {
  const lines = item.body.split('\n').filter(l => l.trim());
  
  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <h3 className="font-semibold text-[var(--text)] mb-1">{item.title}</h3>
      <p className="text-sm text-[var(--accent)] mb-3">{item.meta.source}</p>
      <p className="text-sm text-[var(--text-muted)] mb-3">{item.summary}</p>
      
      <div className="space-y-1">
        {lines.slice(0, 3).map((line, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
            <span className="w-1 h-1 rounded-full bg-[var(--accent-teal)] mt-2 flex-shrink-0" />
            {line.replace(/^[-\d.\s]+/, '')}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolCard({ item }: { item: LearningItem }) {
  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
      <h3 className="font-semibold text-[var(--text)] mb-2">{item.title}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-4">{item.summary}</p>
      <a 
        href="#"
        className="inline-flex items-center text-sm text-[var(--accent-teal)] hover:underline"
      >
        Try it out
        <span className="ml-1">→</span>
      </a>
    </div>
  );
}

export function Learning() {
  const [items, setItems] = useState<LearningItem[]>([]);
  const [activeTab, setActiveTab] = useState<LearningType>('prompt');

  useEffect(() => {
    fetch('/data/projects.json')
      .then(() => fetch('/data/learning.json'))
      .then(res => res.json())
      .then((data: LearningItem[]) => setItems(data));
  }, []);

  const filteredItems = items.filter(item => item.type === activeTab);

  const renderCard = (item: LearningItem) => {
    switch (item.type) {
      case 'prompt': return <PromptCard item={item} />;
      case 'method': return <MethodCard item={item} />;
      case 'note': return <NoteCard item={item} />;
      case 'reading': return <ReadingCard item={item} />;
      case 'tool': return <ToolCard item={item} />;
      default: return null;
    }
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-3">
              Learning Hub
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl">
              A collection of prompts, methods, notes, and tools I've gathered along the way. 
              Built for reuse and continuous improvement.
            </p>
          </div>
        </RevealOnScroll>

        {/* Tabs */}
        <RevealOnScroll delay={0.1}>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as LearningType)}>
            <TabsList className="mb-8 bg-[var(--surface)] border border-[var(--border-color)] p-1 flex-wrap h-auto gap-1">
              {(Object.keys(typeConfig) as LearningType[]).map(type => {
                const config = typeConfig[type];
                return (
                  <TabsTrigger 
                    key={type} 
                    value={type}
                    className="data-[state=active]:bg-[rgba(15,118,110,0.1)] data-[state=active]:text-[var(--accent-teal)]"
                  >
                    <config.icon className={`w-4 h-4 mr-2 ${config.color}`} />
                    {config.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {(Object.keys(typeConfig) as LearningType[]).map(type => (
              <TabsContent key={type} value={type}>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {renderCard(item)}
                    </motion.div>
                  ))}
                </div>
                
                {filteredItems.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[var(--text-muted)]">No items found.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </RevealOnScroll>
      </div>
    </main>
  );
}
