import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AddEntryComponent } from "./add-entry.component";

export const routes: Routes = [
  {
    path: "",
    component: AddEntryComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)]
})
export class AddEntryRoutingModule { }
