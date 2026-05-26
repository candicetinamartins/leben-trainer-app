# Graph Report - lidphoneapp  (2026-05-24)

## Corpus Check
- 14 files · ~1,303,653 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 65 nodes · 89 edges · 3 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fdd8a7d5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `FlashcardApp` - 21 edges
2. `FlashcardApp` - 21 edges
3. `MainActivity` - 7 edges
4. `Activity` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (19 total, 3 thin omitted)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FlashcardApp` connect `Community 0` to `Community 8`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `FlashcardApp` connect `Community 1` to `Community 9`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._