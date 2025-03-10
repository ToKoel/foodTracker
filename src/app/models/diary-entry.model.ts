export interface DiaryEntry {
  id: string;
  date: string;
  food?: FoodEntry[];
  drinks?: string[];
  medication?: string[];
  stomach: number;
  sleepQuality: number;
  lastMealTime?: string;
  activity?: boolean;
}

export interface FoodEntry {
  time: string,
  ingredients: string[]
}
