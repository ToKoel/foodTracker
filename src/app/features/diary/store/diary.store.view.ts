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

  items = items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const dates = [] as HighlightedDate[];
  items.forEach(item => {
    const highlightedDate: HighlightedDate = {
      date: item.date.substring(0, 10),
      textColor: "#f6f8fc",
      backgroundColor: item.average < 5 ? "#c5000f" : "#2dd55b"
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

