import { CommonModule } from "@angular/common";
import { Component, effect, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonButton, IonButtons, IonContent, IonDatetime, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonModal, IonNote, IonPopover, IonRange, IonText, IonTitle, IonToolbar, RangeCustomEvent } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline, closeOutline, happyOutline, sadOutline, trashOutline } from "ionicons/icons";
import { DiaryStore } from "../../diary/store/diary.store";
import { AddEntryStore } from "./store/add-entry.store";
import { TranslocoPipe } from "@jsverse/transloco";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrl: "./add-entry.component.scss",
  providers: [AddEntryStore],
  imports: [
    IonFooter,
    TranslocoPipe,
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

  convertDate(dateString: string) {
    let date = new Date(Date.parse(dateString));
    return new Date(date.getTime() -
      date.getTimezoneOffset() * 60000).toISOString();
  }

  timeChanged(time: any) {
    this.mealTime = time;
  }

  sleepTimeChanged(time: any) {
    this.sleepTime = time;
  }

  constructor() {
    addIcons({ happyOutline, sadOutline, addOutline, closeOutline, trashOutline });
    effect(() => {
      let addEntryVm = this.addEntryStore.addEntryVm();
      if (!addEntryVm) {
        return;
      }
      this.stomach = addEntryVm.stomach;
      this.sleepQuality = addEntryVm.sleepQuality;
    })
  }

  dateChanged() {
    this.addEntryStore.setDate(this.currentDate);
  }

  onSliderChange(component: string, _: RangeCustomEvent) {
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

