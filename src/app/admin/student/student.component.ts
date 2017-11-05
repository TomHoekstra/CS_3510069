import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { StudentService } from '../../services/student.service';
import ServiceResult from '../../../../server/models/service-result.model';
import { IStudent } from '../../../../server/models/student.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class StudentComponent implements OnInit {
  public students;
  public studentsField;

  constructor(private studentService: StudentService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((result: ServiceResult<IStudent[]>) => {
      if (result.success) {
        this.students = result.model;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: result.msg });
      }
    });
  }

  addStudents({ value, valid }: { value, valid: boolean }) {
    if (valid) {
      value.studentsField.split(',').forEach(el => {
        this.students.push({ 'studentId': el.trim() })
      });
    }
  }

  removeStudent(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.students.splice(index, 1);
      }
    });
  }

  saveStudents() {
    this.studentService.updateOrCreateStudents(this.students).subscribe((result: ServiceResult<IStudent[]>) => {
      if (!result.success) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: `Couldn't save all the students` });
      }
    });
  }
}
