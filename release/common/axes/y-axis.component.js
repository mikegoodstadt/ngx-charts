var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
var YAxisComponent = /** @class */ (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.offset = this.offset;
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], YAxisComponent.prototype, "trimTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], YAxisComponent.prototype, "maxTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "tickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], YAxisComponent.prototype, "ticks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "labelText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisTickInterval", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisTickCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], YAxisComponent.prototype, "yOrient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "referenceLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showRefLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showRefLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], YAxisComponent.prototype, "yAxisOffset", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        ViewChild(YAxisTicksComponent, { static: false }),
        __metadata("design:type", YAxisTicksComponent)
    ], YAxisComponent.prototype, "ticksComponent", void 0);
    YAxisComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-y-axis]',
            template: "\n    <svg:g ng-attr-[attr.class]=\"{{yAxisClassName}}\" ng-attr-[attr.transform]=\"{{transform}}\">\n      <svg:g\n        ngx-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        ng-attr-[trimTicks]=\"{{trimTicks}}\"\n        ng-attr-[maxTickLength]=\"{{maxTickLength}}\"\n        ng-attr-[tickFormatting]=\"{{tickFormatting}}\"\n        ng-attr-[tickArguments]=\"{{tickArguments}}\"\n        ng-attr-[tickValues]=\"{{ticks}}\"\n        ng-attr-[tickStroke]=\"{{tickStroke}}\"\n        ng-attr-[scale]=\"{{yScale}}\"\n        ng-attr-[orient]=\"{{yOrient}}\"\n        ng-attr-[showGridLines]=\"{{showGridLines}}\"\n        ng-attr-[gridLineWidth]=\"{{dims.width}}\"\n        ng-attr-[referenceLines]=\"{{referenceLines}}\"\n        ng-attr-[showRefLines]=\"{{showRefLines}}\"\n        ng-attr-[showRefLabels]=\"{{showRefLabels}}\"\n        ng-attr-[height]=\"{{dims.height}}\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        ng-attr-[label]=\"{{labelText}}\"\n        ng-attr-[offset]=\"{{labelOffset}}\"\n        ng-attr-[orient]=\"{{yOrient}}\"\n        ng-attr-[height]=\"{{dims.height}}\"\n        ng-attr-[width]=\"{{dims.width}}\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisComponent);
    return YAxisComponent;
}());
export { YAxisComponent };
//# sourceMappingURL=y-axis.component.js.map