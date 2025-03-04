import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';


export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./features/diary/diary.component").then(m => m.DiaryComponent)
  },
  {
    path: "add-entry",
    loadComponent: () => import("./features/addentry/add-entry.component").then(m => m.AddEntryComponent)
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
