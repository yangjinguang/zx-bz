'use strict';
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {ApiUrl} from "../config/apiUrl";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {
    constructor(private http: Http) {

    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    public getCertItems(type: Number): Promise<any> {
        return this.http.get(ApiUrl.getCertItems + '/' + type)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
}