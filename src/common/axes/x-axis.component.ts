import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksComponent } from './x-axis-ticks.component';

@Component({
  selector: 'g[ngx-charts-x-axis]',
  template: `
    <svg:g ng-attr-[attr.class]="{{xAxisClassName}}" ng-attr-[attr.transform]="{{transform}}">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        ng-attr-[trimTicks]="{{trimTicks}}"
        ng-attr-[rotateTicks]="{{rotateTicks}}"
        ng-attr-[maxTickLength]="{{maxTickLength}}"
        ng-attr-[tickFormatting]="{{tickFormatting}}"
        ng-attr-[tickArguments]="{{tickArguments}}"
        ng-attr-[tickStroke]="{{tickStroke}}"
        ng-attr-[scale]="{{xScale}}"
        ng-attr-[orient]="{{xOrient}}"
        ng-attr-[showGridLines]="{{showGridLines}}"
        ng-attr-[gridLineHeight]="{{dims.height}}"
        ng-attr-[width]="{{dims.width}}"
        ng-attr-[tickValues]="{{ticks}}"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        ng-attr-[label]="{{labelText}}"
        ng-attr-[offset]="{{labelOffset}}"
        ng-attr-[orient]="{{'bottom'}}"
        ng-attr-[height]="{{dims.height}}"
        ng-attr-[width]="{{dims.width}}"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {
  @Input() xScale;
  @Input() dims;
  @Input() trimTicks: boolean;
  @Input() rotateTicks: boolean = true;
  @Input() maxTickLength: number;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() ticks: any[];
  @Input() xAxisTickInterval;
  @Input() xAxisTickCount: any;
  @Input() xOrient: string = 'bottom';
  @Input() xAxisOffset: number = 0;

  @Output() dimensionsChanged = new EventEmitter();

  xAxisClassName: string = 'x axis';

  tickArguments: any;
  transform: any;
  labelOffset: number = 0;
  fill: string = 'none';
  stroke: string = 'stroke';
  tickStroke: string = '#ccc';
  strokeWidth: string = 'none';
  padding: number = 5;

  @ViewChild(XAxisTicksComponent, { static: false }) ticksComponent: XAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;

    if (typeof this.xAxisTickCount !== 'undefined') {
      this.tickArguments = [this.xAxisTickCount];
    }
  }

  emitTicksHeight({ height }): void {
    const newLabelOffset = height + 25 + 5;
    if (newLabelOffset !== this.labelOffset) {
      this.labelOffset = newLabelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({ height });
      }, 0);
    }
  }
}
