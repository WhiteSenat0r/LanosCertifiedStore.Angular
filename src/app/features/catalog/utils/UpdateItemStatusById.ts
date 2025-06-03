export function updateItemStatusById<
  T extends { id: string | number; status?: boolean }
>(items: T[], idToUpdate: string | number): T[] {
  return items.map((item) =>
    item.id === idToUpdate ? { ...item, status: true } : item
  );
}
