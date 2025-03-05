import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[],
  selectedId: string
}

export const initialDiaryState: DiarySlice = {
  selectedId: undefined,
  diaryEntries: [
    {
      date: "2025-03-05",
      id: "1",
      stomach: 7,
      sleepQuality: 2,
      food: ["food"],
      drinks: ["drinks"],
      medication: ["meds"],
    }
  ],
}
