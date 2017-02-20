'use strict';

import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomePage} from "../pages/home/home.component";
import {MaterialModule} from "@angular/material";
import {Carousel} from "../components/carousel/carousel.component";
import 'hammerjs';

const appRouters: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {path: 'home', component: HomePage},
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRouters, {useHash: true}),
        MaterialModule
    ],
    declarations: [
        AppComponent,
        HomePage,
        Carousel
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}