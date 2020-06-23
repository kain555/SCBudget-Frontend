import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Invoices } from '../Models/invoices';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }
  invoice: FormGroup;
  objInvoice: Invoices;
  public budgets = [];
  public lines = [];
  lineSelected: any;

  ngOnInit() {
    this.httpService.getBudgets().subscribe (
      budget => {
        this.budgets = budget;
        console.log(this.budgets);
      }
    );
    this.invoice = this.formBuilder.group ({
        iNumber: new FormControl(''),
        iDate: new FormControl(''),
        customer: new FormControl(''),
        iName: new FormControl(''),
        budID: new FormControl(''),
        amount: new FormControl(''),
        bline: new FormControl(''),
        dDate: new FormControl(''),
        comm: new FormControl('')
      });
}
onSubmit() {
  const budgetID: number = +this.invoice.get('budID').value;
  const line: number = +this.invoice.get('bline').value;
  const invoiceData: any = {
        invoice_number: this.invoice.get('iNumber').value,
        invoice_date: this.invoice.get('iDate').value,
        customer: this.invoice.get('customer').value,
        item_name: this.invoice.get('iName').value,
        budget_ID: budgetID,
        amount: this.invoice.get('amount').value,
        line_id: line,
        dueDate: this.invoice.get('dDate').value,
        comment: this.invoice.get('comm').value
    };
  this.httpService.newInvoice(invoiceData).subscribe (
  Added => {
    console.log(Added);
  }
);

  this.invoice.reset();
}
getLines() {
  this.httpService.getLines().subscribe (
    line => {
      this.lines = line;
      console.log(this.lines);
    }
  );
}
}
