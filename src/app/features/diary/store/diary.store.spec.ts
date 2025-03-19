import { TestBed } from "@angular/core/testing"
import { DiaryStore } from "./diary.store"
import { DiaryEntry } from "./diary-entry.model";

describe('DiaryStore', () => {
  it("should add entries", () => {
    const store = TestBed.inject(DiaryStore);
    let entry: DiaryEntry = {
      id: "1",
      date: "2025-01-01",
      stomach: 2,
      sleepQuality: 2
    }
    store.addOrUpdateEntry(entry);
    expect(store.diaryEntries()).toHaveLength(1);
  });

  it("should update entries", () => {
    const store = TestBed.inject(DiaryStore);
    let entry: DiaryEntry = {
      id: "1",
      date: "2025-01-01",
      stomach: 2,
      sleepQuality: 2
    }
    store.addOrUpdateEntry(entry);

    let entryToBeUpdated = store.diaryEntries()[0];
    entryToBeUpdated.stomach = 3;

    store.addOrUpdateEntry(entryToBeUpdated);
    const entries = store.diaryEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].stomach).toBe(3);
    expect(entries[0].sleepQuality).toBe(2);
    expect(entries[0].date).toBe("2025-01-01");
  })
});
