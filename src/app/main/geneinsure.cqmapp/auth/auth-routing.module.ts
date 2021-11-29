import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';


const routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'login', component: LoginComponent, data: {title: 'Login :: Call Quality Monitoring App'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
