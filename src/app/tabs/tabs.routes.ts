import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../features/diary/tab/diary.page').then((m) => m.DiaryPage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../features/statistics/tab/statistics.page').then((m) => m.StatisticsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
