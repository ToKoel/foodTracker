import { Component, inject } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { diaryStore } from "../../models/diary.store";
import { DiaryEntry } from "../../models/diary-entry.model";

@Component({
  moduleId: module.id,
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  standalone: false,
})
export class AddEntryComponent {
  foodInput: string = "";
  drinksInput: string = "";
  notesInput: string = "";
  sleepQuality: number = 5;
  stomach: number = 5;
  medication: string = "";

  diaryStore = inject(diaryStore);
  router = inject(RouterExtensions);

  saveEntry() {
    const newEntry: DiaryEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
      food: this.foodInput.split(",").map(f => f.trim()),
      drinks: this.drinksInput.split(",").map(d => d.trim()),
      medication: this.medication.split(",").map(d => d.trim()),
      sleepQuality: this.sleepQuality,
      stomach: this.stomach,
    };
    this.diaryStore.addEntry(newEntry);

    this.router.navigate([""]);
  }

  onStomachSliderChange(event: any) {
    this.stomach = Math.round(event.value);
  }

  onSleepSliderChange(event: any) {
    this.sleepQuality = Math.round(event.value);
  }
}

