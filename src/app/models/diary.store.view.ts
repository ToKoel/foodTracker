import { DiaryEntry } from "./diary-entry.model";

export interface DiaryViewItem {
  date: string,
  average: number,
}


export function createDiaryView(diaryEntries: DiaryEntry[]): DiaryViewItem[] {

  const items = diaryEntries.reduce((acc, current) => {
    console.log(current);
    acc.push({
      date: current.date,
      average: (current.stomach + (10 - current.sleepQuality)) / 2,
    });
    return acc;
  }, [] as DiaryViewItem[]);

  console.log(items);
  return items;
}
