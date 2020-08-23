var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { escapeLabel } from '../common/label.helper';
var TreeMapCellSeriesComponent = /** @class */ (function () {
    function TreeMapCellSeriesComponent() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.cells = this.getCells();
    };
    TreeMapCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            return {
                data: d.data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors.getColor(label),
                label: label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    TreeMapCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "select", void 0);
    TreeMapCellSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-tree-map-cell-series]',
            template: "\n    <svg:g\n      ngx-charts-tree-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      ng-attr-[data]=\"{{c.data}}\"\n      ng-attr-[x]=\"{{c.x}}\"\n      ng-attr-[y]=\"{{c.y}}\"\n      ng-attr-[width]=\"{{c.width}}\"\n      ng-attr-[height]=\"{{c.height}}\"\n      ng-attr-[fill]=\"{{c.fill}}\"\n      ng-attr-[label]=\"{{c.label}}\"\n      ng-attr-[value]=\"{{c.value}}\"\n      ng-attr-[valueType]=\"{{c.valueType}}\"\n      ng-attr-[valueFormatting]=\"{{valueFormatting}}\"\n      ng-attr-[labelFormatting]=\"{{labelFormatting}}\"\n      ng-attr-[gradient]=\"{{gradient}}\"\n      ng-attr-[animations]=\"{{animations}}\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      ng-attr-[tooltipDisabled]=\"{{tooltipDisabled}}\"\n      ng-attr-[tooltipPlacement]=\"{{'top'}}\"\n      ng-attr-[tooltipType]=\"{{'tooltip'}}\"\n      ng-attr-[tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(c)\"\n      ng-attr-[tooltipTemplate]=\"{{tooltipTemplate}}\"\n      ng-attr-[tooltipContext]=\"{{c.data}}\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], TreeMapCellSeriesComponent);
    return TreeMapCellSeriesComponent;
}());
export { TreeMapCellSeriesComponent };
//# sourceMappingURL=tree-map-cell-series.component.js.map