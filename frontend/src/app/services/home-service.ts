import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    endpoint = 'http://localhost:8080/api/teams';

    constructor(private httpClient: HttpClient) { }

    getTeams() {
        return this.httpClient.get(this.endpoint);
    }

    getTeam(id: number) {
        return this.httpClient.get(`${this.endpoint}/${id}`);
    }

    addTeam(team: any) {
        return this.httpClient.post(this.endpoint, team);
    }

    updateTeam(id: number, team: any) {
        return this.httpClient.put(`${this.endpoint}/${id}`, team);
    }

    deleteTeam(id: number) {
        return this.httpClient.delete(`${this.endpoint}/${id}`);
    }
}