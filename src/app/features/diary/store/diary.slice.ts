import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[],
  selectedId: number | undefined;
  isAddEntryModalOpen: boolean;
  currentEntry: DiaryEntry | undefined;
  selectedView: string;
}

export const initialDiaryState: DiarySlice = {
  selectedId: undefined,
  isAddEntryModalOpen: false,
  currentEntry: undefined,
  selectedView: "calendar",
  diaryEntries: [],
}

export type PersistedDiarySlice = Pick<DiarySlice, 'diaryEntries'>;
