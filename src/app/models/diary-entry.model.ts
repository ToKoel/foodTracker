export interface DiaryEntry {
  id: string;
  date: string;
  food?: string[];
  drinks?: string[];
  medication?: string[];
  stomach: number;
  sleepQuality: number;
  lastMealTime?: string;
  activity?: boolean;
}
