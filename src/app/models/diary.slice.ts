import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[]
}

export const initialDiaryState: DiarySlice = {
  diaryEntries: [
    {
      id: '1',
      date: '2025-03-04',
      food: ['test'],
      drinks: ['testDrink'],
      notes: 'notest'
    }
  ],
}
