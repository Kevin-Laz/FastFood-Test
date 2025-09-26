import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { OrderService} from './order.service';
import { environment } from '../../../../environments/environment';
import { Order, OrderItem } from '../../../models/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/orders`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all orders', () => {
    const dummyOrders: Order[] = [
      { id: 1, items: [], total: 0, status: 'PENDING', createdAt: '2025-09-25' },
      { id: 2, items: [], total: 20, status: 'PENDING', createdAt: '2025-09-25' }
    ];

    service.getOrders().subscribe((orders) => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('should fetch order by id', () => {
    const dummyOrder: Order = {
      id: 1,
      items: [],
      total: 10,
      status: 'PENDING',
      createdAt: '2025-09-25'
    };

    service.getOrderById(1).subscribe((order) => {
      expect(order).toEqual(dummyOrder);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrder);
  });

  it('should create an order', () => {
    const items: OrderItem[] = [{ productId: 1, quantity: 2, name: 'hamburguesa' }];
    const newOrder: Order = {
      id: 3,
      items,
      total: 40,
      status: 'PENDING',
      createdAt: '2025-09-25'
    };

    service.createOrder(items).subscribe((order) => {
      expect(order).toEqual(newOrder);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ items });
    req.flush(newOrder);
  });

  it('should update order status', () => {
    const updatedOrder: Order = {
      id: 1,
      items: [],
      total: 10,
      status: 'COMPLETED',
      createdAt: '2025-09-25'
    };

    service.updateOrderStatus(1, 'COMPLETED').subscribe((order) => {
      expect(order.status).toBe('COMPLETED');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ status: 'COMPLETED' });
    req.flush(updatedOrder);
  });
});
