import { NgModule } from "@angular/core";
import { AddEntryComponent } from "./components/addentry/add-entry.component";
import { DiaryComponent } from "./features/diary/diary.component";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { NativeScriptCommonModule, NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    DiaryComponent,
    AddEntryComponent,
    DiaryComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptCommonModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
