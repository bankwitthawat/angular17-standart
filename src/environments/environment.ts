// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let baseUrl = '';
let siteKey = '';

if (window.location.port === '4200') {

    baseUrl = 'https://localhost:5001';
    // baseUrl = 'https://localhost:44325';
} else {
    baseUrl =
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '');
}

if(window.location.hostname=='localhost')
    siteKey = '6LfSpQ0iAAAAAHiFXi1G_BGuqjD9LzcgW8SC0XO5';
else if(window.location.hostname=='192.168.1.45')
    siteKey = '6LeXqg0iAAAAADSxuseiZj1XFshKYwKpcqNmXkdN';
else if(window.location.hostname=='161.82.175.103' || window.location.hostname=='161.82.175.109')
    siteKey = '6LeUrg0iAAAAAAvm8NvUcoHsVid0QIe6KIEWtwos';
else if(window.location.hostname=='operationportal.bkkps.co.th')
    siteKey = '6LefpFwiAAAAAByvZ8CC3_LfiPSqB1M_Zr2WC_It';
export const environment = {

    production: false,
    baseUrl: baseUrl,
    recaptcha: { 
        siteKey: siteKey, 
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
