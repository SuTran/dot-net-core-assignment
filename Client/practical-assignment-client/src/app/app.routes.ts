import { Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { BindDataComponent } from './main/bind-data/bind-data.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'data-binding',
        component: BindDataComponent
    }
];
