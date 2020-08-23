import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-circle]',
  template: `
    <svg:circle
      ng-attr-[attr.cx]="{{cx}}"
      ng-attr-[attr.cy]="{{cy}}"
      ng-attr-[attr.r]="{{r}}"
      ng-attr-[attr.fill]="{{fill}}"
      ng-attr-[attr.stroke]="{{stroke}}"
      ng-attr-[attr.opacity]="{{circleOpacity}}"
      ng-attr-[attr.class]="{{classNames}}"
      ng-attr-[attr.pointer-events]="{{pointerEvents}}"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleComponent implements OnChanges {

  @Input() cx;
  @Input() cy;
  @Input() r;
  @Input() fill;
  @Input() stroke;
  @Input() data;
  @Input() classNames;
  @Input() circleOpacity;
  @Input() pointerEvents;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.select.emit(this.data);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ?
      this.classNames.join(' ') : 
      '';
    this.classNames += 'circle';
  }

}
