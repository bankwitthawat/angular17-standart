import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { authInterceptor } from 'app/core/auth/auth.interceptor';
import { AuthService } from 'app/core/auth/auth.service';
import { appInitializer } from './app.initializer';
import { AuthenticationService } from 'app/shared/services/authentication.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(AuthService),
            multi   : true,
        },
    ];
};

// widely custom
export const provideAuthCustom = (): Array<Provider | EnvironmentProviders> => {
    return [
        {
            provide : ENVIRONMENT_INITIALIZER,
            useFactory: () => appInitializer,
            multi   : true,
            deps: [AuthenticationService]
        },
    ];
};
