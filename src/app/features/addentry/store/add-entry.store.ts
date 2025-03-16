import { signalStore, withState, withHooks, patchState, withMethods } from "@ngrx/signals"
import { FoodEntry, DrinkEntry, DiaryEntry } from "../../../../app/models/diary-entry.model"
import { DiaryStore } from "src/app/models/diary.store";
import { inject, effect } from "@angular/core";
import { drinksEntryUpdater, foodEntryUpdater } from "./add-entry.store.updaters";

export interface AddEntrySlice {
  food: FoodEntry[],
  drinks: DrinkEntry[],
  medication: string[],
  activity: boolean,
  sleepQuality: number,
  stomach: number,
  date: string,
  id: string,
}

const initialSlice: AddEntrySlice = {
  food: [] as FoodEntry[],
  drinks: [] as DrinkEntry[],
  medication: [] as string[],
  activity: false,
  sleepQuality: 5,
  stomach: 5,
  date: new Date().toISOString(),
  id: new Date().toISOString(),
};

export const AddEntryStore = signalStore(
  withState(initialSlice),
  withMethods(store => {
    const diaryStore = inject(DiaryStore);
    return {
      addFoodEntry: (id: number | undefined, ingredients: string, mealTime: string) => patchState(store, foodEntryUpdater(id, ingredients, mealTime)),
      addDrinksEntry: (id: number | undefined, drinks: string, drinksQuantity: number) => patchState(store, drinksEntryUpdater(id, drinks, drinksQuantity)),
      saveChanges: () => {
        const diaryEntry: DiaryEntry = {
          id: store.id(),
          food: store.food(),
          drinks: store.drinks(),
          medication: store.medication(),
          activity: store.activity(),
          sleepQuality: store.sleepQuality(),
          stomach: store.stomach(),
          date: store.date(),
        };
        console.log(diaryEntry);
        diaryStore.addOrUpdateEntry(diaryEntry);
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
