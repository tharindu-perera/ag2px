// Observable Version
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {DataModel} from '../model/data-model';


@Injectable()
export class Service {
    //private url = 'equipments.json';  // URL to web API
    private url = '/api/carhireEvents';  // URL to web API

    constructor(private http: Http) {}

    fecthData(model: DataModel): Observable<DataModel[]> {
        console.info("hero>>" + model.equipInitial);
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addEquip(model: DataModel): Observable<DataModel> {
        console.info("model >>" + model.equipInitial);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.url, {model}, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            console.error("Error in response");
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

/*
  private heroesUrl = 'app/heroes.json'; // URL to JSON file
*/


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/