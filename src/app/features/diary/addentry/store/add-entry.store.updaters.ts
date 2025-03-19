import { PartialStateUpdater } from "@ngrx/signals";
import { DrinkEntry, FoodEntry } from "../../../diary/store/diary-entry.model";
import { AddEntrySlice } from "./add-entry.store";

export function removeFoodEntry(id: number): PartialStateUpdater<AddEntrySlice> {
  return state => {
    let entries: FoodEntry[] = state.food.filter((entry: FoodEntry) => entry.id !== id);
    entries = entries.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
    return {
      food: [...entries]
    }
  }
}

export function removeDrinksEntry(id: number): PartialStateUpdater<AddEntrySlice> {
  return state => {
    let drinks: DrinkEntry[] = state.drinks.filter((entry: DrinkEntry) => entry.id !== id);
    return {
      drinks: [...drinks]
    }
  }
}

export function setSleepQuality(sleepQuality: number): PartialStateUpdater<AddEntrySlice> {
  return state => ({ sleepQuality })
}

export function setStomachPain(stomach: number): PartialStateUpdater<AddEntrySlice> {
  return state => ({ stomach })
}

export function setDate(date: string): PartialStateUpdater<AddEntrySlice> {
  return state => ({ date })
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
    updateEntries = updateEntries.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
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
    updateEntries = updateEntries.sort((a, b) => {
      if (!a) return -1;
      if (!b) return 1;
      return a.name.localeCompare(b.name, undefined, { 'sensitivity': 'base' })
    });
    return {
      drinks: updateEntries
    }
  }
}
