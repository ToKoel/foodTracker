import { computed, effect } from "@angular/core"
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem"
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { DiaryEntry } from "./diary-entry.model"
import { initialDiaryState } from "./diary.slice"
import { shareAppState } from "./diary.store.helpers"
import { removeEntry, setAddEntryModalState, updateEntries, updateSelected } from "./diary.store.updaters"
import { createDiaryView, getCurrentEntry } from "./diary.store.view"



export const DiaryStore = signalStore(
  { providedIn: 'root' },
  withState(initialDiaryState),
  withComputed(store => ({
    diaryView: computed(() => createDiaryView(store.diaryEntries())),
    currentEntry: computed(() => getCurrentEntry(store.selectedId(), store.diaryEntries())),
  })),
  withMethods(store => ({
    addOrUpdateEntry: (entry: DiaryEntry) => patchState(store, updateEntries(entry)),
    setSelected: (id: string) => patchState(store, updateSelected(id)),
    export: () => shareAppState(store.diaryEntries()),
    setAddEntryModalState: (isOpen: boolean) => patchState(store, setAddEntryModalState(isOpen)),
    removeEntry: (id: string) => patchState(store, removeEntry(id)),
  })),
  withHooks(store => ({
    onInit() {
      const readFile = async () => {
        const contents = await Filesystem.readFile({
          path: 'data.json',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        if (contents.data) {
          const diaryEntries = JSON.parse(contents.data as string) as DiaryEntry[];
          console.log(diaryEntries);
          patchState(store, { diaryEntries: diaryEntries });
        }
      };
      readFile();

      effect(() => {
        Filesystem.writeFile({
          path: 'data.json',
          data: JSON.stringify(store.diaryEntries()),
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        }).then(result => {
          console.log(result.uri);
        });
      })
    }
  }))
)
