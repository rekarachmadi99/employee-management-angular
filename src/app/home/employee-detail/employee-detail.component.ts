import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EmployeeService } from '../../services/employee.service';
import { employeeParams } from '../../models/employee/employee';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  id: string = '';
  employeeData: employeeParams | any = null;
  basicSalary: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.GetEmployeeByUsername(this.id).subscribe((emp: employeeParams | undefined) => {
      this.employeeData = emp;
    });
  }

  ngOnInit(): void {
    this.basicSalary = this.formatNumber(this.employeeData.basicSalary);
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  formatNumber(value: number): string {
    return "Rp. " + value.toLocaleString('en-US')
  }

}
