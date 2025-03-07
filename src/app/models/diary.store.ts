import { patchState, signalStore, withComputed } from "@ngrx/signals"
import { initialDiaryState } from "./diary.slice"
import { withState, withMethods } from "@ngrx/signals"
import { DiaryEntry } from "./diary-entry.model"
import { updateEntries, updateSelected } from "./diary.store.updaters"
import { computed } from "@angular/core"
import { createDiaryView, getCurrentEntry } from "./diary.store.view"


export const DiaryStore = signalStore(
  { providedIn: 'root' },
  withState(initialDiaryState),
  withComputed(store => ({
    diaryView: computed(() => createDiaryView(store.diaryEntries())),
    currentEntry: computed(() => getCurrentEntry(store.selectedId(), store.diaryEntries())),
  })),
  withMethods(store => ({
    addEntry: (entry: DiaryEntry) => patchState(store, updateEntries(entry)),
    setSelected: (id: string) => patchState(store, updateSelected(id)),
  })),
)
