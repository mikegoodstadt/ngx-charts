import {
  Component, Input, OnChanges, ViewContainerRef, ChangeDetectionStrategy, EventEmitter,
  Output, SimpleChanges
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { TooltipService } from '../tooltip';

@Component({
  providers: [TooltipService],
  selector: 'ngx-charts-chart',
  template: `
    <div
      class="ngx-charts-outer"
      ng-attr-[style.width.px]="{{view[0]}}"
      ng-attr-[@animationState]="{{'active'}}"
      ng-attr-[@.disabled]="{{!animations}}">
      <svg
        class="ngx-charts"
        ng-attr-[attr.width]="{{chartWidth}}"
        ng-attr-[attr.height]="{{view[1]}}">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        ng-attr-[horizontal]="{{legendOptions && legendOptions.position === 'below'}}"
        ng-attr-[valueRange]="{{legendOptions.domain}}"
        ng-attr-[colors]="{{legendOptions.colors}}"
        ng-attr-[height]="{{view[1]}}"
        ng-attr-[width]="{{legendWidth}}">
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        ng-attr-[horizontal]="{{legendOptions && legendOptions.position === 'below'}}"
        ng-attr-[data]="{{legendOptions.domain}}"
        ng-attr-[title]="{{legendOptions.title}}"
        ng-attr-[colors]="{{legendOptions.colors}}"
        ng-attr-[height]="{{view[1]}}"
        ng-attr-[width]="{{legendWidth}}"
        ng-attr-[activeEntries]="{{activeEntries}}"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)">
      </ngx-charts-legend>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 100ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ChartComponent implements OnChanges {

  @Input() view;
  @Input() showLegend = false;
  @Input() legendOptions: any;

  // remove
  @Input() data;
  @Input() legendData;
  @Input() legendType: any;
  @Input() colors: any;
  @Input() activeEntries: any[];
  @Input() animations: boolean = true;

  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelActivate: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelDeactivate: EventEmitter<any> = new EventEmitter();

  chartWidth: any;
  title: any;
  legendWidth: any;

  constructor(
    private vcr: ViewContainerRef,
    private tooltipService: TooltipService) {
    this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    console.log('charts-chart contructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ChartComponent: ', this.data);
    this.update();
  }

  update(): void {
    let legendColumns = 0;
    if (this.showLegend) {
      this.legendType = this.getLegendType();

      if (!this.legendOptions || this.legendOptions.position === 'right') {
        if (this.legendType === 'scaleLegend') {
          legendColumns = 1;
        } else {
          legendColumns = 2;
        }
      }
    }

    const chartColumns = 12 - legendColumns;

    this.chartWidth = Math.floor((this.view[0] * chartColumns / 12.0));
    this.legendWidth = (!this.legendOptions || this.legendOptions.position === 'right')
      ? Math.floor((this.view[0] * legendColumns / 12.0))
      : this.chartWidth;
  }

  getLegendType(): string {
    if (this.legendOptions.scaleType === 'linear') {
      return 'scaleLegend';
    } else {
      return 'legend';
    }
  }

}
