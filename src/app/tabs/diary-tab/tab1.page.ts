import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { DiaryComponent } from '../../features/diary/diary.component';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, DiaryComponent, IonIcon, IonButtons, IonButton,
  ],
})
export class Tab1Page {
  constructor() {
    addIcons({ addOutline });
  }
}
