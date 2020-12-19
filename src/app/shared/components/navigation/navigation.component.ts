import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {animateLogo, animateText, onMainContentChange, onSideNavChange} from './animation';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {first, map} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../core/store/states/auth.state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [onSideNavChange, animateText, onMainContentChange, animateLogo],
})
export class NavigationComponent implements OnInit {

  menuItems: any = [];
  authItems: any;
  opened: boolean;
  userInfo: any;
  open = true;
  @ViewChild('drawer') drawer: MatDrawer;
  public sideNavState = true;
  public linkText = true;

  @Select(AuthState.tokenSelect) token$: Observable<string>;
  @Select(AuthState.usernameSelect) username$: Observable<string>;

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructNavigation(isAuthed: boolean, isAdmin: boolean) {
    this.addITemToMenuIfNotAlreadyExist(
      'Home',
      'fa-home',
      '../../../../assets/icons/calendrier admin.svg',
      '/home',
    );
    if (true /* isAuthed */) {
      // User is logged in


      this.addITemToMenuIfNotAlreadyExist(
        'Dicom Parser',
        'fa-sync',
        '../../../../assets/icons/calendrier admin.svg',
        '/admin/dicom',
      );
    } else {
      // User isn't logged in
      this.addITemToMenuIfNotAlreadyExist(
        'Login',
        'fa-sign-in-alt',
        '../../../../assets/icons/calendrier admin.svg',
        '/auth/login',
      );
    }
  }

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private store: Store) {

    this.token$.subscribe(token => {
      if (token === undefined) {
        this.constructNavigation(false, false);
      } else {
        this.constructNavigation(true, false);
      }
    });
  }

  addITemToMenuIfNotAlreadyExist(title, icon, srcSvg, link) {
    // si le lien est déjà dans le menu
    if (
      this.menuItems.findIndex(menu => {
        return menu.link === link && menu.title === title;
      }) >= 0
    ) {
      return false;
    }

    this.menuItems.push({
      title,
      icon,
      srcSvg,
      link,
    });
  }

  async ngOnInit() {

  }

  disconnect() {
    this.router.navigateByUrl('/auth/logout');
  }

  onSideNavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 75);
  }

  clickOnNav() {
    this.isHandset$.pipe(
      first()
    ).subscribe(handset => {
      if (handset) {
        this.drawer.toggle();
      }
    });

  }
}
