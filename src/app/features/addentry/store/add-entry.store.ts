import { signalStore, withState, withHooks, patchState, withMethods } from "@ngrx/signals"
import { FoodEntry, DrinkEntry, DiaryEntry } from "../../../../app/models/diary-entry.model"
import { DiaryStore } from "src/app/models/diary.store";
import { inject, effect } from "@angular/core";
import { drinksEntryUpdater, removeDrinksEntry, foodEntryUpdater, removeFoodEntry, setStomachPain, setSleepQuality, setDate } from "./add-entry.store.updaters";

export interface AddEntrySlice extends DiaryEntry { }

const initialSlice: AddEntrySlice = {
  food: [] as FoodEntry[],
  drinks: [] as DrinkEntry[],
  medication: [] as string[],
  activity: false,
  sleepQuality: 5,
  stomach: 5,
  date: new Date().toISOString(),
  id: "-1",
  sleepTime: new Date().toISOString(),
};

export const AddEntryStore = signalStore(
  withState(initialSlice),
  withMethods(store => {
    const diaryStore = inject(DiaryStore);
    return {
      addFoodEntry: (id: number | undefined, ingredients: string, mealTime: string) => patchState(store, foodEntryUpdater(id, ingredients, mealTime)),
      addDrinksEntry: (id: number | undefined, drinks: string, drinksQuantity: number) => patchState(store, drinksEntryUpdater(id, drinks, drinksQuantity)),
      removeFoodEntry: (id: number) => patchState(store, removeFoodEntry(id)),
      removeDrinksEntry: (id: number) => patchState(store, removeDrinksEntry(id)),
      setStomachPain: (level: number) => patchState(store, setStomachPain(level)),
      setSleepQuality: (level: number) => patchState(store, setSleepQuality(level)),
      setDate: (date: string) => patchState(store, setDate(date)),
      saveChanges: () => {
        const id = store.id() === "-1" ? "" + diaryStore.diaryEntries().length + 1 : store.id();
        const diaryEntry: DiaryEntry = {
          id,
          food: store.food(),
          drinks: store.drinks(),
          medication: store.medication(),
          activity: store.activity(),
          sleepQuality: store.sleepQuality(),
          stomach: store.stomach(),
          date: store.date(),
          sleepTime: store.sleepTime(),
        };
        diaryStore.addOrUpdateEntry(diaryEntry);
        diaryStore.setAddEntryModalState(false);
      }
    }
  }),
  withHooks(store => {
    const diaryStore = inject(DiaryStore);
    return {
      onInit() {
        effect(() => {
          const currentEntry = diaryStore.currentEntry();
          if (currentEntry) {
            patchState(store, { ...currentEntry });
          }
        });
      }
    }
  }),
)
