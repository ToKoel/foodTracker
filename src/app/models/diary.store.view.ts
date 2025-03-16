import { DiaryEntry } from "./diary-entry.model";

export interface DiaryViewItem extends DiaryEntry {
  date: string,
  average: number,
  summary: string,
  statusColor: string,
}


export function createDiaryView(diaryEntries: DiaryEntry[]): DiaryViewItem[] {
  let items = diaryEntries.reduce((acc, current) => {
    console.log(current);
    const average = (current.stomach + (10 - current.sleepQuality)) / 2;
    acc.push({
      ...current,
      average,
      summary: current.food!.join(', '),
      statusColor: average >= 7 ? 'green' : average <= 3 ? 'red' : 'white',
    });
    return acc;
  }, [] as DiaryViewItem[]);

  items = items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
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
  return undefined;
}
