import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
  SdDatetimePickerActions, SdDatetimePickerApply, SdDatetimePickerCancel,
  SdDatetimePickerNow,
} from '@sdcorejs/angular-material-datetime';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
    SdDatetimePickerActions, SdDatetimePickerApply, SdDatetimePickerCancel,
    SdDatetimePickerNow,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ctrl = new FormControl<Date | null>(new Date(2026, 4, 22, 14, 30, 0));
}
