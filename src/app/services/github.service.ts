import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService{
    private username:string;
    private client_id:string;
    private client_secret:string;
    
    constructor(private _http: Http){
        console.log('Initializeing Github Service...');
        this.getSecrets().subscribe(secrets => {
            console.log(secrets);
            this.username = secrets.username;
            this.client_id = secrets.client_id;
            this.client_secret = secrets.client_secret;
        });

        console.log('Github Service Ready');
    }

    getSecrets() {
        return this
          ._http.request('github.secrets.json')
          .map(res => res.json());
    }
    
    getUser(){
        return this._http
            .get(
                'http://api.github.com/users/' + this.username +
                '?client_id=' + this.client_id +
                '&client_secret=' + this.client_secret)
            .map(res => res.json());
    }

    getRepos(){
        return this._http
            .get(
                'http://api.github.com/users/' +this.username +
                '/repos?client_id=' + this.client_id +
                '&client_secret=' + this.client_secret)
            .map(res => res.json());
    }

    updateUser(username:string){
        this.username = username;
    }
}