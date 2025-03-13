import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryPage } from './tab1.page';

describe('Tab1Page', () => {
  let component: DiaryPage;
  let fixture: ComponentFixture<DiaryPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
