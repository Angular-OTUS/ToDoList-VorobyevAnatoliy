import {Component, input} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    MatProgressSpinner,
  ],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
  standalone: true,
})
export class LoadingSpinner {
  isLoading = input.required()
}
