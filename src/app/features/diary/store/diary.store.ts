import { computed, effect } from "@angular/core"
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem"
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { DiaryEntry } from "./diary-entry.model"
import { initialDiaryState } from "./diary.slice"
import { createDiaryEntry, dateSelected, drinksEntryUpdater, foodEntryUpdater, removeDiaryEntry, removeDrinksEntry, removeFoodEntry, saveDiaryEntry, setAddEntryModalState, setDate, setSelectedView, setSleepQuality, setStomachPain, updateSelected } from "./diary.store.updaters"
import { createDiaryView } from "./diary.store.view"

export const DiaryStore = signalStore(
  { providedIn: 'root' },
  withState(initialDiaryState),
  withComputed(store => ({
    diaryView: computed(() => {
      console.log("recalculated");
      let view = createDiaryView(
        store.isAddEntryModalOpen(),
        store.diaryEntries(),
        store.currentEntry()!,
        store.selectedView());
      console.log(view);
      return view;
    }),
  })),
  withMethods(store => ({
    addFoodEntry: (id: number | undefined, ingredients: string, mealTime: string) =>
      patchState(store, foodEntryUpdater(id, ingredients, mealTime)),
    removeFoodEntry: (id: number) => patchState(store, removeFoodEntry(id)),
    addDrinksEntry: (id: number | undefined, name: string, quantity: number) =>
      patchState(store, drinksEntryUpdater(id, name, quantity)),
    removeDrinksEntry: (id: number) => patchState(store, removeDrinksEntry(id)),
    createDiaryEntry: () => patchState(store, createDiaryEntry()),
    saveDiaryEntry: () => patchState(store, saveDiaryEntry()),
    removeDiaryEntry: (id: number) => patchState(store, removeDiaryEntry(id)),
    openAddEntryModal: () => patchState(store, setAddEntryModalState(true)),
    closeAddEntryModal: () => patchState(store, setAddEntryModalState(false)),
    selectItem: (diaryEntryId: number) => patchState(store, updateSelected(diaryEntryId)),
    setSleepQuality: (sleepQuality: number) => patchState(store, setSleepQuality(sleepQuality)),
    setStomachRating: (stomach: number) => patchState(store, setStomachPain(stomach)),
    setDate: (date: string) => patchState(store, setDate(date)),
    setSelectedView: (event: any) => patchState(store, setSelectedView(event.detail.value)),
    dateSelected: (event: any) => patchState(store, dateSelected(event.detail.value)),
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
        }).then(result => { });
      })
    }
  }))
)
