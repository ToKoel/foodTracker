import { DiaryEntry } from "./diary-entry.model";

export interface DiaryViewItem extends DiaryEntry {
  date: string,
  average: number,
}


export function createDiaryView(diaryEntries: DiaryEntry[]): DiaryViewItem[] {
  console.log("recalculating", diaryEntries);
  const items = diaryEntries.reduce((acc, current) => {
    acc.push({
      ...current,
      average: (current.stomach + (10 - current.sleepQuality)) / 2,
    });
    return acc;
  }, [] as DiaryViewItem[]);

  return items;
}


export function getCurrentEntry(entryId: string | undefined, entries: DiaryEntry[]) {
  if (!entryId) {
    return undefined;
  }

  const index = entries.findIndex(existing => existing.id === entryId);
  if (index !== -1) {
    return entries[index];
  }
}
