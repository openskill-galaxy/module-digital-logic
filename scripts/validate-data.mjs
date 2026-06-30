#!/usr/bin/env node
// Lightweight data validation for CI — no external dependencies
import fs from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'public', 'data');

const REQUIRED_FILES = [
  'courses.json', 'lessons.json', 'knowledge-points.json', 'questions.json',
  'exams.json', 'cases.json', 'routes.json', 'glossary.json', 'faqs.json',
  'tags.json', 'module.json', 'search-index.json',
];

let errors = 0;

async function loadJson(file) {
  const raw = await fs.readFile(resolve(dataDir, file), 'utf8');
  return JSON.parse(raw);
}

function err(msg) {
  console.log(`  ❌ ${msg}`);
  errors++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

async function main() {
  console.log('\n=== Validate Static Data ===\n');

  // 1. Required files exist and are valid JSON
  console.log('--- File Existence & JSON Parse ---');
  for (const f of REQUIRED_FILES) {
    try {
      const stat = await fs.stat(resolve(dataDir, f));
      await loadJson(f);
      ok(`${f} (${(stat.size/1024).toFixed(0)} KB)`);
    } catch (e) {
      err(`${f}: ${e.message}`);
    }
  }

  // 2. Load core data
  console.log('\n--- Duplicate ID Check ---');
  const filesToCheck = ['courses','lessons','knowledge-points','questions','exams','cases','routes','glossary','faqs','tags'];
  const data = {};
  for (const f of filesToCheck) {
    try { data[f] = await loadJson(`${f}.json`); } catch { data[f] = []; }
  }

  for (const [name, arr] of Object.entries(data)) {
    if (!Array.isArray(arr)) continue;
    const ids = arr.map(i => i?.id).filter(Boolean);
    const unique = new Set(ids);
    if (ids.length !== unique.size) {
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      err(`${name}.json: ${new Set(dupes).size} duplicate ID(s)`);
    } else {
      ok(`${name}.json: ${ids.length} unique IDs`);
    }
  }

  // 3. Reference checks
  console.log('\n--- Reference Integrity ---');
  const courseIds = new Set(data.courses.map(c => c.id));
  const lessonIds = new Set(data.lessons.map(l => l.id));
  const kpIds = new Set(data['knowledge-points'].map(k => k.id));
  const qIds = new Set(data.questions.map(q => q.id));

  let refErrors = 0;

  // courses.lessons → lessons
  for (const c of data.courses) {
    for (const lid of (c.lessons || [])) {
      if (!lessonIds.has(lid)) refErrors++;
    }
  }

  // lessons.courseId → courses
  for (const l of data.lessons) {
    if (!courseIds.has(l.courseId)) refErrors++;
  }

  // lessons.knowledgePoints → knowledge-points
  for (const l of data.lessons) {
    for (const kpid of (l.knowledgePoints || [])) {
      if (!kpIds.has(kpid)) refErrors++;
    }
  }

  // exams.questionIds → questions
  for (const e of data.exams) {
    for (const qid of (e.questionIds || [])) {
      if (!qIds.has(qid)) refErrors++;
    }
  }

  // questions.related_questions → questions
  for (const q of data.questions) {
    for (const rid of (q.related_questions || [])) {
      if (!qIds.has(rid)) refErrors++;
    }
  }

  if (refErrors === 0) ok('All key references valid');
  else err(`${refErrors} missing reference(s)`);

  // 4. search-index.json has entries
  console.log('\n--- Search Index ---');
  try {
    const si = await loadJson('search-index.json');
    if (Array.isArray(si) && si.length > 0) ok(`search-index.json: ${si.length} entries`);
    else err('search-index.json is empty or not an array');
  } catch {
    err('search-index.json missing or invalid');
  }

  // Verdict
  console.log('\n' + '='.repeat(40));
  if (errors === 0) {
    console.log('✅ VALIDATION PASSED');
    process.exit(0);
  } else {
    console.log(`❌ VALIDATION FAILED (${errors} error(s))`);
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
