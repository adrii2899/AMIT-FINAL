import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
let AppointmentDetailComponent = class AppointmentDetailComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.close = new EventEmitter();
        this.add = new EventEmitter();
        this.update = new EventEmitter();
        this.form = this.formBuilder.group({
            title: [null, Validators.required],
            allDay: [null],
            start: [],
            end: []
        });
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.appointment && simpleChanges.appointment.currentValue) {
            this.form.patchValue(Object.assign({}, this.appointment));
        }
    }
    onAdd() {
        const { end, start, title, allDay } = this.form.value;
        this.add.emit({ end: end && new Date(end), start: start && new Date(start), title, allDay });
    }
    onUpdate() {
        const { end, start, title, allDay, id } = this.form.value;
        this.update.emit({ id: this.appointment.id, end: end && new Date(end), start: start && new Date(start), title, allDay });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AppointmentDetailComponent.prototype, "appointment", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppointmentDetailComponent.prototype, "isNew", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AppointmentDetailComponent.prototype, "close", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AppointmentDetailComponent.prototype, "add", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], AppointmentDetailComponent.prototype, "update", void 0);
AppointmentDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-appointment-detail',
        template: `
    <h2 *ngIf="!isNew">Edit event: '{{appointment?.title}}'</h2>
    <h2 *ngIf="isNew">Create new event</h2>
    <form [formGroup]="form">
      <div class="form-group">
        <label>Title:
          <input type="text" formControlName="title"/>
        </label>
      </div>
       <div class="form-group">
        <label>Start date:
          <input type="text" formControlName="start"/>
        </label>
      </div>
       <div class="form-group">
        <label>End date:
          <input type="text" formControlName="end"/>
        </label>
      </div>
      <div class="form-group">
        <label>All day:
          <input type="checkbox" formControlName="allDay"/>
        </label>
      </div>
      <button type="submit" *ngIf="isNew" (click)="onAdd()">Add</button>
      <button type="submit" *ngIf="!isNew" (click)="onUpdate()">Update</button>
      <button type="button" (click)="close.emit()">Cancel</button>
    </form>
  `,
        styleUrls: ['./appointment-detail.component.css'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], AppointmentDetailComponent);
export { AppointmentDetailComponent };
//# sourceMappingURL=appointment-detail.component.js.map