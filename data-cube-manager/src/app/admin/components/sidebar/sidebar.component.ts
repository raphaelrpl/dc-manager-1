import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { MatDialog } from '@angular/material/dialog';
import { TokenModal } from 'app/shared/token/token.component';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/list-cubes', title: 'My Cubes',  icon: 'dashboard', class: '' },
    { path: '/create-cube', title: 'Create Cube',  icon: 'build', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  builderUri: string

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.store.pipe(select(state => state["app"])).subscribe(({ urlService }) => {
      if (!!urlService) {
        this.builderUri = urlService
      }
    })
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getVersion() {
    return environment.appVersion;
  }

  editService() {
    const dialogRef = this.dialog.open(TokenModal, {
        width: '600px',
        disableClose: true,
        data: { }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log("done")
    })
  }
}
