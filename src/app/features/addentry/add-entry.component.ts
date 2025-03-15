import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPopover, IonText, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline, closeOutline, trashOutline } from "ionicons/icons";
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
  ],
})
export class AddEntryComponent {
  @ViewChild(IonModal) modal!: IonModal;
  _vcRef = inject(ViewContainerRef);
  currentEntry: DiaryEntry | undefined;

  mealTime = new Date().toISOString();
  mealInput = "";
  drinksInput = "";
  drinksQuantity = 1;

  addEntryStore = inject(AddEntryStore);
  diaryStore = inject(DiaryStore);

  constructor() {
    addIcons({ addOutline, closeOutline, trashOutline });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.diaryStore.setAddEntryModalState(false);
  }

  addFoodEntry() {
    this.addEntryStore.addFoodEntry(this.mealInput, this.mealTime);
    this.mealInput = "";
    this.mealTime = new Date().toISOString();
  }

  onStomachSliderChange(event: any) {
  }

  onSleepSliderChange(event: any) {
  }
}

