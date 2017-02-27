'use strict';

import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomePage} from "../pages/home/home.component";
import {MaterialModule} from "@angular/material";
import {Carousel} from "../components/carousel/carousel.component";
import 'hammerjs';
import {CertPage, CertDetailModal} from "../pages/cert/cert.component";
import {Api} from "../services/api.service";
import {CertFormPage} from "../pages/cert-form/cert-form.component";
import {FormsModule} from "@angular/forms";
import {SearchPage} from "../pages/search/search.component";
import {ApplyStatusPipe} from "../pipes/apply-status.pipe";
import {QuestionPage} from "../pages/question/question.component";

const appRouters: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {path: 'home', component: HomePage},
    {path: 'cert/:type', component: CertPage},
    {path: 'cert-form/:type', component: CertFormPage},
    {path: 'search', component: SearchPage},
    {path: 'question', component: QuestionPage},
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRouters, {useHash: true}),
        MaterialModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomePage,
        CertPage,
        CertFormPage,
        SearchPage,
        QuestionPage,
        Carousel,
        CertDetailModal,
        ApplyStatusPipe
    ],
    bootstrap: [AppComponent],
    providers: [Api],
    entryComponents: [CertDetailModal],
})
export class AppModule {
}