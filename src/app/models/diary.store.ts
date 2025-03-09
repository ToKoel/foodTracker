import { patchState, signalStore, withComputed, withHooks, withProps } from "@ngrx/signals"
import { initialDiaryState, PersistedDiarySlice } from "./diary.slice"
import { withState, withMethods } from "@ngrx/signals"
import { DiaryEntry } from "./diary-entry.model"
import { saveToFile, updateEntries, updateSelected } from "./diary.store.updaters"
import { computed, effect, Signal } from "@angular/core"
import { createDiaryView, getCurrentEntry } from "./diary.store.view"
import { knownFolders, path, File } from "@nativescript/core"
import { shareAppState } from "./diary.store.helpers"


export const DiaryStore = signalStore(
  { providedIn: 'root' },
  withState(initialDiaryState),
  withProps(_ => {
    const _documentsFolder = knownFolders.documents();
    const _filePath = path.join(_documentsFolder.path, 'diaryEntries.json');
    return {
      _diaryFile: File.fromPath(_filePath),
    }
  }),
  withComputed(store => ({
    diaryView: computed(() => createDiaryView(store.diaryEntries())),
    currentEntry: computed(() => getCurrentEntry(store.selectedId(), store.diaryEntries())),
  })),
  withMethods(store => ({
    addOrUpdateEntry: (entry: DiaryEntry) => patchState(store, updateEntries(entry)),
    setSelected: (id: string) => patchState(store, updateSelected(id)),
    export: () => shareAppState(store.diaryEntries()),
  })),
  withHooks(store => ({
    onInit() {
      const persisted: Signal<PersistedDiarySlice> = computed(() => ({
        diaryEntries: store.diaryEntries(),
      }));

      store._diaryFile.readText()
        .then((content) => {
          const diaryEntries = JSON.parse(content) as PersistedDiarySlice;
          patchState(store, diaryEntries);
        })
        .catch((error) => {
          console.log('Error reading diary entries:', error);
        });

      effect(() => {
        saveToFile(store._diaryFile, persisted());
      });
    }
  }))
)
