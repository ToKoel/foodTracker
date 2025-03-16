import { DiaryEntry } from "./diary-entry.model";

export interface DiarySlice {
  diaryEntries: DiaryEntry[],
  selectedId: string | undefined;
  isAddEntryModalOpen: boolean;
}

export const initialDiaryState: DiarySlice = {
  selectedId: undefined,
  isAddEntryModalOpen: false,
  diaryEntries: [{
    date: "2025-03-12",
    sleepQuality: 2,
    stomach: 3,
    id: "1",
    sleepTime: "2025-03-12T22:30",
    food: [{ id: 1, ingredients: ["test", "test2"], time: "2025-03-12T10:10" },
    { id: 2, ingredients: ["test3"], time: "2025-03-12T12:15" }],
    drinks: [{ id: 1, name: "Cappuccino", quantity: 2 }],
    activity: false,
    medication: ["meds"]
  }
  ],
}

export type PersistedDiarySlice = Pick<DiarySlice, 'diaryEntries'>;
