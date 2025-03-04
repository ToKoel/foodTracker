import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { DiaryComponent } from "./diary.component";

export const routes: Routes = [
  {
    path: "",
    component: DiaryComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)]
})
export class DiaryRoutingComponent { }
