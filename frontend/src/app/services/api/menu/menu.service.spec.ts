import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { MenuItem } from '../../../models/menu.model';
import { environment } from '../../../../environments/environment';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/menu`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch all menu items', () => {
    const dummyItems: MenuItem[] = [
      { id: 1, name: 'Hamburguesa', price: 12, category: 'burgers' },
      { id: 2, name: 'Papas Fritas', price: 5, category: 'sides' },
    ];

    service.getMenu().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(dummyItems);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyItems);
  });


  it('should fetch a menu item by id', () => {
    const item: MenuItem = { id: 1, name: 'Hamburguesa', price: 12, category: 'burgers' };

    service.getMenuItem(1).subscribe(data => {
      expect(data).toEqual(item);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(item);
  });


  it('should create a new menu item', () => {
    const newItem: Partial<MenuItem> = { name: 'Inka Cola', price: 6, category: 'drinks' };

    service.addMenuItem(newItem).subscribe(data => {
      expect(data.name).toBe('Inka Cola');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 3, ...newItem });
  });


  it('should update a menu item', () => {
    const updated: Partial<MenuItem> = { price: 15 };

    service.updateMenuItem(1, updated).subscribe(data => {
      expect(data.price).toBe(15);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ id: 1, name: 'Hamburguesa', price: 15, category: 'burgers' });
  });


  it('should delete a menu item', () => {
    service.deleteMenuItem(1).subscribe(res => {
      expect(res).toEqual({ message: "Producto eliminado correctamente" });
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: "Producto eliminado correctamente" });
  });


});
