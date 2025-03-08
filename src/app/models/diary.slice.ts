import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[],
  selectedId: string
}

export const initialDiaryState: DiarySlice = {
  selectedId: undefined,
  diaryEntries: [
  ],
}

export type PersistedDiarySlice = Pick<DiarySlice, 'diaryEntries'>;
