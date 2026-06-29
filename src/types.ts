// =============== 模块元数据 ===============
export interface ModuleMeta {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  version: string;
  license: string;
  authors: string[];
  tags: string[];
  estimatedHours: number;
  difficulty: Difficulty;
  updatedAt: string;
  coverEmoji: string;
  repoUrl?: string;
  portalUrl?: string;
}

export type Difficulty = "easy" | "medium" | "hard";

// =============== 课程 ===============
export interface Course {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  tags: string[];
  estimatedHours: number;
  lessons: string[]; // lesson ids in order
  order: number;
}

// =============== 课程章节讲义 ===============
export interface Lesson {
  id: string;
  slug: string;
  courseId: string;
  title: string;
  summary: string;
  order: number;
  contentMarkdown: string;
  knowledgePoints: string[]; // kp ids
  estimatedMinutes: number;
}

// =============== 知识点 ===============
export interface KnowledgePoint {
  id: string;
  slug: string;
  title: string;
  summary: string;
  courseId?: string;
  tags: string[];
  difficulty: Difficulty;
  contentMarkdown: string;
  relatedQuestions: string[];
  relatedCases: string[];
  glossary: string[]; // glossary term ids
}

// =============== 题目 ===============
// 题型扩展：覆盖单选/多选/判断/填空/简答/计算/案例分析
export type QuestionType =
  | "single"
  | "multiple"
  | "judge"
  | "short"
  | "fill"
  | "calculation"
  | "case_analysis";

export interface QuestionOption {
  key: string; // "A" "B" ...
  text: string;
}

export interface Question {
  id: string;
  slug: string;
  type: QuestionType;
  difficulty: Difficulty;
  chapter: string; // 所属章节名
  knowledge_points: string[]; // 知识点标签名
  stem: string;
  options: QuestionOption[];
  answer: string[]; // 选项键 / 判断 T|F / 填空答案 / 简答参考答案
  explanation: string; // 详细解析（纯文本/markdown）
  wrong_reason?: Record<string, string>; // 常见错误原因 keyed by option key
  related_questions?: string[];
  tags: string[];
  estimated_time: number; // 秒
  source_type?: string; // "generated" | "official" | ...
}

// =============== 模拟考试 ===============
export interface Exam {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  questionIds: string[];
  timeLimitMinutes: number;
  passingScore: number; // 0-100
}

// =============== 案例训练 ===============
export interface Case {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  tags: string[];
  backgroundMarkdown: string;
  tasksMarkdown: string;
  referenceMarkdown: string;
  knowledgePoints: string[];
  estimatedMinutes: number;
}

// =============== 学习路线 ===============
export interface LearningRoute {
  id: string;
  slug: string;
  title: string;
  summary: string;
  steps: LearningRouteStep[];
}

export interface LearningRouteStep {
  order: number;
  title: string;
  description: string;
  courseId?: string;
  lessonId?: string;
  knowledgePointId?: string;
}

// =============== 标签 ===============
export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// =============== 术语表 ===============
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  aliases?: string[];
}

// =============== FAQ ===============
export interface FaqItem {
  id: string;
  question: string;
  answer: string; // markdown
  category: string;
}

// =============== 搜索结果 ===============
export interface SearchResult {
  type:
    | "course"
    | "lesson"
    | "knowledge"
    | "question"
    | "case"
    | "route"
    | "faq"
    | "glossary";
  id: string;
  title: string;
  summary: string;
  url: string;
  tags?: string[];
}

// =============== localStorage 进度模型 ===============
export interface ProgressRecord {
  lessonId: string;
  status: "not-started" | "in-progress" | "completed";
  updatedAt: string;
}

export interface FavoriteRecord {
  type: "lesson" | "knowledge" | "question" | "case";
  id: string;
  addedAt: string;
}

export interface WrongQuestionRecord {
  questionId: string;
  wrongCount: number;
  lastAnswer: string[];
  lastAt: string;
}

export interface ExamRecord {
  examId: string;
  startedAt: string;
  finishedAt: string;
  score: number; // 0-100
  passed: boolean;
  durationSeconds: number;
  details: ExamDetailItem[];
}

export interface ExamDetailItem {
  questionId: string;
  userAnswer: string[];
  correct: boolean;
}
