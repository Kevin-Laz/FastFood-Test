import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/auth`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // limpiar storage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token/role in localStorage', () => {
    const mockResponse: LoginResponse = { token: 'abc123', role: 'admin' };

    service.login('user', 'pass').subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('abc123');
      expect(localStorage.getItem('role')).toBe('admin');
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user', password: 'pass' });
    req.flush(mockResponse);
  });

  it('should remove token and role on logout', () => {
    localStorage.setItem('token', 'xyz');
    localStorage.setItem('role', 'cook');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should return token when logged in', () => {
    localStorage.setItem('token', 'xyz');
    expect(service.getToken()).toBe('xyz');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return null and false when not logged in', () => {
    expect(service.getToken()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
