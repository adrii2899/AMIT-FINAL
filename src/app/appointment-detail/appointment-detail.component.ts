import { Component, SimpleChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Appointment } from '../appointment.type';
export interface Hora {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-appointment-detail',
  template: `
    <h2 *ngIf="!isNew">Edit event: '{{appointment?.title}}'</h2>
    <h2 *ngIf="isNew">Create new event</h2>
    <form [formGroup]="form">

      <div class="form-group">
      <mat-form-field class="example-full-width">
      <input formControlName="title" matInput placeholder="Titulo">
    </mat-form-field>
    </div>
       <div class="form-group">
 
          <mat-form-field>
          <input matInput formControlName="start"[matDatepicker]="picker1" placeholder="Fecha de inicio">
          <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
          <mat-datepicker #picker1></mat-datepicker>
        </mat-form-field>
        
      </div>
       <div class="form-group">
       
        <mat-form-field>
        <input matInput formControlName="end"[matDatepicker]="picker2" placeholder="Fecha de fin">
        <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
        <mat-datepicker #picker2></mat-datepicker>
      </mat-form-field>
      
      </div>

      <div class="form-group">
      <mat-form-field>
      <mat-label>Hora inicio</mat-label>
      <mat-select formControlName="startTime">
        <mat-option *ngFor="let hora of horas" [value]="hora.value">
          {{hora.viewValue}}
        </mat-option>
      </mat-select>
    </mat-form-field> 
    </div>

    <div class="form-group">
    <mat-form-field>
    <mat-label>Hora fin</mat-label>
    <mat-select formControlName="endTime">
      <mat-option *ngFor="let hora of horas" [value]="hora.value">
        {{hora.viewValue}}
      </mat-option>
    </mat-select>
  </mat-form-field> 
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
})

export class AppointmentDetailComponent implements OnChanges {
  horas: Hora[] = [
    {value: '07:00:00', viewValue: '07:00'},
    {value: '08:00:00', viewValue: '08:00'},
    {value: '09:00:00', viewValue: '09:00'},
    {value: '10:00:00', viewValue: '10:00'},
    {value: '11:00:00', viewValue: '11:00'},
    {value: '12:00:00', viewValue: '12:00'},
    {value: '13:00:00', viewValue: '13:00'},
    {value: '14:00:00', viewValue: '14:00'},
    {value: '15:00:00', viewValue: '15:00'},
    {value: '16:00:00', viewValue: '16:00'},
    {value: '17:00:00', viewValue: '17:00'},
    {value: '18:00:00', viewValue: '18:00'},
    {value: '19:00:00', viewValue: '19:00'},
    {value: '20:00:00', viewValue: '20:00'},
    {value: '21:00:00', viewValue: '21:00'},
    {value: '22:00:00', viewValue: '22:00'},

 
  ];
  @Input() appointment: Appointment;
  @Input() isNew: boolean;
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter<Appointment>();
  @Output() update = new EventEmitter<Appointment>();
  form = this.formBuilder.group({
    title: [null, Validators.required],
    allDay: [null],
    start: [null, Validators.required],
    end: [null, Validators.required],
    startTime: [Validators.required],
    endTime: [Validators.required]
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.appointment && simpleChanges.appointment.currentValue) {
      this.form.patchValue({ ...this.appointment });
    }
  }

  onAdd(): void {
   const start = this.form.value.start +"T"+ this.form.value.startTime
   const end = this.form.value.end + "T" +this.form.value.endTime
    const { title, allDay } = this.form.value;
    this.add.emit({ end, start, title, allDay });
  }

  onUpdate(): void {
    const { end, start, title, allDay, id } = this.form.value;
    this.update.emit({ id: this.appointment.id, end, start, title, allDay });
  }
}