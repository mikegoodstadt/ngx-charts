import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';

@Component({
  selector: 'g[ngx-charts-heat-map-cell-series]',
  template: `
    <svg:g
      ngx-charts-heat-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      ng-attr-[x]="{{c.x}}"
      ng-attr-[y]="{{c.y}}"
      ng-attr-[width]="{{c.width}}"
      ng-attr-[height]="{{c.height}}"
      ng-attr-[fill]="{{c.fill}}"
      ng-attr-[data]="{{c.data}}"
      (select)="onClick(c.cell)"
      (activate)="activate.emit(c.cell)"
      (deactivate)="deactivate.emit(c.cell)"
      ng-attr-[gradient]="{{gradient}}"
      ng-attr-[animations]="{{animations}}"
      ngx-tooltip
      ng-attr-[tooltipDisabled]="{{tooltipDisabled}}"
      ng-attr-[tooltipPlacement]="{{'top'}}"
      ng-attr-[tooltipType]="{{'tooltip'}}"
      ng-attr-[tooltipTitle]="{{tooltipTemplate ? undefined : tooltipText(c)}}"
      ng-attr-[tooltipTemplate]="{{tooltipTemplate}}"
      ng-attr-[tooltipContext]="{{{ series: c.series, name: c.label, value: c.data }}}"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatCellSeriesComponent implements OnChanges, OnInit {
  @Input() data;
  @Input() colors;
  @Input() xScale;
  @Input() yScale;
  @Input() gradient: boolean;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: any;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  cells: any[];

  ngOnInit() {
    if (!this.tooltipText) {
      this.tooltipText = this.getTooltipText;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.cells = this.getCells();
  }

  getCells() {
    const cells = [];

    this.data.map(row => {
      row.series.map(cell => {
        const value = cell.value;
        cell.series = row.name;

        cells.push({
          row,
          cell,
          x: this.xScale(row.name),
          y: this.yScale(cell.name),
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: this.colors.getColor(value),
          data: value,
          label: formatLabel(cell.name),
          series: row.name
        });
      });
    });

    return cells;
  }

  getTooltipText({ label, data, series }): string {
    return `
      <span class="tooltip-label">${escapeLabel(series)} • ${escapeLabel(label)}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
  }

  trackBy(index, item): string {
    return item.tooltipText;
  }

  onClick(data): void {
    this.select.emit(data);
  }
}
