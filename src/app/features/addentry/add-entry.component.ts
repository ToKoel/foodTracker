import { CommonModule } from "@angular/common";
import { Component, effect, inject, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPopover, IonRange, IonText, IonTitle, IonToolbar, RangeCustomEvent } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline, closeOutline, happyOutline, sadOutline, trashOutline } from "ionicons/icons";
import { DiaryStore } from "../../models/diary.store";
import { AddEntryStore } from "./store/add-entry.store";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrl: "./add-entry.component.scss",
  providers: [AddEntryStore],
  imports: [
    CommonModule,
    FormsModule,
    IonDatetime,
    IonPopover,
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
    IonListHeader,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonRange,
  ],
})
export class AddEntryComponent {
  @ViewChild(IonModal) modal!: IonModal;
  _vcRef = inject(ViewContainerRef);
  addEntryStore = inject(AddEntryStore);
  diaryStore = inject(DiaryStore);

  currentDate = new Date().toISOString();
  mealTime = new Date().toISOString();
  mealInput = "";
  drinksInput = "";
  drinksQuantity = 1;
  stomach = 5;
  sleepQuality = 5;
  sleepTime = new Date().toISOString();


  constructor() {
    addIcons({ happyOutline, sadOutline, addOutline, closeOutline, trashOutline });
    effect(() => {
      this.stomach = this.addEntryStore.stomach();
      this.sleepQuality = this.addEntryStore.sleepQuality();
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.diaryStore.setAddEntryModalState(false);
    this.resetDates();
  }

  saveChanges() {
    this.addEntryStore.saveChanges();
  }

  resetDates() {
    const date = new Date().toISOString();
    this.currentDate = date;
    this.mealTime = date;
    this.sleepTime = date;
  }

  dateChanged() {
    this.addEntryStore.setDate(this.currentDate);
  }

  onSliderChange(component: string, event: RangeCustomEvent) {
    if (component === "stomach") {
      this.addEntryStore.setStomachPain(this.stomach);
    } else {
      this.addEntryStore.setSleepQuality(this.sleepQuality);
    }
  }

  addFoodEntry() {
    this.addEntryStore.addFoodEntry(undefined, this.mealInput, this.mealTime);
    this.mealInput = "";
    this.mealTime = new Date().toISOString();
  }

  addDrinksEntry() {
    this.addEntryStore.addDrinksEntry(undefined, this.drinksInput, this.drinksQuantity);
    this.drinksInput = "";
    this.drinksQuantity = 1;
  }
}

