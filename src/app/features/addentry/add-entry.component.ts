import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPopover, IonText, IonTitle, IonToolbar } from "@ionic/angular/standalone";
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
    IonItemOptions,
    IonItemOption,
    IonItemSliding
  ],
})
export class AddEntryComponent {
  @ViewChild(IonModal) modal!: IonModal;
  _vcRef = inject(ViewContainerRef);


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

