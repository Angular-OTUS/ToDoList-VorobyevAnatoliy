export function getNextId<T extends { id: number }>(list: T[]): number {
  if (list.length === 0) {
    return 1;
  }
  return Math.max(...list.map(t => t.id)) + 1;
}
