
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { AddEntryComponent } from "./add-entry.component";
import { AddEntryRoutingModule } from "./add-entry-routing.module";

@NgModule({
  declarations: [
    AddEntryComponent
  ],
  imports: [
    NativeScriptCommonModule, AddEntryRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AddEntryModule { }
