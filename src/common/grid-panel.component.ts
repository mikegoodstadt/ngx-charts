import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-grid-panel]',
  template: `
    <svg:rect
      ng-attr-[attr.height]="{{height}}"
      ng-attr-[attr.width]="{{width}}"
      ng-attr-[attr.x]="{{x}}"
      ng-attr-[attr.y]="{{y}}"
      stroke="none"
      class="gridpanel"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPanelComponent {

  @Input() path;
  @Input() width;
  @Input() height;
  @Input() x;
  @Input() y;
  
}
