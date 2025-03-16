import { PartialStateUpdater } from "@ngrx/signals";
import { AddEntrySlice } from "../store/add-entry.store";
import { DrinkEntry, FoodEntry } from "src/app/models/diary-entry.model";

export function removeFoodEntry(id: number): PartialStateUpdater<AddEntrySlice> {
  return state => {
    let entries: FoodEntry[] = state.food.filter(entry => entry.id !== id);
    return {
      food: [...entries]
    }
  }
}

export function removeDrinksEntry(id: number): PartialStateUpdater<AddEntrySlice> {
  return state => {
    let drinks: DrinkEntry[] = state.drinks.filter(entry => entry.id !== id);
    return {
      drinks: [...drinks]
    }
  }
}

export function foodEntryUpdater(id: number | undefined, ingredients: string, mealTime: string): PartialStateUpdater<AddEntrySlice> {
  return state => {
    let entries: FoodEntry[] = state.food;
    let updateEntries: FoodEntry[];
    const index = entries.findIndex(existing => existing.id === id);
    const food = ingredients.split(",");
    const newEntry: FoodEntry = {
      id: id ? id : state.food.length + 1,
      ingredients: food,
      time: mealTime
    };
    if (index !== -1) {
      entries[index] = { ...entries[index], ...newEntry };
      updateEntries = [...entries];
    } else {
      updateEntries = [...entries, newEntry];
    }
    return {
      food: updateEntries
    }
  }
}

export function drinksEntryUpdater(id: number | undefined, drink: string, drinksQuantity: number): PartialStateUpdater<AddEntrySlice> {
  return state => {
    let entries: DrinkEntry[] = state.drinks;
    let updateEntries: DrinkEntry[];
    const newEntry: DrinkEntry = {
      id: id ? id : state.drinks.length + 1,
      name: drink,
      quantity: drinksQuantity
    };

    let index = entries.findIndex(existing => existing.id === id);
    if (index === -1) {
      index = entries.findIndex(existing => existing.name === drink);
      if (index !== -1) {
        newEntry.quantity = newEntry.quantity + entries[index].quantity;
      }
    }

    if (index !== -1) {
      entries[index] = { ...entries[index], ...newEntry };
      updateEntries = [...entries];
    } else {
      updateEntries = [...entries, newEntry];
    }
    return {
      drinks: updateEntries
    }
  }
}
