import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { employeeParams } from '../../models/employee/employee';
import { EmployeeService } from '../../services/employee.service';
import { SearchService } from '../../services/search.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  rawData: employeeParams[] = [];
  displayedData: employeeParams[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortKey: any = '';
  reverse: boolean = false;
  searchTerm: string = '';

  dataAlert: any
  alertShow: boolean = false
  alertMessage: string = ""


  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private searchService: SearchService, private alertData: AlertService) {
  }

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe(employees => {
      this.rawData = employees.map((employee: any) => ({
        ...employee,
        birthDate: new Date(employee.birthDate)
      })) as employeeParams[];
      this.displayedData = this.rawData.slice(0, this.itemsPerPage);
    });

    this.searchTerm = this.searchService.getPreviousSearch().search || ''
    this.itemsPerPage = this.searchService.getPreviousSearch().page || this.itemsPerPage

    this.search()

    if (this.alertData.getData()?.message) {
      this.alertShow = true;
      this.alertMessage = this.alertData.getData()?.message
      setTimeout(() => {
        this.alertShow = false;
      }, this.alertData.getData()?.time);
    }
  }

  detailEmployee(username: string) {
    this.searchService.savePreviousSearch(this.searchTerm, this.itemsPerPage)
    this.router.navigate(['/employee-detail', username])
  }

  addEmployee() {
    this.router.navigate(['/employee-add'])
  }

  updateEmployee(username: string) {
    this.router.navigate(['/employee-edit', username])
  }

  deleteEmployee(username: string) {
    if (confirm("Hapus data dengan username " + username + " ?"))
      this.employeeService.DeleteEmployee(username);
  }

  updateDisplayedData() {
    let filteredData = this.rawData.filter(item =>
      item.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (item.firstName.toLowerCase() + ' ' + item.lastName.toLowerCase()).includes(this.searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      new Date(item.birthDate).toLocaleDateString('en-US').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.basicSalary.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.group.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.sortKey) {
      filteredData.sort((a: any, b: any) => {
        const x: any = a[this.sortKey];
        const y: any = b[this.sortKey];
        if (typeof x === 'string' && typeof y === 'string') {
          return this.reverse ? y.localeCompare(x) : x.localeCompare(y);
        } else if (typeof x === 'number' && typeof y === 'number') {
          return this.reverse ? y - x : x - y;
        } else if (x instanceof Date && y instanceof Date) {
          return this.reverse ? y.getTime() - x.getTime() : x.getTime() - y.getTime();
        } else {
          return 0;
        }
      });
    }

    const startIndex: number = Number(this.currentPage - 1) * Number(this.itemsPerPage);
    const endIndex: number = Number(startIndex) + Number(this.itemsPerPage);
    this.displayedData = filteredData.slice(startIndex, endIndex);
  }

  // Method untuk mengubah halaman
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedData();
  }

  // Method untuk mengubah sorting
  changeSort(key: string) {
    if (this.sortKey === key) {
      this.reverse = !this.reverse;
    } else {
      this.sortKey = key;
      this.reverse = false;
    }
    this.updateDisplayedData();
  }

  search() {
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  changePageSize() {
    this.currentPage = 1;
    this.updateDisplayedData();
  }
}
