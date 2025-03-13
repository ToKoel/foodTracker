import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { DiaryComponent } from '../../features/diary/diary.component';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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
}
