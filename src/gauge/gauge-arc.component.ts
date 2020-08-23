import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';

@Component({
  selector: 'g[ngx-charts-gauge-arc]',
  template: `
    <svg:g ngx-charts-pie-arc
      class="background-arc"
      ng-attr-[startAngle]="{{0}}"
      ng-attr-[endAngle]="{{backgroundArc.endAngle}}"
      ng-attr-[innerRadius]="{{backgroundArc.innerRadius}}"
      ng-attr-[outerRadius]="{{backgroundArc.outerRadius}}"
      ng-attr-[cornerRadius]="{{cornerRadius}}"
      ng-attr-[data]="{{backgroundArc.data}}"
      ng-attr-[animate]="{{false}}"
      ng-attr-[pointerEvents]="{{false}}">
    </svg:g>
    <svg:g ngx-charts-pie-arc
      ng-attr-[startAngle]="{{0}}"
      ng-attr-[endAngle]="{{valueArc.endAngle}}"
      ng-attr-[innerRadius]="{{valueArc.innerRadius}}"
      ng-attr-[outerRadius]="{{valueArc.outerRadius}}"
      ng-attr-[cornerRadius]="{{cornerRadius}}"
      ng-attr-[fill]="colors.getColor(valueArc.data.name)"
      ng-attr-[data]="{{valueArc.data}}"
      ng-attr-[animate]="{{animations}}"
      ng-attr-[isActive]="{{isActive}}"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      ng-attr-[tooltipDisabled]="{{tooltipDisabled}}"
      ng-attr-[tooltipPlacement]="{{'top'}}"
      ng-attr-[tooltipType]="{{'tooltip'}}"
      ng-attr-[tooltipTitle]="tooltipTemplate ? undefined : tooltipText(valueArc)"
      ng-attr-[tooltipTemplate]="{{tooltipTemplate}}"
      ng-attr-[tooltipContext]="{{valueArc.data}}">
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaugeArcComponent {

  @Input() backgroundArc: any;
  @Input() valueArc: any;
  @Input() cornerRadius: any;
  @Input() colors: ColorHelper;
  @Input() isActive: boolean = false;
  @Input() tooltipDisabled: boolean = false;
  @Input() valueFormatting: (value: any) => string;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  tooltipText(arc): string {
    const label = formatLabel(arc.data.name);
    let val;

    if(this.valueFormatting) {
      val = this.valueFormatting(arc.data.value);
    } else {
      val = formatLabel(arc.data.value);
    }

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }
}
