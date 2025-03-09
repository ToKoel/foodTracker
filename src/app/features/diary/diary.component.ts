import { Component, inject, NO_ERRORS_SCHEMA } from "@angular/core";
import { DiaryStore } from "../../models/diary.store";
import { NativeScriptCommonModule, RouterExtensions } from "@nativescript/angular";

@Component({
  moduleId: module.id,
  standalone: false,
  selector: "diary",
  templateUrl: "./diary.component.html",
  styleUrl: "./diary.component.css"
})
export class DiaryComponent {
  diaryStore = inject(DiaryStore);
  router = inject(RouterExtensions);



  viewEntry(itemId: string) {
    this.diaryStore.setSelected(itemId);
    this.router.navigate(["add-entry"]);
  }

  navigateToAddEntry() {
    this.diaryStore.setSelected(undefined);
    this.router.navigate(["add-entry"]);
  }

  export() {
    this.diaryStore.export();
  }


}
