import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyNavComponent } from './components/my-nav/my-nav.component';
import { ConsultingPostComponent } from './components/consulting-post/consulting-post.component';
import { WriterComponent } from './components/writer/writer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: MyNavComponent,
        children: [
            { 
                path: 'consulting-post',
                component: ConsultingPostComponent },
            { 
                path: 'writer-post',
                component: WriterComponent },
            { 
                path: 'home',
                component: HomeComponent },
            {
                path: 'login',
                component: LoginComponent
            },            
        ]
    },
    // {
    //     path: 'login',
    //     component: LoginComponent,
    //     // outlet: 'login-outlet'
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
