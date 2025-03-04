import { PartialStateUpdater } from "@ngrx/signals";
import { DiaryEntry } from "./diary-entry.model";
import { DiarySlice } from "./diary.slice";

export function updateEntries(entry: DiaryEntry): PartialStateUpdater<DiarySlice> {
  return state => ({
    diaryEntries: [...state.diaryEntries, entry]
  })
}
