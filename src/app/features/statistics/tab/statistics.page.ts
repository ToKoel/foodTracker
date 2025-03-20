import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-statistics-page',
  templateUrl: 'statistics.page.html',
  styleUrls: ['statistics.page.scss'],
  imports: [TranslocoPipe, IonHeader, IonToolbar, IonContent, IonTitle]
})
export class StatisticsPage {

}
