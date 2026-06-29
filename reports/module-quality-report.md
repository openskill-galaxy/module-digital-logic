# Module Quality Report

Generated: 2026-06-29T19:04:48.830Z
Module path: D:\Wonderful\openskill-galaxy\03-modules\module-digital-logic

## 1. Data Scale

| Data Type | Count |
|-----------|------|
| courses | 20 |
| lessons | 150 |
| knowledge-points | 620 |
| questions | 1511 |
| exams | 50 |
| cases | 120 |
| routes | 25 |
| glossary | 252 |
| faqs | 155 |
| tags | 564 |

## 2. Question Type Distribution

| Type | Count |
|------|------|
| single | 600 |
| multiple | 250 |
| judge | 200 |
| fill | 150 |
| short | 120 |
| calculation | 120 |
| case_analysis | 71 |

## 3. Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|------|------------|
| easy | 599 | 39.6% |
| medium | 626 | 41.4% |
| hard | 286 | 18.9% |

## 4. Duplicate IDs

✅ No duplicate IDs found.

## 5. Reference Integrity

✅ All key references are valid.

## 6. File Sizes

| File | Size (KB) |
|------|-----------|
| questions.json | 1594.0 |
| knowledge-points.json | 639.2 |
| cases.json | 136.7 |
| lessons.json | 126.0 |
| tags.json | 52.3 |
| faqs.json | 45.5 |
| exams.json | 38.1 |
| glossary.json | 36.8 |
| routes.json | 30.8 |
| courses.json | 10.2 |
| search-index.json | 853.8 |

## 7. Search Index

✅ search-index.json exists (853.8 KB)

## 8. Optimization Suggestions

- **questions.json** is large (1594 KB). Consider splitting or lazy-loading.

## 9. Next Steps

- Replace generated questions with real textbook/exam questions (source_type: "official")
- Enrich knowledge-point contentMarkdown with detailed derivations and diagrams
- Add more case_analysis questions for practical scenarios
- Run validate-module.mjs after any data changes