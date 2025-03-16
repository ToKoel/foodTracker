import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPopover, IonRange, IonText, IonTitle, IonToolbar, RangeCustomEvent } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline, closeOutline, happyOutline, sadOutline, trashOutline } from "ionicons/icons";
import { DiaryEntry } from "../../models/diary-entry.model";
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

  currentDate = new Date().toISOString();

  mealTime = this.currentDate;
  mealInput = "";
  drinksInput = "";
  drinksQuantity = 1;
  stomach = 5;
  sleepQuality = 5;

  addEntryStore = inject(AddEntryStore);
  diaryStore = inject(DiaryStore);

  constructor() {
    addIcons({ happyOutline, sadOutline, addOutline, closeOutline, trashOutline });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.diaryStore.setAddEntryModalState(false);
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
    this.mealTime = this.currentDate;
  }

  addDrinksEntry() {
    this.addEntryStore.addDrinksEntry(undefined, this.drinksInput, this.drinksQuantity);
    this.drinksInput = "";
    this.drinksQuantity = 1;
  }
}

