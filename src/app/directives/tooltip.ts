import {Directive, ElementRef, HostListener, inject, input, OnDestroy, Renderer2, signal} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {

  readonly tooltipText = input.required<string>()

  readonly tooltipDelayMsecs = input(1000)

  private tooltipElement?: HTMLElement;

  private isVisible = signal(false)

  private el = inject(ElementRef)

  private renderer = inject(Renderer2)

  private hideTimeoutId?: number

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.tooltipElement) {
      this.createToolTip()
    }
    this.isVisible.set(true)
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
    this.setPosition();

    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }
    setTimeout(() => {
      this.hideTooltip()
    }, this.tooltipDelayMsecs())
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isVisible.set(false);
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    }
  }

  private createToolTip(): void {
    this.tooltipElement = this.renderer.createElement('span')
    this.renderer.appendChild(document.body, this.tooltipElement)
    this.renderer.addClass(this.tooltipElement, 'app-tooltip');
    this.renderer.setProperty(this.tooltipElement, 'textContent', this.tooltipText());
  }

  private setPosition() {
    if (!this.tooltipElement) {
      return
    }
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const top = hostPos.bottom + 5;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private hideTooltip() {
    this.isVisible.set(false);
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    }
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = undefined;
    }
  }

  ngOnDestroy() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
    }
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }
  }
}
