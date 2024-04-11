import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppInfoService {
    constructor(private http: HttpClient) {}

    getApiInfo(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/AppInfo`);
    }
}
