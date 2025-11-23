import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from "../../shared-module";

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss',
})
export class ErrorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
