// 项目类型
export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  featured: boolean;
  role: string;
  time: string;
  outcome: string;
  tags: string[];
  links: {
    demo?: string;
    figma?: string;
    repo?: string;
  };
  sections: {
    problem: string;
    insight: string[];
    solution: string;
    result: string[];
    learnings: string[];
  };
}

// 学习内容类型
export type LearningType = 'prompt' | 'method' | 'note' | 'reading' | 'tool';

export interface LearningItem {
  type: LearningType;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  body: string;
  meta: {
    source?: string;
    date: string;
  };
  prompt?: {
    template: string;
    variables: string[];
  };
}

// AI Lab 类型
export type AILabType = 'gallery' | 'experiment' | 'idea';

export interface AILabItem {
  type: AILabType;
  slug: string;
  title: string;
  goal?: string;
  setup?: string;
  result?: string;
  next?: string;
  tags: string[];
  media?: string[];
  prompt?: string;
  model?: string;
  date: string;
  content?: string;
}

// 经历类型
export interface Experience {
  role: string;
  org: string;
  date: string;
  impact: string;
  details?: string[];
}

// 技能类型
export interface Skill {
  name: string;
  category: string;
}

// 导航链接类型
export interface NavLink {
  label: string;
  href: string;
}

// 社交链接类型
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
