import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.css']
})
export class BudgetInfoComponent implements OnInit {

  displayDialog: boolean;

  budgetLine: any = {};

  selectedLine: any;

  newLine: boolean;

  budgetLines: any[];

  cols: any[];

  lines: any[];

  bline: any;
  amount: any;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }
  blines: FormGroup;
  objInvoice: any;

  ngOnInit() {
    this.httpService.getLinesbyBudget(1).subscribe (
      line => {
        this.budgetLines = line;
      }
    );
    this.blines = this.formBuilder.group ({
      bline: new FormControl(''),
      Amount: new FormControl('')
    });
    this.httpService.getLines().subscribe (
      line => {
        this.lines = line;
      }
    );
    this.cols = [
          { field: 'line_name', header: 'Line Name' },
          { field: 'amount', header: 'Brand' }
      ];
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
      this.displayDialog = false;

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
  onSubmit() {
    const invoiceData: any = {
      line_id: this.blines.get('bline').value,
      budget_id: 1,
      amount: this.blines.get('Amount').value,
      };
    console.log(invoiceData);
    this.httpService.newBL(invoiceData).subscribe(
      budgets => {
        console.log(budgets);
    });
    window.location.reload();
}
}
