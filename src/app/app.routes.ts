import { Routes } from '@angular/router';
// import { RegisterComponent } from './register/register.component';
// import { AuthComponent } from './auth/auth.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
    {
        path: "",
        component: TodoListComponent
    },
        // {
        //     path: "login",
        //     component: LoginComponent,
        // },
        // {
        //     path: "register",
        //     component: RegisterComponent
        // }
];
