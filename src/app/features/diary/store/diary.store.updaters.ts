import { PartialStateUpdater } from "@ngrx/signals";
import { DiaryEntry, DrinkEntry, FoodEntry } from "./diary-entry.model";
import { DiarySlice, PersistedDiarySlice } from "./diary.slice";

export function updateEntries(entry: DiaryEntry): PartialStateUpdater<DiarySlice> {
  return state => {
    let entries: DiaryEntry[] = state.diaryEntries;
    let updateEntries: DiaryEntry[];
    const index = entries.findIndex(existing => existing.id === entry.id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...entry };
      updateEntries = [...entries];
    } else {
      updateEntries = [...entries, entry];
    }
    return {
      diaryEntries: updateEntries,
      selectedId: undefined
    }
  }
}

export function setAddEntryModalState(isOpen: boolean): PartialStateUpdater<DiarySlice> {
  return _ => ({
    isAddEntryModalOpen: isOpen
  });
}

export function saveToFile(diaryFile: File, persistedValue: PersistedDiarySlice) {
  console.log("saving");
  // if (diaryFile.isLocked) {
  //   return;
  // }
  // diaryFile.writeText(JSON.stringify(persistedValue))
  //   .then(() => {
  //     console.log('Diary entries saved successfully.');
  //   })
  //   .catch((error) => {
  //     console.error('Error saving diary entries:', error);
  //   });
}

export function removeDiaryEntry(id: number): PartialStateUpdater<DiarySlice> {
  return state => {
    const filtered = state.diaryEntries.filter(entry => entry.id !== id);
    return {
      diaryEntries: [...filtered],
      isAddEntryModalOpen: false
    }
  }
}

export function foodEntryUpdater(foodEntryId: number | undefined, ingredients: string, mealTime: string): PartialStateUpdater<DiarySlice> {
  console.log(foodEntryId, ingredients, mealTime);
  return state => {
    let diaryEntry = state.currentEntry!;
    let foodEntries: FoodEntry[] = diaryEntry.food;
    let updatedEntries: FoodEntry[];
    const food = ingredients.split(",");
    const newEntry: FoodEntry = {
      id: foodEntryId ? foodEntryId : foodEntries.length + 1,
      ingredients: food,
      time: mealTime
    };

    const index = foodEntries.findIndex(existing => existing.id === foodEntryId);
    if (index !== -1) {
      foodEntries[index] = { ...foodEntries[index], ...newEntry };
      updatedEntries = [...foodEntries];
    } else {
      updatedEntries = [...foodEntries, newEntry];
    }
    diaryEntry.food = updatedEntries;

    return {
      currentEntry: { ...diaryEntry }
    }
  }
}

export function saveDiaryEntry(): PartialStateUpdater<DiarySlice> {
  return state => {
    const index = state.diaryEntries.findIndex(entry => entry.id === state.currentEntry!.id);
    if (index !== -1) {
      let diaryEntries = state.diaryEntries;
      diaryEntries[index] = { ...diaryEntries[index], ...state.currentEntry! };
      return {
        diaryEntries: [...diaryEntries],
        isAddEntryModalOpen: false
      }
    }
    return {
      diaryEntries: [...state.diaryEntries, state.currentEntry!],
      isAddEntryModalOpen: false
    }
  }
}

export function createDiaryEntry(): PartialStateUpdater<DiarySlice> {
  return state => {
    const newEntry: DiaryEntry = {
      id: state.diaryEntries.length + 1,
      date: new Date().toISOString(),
      food: [] as FoodEntry[],
      drinks: [] as DrinkEntry[],
      medication: [],
      sleepQuality: 5,
      stomach: 5,
      sleepTime: new Date().toISOString(),
      activity: false
    }
    return {
      currentEntry: newEntry,
      isAddEntryModalOpen: true
    }
  }
}

export function drinksEntryUpdater(id: number | undefined, drink: string, drinksQuantity: number): PartialStateUpdater<DiarySlice> {
  return state => {
    let diaryEntry = state.currentEntry!;
    let entries: DrinkEntry[] = diaryEntry.drinks;
    let updateEntries: DrinkEntry[];
    const newEntry: DrinkEntry = {
      id: id ? id : entries.length + 1,
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
    diaryEntry.drinks = updateEntries;
    return {
      currentEntry: { ...diaryEntry }
    }
  }
}

export function removeFoodEntry(id: number): PartialStateUpdater<DiarySlice> {
  return state => {
    let diaryEntry = state.currentEntry!;
    let entries: FoodEntry[] = diaryEntry.food.filter((entry: FoodEntry) => entry.id !== id);
    diaryEntry.food = entries;
    return {
      currentEntry: { ...diaryEntry }
    }
  }
}

export function removeDrinksEntry(id: number): PartialStateUpdater<DiarySlice> {
  return state => {
    let diaryEntry = state.currentEntry!;
    let entries: DrinkEntry[] = diaryEntry.drinks.filter((entry: DrinkEntry) => entry.id !== id);
    diaryEntry.drinks = entries;
    return {
      currentEntry: { ...diaryEntry }
    }
  }
}
export function updateSelected(id: number): PartialStateUpdater<DiarySlice> {
  return state => {
    const currentEntry = state.diaryEntries.find(entry => entry.id === id);
    return {
      currentEntry,
      isAddEntryModalOpen: true
    }
  }
}

export function setSleepQuality(sleepQuality: number): PartialStateUpdater<DiarySlice> {
  return state => {
    let entry = state.currentEntry!;
    entry.sleepQuality = sleepQuality;
    return {
      currentEntry: { ...entry }
    }
  }
}

export function setStomachPain(stomach: number): PartialStateUpdater<DiarySlice> {
  return state => {
    let entry = state.currentEntry!;
    entry.stomach = stomach;
    return {
      currentEntry: { ...entry }
    }
  }
}

export function setDate(date: string): PartialStateUpdater<DiarySlice> {
  return state => {
    let entry = state.currentEntry!;
    entry.date = date;
    return {
      currentEntry: { ...entry }
    }
  }
}
