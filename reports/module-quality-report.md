# Module Quality Report

Generated: 2026-06-30T04:41:03.913Z
Module path: /mnt/d/Wonderful/openskill-galaxy/03-modules/module-digital-logic

## 1. Data Scale

| Data Type | Count |
|-----------|------|
| courses | 20 |
| lessons | 237 |
| knowledge-points | 809 |
| questions | 5000 |
| exams | 120 |
| cases | 250 |
| routes | 25 |
| glossary | 358 |
| faqs | 220 |
| tags | 564 |

## 2. Question Type Distribution

| Type | Count |
|------|------|
| single | 2000 |
| multiple | 800 |
| judge | 600 |
| fill | 500 |
| short | 400 |
| calculation | 400 |
| case_analysis | 300 |

## 3. Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|------|------------|
| easy | 1859 | 37.2% |
| medium | 2207 | 44.1% |
| hard | 934 | 18.7% |

## 4. Duplicate IDs

✅ No duplicate IDs found.

## 5. Reference Integrity

✅ All key references are valid.

## 6. File Sizes

| File | Size (KB) |
|------|-----------|
| questions.json | 5189.8 |
| knowledge-points.json | 760.1 |
| lessons.json | 231.5 |
| cases.json | 230.6 |
| exams.json | 95.5 |
| faqs.json | 66.3 |
| tags.json | 52.3 |
| glossary.json | 50.7 |
| routes.json | 30.8 |
| courses.json | 12.4 |
| search-index.json | 2052.7 |

## 7. Search Index

✅ search-index.json exists (2052.7 KB)

## 8. Optimization Suggestions

- **questions.json** is large (5190 KB). Consider splitting or lazy-loading.

## 9. Next Steps

- Replace generated questions with real textbook/exam questions (source_type: "official")
- Enrich knowledge-point contentMarkdown with detailed derivations and diagrams
- Add more case_analysis questions for practical scenarios
- Run validate-module.mjs after any data changes