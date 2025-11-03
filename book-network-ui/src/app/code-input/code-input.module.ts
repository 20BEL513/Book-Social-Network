import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input'; // ✅ correct import

@NgModule({
  imports: [
    CommonModule,
    CodeInputModule   // ✅ use CodeInputModule
  ],
  exports: [
    CodeInputModule   // ✅ export CodeInputModule
  ]
})
export class MyCodeInputModule {}  // You can rename the wrapper module
