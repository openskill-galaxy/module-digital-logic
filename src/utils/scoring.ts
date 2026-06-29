import type { Question, ExamDetailItem } from "../types";

// 比较用户答案与正确答案
export function isAnswerCorrect(q: Question, userAnswer: string[]): boolean {
  const norm = (arr: string[]) =>
    arr
      .map((s) => s.trim())
      .filter(Boolean)
      .sort()
      .join("|");

  // 文本类题型（简答/填空/计算/案例分析）：宽松匹配，忽略大小写与首尾空格
  if (["short", "fill", "calculation", "case_analysis"].includes(q.type)) {
    const candidates = q.answer
      .join("|")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    const ua = userAnswer.join("").trim();
    if (ua === "") return false;
    // 完全匹配任一候选
    if (candidates.some((c) => ua.toLowerCase() === c.toLowerCase())) return true;
    // 包含候选关键词（适用于简答/案例分析）
    if (q.type === "short" || q.type === "case_analysis") {
      return candidates.some((c) => ua.toLowerCase().includes(c.toLowerCase()));
    }
    return false;
  }

  // 选择/判断题：选项键忽略顺序比较
  return norm(q.answer) === norm(userAnswer);
}

// 单题得分权重（按难度）
export function questionWeight(q: Question): number {
  switch (q.difficulty) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
  }
}

// 计算考试详情
export function scoreExam(
  questions: Question[],
  userAnswers: Record<string, string[]>,
  passingScore: number
): {
  score: number;
  passed: boolean;
  details: ExamDetailItem[];
} {
  const details: ExamDetailItem[] = questions.map((q) => {
    const ua = userAnswers[q.id] || [];
    const correct = isAnswerCorrect(q, ua);
    return { questionId: q.id, userAnswer: ua, correct };
  });

  const totalWeight = questions.reduce((s, q) => s + questionWeight(q), 0);
  const gotWeight = questions.reduce(
    (s, q) =>
      s + (details.find((d) => d.questionId === q.id)?.correct ? questionWeight(q) : 0),
    0
  );
  const score = totalWeight === 0 ? 0 : Math.round((gotWeight / totalWeight) * 100);
  return { score, passed: score >= passingScore, details };
}

export function difficultyLabel(d: Question["difficulty"]): string {
  return d === "easy" ? "简单" : d === "medium" ? "中等" : "困难";
}

export function typeLabel(t: Question["type"]): string {
  const map: Record<Question["type"], string> = {
    single: "单选",
    multiple: "多选",
    judge: "判断",
    short: "简答",
    fill: "填空",
    calculation: "计算",
    case_analysis: "案例分析",
  };
  return map[t];
}
