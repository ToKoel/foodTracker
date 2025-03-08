import { TestBed } from "@angular/core/testing"
import { DiaryStore } from "./diary.store"
import { DiaryEntry } from "./diary-entry.model";

describe('DiaryStore', () => {
  it("should add entries", () => {
    const store = TestBed.inject(DiaryStore);
    let entry: DiaryEntry = {
      id: undefined,
      date: "2025-01-01",
      stomach: 2,
      sleepQuality: 2
    }
    store.addEntry(entry);
    expect(store.diaryEntries()).toHaveLength(1);
  });
});
