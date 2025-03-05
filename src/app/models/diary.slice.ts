import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[]
}

export const initialDiaryState: DiarySlice = {
  diaryEntries: [
    {
      date: "2025-03-05",
      id: "1",
      stomach: 7,
      sleepQuality: 2,
    }
  ],
}
