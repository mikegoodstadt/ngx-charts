import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { pie } from 'd3-shape';

@Component({
  selector: 'g[ngx-charts-pie-grid-series]',
  template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        ng-attr-[attr.class]="{{arc.class}}"
        ng-attr-[startAngle]="{{arc.startAngle}}"
        ng-attr-[endAngle]="{{arc.endAngle}}"
        ng-attr-[innerRadius]="{{innerRadius}}"
        ng-attr-[outerRadius]="{{outerRadius}}"
        ng-attr-[fill]="{{color(arc)}}"
        ng-attr-[value]="{{arc.data.value}}"
        ng-attr-[data]="{{arc.data}}"
        ng-attr-[gradient]="{{false}}"
        ng-attr-[pointerEvents]="{{arc.pointerEvents}}"
        ng-attr-[animate]="{{arc.animate}}"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieGridSeriesComponent implements OnChanges {
  @Input() colors;
  @Input() data;
  @Input() innerRadius = 70;
  @Input() outerRadius = 80;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  element: HTMLElement;
  layout: any;
  arcs: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.layout = pie<any, any>()
      .value(d => d.data.value)
      .sort(null);

    this.arcs = this.getArcs();
  }

  getArcs(): any[] {
    return this.layout(this.data).map((arc, index) => {
      const label = arc.data.data.name;
      const other = arc.data.data.other;

      if (index === 0) {
        arc.startAngle = 0;
      }

      const color = this.colors(label);
      return {
        data: arc.data.data,
        class: 'arc ' + 'arc' + index,
        fill: color,
        startAngle: other ? 0 : arc.startAngle,
        endAngle: arc.endAngle,
        animate: this.animations && !other,
        pointerEvents: !other
      };
    });
  }

  onClick(data): void {
    this.select.emit(this.data[0].data);
  }

  trackBy(index, item): string {
    return item.data.name;
  }

  label(arc): string {
    return arc.data.name;
  }

  color(arc): any {
    return this.colors(this.label(arc));
  }
}
