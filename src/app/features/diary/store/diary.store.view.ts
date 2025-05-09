import { DiaryEntry } from "./diary-entry.model";

export interface DiaryViewItem extends DiaryEntry {
  date: string,
  average: number,
  summary: string,
  statusColor: string,
}

export interface HighlightedDate {
  date: string,
  textColor: string,
  backgroundColor: string
}

export interface DiaryVm {
  readonly items: DiaryViewItem[],
  readonly modalOpen: boolean,
  readonly currentItem: DiaryEntry
  readonly dates: HighlightedDate[],
  readonly selectedView: string,
}


export function createDiaryView(modalOpen: boolean, diaryEntries: DiaryEntry[], currentItem: DiaryEntry, selectedView: string): DiaryVm {
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

  items = items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const dates = [] as HighlightedDate[];
  items.forEach(item => {
    const highlightedDate: HighlightedDate = {
      date: item.date.substring(0, 10),
      textColor: item.average < 5 ? "var(--ion-color-danger-contrast)" : "var(--ion-color-light-contrast)",
      backgroundColor: item.average < 5 ? "var(--ion-color-danger)" : "var(--ion-color-light)"
    }
    dates.push(highlightedDate);
  });

  return {
    items,
    modalOpen,
    currentItem,
    dates,
    selectedView
  };
}

