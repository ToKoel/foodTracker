import { patchState, signalStore, withComputed } from "@ngrx/signals"
import { initialDiaryState } from "./diary.slice"
import { withState, withMethods } from "@ngrx/signals"
import { DiaryEntry } from "./diary-entry.model"
import { updateEntries } from "./diary.store.updaters"
import { computed } from "@angular/core"
import { createDiaryView } from "./diary.store.view"



export const diaryStore = signalStore(
  { providedIn: 'root' },
  withState(initialDiaryState),
  withComputed(store => ({
    diaryView: computed(() => createDiaryView(store.diaryEntries())),
  })),
  withMethods(store => ({
    addEntry: (entry: DiaryEntry) => patchState(store, updateEntries(entry)),
  }))
)
