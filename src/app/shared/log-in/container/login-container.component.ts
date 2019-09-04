import { Component, ContentChild, Injector, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { rendersAuthMethodType } from '../authMethods-decorator';
import { AuthMethodModel } from '../../../core/auth/models/auth-method.model';
import { getAuthenticationMethods, isAuthenticated, isAuthenticationLoading } from '../../../core/auth/selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Observable } from 'rxjs';
import { AuthMethodType } from '../authMethods-type';
import { CoreState } from '../../../core/core.reducers';
import { ShibbolethComponent } from '../../../+login-page/shibbolethTargetPage/shibboleth.component';

/**
 * This component represents a section that contains the submission license form.
 */
@Component({
  selector: 'ds-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  @Input() authMethodModel: AuthMethodModel;

  /**
   * Injector to inject a section component with the @Input parameters
   * @type {Injector}
   */
  public objectInjector: Injector;

  /**
   * Initialize instance variables
   *
   * @param {Injector} injector
   */
  constructor(private injector: Injector, private store: Store<CoreState>) {
  }

  /**
   * Initialize all instance variables
   */
  ngOnInit() {
    this.objectInjector = Injector.create({
      providers: [
        {provide: 'authMethodModelProvider', useFactory: () => (this.authMethodModel), deps: []},
      ],
      parent: this.injector
    });



  }

  /**
   * Find the correct component based on the AuthMethod's type
   */
  getAuthMethodContent(): string {
    return rendersAuthMethodType(this.authMethodModel.authMethodType)
  }

  startShibbolethAuthentication($event) {
    console.log('startShibbolethAuthentication() was called with event: ', $event);
    // this.store.dispatch(new ShibbolethAuthenticateAction());
  }

}
