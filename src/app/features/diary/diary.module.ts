import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { DiaryComponent } from "./diary.component";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { DiaryRoutingModule } from "./diary-routing.module";

@NgModule({
  declarations: [
    DiaryComponent
  ],
  imports: [
    NativeScriptCommonModule, DiaryRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DiaryModule { }
