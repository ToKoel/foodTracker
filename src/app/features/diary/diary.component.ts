import { Component, inject } from "@angular/core";
import { diaryStore } from "../../models/diary.store";
import { NativeScriptCommonModule, RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "diary",
  templateUrl: "./diary.component.html",
  imports: [NativeScriptCommonModule]
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
