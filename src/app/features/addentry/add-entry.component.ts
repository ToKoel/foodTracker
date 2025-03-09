import { Component, inject, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { DiaryStore } from "../../models/diary.store";
import { DiaryEntry } from "../../models/diary-entry.model";
import { TextFieldEnum } from "./enums/text-field-enum";

@Component({
  moduleId: module.id,
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrl: "./add-entry.component.css",
  standalone: false,
})
export class AddEntryComponent implements OnInit {
  TextFieldEnum = TextFieldEnum;
  foodInput: string = "";
  drinksInput: string = "";
  sleepQuality: number = 5;
  stomach: number = 5;
  medication: string = "";
  dateInput: string = new Date().toISOString();

  diaryStore = inject(DiaryStore);
  router = inject(RouterExtensions);
  currentEntrySignal = this.diaryStore.currentEntry;

  ngOnInit(): void {
    const currentEntry = this.currentEntrySignal();
    if (currentEntry) {
      this.foodInput = currentEntry.food?.join(",");
      this.drinksInput = currentEntry.drinks?.join(",");
      this.sleepQuality = currentEntry.sleepQuality;
      this.stomach = currentEntry.stomach;
      this.medication = currentEntry.medication?.join(",");
      this.dateInput = currentEntry.date;
    }
  }

  saveEntry() {
    const existingId = this.currentEntrySignal()?.id;
    const newEntry: DiaryEntry = {
      id: existingId || new Date().toISOString(),
      date: this.dateInput,
      food: this.foodInput.split(",").map(f => f.trim()),
      drinks: this.drinksInput.split(",").map(d => d.trim()),
      medication: this.medication.split(",").map(d => d.trim()),
      sleepQuality: this.sleepQuality,
      stomach: this.stomach,
    };
    this.diaryStore.addOrUpdateEntry(newEntry);
    this.router.navigate([""], { clearHistory: true });
  }

  onStomachSliderChange(event: any) {
    this.stomach = Math.round(event.value);
  }

  onSleepSliderChange(event: any) {
    this.sleepQuality = Math.round(event.value);
  }

  onDateChange(event: any) {
    this.dateInput = event.value;
  }

  onTextValueChange(event: any, component: TextFieldEnum) {
    switch (component) {
      case TextFieldEnum.FOOD:
        this.foodInput = event.value;
        break;
      case TextFieldEnum.DRINKS:
        this.drinksInput = event.value;
        break;
      case TextFieldEnum.MEDS:
        this.medication = event.value;
        break;
    }
  }
}

