import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
