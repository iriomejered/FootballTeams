import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    endpoint = 'http://localhost:8080/api/teams';

    constructor(private httpClient: HttpClient) { }

    getTeams(){
        return this.httpClient.get(this.endpoint);
    }
}