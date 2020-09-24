import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FileUploadModule } from 'ng2-file-upload';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressButtonsModule,
    Material.MatInputModule,
    Material.MatProgressSpinnerModule,
    Material.MatButtonModule,
    Material.MatCardModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    LayoutModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatListModule,
    Material.MatBadgeModule,
    Material.MatTabsModule,
    Material.MatGridListModule,
    Material.MatSnackBarModule,
    Material.MatFormFieldModule,
    Material.MatSelectModule,
    NgxMatSelectSearchModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    FileUploadModule,
    Material.MatDialogModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatChipsModule,
    Material.MatTabsModule,
    Material.MatAutocompleteModule,
    Material.MatCheckboxModule
  ],
  exports: [
    MatProgressButtonsModule,
    Material.MatInputModule,
    Material.MatProgressSpinnerModule,
    Material.MatButtonModule,
    Material.MatCardModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    LayoutModule,
    Material.MatToolbarModule,
    Material.MatSidenavModule,
    Material.MatListModule,
    Material.MatBadgeModule,
    Material.MatTabsModule,
    Material.MatGridListModule,
    Material.MatSnackBarModule,
    Material.MatFormFieldModule,
    Material.MatSelectModule,
    NgxMatSelectSearchModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    FileUploadModule,
    Material.MatDialogModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatChipsModule,
    Material.MatTabsModule,
    Material.MatAutocompleteModule,
    Material.MatDatepickerModule,
    Material.MatCheckboxModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class MaterialModule { }
