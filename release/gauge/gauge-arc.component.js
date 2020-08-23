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
import { formatLabel, escapeLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
var GaugeArcComponent = /** @class */ (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = formatLabel(arc.data.name);
        var val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "backgroundArc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "valueArc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ColorHelper)
    ], GaugeArcComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "isActive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], GaugeArcComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "deactivate", void 0);
    GaugeArcComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-gauge-arc]',
            template: "\n    <svg:g ngx-charts-pie-arc\n      class=\"background-arc\"\n      ng-attr-[startAngle]=\"{{0}}\"\n      ng-attr-[endAngle]=\"{{backgroundArc.endAngle}}\"\n      ng-attr-[innerRadius]=\"{{backgroundArc.innerRadius}}\"\n      ng-attr-[outerRadius]=\"{{backgroundArc.outerRadius}}\"\n      ng-attr-[cornerRadius]=\"{{cornerRadius}}\"\n      ng-attr-[data]=\"{{backgroundArc.data}}\"\n      ng-attr-[animate]=\"{{false}}\"\n      ng-attr-[pointerEvents]=\"{{false}}\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n      ng-attr-[startAngle]=\"{{0}}\"\n      ng-attr-[endAngle]=\"{{valueArc.endAngle}}\"\n      ng-attr-[innerRadius]=\"{{valueArc.innerRadius}}\"\n      ng-attr-[outerRadius]=\"{{valueArc.outerRadius}}\"\n      ng-attr-[cornerRadius]=\"{{cornerRadius}}\"\n      ng-attr-[fill]=\"{{colors.getColor(valueArc.data.name)}}\"\n      ng-attr-[data]=\"{{valueArc.data}}\"\n      ng-attr-[animate]=\"{{animations}}\"\n      ng-attr-[isActive]=\"{{isActive}}\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      ng-attr-[tooltipDisabled]=\"{{tooltipDisabled}}\"\n      ng-attr-[tooltipPlacement]=\"{{'top'}}\"\n      ng-attr-[tooltipType]=\"{{'tooltip'}}\"\n      ng-attr-[tooltipTitle]=\"{{tooltipTemplate ? undefined : tooltipText(valueArc)}}\"\n      ng-attr-[tooltipTemplate]=\"{{tooltipTemplate}}\"\n      ng-attr-[tooltipContext]=\"{{valueArc.data}}\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], GaugeArcComponent);
    return GaugeArcComponent;
}());
export { GaugeArcComponent };
//# sourceMappingURL=gauge-arc.component.js.map