import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../modules/material/material.module';
import { AccessService } from './services/access/access.service';
import { AttributesService } from './services/attributes/attributes.service';
import { AuditService } from './services/audit/audit.service';
import { BranchsService } from './services/branchs/branchs.service';
import { CategoriesService } from './services/categories/categories.service';
import { ChargeService } from './services/charges/charge.service';
import { CitiesService } from './services/cities/cities.service';
import { ContactsService } from './services/contacts/contacts.service';
import { CountriesService } from './services/countries/countries.service';
import { CurrenciesService } from './services/currencies/currencies.service';
import { DocumentsService } from './services/documents/documents.service';
// import { DynamicComponentsService } from './services/dynamic-components/dynamic-components.service';
import { EventLaunchService } from './services/event-launch/event-launch.service';
import { GenerateFormService } from './services/generate-form/generate-form.service';
import { LocationService } from './services/locations/location.service';
import { ManufacturesService } from './services/manufactures/manufactures.service';
import { MenuItemsService } from './services/menu-items/menu-items.service';
import { MigrationService } from './services/migrations/migration.service';
import { PayrollService } from './services/migrations/payroll.service';
import { ModulesService } from './services/modules/modules.service';
import { OrganizationsService } from './services/organizations/organizations.service';
import { PricesListService } from './services/prices-list/prices-list.service';
import { ProductsService } from './services/products/products.service';
import { RolsService } from './services/rols/rols.service';
import { SeriesService } from './services/series/series.service';
import { SettingsService } from './services/settings/settings.service';
import { StatesService } from './services/states/states.service';
import { TableListSettingsService } from './services/table-list-settings/table-list-settings.service';
import { TaxesService } from './services/taxes/taxes.service';
import { ThirdsService } from './services/thirds/thirds.service';
import { TypeDocumentsService } from './services/type-documents/type-documents.service';
import { UnitsService } from './services/units/units.service';
import { UsersService } from './services/users/users.service';
import { WebServicesService } from './services/web-services/web-services.service';
import { WebSocketService } from './services/web-socket/web-socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule,
    NgxPaginationModule,
    TextMaskModule,
    MaterialModule,
  ],
  providers: [
    ModulesService,
    MenuItemsService,
    // DynamicComponentsService,
    AccessService,
    UsersService,
    AttributesService,
    OrganizationsService,
    LocationService,
    ProductsService,
    RolsService,
    SettingsService,
    CountriesService,
    StatesService,
    CitiesService,
    ThirdsService,
    ContactsService,
    BranchsService,
    OrganizationsService,
    CurrenciesService,
    UnitsService,
    ManufacturesService,
    CategoriesService,
    MigrationService,
    TaxesService,
    // ReportsService,
    PricesListService,
    ChargeService,
    TableListSettingsService,
    AuditService,
    TypeDocumentsService,
    DocumentsService,
    PayrollService,
    EventLaunchService,
    WebSocketService,
    SeriesService,
    GenerateFormService,
    WebServicesService,
  ]
})
export class CoreModule { }
