import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonSegmentButton, IonSegment, IonLabel } from '@ionic/angular/standalone';
import { DiaryComponent } from '../component/diary.component';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DiaryStore } from '../store/diary.store';
import { TranslocoPipe } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diary-page',
  templateUrl: 'diary.page.html',
  styleUrls: ['diary.page.scss'],
  imports: [IonHeader, TranslocoPipe, IonSegmentButton, IonLabel, CommonModule, IonSegment, IonToolbar, IonTitle, IonContent, DiaryComponent, IonIcon, IonButtons, IonButton,
  ],
})
export class DiaryPage {
  constructor() {
    addIcons({ addOutline });
  }
  diaryStore = inject(DiaryStore);


}


