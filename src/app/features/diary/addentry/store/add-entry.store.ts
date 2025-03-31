import { computed, inject } from "@angular/core";
import { signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { DiaryStore } from "../../../diary/store/diary.store";
import { buildAddEntryVm } from "./add-entry.store.updaters";
import { setSleepQuality, setStomachPain } from "../../store/diary.store.updaters";

export interface AddEntrySlice { };
export const initialAddEntrySlice: AddEntrySlice = {};

export const AddEntryStore = signalStore(
  { providedIn: 'root' },
  withState(initialAddEntrySlice),
  withProps(_ => ({
    _diaryStore: inject(DiaryStore),
  })),
  withMethods(store => ({
    addFoodEntry: store._diaryStore.addFoodEntry,
    addDrinksEntry: store._diaryStore.addDrinksEntry,
    removeEntry: store._diaryStore.removeDiaryEntry,
    removeFoodEntry: store._diaryStore.removeFoodEntry,
    removeDrinksEntry: store._diaryStore.removeDrinksEntry,
    saveChanges: store._diaryStore.saveDiaryEntry,
    setStomachPain: store._diaryStore.setStomachRating,
    setSleepQuality: store._diaryStore.setSleepQuality,
    setDate: store._diaryStore.setDate,
    toggleActivity: store._diaryStore.toggleActivity,
    toggleHeartburn: store._diaryStore.toggleHeartburn
  })),
  withComputed(store => ({
    addEntryVm: computed(() => buildAddEntryVm(store._diaryStore.currentEntry()!)),
  })),
)
