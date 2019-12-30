import { NgModule } from '@angular/core';
import { 
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
   MatCardModule,
   MatButtonModule,
   MatMenuModule,
   MatFormFieldModule,
   MatInputModule,
   MatIconModule
  ],
  exports: [
   MatCardModule,
   MatButtonModule,
   MatMenuModule,
   MatFormFieldModule,
   MatInputModule,
   MatIconModule
  ]
})
export class MaterialModule { }
