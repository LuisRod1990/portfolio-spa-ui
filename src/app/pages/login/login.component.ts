import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TokenStorageService } from '../../core/auth/token-storage.service';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;
  error: string | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const { username, password } = this.form.getRawValue() as LoginForm;

    this.authService.login({ username, password }).subscribe({
      next: tokens => {
        this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
        this.loading = false;
        this.router.navigate(['/']); // redirige al home
      },
      error: err => {
        console.error('Login error:', err);
        this.error = 'Credenciales inválidas o error en el servidor.';
        this.loading = false;
      }
    });
  }
}