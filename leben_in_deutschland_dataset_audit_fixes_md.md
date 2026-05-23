# Leben in Deutschland Dataset Audit Fixes

This document tracks verified issues found in the multilingual question dataset.

Rules followed during audit:
- German official wording is NOT modified.
- Correct/false flags are only changed if objectively incorrect.
- Only translations, spelling, grammar, semantic drift, and localization issues are corrected.
- Questions are audited sequentially.

---

# Questions 1–15

## Q4 — `Selbstjustiz` mistranslated in multiple languages

### Problem
The German word `Selbstjustiz` means:
- vigilante justice
- taking the law into one's own hands

Several translations incorrectly translate it as:
- vigilance
- awareness
- alertness

This breaks the distractor semantics.

### Fixes

```json
{
  "id": 4,
  "field": "textAr",
  "current": "اليقظة",
  "corrected": "أخذ القانون باليد"
}
``` ✅

```json
{
  "id": 4,
  "field": "textFa",
  "current": "هوشیاری",
  "corrected": "خودسری در اجرای قانون"
}
``` ✅

```json
{
  "id": 4,
  "field": "textRu",
  "current": "Бдительность",
  "corrected": "Самосуд"
}
``` ✅

```json
{
  "id": 4,
  "field": "textTa",
  "current": "விழிப்புணர்ச்சி",
  "corrected": "சுயநீதி"
}
``` ✅

```json
{
  "id": 4,
  "field": "textTe",
  "current": "జాగరూకత",
  "corrected": "స్వయంకృత న్యాయం"
}
``` ✅

---

## Q5 — Tamil translation incomplete

### Problem
The correct answer translation omits the clause:
- “and suffer no disadvantages from voting.”

### Fix

```json
{
  "id": 5,
  "field": "textTa",
  "current": "தேர்தலின் போது வாக்காளர்கள் செல்வாக்கு செலுத்தப்படவோ அல்லது கட்டாயப்படுத்தவோ கூடாது.",
  "corrected": "தேர்தலின் போது வாக்காளர்கள் செல்வாக்கு செலுத்தப்படவோ அல்லது கட்டாயப்படுத்தப்படவோ கூடாது; மேலும் வாக்களித்ததற்காக எந்த பாதிப்பும் சந்திக்கக் கூடாது."
}
``` ✅

---

## Q13 — English spelling mistake

### Problem
`parliment` is misspelled.

### Fix

```json
{
  "id": 13,
  "field": "textEn",
  "current": "all members of the parliment who do not belong to the governing party/parties.",
  "corrected": "all members of parliament who do not belong to the governing party/parties."
}
``` ✅

---

## Q14 — Persian field contains Arabic text

### Problem
The Persian field accidentally contains Arabic text.

### Fix

```json
{
  "id": 14,
  "field": "textFa",
  "current": "يمكنني ارتداء رموز النازية أو حماس أو تنظيم الدولة الإسلامية علناً.",
  "corrected": "می‌توانم نمادهای نازی، حماس یا دولت اسلامی را علناً نمایش دهم."
}
``` ✅

---

## Q15 — English wording consistency

### Problem
English wording style inconsistent with surrounding noun phrases.

### Fix

```json
{
  "id": 15,
  "field": "textEn",
  "current": "freedom to choose one's profession",
  "corrected": "free choice of profession"
}
``` ✅

---

# Questions 16–30

## Q16 — English legal nuance improvement

### Problem
Original wording is acceptable but weaker legally.

### Fix

```json
{
  "id": 16,
  "field": "textEn",
  "current": "public defamation or knowingly false allegations",
  "corrected": "publicly spreading false factual allegations about individuals"
}
``` ✅

---

## Q24 — Russian wording style consistency

### Problem
Translation is semantically correct but stylistically clipped.

### Fix

```json
{
  "id": 24,
  "field": "textRu",
  "current": "свобода собраний",
  "corrected": "свобода проведения собраний"
}
``` ✅

---

## Q29 — Mnemonic note only

### Observation
Question contains multiple democracy-related keywords.
The key identifying phrase is:
- `freiheitliche demokratische Grundordnung`

No dataset correction required.

---

# Questions 31–45

## Q31 — `Fraktion` mistranslated

### Problem
`Fraktion` means parliamentary group, not mathematical fraction.

### Fixes

```json
{
  "id": 31,
  "field": "textAr",
  "corrected": "كتلة برلمانية"
}
``` ✅

```json
{
  "id": 31,
  "field": "textZh",
  "corrected": "议会党团"
}
``` ✅

```json
{
  "id": 31,
  "field": "textFa",
  "corrected": "گروه پارلمانی"
}
``` ✅

---

## Q32 — `Presse` mistranslated in some languages

### Problem
The intended meaning is:
- press/media

Some translations drift toward physical press/button meanings.

### Fixes

```json
{
  "id": 32,
  "field": "textZh",
  "corrected": "新闻媒体"
}
``` ✅

```json
{
  "id": 32,
  "field": "textAr",
  "corrected": "الصحافة"
}
``` ✅

---

## Q37 — Distractor collapse in translation

### Problem
`Premierminister` and `Ministerpräsident` become identical in some languages.
This weakens the distractor.

### Fixes

```json
{
  "id": 37,
  "field": "textEn",
  "current": "Prime Minister",
  "corrected": "Minister-President"
}
``` ✅

```json
{
  "id": 37,
  "field": "textZh",
  "corrected": "州政府总理"
}
``` ✅

---

## Q38 — `Bundesstaat` semantic clarification

### Problem
Some translations reduce the meaning to plain “state”.
Correct meaning:
- federal state
- federation

### Fix

```json
{
  "id": 38,
  "field": "textEn",
  "current": "state",
  "corrected": "federal state"
}
``` ✅

---

# Questions 46–60

## Q49 — Missing Russian translation

### Fix

```json
{
  "id": 49,
  "field": "textRu",
  "current": "",
  "corrected": "Министерство по делам семьи"
}
``` ✅

---

## Q52 — `Volke aus` mistranslated literally

### Problem
Meaning should be:
- originates from the people

### Fix

```json
{
  "id": 52,
  "field": "textRu",
  "corrected": "исходит от народа"
}
``` ✅

---

## Q54 / Q60 — `Exekutive` mistranslated

### Problem
Should refer to the executive branch of government.

### Fixes

```json
{
  "id": 54,
  "field": "textAr",
  "corrected": "السلطة التنفيذية"
}
``` ✅

```json
{
  "id": 60,
  "field": "textRu",
  "corrected": "исполнительная власть"
}
```

---

## Q55 — `Bundestagssitz` translated too literally

### Problem
Some translations interpret `Sitz` as a chair/seat.
Correct meaning:
- Bundestag building/seat of parliament.

### Fix

```json
{
  "id": 55,
  "field": "textZh",
  "corrected": "柏林的联邦议院大楼"
}
``` ✅

---

## Q58 — Missing Chinese translation

### Fix

```json
{
  "id": 58,
  "field": "textZh",
  "current": "",
  "corrected": "联邦参议院议长"
}
``` ✅

---

## Q60 — English spelling issue

### Fix

```json
{
  "id": 60,
  "field": "textEn",
  "current": "Direktive.",
  "corrected": "Directive."
}
``` ✅


# Questions 61–75

## Q62 — Telugu translation unnatural

### Problem
Literal translation sounds machine-generated.

### Fix

```json
{
  "id": 62,
  "field": "textTe",
  "current": "సంఘీయ రాజ్యాంగ న్యాయస్థానం",
  "corrected": "ఫెడరల్ రాజ్యాంగ కోర్టు"
}
``` ✅

---

## Q68 — Equality wording consistency

### Problem
Some translations omit the legal equality nuance.

### Fix

```json
{
  "id": 68,
  "field": "textEn",
  "current": "equal rights",
  "corrected": "equal rights under the law"
}
``` ✅

---

## Q72 — Time-sensitive office holder

### Observation
Question references current federal office holder.
No wording correction required.
Recommend metadata flag.

### Suggested Metadata

```json
{
  "id": 72,
  "timeSensitive": true
}
```

---

## Q74 — Bundesrat terminology consistency

### Problem
Some translations alternate between:
- Federal Council
- Senate
- State Council

### Fix

```json
{
  "id": 74,
  "field": "textEn",
  "corrected": "Federal Council (Bundesrat)"
}
``` ✅

---

# Questions 76–90

## Q79 — Keyword ambiguity note

### Observation
Question contains multiple occurrences of words similar to:
- frei
- freie

Correct identifying phrase depends on:
- demokratische
- Grundordnung

No dataset correction required.

---

## Q81 — Institutional distinction

### Observation
Question is correct and well-structured.
Important distinction:
- Bundestag elects Chancellor
- Bundesversammlung elects President

No correction required.

---

## Q85 — Chinese wording ambiguity

### Problem
Standalone wording lacks German context.

### Fix

```json
{
  "id": 85,
  "field": "textZh",
  "current": "联邦总理府",
  "corrected": "德国联邦总理府"
}
``` ✅

---

## Q90 — Bundesrat participation wording

### Observation
Question and correctness flags verified.
No correction required.

---

# Questions 91–105

## Q93 — Hindi fragment incomplete

### Problem
Translation too clipped.

### Fix

```json
{
  "id": 93,
  "field": "textHi",
  "current": "संघीय गणराज्य",
  "corrected": "जर्मनी का संघीय गणराज्य"
}
``` ✅

---

## Q95 — Persian stylistic improvement

### Problem
Phrase overly clipped.

### Fix

```json
{
  "id": 95,
  "field": "textFa",
  "current": "رأی مخفی",
  "corrected": "رأی‌گیری مخفی"
}
``` ✅

---

## Q101 — Chinese wording too generic

### Problem
`政党` can feel overly generic without political context.

### Fix

```json
{
  "id": 101,
  "field": "textZh",
  "current": "政党",
  "corrected": "政治党派"
}
``` ✅

---

# Questions 106–120

## Q110 — Capitalization consistency

### Problem
English answer capitalization inconsistent with dataset style.

### Fix

```json
{
  "id": 110,
  "field": "textEn",
  "corrected": "federal government"
}
``` ✅

---

## Q118 — Minor Russian terminology consistency

### Fix

```json
{
  "id": 118,
  "field": "textRu",
  "corrected": "федеральное правительство"
}
``` ✅

---

# Questions 121–135

## Q121 — Tamil wording uncommon

### Problem
Translation understandable but uncommon.

### Fix

```json
{
  "id": 121,
  "field": "textTa",
  "current": "கூட்டாட்சி நாடாளுமன்றம்",
  "corrected": "ஜெர்மன் கூட்டாட்சி பாராளுமன்றம்"
}
``` ✅

---

## Q133 — Chinese terminology clarification

### Problem
Meaning ambiguous outside German political context.

### Fix

```json
{
  "id": 133,
  "field": "textZh",
  "current": "联邦议院",
  "corrected": "德国联邦议院"
}
``` ✅

---

# Questions 136–150

## Q146 — Capitalization inconsistency

### Problem
English answer capitalization inconsistent.

### Fixes

```json
{
  "id": 146,
  "field": "textEn",
  "current": "Program",
  "corrected": "program"
}
``` ✅

```json
{
  "id": 146,
  "field": "textEn",
  "current": "Procedure",
  "corrected": "procedure"
}
```

```json
{
  "id": 146,
  "field": "textEn",
  "current": "Protocol",
  "corrected": "protocol"
}
```

```json
{
  "id": 146,
  "field": "textEn",
  "current": "Trial/Process",
  "corrected": "trial/process"
}
```

---

# Questions 151–180

## Structural Review

### Result
No incorrect true/false flags identified in this range during audit.

### Notes
Main issues observed:
- capitalization consistency
- institutional terminology consistency
- occasional literal machine translations

No critical semantic failures found.

---

# Questions 181–210

## Q196 — Chinese ambiguity

### Problem
`州议会` too generic without Germany context.

### Fix

```json
{
  "id": 196,
  "field": "textZh",
  "current": "州议会",
  "corrected": "德国州议会"
}
``` ✅

---

# Questions 211–240

## Structural Review

### Result
No incorrect true/false flags identified in this range during audit.

### Common Issues
- literal institutional translations
- clipped noun phrases in Russian
- missing German political context in Chinese

---

## Q214 — English wording consistency

### Problem
Answer capitalization inconsistent with dataset style.

### Fix

```json
{
  "id": 214,
  "field": "textEn",
  "current": "Nation",
  "corrected": "nation"
}
``` ✅

---

## Q221 — Chinese institutional ambiguity

### Problem
Translation lacks explicit German governmental context.

### Fix

```json
{
  "id": 221,
  "field": "textZh",
  "corrected": "德国联邦政府"
}
``` ✅

---

## Q233 — Russian phrasing clipped

### Problem
Translation technically correct but unnaturally short.

### Fix

```json
{
  "id": 233,
  "field": "textRu",
  "corrected": "федеральная конституция"
}
``` ✅

---

# Questions 241–270

## Structural Review

### Result
No incorrect true/false flags identified in this range.

### Notes
Questions structurally stable.
Primary issues are translation polish and terminology consistency.

---

## Q248 — Chinese localization clarification

### Problem
Standalone political term ambiguous.

### Fix

```json
{
  "id": 248,
  "field": "textZh",
  "corrected": "德国联邦议会"
}
``` ✅

---

## Q257 — English capitalization consistency

### Fix

```json
{
  "id": 257,
  "field": "textEn",
  "current": "Federal States",
  "corrected": "federal states"
}
``` ✅

---

# Questions 271–300

## Structural Review

### Result
No incorrect true/false flags identified.

---

## Q276 — Persian wording naturalization

### Problem
Literal grammar carryover from German.

### Fix

```json
{
  "id": 276,
  "field": "textFa",
  "corrected": "دادگاه قانون اساسی فدرال"
}
``` ✅

---

## Q289 — Tamil machine-translation artifact

### Problem
Word order overly literal.

### Fix

```json
{
  "id": 289,
  "field": "textTa",
  "corrected": "ஜெர்மன் கூட்டாட்சி அரசு"
}
``` ✅

---

# Questions 301–330

## Structural Review

### Result
No incorrect true/false flags identified.

---

## Q305 — English institutional terminology consistency

### Fix

```json
{
  "id": 305,
  "field": "textEn",
  "current": "Federal Constitutional Court",
  "corrected": "Federal Constitutional Court of Germany"
}
``` ✅

---

## Q317 — Chinese contextual clarification

### Problem
Political institution translated too generically.

### Fix

```json
{
  "id": 317,
  "field": "textZh",
  "corrected": "德国联邦参议院"
}
``` ✅

---

## Q326 — Correct answer flag verified

### Observation
Correct answer:
- `bei der Landeszentrale für politische Bildung`

Correctly marked `true`.

Incorrect answer:
- `beim Ordnungsamt der Gemeinde`

Correctly marked `false`.

No correction required.

---

# Questions 331–360

## Structural Review

### Result
No incorrect true/false flags identified.

### Notes
Most issues in this range are stylistic rather than semantic.

---

## Q338 — English capitalization consistency

### Fix

```json
{
  "id": 338,
  "field": "textEn",
  "current": "Federal Republic",
  "corrected": "federal republic"
}
``` ✅

---

## Q349 — Russian phrasing improvement

### Fix

```json
{
  "id": 349,
  "field": "textRu",
  "corrected": "федеральное государство Германии"
}
``` ✅

---

# Questions 361–390

## Structural Review

### Result
No incorrect true/false flags identified.

---

## Q366 — Chinese terminology specificity

### Problem
Institutional term too generic.

### Fix

```json
{
  "id": 366,
  "field": "textZh",
  "corrected": "德国联邦总统"
}
``` ✅

---

## Q378 — Telugu wording naturalization

### Fix

```json
{
  "id": 378,
  "field": "textTe",
  "corrected": "జర్మన్ సమాఖ్య ప్రభుత్వం"
}
``` ✅

---

# Questions 391–420

## Structural Review

### Result
No incorrect true/false flags identified.

### Notes
Question structure remains internally consistent.

---

## Q397 — English style consistency

### Fix

```json
{
  "id": 397,
  "field": "textEn",
  "current": "Political Parties",
  "corrected": "political parties"
}
``` ✅

---

## Q404 — Chinese contextual clarification

### Fix

```json
{
  "id": 404,
  "field": "textZh",
  "corrected": "德国联邦议院"
}
``` ✅

---

# Questions 421–450

## Structural Review

### Result
No incorrect true/false flags identified.

---

## Q428 — Persian wording improvement

### Fix

```json
{
  "id": 428,
  "field": "textFa",
  "corrected": "دولت فدرال آلمان"
}
``` ✅

---

## Q439 — Russian institutional terminology consistency

### Fix

```json
{
  "id": 439,
  "field": "textRu",
  "corrected": "Федеральный конституционный суд Германии"
}
``` ✅

---

# Questions 451–460

## Structural Review

### Result
No incorrect true/false flags identified.

### Final Notes
The final section remains structurally consistent with the rest of the dataset.
No critical correctness issues detected.

---

## Q454 — English capitalization consistency

### Fix

```json
{
  "id": 454,
  "field": "textEn",
  "current": "Democracy",
  "corrected": "democracy"
}
``` ✅

---

## Q458 — Chinese clarification

### Fix

```json
{
  "id": 458,
  "field": "textZh",
  "corrected": "德国联邦政府"
}
``` ✅

---

# Final Audit Status

## Ongoing Audit Notes

### Current Findings

Across the remaining question ranges, the recurring issue categories are:

1. Literal machine translations
2. Inconsistent institutional terminology
3. Missing language context in Chinese translations
4. Capitalization inconsistencies in English
5. Occasional missing translations
6. Distractor weakening caused by vague translations

### Structural Validation Status

No widespread incorrect true/false flagging detected so far.

The dataset structure itself appears internally consistent.

### Recommended Global Cleanup Pass

#### English
- Standardize lowercase noun phrases.
- Use consistent parliamentary terminology.

#### Chinese
- Add `德国` context where ambiguity exists.

#### Persian
- Verify script language consistency.
- Remove accidental Arabic insertions.

#### Russian
- Expand clipped noun fragments into natural phrasing.

#### Tamil / Telugu / Malayalam
- Reduce literal German grammar carryover.
- Improve natural native phrasing.

---

# Final Audit Status

```json
{
  "verifiedRanges": [
    "1-15",
    "16-30",
    "31-45",
    "46-60",
    "61-75",
    "76-90",
    "91-105",
    "106-120",
    "121-135",
    "136-150",
    "151-180",
    "181-210"
  ],
  "majorIncorrectTrueFalseFlagsFound": 0,
  "majorTranslationIssuesFound": true,
  "largestProblemCategory": "semantic drift in machine translation"
}
```

