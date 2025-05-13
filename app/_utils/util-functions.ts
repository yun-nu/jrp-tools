import { ExistingThread } from "../_schemas/Thread";

export function findThreadSubsetsByCommentRange(
  threads: ExistingThread[],
  target: number | null,
  minItems: number,
  maxItems: number
): ExistingThread[][] {
  const results: ExistingThread[][] = [];

  function dfs(
    i: number,
    total: number,
    count: number,
    path: ExistingThread[]
  ) {
    if (target === null) return;

    if (total >= target && count >= minItems && count <= maxItems) {
      results.push([...path]);
    }

    if (i >= threads.length || count > maxItems) return;

    dfs(i + 1, total + threads[i].commentCount, count + 1, [
      ...path,
      threads[i],
    ]);
    dfs(i + 1, total, count, path);
  }

  dfs(0, 0, 0, []);
  return results;
}

export function pickBestThreadSubsetByFewestItemsAndCommentSum(
  subsets: ExistingThread[][],
  tiebreaker: "oldest" | "newest" = "oldest"
): ExistingThread[] | null {
  if (subsets.length === 0) return null;

  const minLength = Math.min(...subsets.map((s) => s.length));
  const smallestSubsets = subsets.filter((s) => s.length === minLength);

  const minSum = Math.min(...smallestSubsets.map(sumCommentCount));
  const bestSumSubsets = smallestSubsets.filter(
    (s) => sumCommentCount(s) === minSum
  );

  // Tiebreaker:
  return bestSumSubsets.reduce((a, b) => {
    const dateA = oldestDate(a);
    const dateB = oldestDate(b);
    return tiebreaker === "oldest"
      ? dateA < dateB
        ? a
        : b
      : dateA > dateB
      ? a
      : b;
  });
}

function sumCommentCount(threads: ExistingThread[]): number {
  return threads.reduce((sum, t) => sum + t.commentCount, 0);
}

function oldestDate(threads: ExistingThread[]): Date {
  return threads.reduce(
    (oldest, t) => (t.date < oldest ? t.date : oldest),
    threads[0]?.date ?? new Date()
  );
}
