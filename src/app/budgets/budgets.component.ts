import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Employees } from '../models/Employees';
import { Message } from 'primeng/api/message';
import { MessageService } from 'primeng/api/messageservice';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'
]
})
export class BudgetsComponent implements OnInit {

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }

  messageService: MessageService;
  displayDialog: boolean;
  budgetLine: any = {};
  selectedLine: any;
  newLine: boolean;
  budgetLines: any[];
  cols: any[];
  lines: any[];
  bline: any;
  amount: any;
  myDate = new Date();
  msgs: Message[] = [];
  blines: FormGroup;
  objInvoice: any;
  employee: FormGroup;
  empObj: Employees;
  public employees = [];
  public pentingDirector: any[];
  public reqID: number;
  display = false;
  display1 = false;
  display2 = false;
  public period: string;
  public basisName: string;
  public ownerName: string;
  public ownerSurname: string;
  public comment: string;
  public projectName: string;
  public BudgetLines = [];
  getBudget = [];
  NewBudgetID: number;
  globalBudgetID: number;
  TotalBudget = [];
  cars: any[];
  wcols: any[];
  asignedTo = [5, 6];
  rowGroupMetadata: any;
  columnDefs = [
    { headerName: 'Line name', field: 'line_name', width: 320 },
    { headerName: 'Amount', field: 'amount', width: 80 },
  ];
  rowData = [];
  public invoices = [];
  startedBy: number;

  ngOnInit() {
    let developer: string;
    developer = 'Mariusz Krzemiński';
    this.blines = this.formBuilder.group({
      bline: new FormControl(''),
      Amount: new FormControl('')
    });
    this.httpService.getLines().subscribe(
      line => {
        this.lines = line;
      }
    );
    this.cols = [
      { field: 'line_name', header: 'Line Name' },
      { field: 'amount', header: 'Amount on budget line' }
    ];
    this.httpService.getDirectors().subscribe(
      emp => {
        this.employees = emp;
      }
    );
    this.employee = this.formBuilder.group({
      emp: new FormControl('')
    });
    this.wcols = [
      { field: 'process_ID', header: 'Process' },
      { field: 'budget_ID', header: 'Budget' },
      { field: 'step', header: 'Step' },
      { field: 'basis_name', header: 'Basis' }
    ];
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
  showBudgets() {
    this.reqID = this.employee.get('emp').value;
    this.httpService.getPentingDirector(this.reqID).subscribe(
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

  logoff() {
    document.getElementById('selectUser').style.display = 'block';
    document.getElementById('tableID').style.display = 'none';
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully logged off'});
  }
  // tslint:disable-next-line: variable-name
  startProcess(Process_id: number) {
    const AsignedTo = this.asignedTo[Math.floor(Math.random() * this.asignedTo.length)];
    const req: number = +this.reqID;
    const nextStep: any = {
      process_id: Process_id,
      actionDate: this.myDate,
      step_id: 2,
      requestor: req,
      asignedTo: AsignedTo
    };
    console.log(nextStep)
    this.httpService.nextStep(nextStep).subscribe(
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

  budgetLineShow(BudgetID: number) {
    this.httpService.getLinesbyBudget(BudgetID).subscribe(
      line => {
        this.budgetLines = line;
      }
    );
    this.httpService.LinesByBudget(BudgetID).subscribe(
      (BudgetLines: any) => {
        this.BudgetLines = BudgetLines;
        console.log(this.budgetLines);
      }
    );
    this.display1 = true;
    this.globalBudgetID = BudgetID;
  }
  onSubmit() {
    const invoiceData: any = {
      line_id: this.blines.get('bline').value,
      budget_id: this.globalBudgetID,
      amount: this.blines.get('Amount').value,
    };
    this.httpService.newBL(invoiceData).subscribe(
      budgets => {
        console.log(budgets);
      });
    this.httpService.LinesByBudget(this.globalBudgetID).subscribe(
        (BudgetLines: any) => {
          this.BudgetLines = BudgetLines;
          console.log(this.budgetLines);
        }
      );
    this.displayDialog = false;
  }
  showDialogToAdd() {
    this.newLine = true;
    this.budgetLine = {};
    this.displayDialog = true;
  }

  save() {
    const budgetLines = [...this.budgetLines];
    if (this.budgetLines) {
      budgetLines.push(this.budgetLine);
    } else {
      budgetLines[this.budgetLines.indexOf(this.selectedLine)] = this.budgetLine;
    }
    this.budgetLines = budgetLines;
    this.budgetLine = null;
  }

  delete() {
    const index = this.budgetLines.indexOf(this.selectedLine);
    // tslint:disable-next-line: triple-equals
    this.budgetLines = this.budgetLines.filter((val, i) => i != index);
    this.budgetLine = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newLine = false;
    this.budgetLine = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: any): any {
    const budgetLine = {};
    // tslint:disable-next-line: forin
    for (const prop in c) {
      budgetLine[prop] = c[prop];
    }
    return budgetLine;
  }
}
