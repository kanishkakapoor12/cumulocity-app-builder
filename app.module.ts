/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */

import { NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavigationError, Router, RouterModule as NgRouterModule} from '@angular/router';
import {UpgradeModule as NgUpgradeModule} from '@angular/upgrade/static';
import {AppStateService, CoreModule, HOOK_NAVIGATOR_NODES, RouterModule} from '@c8y/ngx-components';
import { UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from '@c8y/ngx-components/upgrade';
// import {DeviceSimulatorConfigModule} from "./device-simulator-config/device-simulator-config.module";
import {ApplicationBuilderModule} from "./application-builder/application-builder.module";
import {ApplicationModule} from "./application/application.module";
import {ConfigNavigationService, Navigation} from "./navigation";
// import {DeviceSimulatorConfigComponent} from "./device-simulator-config/device-simulator-config.component";
import {BrandingComponent} from "./branding/branding.component";
import {BrandingModule} from "./branding/branding.module";
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrandingDirtyGuardService} from "./branding/branding-dirty-guard.service";
// import {FixedValueSimulationStrategyModule} from "./simulation-strategies/fixed-value/fixed-value.simulation-strategy.module";
import {HelpComponent} from "./help/help.component";
import {MarkdownModule} from "ngx-markdown";
import {CustomWidgetsModule} from "./custom-widgets/custom-widgets.module";
import {Location} from "@angular/common";
import {filter, first, map, startWith, tap, withLatestFrom} from "rxjs/operators";
import {IUser} from '@c8y/client';

@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(),
    NgRouterModule.forRoot([
      // {
      //   path: 'application/:applicationId/simulator-config',
      //   component: DeviceSimulatorConfigComponent
      // },
      {
        path: 'application/:applicationId/branding',
        component: BrandingComponent,
        canDeactivate: [BrandingDirtyGuardService]
      }, {
        path: 'help',
        component: HelpComponent
      },
      ...UPGRADE_ROUTES,
    ], {enableTracing: false, useHash: true}),
    CoreModule.forRoot(),
    ApplicationBuilderModule,
    BsDropdownModule.forRoot(),
    CustomWidgetsModule,
    ApplicationModule,
    BrandingModule.forRoot(),
    // DeviceSimulatorConfigModule,
    // FixedValueSimulationStrategyModule,
    MarkdownModule.forRoot(),
    NgUpgradeModule,
    // Upgrade module must be the last
    UpgradeModule
  ],
  providers: [
    {provide: HOOK_NAVIGATOR_NODES, useClass: Navigation, multi: true},
    ConfigNavigationService
  ]
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule, router: Router, location: Location, appStateService: AppStateService) {
    super();

    // Fixes a bug where the router removes the hash when the user tries to navigate to an app and is not logged in
    appStateService.currentUser.pipe(filter(user => user != null)).pipe(
        withLatestFrom(
            router.events.pipe(
                filter(event => event instanceof NavigationError),
                tap((event: NavigationError) => location.replaceState(event.url)), // Change the location without navigating anywhere
                startWith(null)
            )
        ),
        first(),
        filter(([, event]: [IUser, NavigationError | null]) => event != null),
        map(([, event]: [IUser, NavigationError]) => event)
    )
    .subscribe(event => router.navigateByUrl(event.url));
  }
}