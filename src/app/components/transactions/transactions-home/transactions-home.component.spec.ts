import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHomeComponent } from './transactions-home.component';

describe('TransactionsHomeComponent', () => {
  let component: TransactionsHomeComponent;
  let fixture: ComponentFixture<TransactionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
