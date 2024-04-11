import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { ConsoleToggleService } from './shared/services/consoleToggle.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet, NgxSpinnerModule, ToastModule],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private consoleToggleService: ConsoleToggleService,)
    {
        this.consoleToggleService.disableConsoleInProduction();
    }
}
