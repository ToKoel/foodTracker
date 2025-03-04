import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';


export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./features/diary/diary.module").then(m => m.DiaryModule)
  },
  {
    path: "add-entry",
    loadComponent: () =>
      import("./features/addentry/add-entry.module").then(m => m.AddEntryModule)
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
