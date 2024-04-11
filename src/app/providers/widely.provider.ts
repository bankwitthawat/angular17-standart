import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { EnvironmentProviders, importProvidersFrom, inject, Provider } from "@angular/core";
import { ErrorInterceptor } from "app/core/auth/error.interceptor";
import { JwtInterceptor } from "app/core/auth/jwt.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';


export const provideWidely = (): Array<Provider | EnvironmentProviders> => {
    const providers = [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // { provide: LocationStrategy, useClass: () => inject(MessageService) },

        //third party providers
        // importProvidersFrom(
        // ),

        //other providers
    ];


    return providers;
}