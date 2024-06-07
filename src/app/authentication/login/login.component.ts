import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import employeeAccount from '../../json/employee-account-dummy.json';
import { loginParam } from '../../models/authentication/login';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  username: string = ""
  password: string = ""
  incorrectCredentials: boolean = false;

  messageAlert: string = ""

  validationEmployee: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validationEmployee = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  clearData() {
    this.username = ''
    this.password = ''
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  validationLogin() {
    if (this.username && this.password) {
      this.incorrectCredentials = true;
      this.messageAlert = "Username dan password yang anda masukan salah."
      setTimeout(() => {
        this.incorrectCredentials = false;
      }, 5000);
    } else {
      this.markFormGroupTouched(this.validationEmployee);
    }
  }

  login(): boolean {
    const loginData: loginParam[] = employeeAccount as loginParam[]
    const matchData = loginData.find(data => data.username === this.username && data.password === this.password)
    if (matchData) {
      const data: loginParam = matchData
      this.authService.localLogin(data)
      this.router.navigate(["/employee-list"])
      return true
    } else {
      this.validationLogin()
      return false
    }
  }
}
