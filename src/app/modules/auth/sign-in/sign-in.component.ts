import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { AppInfoService } from 'app/shared/services/appinfo.service';
import packageJson from '../../../../../package.json';
import { AuthenticationService } from 'app/shared/services/authentication.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink
        , FuseAlertComponent
        , NgIf
        , FormsModule
        , ReactiveFormsModule
        , MatFormFieldModule
        , MatInputModule
        , MatButtonModule
        , MatIconModule
        , MatCheckboxModule
        , MatProgressSpinnerModule
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    isLoading: boolean = false;
    version: string;
    coreApiVersion: string;
    environment: string;

    /**
     * Constructor
     */
    constructor(
        private _appInfoService: AppInfoService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private authenticationService: AuthenticationService,
    ) {
    }

    get f() {
        return this.signInForm.controls;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.version = packageJson.version;
        this.getApiInfo();

        // Create the form
        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this.authenticationService
            .signIn(
                this.f.username.value,
                this.f.password.value,
            )
            .subscribe({
                next: (data) => {
                    // console.log(data);
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    if (data.success) {
                        // Set the alert
                        this.alert = { type: 'success', message: data.message };

                        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                        setTimeout(
                            () => this._router.navigateByUrl(redirectURL),
                            1000
                        );
                    } else {
                        // Set the alert
                        this.alert = { type: 'error', message: data.message };
                    }

                    // Show the alert
                    this.showAlert = true;
                },
                error: (error) => {
                    console.log('signIn', error);
                    this.signInForm.enable();
                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: error?.message || '',
                    };

                    // Show the alert
                    this.showAlert = true;

                },
                complete: () => {

                }
            });
    }


    getApiInfo(): void {
        this._appInfoService.getApiInfo().subscribe(
            (response) => {
                this.coreApiVersion = response.controlVersion;
                this.environment = response.environment;
            },
            (error) => {
                this.coreApiVersion = 'Cannot connect to core API!';
                console.log(error);
            }
        );
    }
}
