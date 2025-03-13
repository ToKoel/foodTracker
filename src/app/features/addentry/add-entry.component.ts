import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonNote, IonText, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from "ionicons";
import { closeOutline, trashOutline } from "ionicons/icons";
import { DiaryEntry, FoodEntry } from "../../models/diary-entry.model";
import { DiaryStore } from "../../models/diary.store";
import { TextFieldEnum } from "./enums/text-field-enum";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrl: "./add-entry.component.scss",
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonNote,
    IonText,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
})
export class AddEntryComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor() {
    addIcons({ closeOutline, trashOutline });
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.diaryStore.setAddEntryModalState(false);
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.diaryStore.setAddEntryModalState(false);
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  TextFieldEnum = TextFieldEnum;
  foodInputEntries: FoodEntry[] = [];
  foodInput: string[] = [];
  drinksInput: string = "";
  sleepQuality: number = 5;
  stomach: number = 5;
  medication: string = "";
  dateInput: string = new Date().toISOString();
  activity: boolean = false;
  lastMealTimeHour: string = "0";
  lastMealTimeMinute: string = "0";

  diaryStore = inject(DiaryStore);
  currentEntrySignal = this.diaryStore.currentEntry;
  _vcRef = inject(ViewContainerRef);

  ngOnInit(): void {
    const currentEntry = this.currentEntrySignal();
    if (currentEntry) {
      this.foodInputEntries = currentEntry.food!;
      // this.drinksInput = currentEntry.drinks?.join(",")!;
      this.sleepQuality = currentEntry.sleepQuality;
      this.stomach = currentEntry.stomach;
      this.medication = currentEntry.medication?.join(",")!;
      this.dateInput = currentEntry.date;
      this.activity = currentEntry.activity!;
      if (currentEntry.lastMealTime) {
        this.lastMealTimeHour = currentEntry.lastMealTime.split(":")[0];
        this.lastMealTimeMinute = currentEntry.lastMealTime.split(":")[1];
      }
    }
  }

  saveEntry() {
    const existingId = this.currentEntrySignal()?.id;
    const newEntry: DiaryEntry = {
      id: existingId || new Date().toISOString(),
      date: this.dateInput,
      food: this.foodInputEntries,
      // drinks: this.drinksInput.split(",").map(d => d.trim()),
      medication: this.medication.split(",").map(d => d.trim()),
      sleepQuality: this.sleepQuality,
      stomach: this.stomach,
      activity: this.activity,
      lastMealTime: [this.lastMealTimeHour, this.lastMealTimeMinute].join(":"),
    };
    this.diaryStore.addOrUpdateEntry(newEntry);
  }

  onTimeChange(event: any) {
    this.lastMealTimeHour = event.value.getHours();
    this.lastMealTimeMinute = event.value.getMinutes();
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
      case TextFieldEnum.DRINKS:
        this.drinksInput = event.value;
        break;
      case TextFieldEnum.MEDS:
        this.medication = event.value;
        break;
    }
  }
}

