import { NgModule } from '@angular/core';
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';
import { BrandLogoComponent } from 'src/app/shared/components/brand-logo/brand-logo.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SidenavComponent } from 'src/app/shared/components/sidenav/sidenav.component';
import { CoreModule } from '../core/core.module';
// import { ContentComponent } from './components/content/content.component';
import { EmailCredentialsFormComponent } from './components/email-credentials-form/email-credentials-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { InternationalizationTagComponent } from './components/internationalization-tag/internationalization-tag.component';
import { LocalizationComponent } from './components/localization/localization.component';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { MenuControlComponent } from './components/menu-control/menu-control.component';
import { MigrationConfigComponent } from './components/migration/migration-config/migration-config.component';
import { MigrationComponent } from './components/migration/migration.component';
import { LeftMenuComponent } from './components/sidenav/left-menu/left-menu.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { ContentScrollDirective } from './directives/content-scroll/content-scroll.directive';
import { DynamicDirective } from './directives/dynamic/dynamic.directive';
import { UnNumberMaskDirective } from './directives/unmask/number-mask.directive';
import { NumberMaskPipe } from './pipes/number-mask/number-mask.pipe';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    NumberMaskPipe,
    DynamicDirective,
    ContentScrollDirective,
    UnNumberMaskDirective,
    LocalizationComponent,
    InternationalizationTagComponent,
    MenuControlComponent,
    TableListComponent,
    MigrationComponent,
    FileUploadComponent,
    MigrationConfigComponent,
    EmailCredentialsFormComponent,
    HeaderComponent,
    AvatarComponent,
    BrandLogoComponent,
    // ContentComponent,
    SidenavComponent,
    LeftMenuComponent,
    FooterComponent,
    MatSelectComponent
  ],
  exports: [
    NumberMaskPipe,
    DynamicDirective,
    ContentScrollDirective,
    UnNumberMaskDirective,
    LocalizationComponent,
    InternationalizationTagComponent,
    MenuControlComponent,
    TableListComponent,
    MigrationComponent,
    FileUploadComponent,
    EmailCredentialsFormComponent,
    HeaderComponent,
    AvatarComponent,
    BrandLogoComponent,
    // ContentComponent,
    SidenavComponent,
    LeftMenuComponent,
    FooterComponent,
    MatSelectComponent
  ]
})
export class SharedModule { }
