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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';

interface ResourceServerExample {
  label: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  resourceServerExamples: Array<ResourceServerExample>;
  userName: string;
  permutations: Array<String>;

  constructor(public oktaAuth: OktaAuthService) {
    this.resourceServerExamples = [
      {
        label: 'Node/Express Resource Server Example',
        url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
      },
      {
        label: 'Java/Spring MVC Resource Server Example',
        url: 'https://github.com/okta/samples-java-spring/tree/master/resource-server',
      },
      {
        label: 'ASP.NET Resource Server Example',
        url: 'https://github.com/okta/samples-aspnet/tree/master/resource-server'
      },
      {
        label: 'ASP.NET Core Resource Server Example',
        url: 'https://github.com/okta/samples-aspnet/tree/master/resource-server'
      }
    ];
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  form = new FormGroup({
    string: new FormControl('', Validators.nullValidator),
  })

  getArrayMutations(arr, perms = [], len = arr.length) {
    if (len === 1) perms.push(arr.slice(0));
  
    for (let i = 0; i < len; i++) {
      this.getArrayMutations(arr, perms, len - 1);
  
      len % 2 // parity dependent adjacent elements swap
        ? ([arr[0], arr[len - 1]] = [arr[len - 1], arr[0]])
        : ([arr[i], arr[len - 1]] = [arr[len - 1], arr[i]]);
    }
  }

  submit(){
    console.log(this.form.value);
    var string = this.form.value;

    let findPermutations = (string) => {
      if (!string || typeof string !== "string"){
        return "Please enter a string"
      }
    
      if (!!string.length && string.length < 2 ){
        return string
      }
    
      let permutationsArray = [] 
       
      for (let i = 0; i < string.length; i++){
        let char = string[i]
    
        if (string.indexOf(char) != i)
        continue
    
        let remainder = string.slice(0, i) + string.slice(i + 1, string.length)
    
        for (let permutation of findPermutations(remainder)){
          permutationsArray.push(char + permutation) }
      }
      this.permutations = permutationsArray
    }

    alert(JSON.stringify(this.permutations));

    //this.form.reset();
  }
  
  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }
  
}
