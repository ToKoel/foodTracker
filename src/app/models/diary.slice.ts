import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[]
}

export const initialDiaryState: DiarySlice = {
  diaryEntries: [
  ],
}
