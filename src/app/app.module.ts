import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
