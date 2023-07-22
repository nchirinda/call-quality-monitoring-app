import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './main/geneinsure.cqmapp/auth/auth.service';
import {UsersClient} from './main/geneinsure.cqmapp/service/clients/UsersClient';
import {ReviewsClient} from './main/geneinsure.cqmapp/service/clients/ReviewsClient';
import {AgentsClient} from './main/geneinsure.cqmapp/service/clients/AgentsClient';
import {SupervisorsClient} from './main/geneinsure.cqmapp/service/clients/SupervisorsClient';
import {CustomersClient} from './main/geneinsure.cqmapp/service/clients/CustomersClient';
import {ReviewTargetsClient} from './main/geneinsure.cqmapp/service/clients/ReviewTargetsClient';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'sample'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MaterialModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
    ],
    providers: [
        AuthService,
        UsersClient,
        AgentsClient,
        SupervisorsClient,
        CustomersClient,
        ReviewsClient,
        ReviewTargetsClient,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
