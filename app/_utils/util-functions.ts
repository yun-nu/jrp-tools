export function findAllSubsetsWithItemRange(
  nums: number[],
  target: number | null,
  minItems: number,
  maxItems: number
): number[][] {
  const results: number[][] = [];

  function dfs(i: number, total: number, count: number, path: number[]) {
    if (target === null) return [];

    if (total >= target && count >= minItems && count <= maxItems) {
      results.push([...path]);
      // Don't return here; keep searching for more
    }
    if (i >= nums.length || count > maxItems) return;
    dfs(i + 1, total + nums[i], count + 1, [...path, i]);
    dfs(i + 1, total, count, path);
  }

  dfs(0, 0, 0, []);
  return results;
}

export function pickSubsetByFewestItemsAndMinimalSum(
  nums: number[],
  subsets: number[][]
): number[] | null {
  if (subsets.length === 0) return null;
  // Step 1: Find the minimum length among all subsets
  const minLength = Math.min(...subsets.map((s) => s.length));
  // Step 2: Filter to only those with the minimum length
  const smallestSubsets = subsets.filter((s) => s.length === minLength);
  // Step 3: Among those, pick the one with the minimal sum
  return smallestSubsets.reduce((a, b) =>
    b.reduce((sum, idx) => sum + nums[idx], 0) <
    a.reduce((sum, idx) => sum + nums[idx], 0)
      ? b
      : a
  );
}
