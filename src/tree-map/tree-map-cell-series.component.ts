import {
  Component,
  OnChanges,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { escapeLabel } from '../common/label.helper';

@Component({
  selector: 'g[ngx-charts-tree-map-cell-series]',
  template: `
    <svg:g
      ngx-charts-tree-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      ng-attr-[data]="{{c.data}}"
      ng-attr-[x]="{{c.x}}"
      ng-attr-[y]="{{c.y}}"
      ng-attr-[width]="{{c.width}}"
      ng-attr-[height]="{{c.height}}"
      ng-attr-[fill]="{{c.fill}}"
      ng-attr-[label]="{{c.label}}"
      ng-attr-[value]="{{c.value}}"
      ng-attr-[valueType]="{{c.valueType}}"
      ng-attr-[valueFormatting]="{{valueFormatting}}"
      ng-attr-[labelFormatting]="{{labelFormatting}}"
      ng-attr-[gradient]="{{gradient}}"
      ng-attr-[animations]="{{animations}}"
      (select)="onClick($event)"
      ngx-tooltip
      ng-attr-[tooltipDisabled]="{{tooltipDisabled}}"
      ng-attr-[tooltipPlacement]="{{'top'}}"
      ng-attr-[tooltipType]="{{'tooltip'}}"
      ng-attr-[tooltipTitle]="{{tooltipTemplate ? undefined : getTooltipText(c)}}"
      ng-attr-[tooltipTemplate]="{{tooltipTemplate}}"
      ng-attr-[tooltipContext]="{{c.data}}"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellSeriesComponent implements OnChanges {
  @Input() data;
  @Input() dims;
  @Input() colors;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() gradient: boolean = false;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();

  cells: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.cells = this.getCells();
  }

  getCells(): any[] {
    return this.data.children
      .filter(d => {
        return d.depth === 1;
      })
      .map((d, index) => {
        const label = d.id;

        return {
          data: d.data,
          x: d.x0,
          y: d.y0,
          width: d.x1 - d.x0,
          height: d.y1 - d.y0,
          fill: this.colors.getColor(label),
          label,
          value: d.value,
          valueType: d.valueType
        };
      });
  }

  getTooltipText({ label, value }): string {
    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  trackBy(index, item): string {
    return item.label;
  }
}
