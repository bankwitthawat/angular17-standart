import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class HandleErrorService {
    constructor(private _messageService: MessageService) { }

    // Handling HTTP Errors using Toaster
    public handleError(err: HttpErrorResponse): string {
        console.log('error', err);
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            switch (err.status) {
                case 400:
                    errorMessage = err?.error?.message || `${err.status}: Bad Request.`;
                    break;
                case 401:
                    errorMessage = err?.error?.message || `${err.status}: You are un authorized to do this action.`;
                    break;
                case 403:
                    errorMessage = `${err.status}: You don't have permission to access the requested resource.`;
                    break;
                case 404:
                    errorMessage = `${err.status}: You requested resource does not exist.`;
                    break;
                case 412:
                    errorMessage = `${err.status}: Precondition Failed.`;
                    break;
                case 429:
                    errorMessage = `${err.status}: The service is too many request, please try again.`;
                    break;
                case 500:
                    errorMessage = `${err.status}: Internal Server Error.`;
                    break;
                case 501:
                    errorMessage = `${err.status}: The Server does not support the requested.`;
                    break;
                case 503:
                    errorMessage = `${err.status}: The requested service is not avalable.`;
                    break;
                case 511:
                    errorMessage = err?.error?.message;
                    break;
                default:
                    errorMessage = 'Something went wrong!';
                    break;
            }
        }
        this._messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        return errorMessage;
    }
}
