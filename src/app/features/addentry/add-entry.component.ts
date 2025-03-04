import { Component, inject } from "@angular/core";
import { NativeScriptCommonModule, RouterExtensions } from "@nativescript/angular";
import { diaryStore } from "../../models/diary.store";
import { DiaryEntry } from "../../models/diary-entry.model";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  imports: [NativeScriptCommonModule],
})
export class AddEntryComponent {
  foodInput: string = "";
  drinksInput: string = "";
  notesInput: string = "";

  diaryStore = inject(diaryStore);
  router = inject(RouterExtensions);

  saveEntry() {
    const newEntry: DiaryEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
      food: this.foodInput.split(",").map(f => f.trim()),
      drinks: this.drinksInput.split(",").map(d => d.trim()),
      notes: this.notesInput
    };
    this.diaryStore.addEntry(newEntry);

    this.router.navigate(["/"]);
  }
}

