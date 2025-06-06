export function updateItemsStatusByIds<
  T extends { id: string | number; status?: boolean }
>(items: T[], idsToUpdate: string): T[] {
  const ids = idsToUpdate.split(',');

  return items.map((item) =>
    ids.includes(String(item.id)) ? { ...item, status: true } : item
  );
}
