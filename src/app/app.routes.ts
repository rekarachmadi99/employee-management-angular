import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { EmployeeDetailComponent } from './home/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { authGuard } from './guards/auth.guard';
import { EmployeeAddComponent } from './home/employee-add/employee-add.component';
import { homeGuard } from './guards/home.guard';
import { EmployeeEditComponent } from './home/employee-edit/employee-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [homeGuard] },
  { path: 'employee-add', component: EmployeeAddComponent, canActivate: [homeGuard] },
  { path: 'employee-edit/:id', component: EmployeeEditComponent, canActivate: [homeGuard] },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent, canActivate: [homeGuard] }
];

