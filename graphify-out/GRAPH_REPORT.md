# Graph Report - lidphoneapp  (2026-06-28)

## Corpus Check
- 25 files · ~2,078,852 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 121 nodes · 158 edges · 5 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc1b0d78`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]

## God Nodes (most connected - your core abstractions)
1. `FlashcardApp` - 21 edges
2. `FlashcardApp` - 21 edges
3. `FlashcardApp` - 21 edges
4. `MainActivity` - 17 edges
5. `AppDelegate` - 9 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (29 total, 4 thin omitted)

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (3): AppDelegate, UIApplicationDelegate, UIResponder

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._