import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSvgComponent } from './login-svg.component';

describe('LoginSvgComponent', () => {
  let component: LoginSvgComponent;
  let fixture: ComponentFixture<LoginSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
