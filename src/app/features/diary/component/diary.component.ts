import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from "@ionic/angular/standalone";
import { DiaryStore } from '../store/diary.store';
import { AddEntryComponent } from "../addentry/add-entry.component";

@Component({
  selector: "diary-component",
  templateUrl: "./diary.component.html",
  styleUrl: "./diary.component.scss",
  imports: [IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonLabel, IonList, CommonModule, AddEntryComponent],
})
export class DiaryComponent {
  diaryStore = inject(DiaryStore);

  viewEntry(itemTapEvent: any) {
    const itemId = itemTapEvent.view.bindingContext.id;
    // this.diaryStore.setSelected(itemId);
  }

  navigateToAddEntry() {
    // this.diaryStore.setSelected('');
  }

  onItemClick(itemId: string) {
    // this.diaryStore.setSelected(itemId);
    this.diaryStore.openAddEntryModal();
  }

  export() {
    // this.diaryStore.export();
  }

}
