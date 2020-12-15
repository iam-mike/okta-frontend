/*!
 * Copyright (c) 2020-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@NgModule({
  imports:[HttpClientModule]
})

export class ProfileComponent implements OnInit {
  idToken;
  accessToken;
  claims: Array<Claim>;
  treasure;

  //aClaims: Array<Claim>;

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {

  }
  
  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.accessToken = this.oktaAuth.getAccessToken();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
    //this.aClaims = Object.entries(accessToken).map(entry => ({ claim: entry[0], value: entry[1] }));
    this.http.post<any>('https://decedo.okta.com/oauth2/default/v1/introspect?client_id=0oa1pindts9Rdw5pr5d6&grant_type=authorization_code&redirect_uri=http://localhost:4200&code=${{ this.accessToken }}', { title: 'Okta Introspection' }).subscribe(data => {
        this.treasure = data.id;
    })
  }

}
