import {Component, OnInit} from "@angular/core";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: "klienscloud-app",
    templateUrl: "./klienscloud-app.component.html"
})
export class KliensCloudAppComponent implements OnInit {
    constructor(public router: Router) { }
    ngOnInit() {
        this.currentPageTitle = this.router.events.pipe(
            filter(e => e instanceof NavigationEnd)
            ,map((() => _.find(["Login", "Browsing"], t => this.router.isActive('/' + t.toLowerCase(), false))).bind(this)));
    }

    title = "KliensCloud";
    isNavbarCollapsed = true;
    //ew thats ugly, barmi tipp ujabb angular verzioknal a szebb hasznalatra?
    currentPageTitle: Observable<string | undefined> | undefined;
}