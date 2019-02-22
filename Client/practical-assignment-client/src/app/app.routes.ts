import { Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { BindDataComponent } from './main/bind-data/bind-data.component';
import { AuthGuard } from './services/guard/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'data-binding',
        component: BindDataComponent,
        canActivate: [AuthGuard]
    }
];
