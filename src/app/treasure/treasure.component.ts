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

import { JsonpClientBackend } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { OktaAuthService } from "@okta/okta-angular";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-treasure",
  templateUrl: "./treasure.component.html",
  styleUrls: ["./treasure.component.css"],
})
class TreasureComponent implements OnInit {
  accessToken;
  treasure;

  //aClaims: Array<Claim>;

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {}

  async ngOnInit() {
    this.accessToken = this.oktaAuth.getAccessToken();
    this.http
      .post<any>(
        'https://decedo.okta.com/oauth2/default/v1/introspect',
        { client_id: '0oa1pindts9Rdw5pr5d6',
          token: this.accessToken }
      )
      .subscribe((data) => {
        this.treasure = data.id;
      });
  }
}
export default TreasureComponent;

//curl -v -X POST -H "Content-type:application/x-www-form-urlencoded" 
//"https://decedo.okta.com/oauth2/default/v1/introspect” 
//-d "client_id\=0oa1pindts9Rdw5pr5d6\&grant_type\=authorization_code\
//&redirect_uri\=http://localhost:4200\
//&token=eyJraWQiOiJpTWRnVENGemRfZmJUOWFxVEIyYjBtWnNMOHpXOVZsbTUydXVKbTFTenlRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmNoUGRzRnZfLWZ6bHpHU2F3OHdjS0xWUGhUcWF1RDBDM1laVU1BYUxkbmsiLCJpc3MiOiJodHRwczovL2RlY2Vkby5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MDgwMzU3OTAsImV4cCI6MTYwODAzOTM5MCwiY2lkIjoiMG9hMXBpbmR0czlSZHc1cHI1ZDYiLCJ1aWQiOiIwMHVjZTZoZHJEYUpDT2NSZzVkNSIsInNjcCI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiXSwic3ViIjoibWlrZUBkZWNlZG8uY29tIiwiR3JvdXBzIjpbImFwcC1hZG1pbnMiXSwidHJlYXN1cmUiOiJNaWNoYWVsJCJ9.HCNjBN6agoXFSle_My4sxbiI6eWEmP-IE-7pqFypLkuSSShONq6yyI-Y5CDBkdnIu5MViKN4BrzEvijWXvhZT8O-zDF0Gtu7lOuvzMgxhQflT81ZyfSS2kb7xNz8tATtLVeZTRdvF9rg6vABsEF05ymkvpv7MGqzTkjKFocRcDisOPJ62Y5y2PBAO498jitvwFnARQUdE6l2yz3TcylMlmVBtJTH8XZpooQ20jpSNuTiE1IB4_koUEJUBlCf4Fp2W_tJERDZtAp3bvaGXsODcSRBiPip8mcEIK7-aqfd8NOCeuBGriANbDmzIxlpse1XK_FucpCINYjpxxa-W89WlA"




