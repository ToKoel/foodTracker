import { Component, inject, NO_ERRORS_SCHEMA } from "@angular/core";
import { diaryStore } from "../../models/diary.store";
import { NativeScriptCommonModule, RouterExtensions } from "@nativescript/angular";

@Component({
  moduleId: module.id,
  standalone: false,
  selector: "diary",
  templateUrl: "./diary.component.html",
  styleUrl: "./diary.component.css"
})
export class DiaryComponent {
  diaryStore = inject(diaryStore);
  router = inject(RouterExtensions);



  viewEntry(event: any) {
    console.log("clicked");
  }

  navigateToAddEntry() {
    this.router.navigate(["add-entry"]);
  }


}
