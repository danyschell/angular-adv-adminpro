import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  
    const url = localStorage.getItem('theme') || './assets/css/colors/default.css';
    //document.querySelector('#theme').setAttribute('href',url);
    this.linkTheme.setAttribute('href',url);

  }

  changeTheme(theme: string){
    const url=`./assets/css/colors/${theme}.css`;
    //document.querySelector('#theme').setAttribute('href',url);
    this.linkTheme.setAttribute('href',url);
    
    localStorage.setItem('theme',url);
  }
}
