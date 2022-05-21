import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm){
    form.reset()
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employeeService.employees = res;
      },
      error: (err) => console.log(err)
    });
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      })
    } else{
      this.employeeService.createEmployee(form.value).subscribe({
        next: (res) => {
          this.getEmployees();
          form.reset();
        },
        error: err => console.log(err)
      });      
    }
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee
  }

  deleteEmployee(id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.employeeService.deleteEmployee(id).subscribe({
        next: (res) => this.getEmployees(),
        error: (err) => console.log(err)
      });
    }
    
  }

}
