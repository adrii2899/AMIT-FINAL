import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import * as $ from "jquery";
import 'fullcalendar';
let CalendarComponent = class CalendarComponent {
    constructor() {
        this.viewModes = ['month', 'agendaWeek', 'agendaDay'];
        this.navButtons = ['prev', 'next', 'today'];
        this.appointments = [];
        this.requestNewAppointment = new EventEmitter();
        this.requestUpdateAppointment = new EventEmitter();
        this.appointmentUpdated = new EventEmitter();
    }
    get $Instance() {
        return $(this.calendar.nativeElement);
    }
    ngOnDestroy() {
        this.$Instance.fullCalendar('destroy');
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.appointments && simpleChanges.appointments.currentValue) {
            this.updateAppointments();
        }
    }
    ngAfterViewInit() {
        this.$Instance.fullCalendar({
            selectable: true,
            editable: true,
            eventSources: [{
                    events: this.appointments || [],
                }],
            header: {
                left: this.navButtons.join(','),
                center: 'title',
                right: this.viewModes.join(',')
            },
            select: (start, end) => {
                this.requestNewAppointment.emit(this.neutralize({ start: start.toDate(), end: end.toDate() }));
            },
            eventClick: (event) => {
                this.requestUpdateAppointment.emit(this.neutralize(event));
            },
            eventDrop: (event, delta, revert) => {
                this.appointmentUpdated.emit(this.neutralize(event));
            }
        });
    }
    updateAppointments() {
        // we have to do it this way, because other wise the plugin is dependent on the 
        // reference of the event source. So we have to remove all event sources and add a new one
        this.$Instance.fullCalendar('removeEventSources', this.$Instance.fullCalendar('getEventSources'));
        this.$Instance.fullCalendar('addEventSource', { events: this.appointments });
    }
    neutralize(event) {
        // the widget mutates the appointment in many ways. We can keep it consistent with this function
        const { start, end, allDay, title, id } = event;
        return { start, end, allDay, title, id };
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarComponent.prototype, "viewModes", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarComponent.prototype, "navButtons", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarComponent.prototype, "appointments", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarComponent.prototype, "requestNewAppointment", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarComponent.prototype, "requestUpdateAppointment", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarComponent.prototype, "appointmentUpdated", void 0);
tslib_1.__decorate([
    ViewChild('calendar', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], CalendarComponent.prototype, "calendar", void 0);
CalendarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar',
        template: `
  <div #calendar></div>
  `,
        styleUrls: ['./calendar.component.css'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map