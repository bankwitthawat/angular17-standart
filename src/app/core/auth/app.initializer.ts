/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { AuthenticationService } from 'app/shared/services/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
    if (authenticationService?.currentUserValue) {
        return () => new Promise((resolve, reject) => {
            authenticationService.refreshToken().subscribe({
                next: (res) => {
                    if (!res.data) {
                        return () => {
                            authenticationService.signOut();
                            return reject()
                        };
                    } else {
                        return resolve(res);
                    }
                    
                },
                error: (err) => {
                    authenticationService.signOut();
                    return reject(err)
                },
            })
        });
    } else {
        return () => authenticationService.signOut();
    }
}

