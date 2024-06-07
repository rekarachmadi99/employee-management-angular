// employee.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { employeeParams } from '../models/employee/employee';
import employeeData from '../json/employee-dummy.json';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly employees: BehaviorSubject<employeeParams[]> = new BehaviorSubject<employeeParams[]>([]);

  constructor() { this.initializeEmployees() }

  private initializeEmployees() {
    this.employees.next(employeeData);
  }

  GetEmployees(): Observable<employeeParams[]> {
    return this.employees.asObservable();
  }

  GetEmployeeByUsername(username: string): Observable<employeeParams | undefined> {
    return this.employees.pipe(
      map(employees => employees.find(emp => emp.username === username))
    );
  }

  AddEmployee(employee: employeeParams) {
    this.employees.next([...this.employees.value, employee]);
  }

  EditEmployee(username: string, updatedEmployee: employeeParams) {
    this.employees.next(
      this.employees.value.map(emp => (emp.username === username ? { ...emp, ...updatedEmployee } : emp))
    );
  }

  DeleteEmployee(username: string) {
    this.employees.next(this.employees.value.filter(emp => emp.username !== username));
  }


}
