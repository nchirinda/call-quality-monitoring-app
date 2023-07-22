import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['tarisai@acme.co.zw', [Validators.required, Validators.email]],
            password: ['password', Validators.required]
        });
    }

    onSubmit(loginFormValue: any): void {

        if (this.loginForm.valid) {
            const email = loginFormValue.email;
            const password = loginFormValue.password;

            console.log('Form valid');

            this.authService.authenticateUser(email, password).subscribe(
                (resp) => {

                    setTimeout(() => {
                        const returnUrl = this.authService.redirectUrl;
                        if (returnUrl) {
                            this.router.navigateByUrl(returnUrl).then();
                        } else {
                            this.router.navigateByUrl('/reviews').then();
                        }
                    }, 1000);
                },
                err => {
                }
            );
        }
    }
}
