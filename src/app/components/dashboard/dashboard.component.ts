import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArray: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArray = [];
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(
      (res) => {
        this.taskArray = res;
      },
      (err) => {
        alert('Não foi possível encontrar a lista de tarefas!');
      }
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;

    if (this.taskObj.task_name.replace(/\s/g, '').length == 0) {
      alert('Campo não preenchido!');
      return;
    } else {
      this.crudService.addTask(this.taskObj).subscribe(
        (result) => {
          this.ngOnInit();
          this.addTaskValue = '';
        },
        (err) => {
          alert(err);
        }
      );
    }

   
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Não foi possível editar a tarefa!');
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Não foi possível DELETAR a tarefa!');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
