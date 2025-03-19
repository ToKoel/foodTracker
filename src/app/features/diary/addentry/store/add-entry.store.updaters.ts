import { DiaryEntry } from "../../../diary/store/diary-entry.model";


export function buildAddEntryVm(entry: DiaryEntry) {
  if (!entry) {
    return entry;
  }
  const sortedFood = entry.food.sort((a, b) => {
    return a.time.substring(11).localeCompare(b.time.substring(11));
  });
  const sortedDrinks = entry.drinks.sort((a, b) => a.name.localeCompare(b.name,
    undefined, { 'sensitivity': 'base' }));
  console.log(sortedFood);

  return { ...entry, food: sortedFood, drinks: sortedDrinks };
}



