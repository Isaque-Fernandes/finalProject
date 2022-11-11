import { OnlineStoreService } from './services/online-store.service';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ...materialModules,
  ],
  exports: [
    ListComponent,
    CreateComponent,
    EditComponent,
  ],
  providers: [OnlineStoreService],
})
export class OnlineStoreModule { }
