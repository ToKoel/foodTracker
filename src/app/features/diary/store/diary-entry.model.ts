export interface DiaryEntry {
  id: number;
  date: string;
  food: FoodEntry[];
  drinks: DrinkEntry[];
  medication: string[];
  stomach: number;
  sleepQuality: number;
  sleepTime: string;
  activity: boolean;
  heartburn: boolean;
}

export interface FoodEntry {
  id: number,
  time: string,
  ingredients: string[]
}

export interface DrinkEntry {
  id: number,
  name: string,
  quantity: number
}
