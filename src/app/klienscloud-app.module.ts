import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowsingPageComponent } from "./components/browsing-page/browsing-page.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { KliensCloudAppComponent } from "./components/klienscloud-app/klienscloud-app.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {FileService} from "./services/dropbox-file.service";
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";

let routes: Route[] = [
    { path: "", redirectTo: "login", pathMatch: "full"},
    { path: "login", component: LoginPageComponent },
    { path: "browsing", component: BrowsingPageComponent }
];

@NgModule({
    imports: [MatIconModule, BrowserAnimationsModule, MatMenuModule, MatCardModule, NgbModule, BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule, CollapseModule.forRoot()],
    declarations: [KliensCloudAppComponent, BrowsingPageComponent, LoginPageComponent],
    exports: [],
    providers: [FileService],
    bootstrap: [KliensCloudAppComponent]
})
export class KliensCloudAppModule { }