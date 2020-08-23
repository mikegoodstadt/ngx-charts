var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var SvgLinearGradientComponent = /** @class */ (function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
    }
    SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SvgLinearGradientComponent.prototype, "orientation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SvgLinearGradientComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SvgLinearGradientComponent.prototype, "stops", void 0);
    SvgLinearGradientComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-svg-linear-gradient]',
            template: "\n    <svg:linearGradient\n      ng-attr-[id]=\"{{name}}\"\n      ng-attr-[attr.x1]=\"{{x1}}\"\n      ng-attr-[attr.y1]=\"{{y1}}\"\n      ng-attr-[attr.x2]=\"{{x2}}\"\n      ng-attr-[attr.y2]=\"{{y2}}\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        ng-attr-[attr.offset]=\"{{stop.offset + '%'}}\"\n        ng-attr-[style.stop-color]=\"{{stop.color}}\"\n        ng-attr-[style.stop-opacity]=\"{{stop.opacity}}\"\n      />\n    </svg:linearGradient>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], SvgLinearGradientComponent);
    return SvgLinearGradientComponent;
}());
export { SvgLinearGradientComponent };
//# sourceMappingURL=svg-linear-gradient.component.js.map