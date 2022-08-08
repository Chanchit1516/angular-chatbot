import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  returnUrl: any;
  isLoggedIn = false;
  isError = false;
  constructor(private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      window.history.back()
    }
  }

  login(){
    let input = document.getElementById('userName') as HTMLInputElement | null;
    let userName = input?.value;
    let usertype = "";
    let userid = 0;

    this.isError = false;
    if(userName?.toUpperCase() === "ADMIN1"){
      usertype = "DSSC"
      userid = 1
    }
    else if(userName?.toUpperCase() === "ADMIN2"){
      usertype = "DEALER"
      userid = 2
    }
    else{
      this.isError = true;
      return;
    }

    this.tokenStorage.saveToken("Token-Test");
    this.tokenStorage.saveUser(userName , usertype , userid);
    this.router.navigateByUrl(this.returnUrl);
  }

  reloadPage(): void {
    var url_string = window.location.href
    var url = new URL(url_string);
    var subUrl = url.searchParams.get("returnUrl") || '/';
    window.location.href = subUrl;
  }
}
