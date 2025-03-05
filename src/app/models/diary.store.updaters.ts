import { PartialStateUpdater } from "@ngrx/signals";
import { DiaryEntry } from "./diary-entry.model";
import { DiarySlice } from "./diary.slice";

export function updateEntries(entry: DiaryEntry): PartialStateUpdater<DiarySlice> {
  return state => {

    if (!entry.id) {
      return {
        diaryEntries: [...state.diaryEntries, entry],
        selectedId: undefined
      }
    }

    let entries = state.diaryEntries;
    const index = entries.findIndex(existing => existing.id === entry.id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...entry };
      return {
        diaryEntries: [...entries],
        selectedId: undefined,
      }
    }
  }
}

export function updateSelected(id: string): PartialStateUpdater<DiarySlice> {
  console.log("updating selected, ", id);
  return _ => ({ selectedId: id });
}
