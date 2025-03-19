import { TestBed } from "@angular/core/testing";
import { DiaryEntry } from "../../../models/diary-entry.model";
import { AddEntryStore } from "../store/add-entry.store";

describe('DiaryStore', () => {
  it("should add entries", () => {
    const store = TestBed.inject(AddEntryStore);
    let entry: DiaryEntry = {
      id: "1",
      date: "2025-01-01",
      food: [{ ingredients: ["test"], time: "2025-01-01T14:11", id: 1 }],
      drinks: [{ name: "testDrink", id: 1, quantity: 1 }],
      medication: [] as string[],
      activity: false,
      sleepQuality: 5,
      stomach: 5,
      sleepTime: "2025-01-01"
    }
    store.setCurrentEntry(entry);
    expect(store.food()).toHaveLength(1);
  });

});
