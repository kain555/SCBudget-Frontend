import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Employees } from '../../models/Employees';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-process-owner',
  templateUrl: './process-owner.component.html',
  styleUrls: ['./process-owner.component.css']
})
export class ProcessOwnerComponent implements OnInit {

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }
  employee: FormGroup;
  empObj: Employees;
  public employees = [];
  public pentingDirector = [];
  public reqID: number;
  public period: string;
  public basisName: string;
  public ownerName: string;
  public ownerSurname: string;
  public comment: string;
  public projectName: string;
  public BudgetLines = [];
  display = false;
  myDate = new Date();
  msgs: Message[] = [];
  displayDialog: boolean;
  budgetLine: any = {};
  selectedLine: any;
  newLine: boolean;
  budgetLines: any[];
  cols: any[];
  lines: any[];
  bline: any;
  amount: any;
  blines: FormGroup;
  objInvoice: any;
  display1 = false;
  display2 = false;
  getBudget = [];
  NewBudgetID: number;
  globalBudgetID: number;
  TotalBudget = [];
  cars: any[];
  wcols: any[];
  rowGroupMetadata: any;
  rowData = [];
  public invoices = [];
  columnDefs = [
    {headerName: 'Line name', field: 'line_name', width: 320},
    {headerName: 'Amount', field: 'amount', width: 80},
];
  asignedTo = [7,8,9,10];
  requestor = [5,6];

  ngOnInit() {
    this.httpService.getOwners().subscribe(
      emp => {
        this.employees = emp;
      }
    );
    this.employee = this.formBuilder.group ({
      emp: new FormControl('')
    });
  }

  showBudgets() {
    this.reqID = this.employee.get('emp').value;
    this.httpService.GetPentingOwner(this.reqID).subscribe(
      (pDirector: []) => {
        this.cars = pDirector;
        this.updateRowGroupMetaData();
      }
    );
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully logged in'});
    document.getElementById('selectUser').style.display = 'none';
    document.getElementById('tableID').style.display = 'block';
  }
  onSort() {
    this.updateRowGroupMetaData();
  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.cars) {
      for (let i = 0; i < this.cars.length; i++) {
        const rowData = this.cars[i];
        const step = rowData.step;
        if (i === 0) {
          this.rowGroupMetadata[step] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.cars[i - 1];
          const previousRowGroup = previousRowData.step;
          if (step === previousRowGroup) {
            this.rowGroupMetadata[step].size++;
          } else {
            this.rowGroupMetadata[step] = { index: i, size: 1 };
          }
        }
      }
    }
  }
  accept(process_id: number, startedBy: number) {
    console.log(startedBy);
    const req: number = +this.reqID;
    const nextStepOwner: any = {
      process_id: process_id,
      actionDate: this.myDate,
      step_id: 4,
      status_id: 2,
      requestor: req,
      asignedTo: startedBy
    }
    console.log(nextStepOwner);
    this.httpService.nextStepOwner(nextStepOwner).subscribe(
      (result: []) => {
        console.log(result);
      }
    );
    window.location.reload();
  }

  moreInfo(BudgetID: number) {
    this.httpService.getTotalBudget(BudgetID).subscribe(
      (TotalBudget: any) => {
        this.TotalBudget = TotalBudget;
      }
    );
    this.httpService.budgetMoreInfo(BudgetID).subscribe(
      (budget: any) => {
        this.period = budget[0].period;
        this.basisName = budget[0].basisName;
        this.ownerName = budget[0].ownerName;
        this.ownerSurname = budget[0].ownerSurname;
        this.comment = budget[0].comment;
        this.projectName = budget[0].projectName;
      }
    );
    this.httpService.LinesByBudget(BudgetID).subscribe(
      (BudgetLines: any) => {
        this.BudgetLines = BudgetLines;
      }
    );
    this.display = true;
  }
  logoff() {
    document.getElementById('selectUser').style.display = 'block';
    document.getElementById('tableID').style.display = 'none';
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully logged off'});
  }

}
