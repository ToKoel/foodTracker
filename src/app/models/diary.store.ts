import { patchState, signalStore, withComputed, withHooks, withProps } from "@ngrx/signals"
import { initialDiaryState, PersistedDiarySlice } from "./diary.slice"
import { withState, withMethods } from "@ngrx/signals"
import { DiaryEntry } from "./diary-entry.model"
import { removeEntry, saveToFile, setAddEntryModalState, updateEntries, updateSelected } from "./diary.store.updaters"
import { computed, effect, inject, Signal } from "@angular/core"
import { createDiaryView, getCurrentEntry } from "./diary.store.view"
import { shareAppState } from "./diary.store.helpers"
import { Storage } from "@ionic/storage-angular"
import { toSignal } from '@angular/core/rxjs-interop';
import { from, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem"
import { rxMethod } from "@ngrx/signals/rxjs-interop";



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
