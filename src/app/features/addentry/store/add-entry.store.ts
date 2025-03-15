import { signalStore, withState, withHooks, patchState, withMethods } from "@ngrx/signals"
import { FoodEntry, DrinkEntry } from "../../../../app/models/diary-entry.model"
import { DiaryStore } from "src/app/models/diary.store";
import { inject, effect } from "@angular/core";
import { foodEntryUpdater } from "./add-entry.store.updaters";

export interface AddEntrySlice {
  food: FoodEntry[],
  drinks: DrinkEntry[],
  medication: string[],
  activity: boolean,
  sleepQuality: number,
  stomach: number,
  date: string,
}

const initialSlice: AddEntrySlice = {
  food: [] as FoodEntry[],
  drinks: [] as DrinkEntry[],
  medication: [] as string[],
  activity: false,
  sleepQuality: 5,
  stomach: 5,
  date: new Date().toISOString(),
};

export const AddEntryStore = signalStore(
  withState(initialSlice),
  withMethods(store => ({
    addFoodEntry: (ingredients: string, mealTime: string) => patchState(store, foodEntryUpdater(ingredients, mealTime)),
  })),
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
