import { TestBed } from "@angular/core/testing"
import { DiaryStore } from "./diary.store"

describe('DiaryStore', () => {
  it("should add entries", () => {
    const store = TestBed.inject(DiaryStore);
    expect(1 + 1).toBe(2);
  });
});
