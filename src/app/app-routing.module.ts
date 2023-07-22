import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    { path: 'auth', loadChildren: () => import('./main/geneinsure.cqmapp/auth/auth.module').then(m => m.AuthModule), },
    { path: 'reviews', loadChildren: () => import('./main/geneinsure.cqmapp/reviews/reviews.module').then(m => m.ReviewsModule), },
    { path: 'sample', loadChildren: () => import('./main/sample/sample.module').then(m => m.SampleModule) },

    { path      : '**', redirectTo: 'sample' },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
