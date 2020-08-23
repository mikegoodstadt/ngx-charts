import {
  Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-svg-radial-gradient]',
  template: `
    <svg:radialGradient
      ng-attr-[id]="{{name}}"
      ng-attr-[attr.cx]="{{cx}}"
      ng-attr-[attr.cy]="{{cy}}"
      ng-attr-[attr.r]="{{r}}"
      gradientUnits="userSpaceOnUse">
      <svg:stop *ngFor="let stop of stops"
        ng-attr-[attr.offset]="{{stop.offset + '%'}}"
        ng-attr-[style.stop-color]="{{stop.color}}"
        ng-attr-[style.stop-opacity]="{{stop.opacity}}"
      />
    </svg:radialGradient>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgRadialGradientComponent implements OnChanges {

  @Input() color: string;
  @Input() name: string;
  @Input() startOpacity: number;
  @Input() endOpacity = 1;
  @Input() cx: number = 0;
  @Input() cy: number = 0;

  @Input()
  get stops(): any[] {
    return this.stopsInput || this.stopsDefault;
  }

  set stops(value: any[]) {
    this.stopsInput = value;
  }

  r: string;

  private stopsInput: any[];
  private stopsDefault: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.r = '30%';
    if (
      ('color' in changes) ||
      ('startOpacity' in changes) ||
      ('endOpacity' in changes)) {
        this.stopsDefault = [{
          offset: 0,
          color: this.color,
          opacity: this.startOpacity
        }, {
          offset: 100,
          color: this.color,
          opacity: this.endOpacity
        }];
    }
  }

}
