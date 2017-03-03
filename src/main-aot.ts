import {enableProdMode} from '@angular/core';
import {AppModuleNgFactory} from '../.tmp/aot/src/app/app.module.ngfactory';
import {platformBrowser} from "@angular/platform-browser";

if (process.env.ENV === 'production') {
    enableProdMode();
}
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);