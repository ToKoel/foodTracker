import { CommonModule } from "@angular/common";
import { Component, effect, inject, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPopover, IonText, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline, closeOutline, trashOutline } from "ionicons/icons";
import { DiaryEntry } from "../../models/diary-entry.model";
import { DiaryStore } from "../../models/diary.store";
import { TextFieldEnum } from "./enums/text-field-enum";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrl: "./add-entry.component.scss",
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
export class AddEntryComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  diaryStore = inject(DiaryStore);
  _vcRef = inject(ViewContainerRef);
  currentEntry: DiaryEntry | undefined;

  mealTime = new Date();

  constructor() {
    addIcons({ addOutline, closeOutline, trashOutline });
    effect(() => {
      const currentEntry = this.diaryStore.currentEntry();
      if (currentEntry) {
        this.currentEntry = currentEntry;
      } else {
        const currentDate = new Date();
        this.currentEntry = {
          id: currentDate.toISOString(),
          date: currentDate.toISOString(),
          stomach: 5,
          sleepQuality: 5
        }
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.diaryStore.setAddEntryModalState(false);
  }


  ngOnInit(): void {
  }

  saveChanges() {
    this.diaryStore.addOrUpdateEntry(this.currentEntry!);
  }

  saveEntry() {
  }

  onMealTimeChange(event: any) {
    console.log(event);
    this.mealTime = event.detail.value;
  }

  onStomachSliderChange(event: any) {
  }

  onSleepSliderChange(event: any) {
  }

  onDateChange(event: any) {
  }

  onTextValueChange(event: any, component: TextFieldEnum) {
  }
}

