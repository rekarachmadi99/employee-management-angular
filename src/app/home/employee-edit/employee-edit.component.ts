import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { employeeParams } from '../../models/employee/employee';
import { EmployeeService } from '../../services/employee.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss'
})
export class EmployeeEditComponent {

  employeeData: employeeParams | any = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: ''
  };

  incorrectCredentials: boolean = false;
  messageAlert: string = '';
  validationEmployee: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private employees: EmployeeService, private alerts: AlertService) {
    this.employees.GetEmployeeByUsername(this.route.snapshot.params['id']).subscribe((emp: employeeParams | undefined) => {
      this.employeeData = emp;
    });
  }

  ngOnInit(): void {
    this.validationEmployee = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.birthDateValidator]],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['']
    });
  }

  private birthDateValidator(control: any): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const currentDate = new Date();
    if (birthDate >= currentDate) {
      return { 'invalidBirthDate': true };
    }
    return null;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  simpanEmployee(): boolean {
    if (!this.employeeData.username || !this.employeeData.firstName || !this.employeeData.email ||
      !this.employeeData.basicSalary || !this.employeeData.status || !this.employeeData.group) {
      this.markFormGroupTouched(this.validationEmployee)
      return false;
    } else {
      const sendData = {
        type: 'success',
        message: 'Success update employee!',
        time: 5 * 1000
      }

      this.alerts.setAlert(sendData);

      this.employees.EditEmployee(this.employeeData.username, this.employeeData)

      this.router.navigate(['/employee-list']);
      return true
    }
  }


  backEmployeeList() {
    this.router.navigate(['/employee-list']);
  }
}
