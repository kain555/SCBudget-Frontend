import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private httpService: HttpService) { }

    budget1: any[];
    cols: any[];
    selectedCar1: any;
    public budgets = [];


    ngOnInit() {
    this.httpService.getBudgets().subscribe (
      budget => {
        this.budget1 = budget;
      }
    );
    this.cols = [
      {headerName: 'Budget ID', field: 'budget_ID' },
      {headerName: 'Budget name', field: 'period' },
      {headerName: 'Basis Name', field: 'comment'},
      {headerName: 'Owner login', field: 'login'},
      {headerName: 'Project name', field: 'project'}
  ];
  }
}
