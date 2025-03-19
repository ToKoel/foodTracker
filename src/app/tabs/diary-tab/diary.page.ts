import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { DiaryComponent } from '../../features/diary/diary.component';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DiaryStore } from '../../features/diary/store/diary.store';

@Component({
  selector: 'app-diary-page',
  templateUrl: 'diary.page.html',
  styleUrls: ['diary.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, DiaryComponent, IonIcon, IonButtons, IonButton,
  ],
})
export class DiaryPage {
  constructor() {
    addIcons({ addOutline });
  }
  diaryStore = inject(DiaryStore);

}


