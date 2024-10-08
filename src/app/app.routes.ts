import { Routes } from '@angular/router';
// import { RegisterComponent } from './register/register.component';
// import { AuthComponent } from './auth/auth.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "todos",
        pathMatch: "full"
    },
    {
        path: "todos",
        component: TodoListComponent,
        canActivate: [authGuard]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    // {
    //     path: "register",
    //     component: RegisterComponent
    // }
];
