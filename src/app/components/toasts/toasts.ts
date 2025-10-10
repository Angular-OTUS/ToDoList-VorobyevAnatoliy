import {Component, computed, inject} from '@angular/core';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  imports: [],
  templateUrl: './toasts.html',
  standalone: true,
  styleUrl: './toasts.css',
})
export class Toasts {

  protected readonly toasts = computed(() => this.toastService.toasts());

  private readonly toastService = inject(ToastService)
}
