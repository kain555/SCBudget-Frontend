import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Budget } from '../Models/budget';
import { Processes } from '../Models/processes';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css']
})
export class NewBudgetComponent implements OnInit {
  budg: any;

  constructor(private httpService: HttpService,  private formBuilder: FormBuilder) { }

 budget: FormGroup;
 objBudget: Budget;
 public basis = [];
 public blines = [];
 public owners = [];
 public projects = [];
 public reg = [];
 private currDate = new Date();
 budgetID: number;
 getBudget: any = [];
 NewBudgetID: number;
 msgs: Message[] = [];

 myShows = [5, 6];

  ngOnInit() {

    this.httpService.getBasis().subscribe (
      bas => {
        this.basis = bas;
      }
    );
    this.httpService.getProjects().subscribe (
      pro => {
        this.projects = pro;
      }
    );
    this.httpService.getDirectors().subscribe (
      own => {
        this.owners = own;
      }
    );
    this.budget = this.formBuilder.group ({
        period: new FormControl(''),
        bid: new FormControl(''),
        bline: new FormControl(''),
        ownerID: new FormControl(''),
        comment: new FormControl(''),
        project: new FormControl(''),
        status: new FormControl('')
      });
}

  onSubmit() {
    const owner: number = this.budget.get('ownerID').value;
    const budgetData: any = {
      period: this.budget.get('period').value,
      basis_id: this.budget.get('bid').value,
      owner_id: owner,
      comment: this.budget.get('comment').value,
      project_id: this.budget.get('project').value,
      };
    this.httpService.newBudget(budgetData).subscribe(
        budgets => {
          this.getBudget = budgets;
          this.NewBudgetID = this.getBudget.budget_id;
          this.getBudgetID(this.NewBudgetID);
      });
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully added budget'});
  }
  getBudgetID(budgetID: number) {
    const show = this.myShows[Math.floor(Math.random() * this.myShows.length)];
    const processData: any = {
      process_id: 0,
      basis_id: this.budget.get('bid').value,
      step_id: 1,
      status_id: 1,
      budget_id: budgetID,
      startedBy: this.budget.get('ownerID').value,
      requestor: this.budget.get('ownerID').value,
      asignedTo: show,
      comment: this.budget.get('comment').value
    };
    console.log(processData);
    this.httpService.newProcess(processData).subscribe(
    budgets => {
      console.log(budgets);
    });
    }
}
