import { PartialStateUpdater } from "@ngrx/signals";
import { DiaryEntry } from "./diary-entry.model";
import { DiarySlice, PersistedDiarySlice } from "./diary.slice";

export function updateEntries(entry: DiaryEntry): PartialStateUpdater<DiarySlice> {
  return state => {
    let entries: DiaryEntry[] = state.diaryEntries;
    let updateEntries: DiaryEntry[];
    const index = entries.findIndex(existing => existing.id === entry.id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...entry };
      updateEntries = [...entries];
    } else {
      updateEntries = [...entries, entry];
    }
    return {
      diaryEntries: updateEntries,
      selectedId: undefined
    }
  }
}

export function setAddEntryModalState(isOpen: boolean): PartialStateUpdater<DiarySlice> {
  return _ => ({
    isAddEntryModalOpen: isOpen
  });
}

export function saveToFile(diaryFile: File, persistedValue: PersistedDiarySlice) {
  console.log("saving");
  // if (diaryFile.isLocked) {
  //   return;
  // }
  // diaryFile.writeText(JSON.stringify(persistedValue))
  //   .then(() => {
  //     console.log('Diary entries saved successfully.');
  //   })
  //   .catch((error) => {
  //     console.error('Error saving diary entries:', error);
  //   });
}

export function removeEntry(id: string): PartialStateUpdater<DiarySlice> {
  return state => {
    const filtered = state.diaryEntries.filter(entry => entry.id !== id);
    return {
      diaryEntries: [...filtered],
      isAddEntryModalOpen: false
    }
  }
}

export function updateSelected(id: string): PartialStateUpdater<DiarySlice> {
  return _ => ({ selectedId: id });
}
