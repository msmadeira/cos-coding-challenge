import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthenticationService } from './core/services/authentication.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authenticationService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        AuthenticationService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();

    authenticationService = TestBed.inject(AuthenticationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when #validatingToken is true', () => {
    authenticationService.validatingToken = true;
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('cos-loader'));

    expect(loader).toBeTruthy();
  });

  it('should hide loader when #validatingToken is false', () => {
    authenticationService.validatingToken = false
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('cos-loader'));

    expect(loader).toBeFalsy();
  });
});
