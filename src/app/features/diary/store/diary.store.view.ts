import { DiaryEntry } from "./diary-entry.model";

export interface DiaryViewItem extends DiaryEntry {
  date: string,
  average: number,
  summary: string,
  statusColor: string,
}
export interface DiaryVm {
  readonly items: DiaryViewItem[],
  readonly modalOpen: boolean,
  readonly currentItem: DiaryEntry
}


export function createDiaryView(modalOpen: boolean, diaryEntries: DiaryEntry[], currentItem: DiaryEntry): DiaryVm {
  let items = diaryEntries.reduce((acc, current) => {
    const average = (current.stomach + current.sleepQuality) / 2;
    acc.push({
      ...current,
      average,
      summary: current.food!.join(', '),
      statusColor: average >= 7 ? 'green' : average <= 3 ? 'red' : 'white',
    });
    return acc;
  }, [] as DiaryViewItem[]);

  items = items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  return {
    items,
    modalOpen,
    currentItem
  };
}

