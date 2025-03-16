import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IonItem, IonLabel, IonList } from "@ionic/angular/standalone";
import { DiaryStore } from "../../models/diary.store";
import { AddEntryComponent } from "../addentry/add-entry.component";

@Component({
  selector: "diary-component",
  templateUrl: "./diary.component.html",
  styleUrl: "./diary.component.scss",
  imports: [IonItem, IonLabel, IonList, CommonModule, AddEntryComponent],
})
export class DiaryComponent {
  diaryStore = inject(DiaryStore);

  viewEntry(itemTapEvent: any) {
    const itemId = itemTapEvent.view.bindingContext.id;
    this.diaryStore.setSelected(itemId);
  }

  navigateToAddEntry() {
    this.diaryStore.setSelected('');
  }

  onItemClick(itemId: string) {
    console.log(itemId);
    this.diaryStore.setSelected(itemId);
    this.diaryStore.setAddEntryModalState(true);
  }

  export() {
    this.diaryStore.export();
  }

}
