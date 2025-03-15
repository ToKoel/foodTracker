import { PartialStateUpdater } from "@ngrx/signals";
import { AddEntrySlice } from "../store/add-entry.store";


export function foodEntryUpdater(ingredients: string, mealTime: string): PartialStateUpdater<AddEntrySlice> {
  return state => {
    const food = ingredients.split(",");
    let foodEntries = [...state.food!, { ingredients: food, time: mealTime }];
    return {
      food: foodEntries
    }
  }
}
