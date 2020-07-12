import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsHomeComponent } from './clients-home.component';

describe('ClientsHomeComponent', () => {
  let component: ClientsHomeComponent;
  let fixture: ComponentFixture<ClientsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
