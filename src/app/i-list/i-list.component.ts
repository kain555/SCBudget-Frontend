import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SelectItem } from 'primeng/api/selectitem';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-i-list',
  templateUrl: './i-list.component.html',
  styleUrls: ['./i-list.component.css']
})
export class IListComponent implements OnInit {
  msgs: Message[] = [];
  reqID: number;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }


  invoices: any[];

    cols: any[];

    cols2: any[];

    selectedCar: any;

    brands: SelectItem[];

    colors: SelectItem[];

    public employees = [];

    public acc = [];

    employee: FormGroup;

  ngOnInit() {
    this.httpService.getInvoices().subscribe (
      invoice => {
        this.invoices = invoice;
        console.log(invoice);
      }
    );

    this.httpService.getDirectors().subscribe(
      emp => {
        this.employees = emp;
      }
    );

    this.httpService.showACC().subscribe(
      emp => {
        this.acc = emp;
      }
    );

    this.employee = this.formBuilder.group({
      emp: new FormControl('')
    });

    this.cols = [
      { field: 'invoice_number', header: 'Invoice number' },
      { field: 'invoice_date', header: 'invoice date' },
      { field: 'customer', header: 'Customer' },
      { field: 'item_name', header: 'Item name' },
      { field: 'budgetName', header: 'Budget ID' },
      { field: 'amount', header: 'Amount' },
      { field: 'line', header: 'LineID' },
      { field: 'dueDate', header: 'Due Date' },
      { field: 'comment', header: 'Comment' },
      { field: 'button', header: '' }
  ];
    this.cols2 = [
      { field: 'invoice_number', header: 'Invoice number' },
      { field: 'invoice_date', header: 'invoice date' },
      { field: 'customer', header: 'Customer' },
      { field: 'item_name', header: 'Item name' },
      { field: 'budgetName', header: 'Budget ID' },
      { field: 'amount', header: 'Amount' },
      { field: 'line', header: 'LineID' },
      { field: 'dueDate', header: 'Due Date' },
      { field: 'comment', header: 'Comment' },
      { field: 'registered', header: 'Register' }
];
  }
  showDirectorPanel() {
    this.reqID = this.employee.get('emp').value;
    this.httpService.invoiceByCustomer(this.reqID).subscribe(
      (inv: []) => {
        this.invoices = inv;
        console.log(this.invoices);
      }
    );
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully logged in'});
    document.getElementById('selectUser').style.display = 'none';
    document.getElementById('tableID').style.display = 'block';
  }

  register(inv: number) {
    console.log(inv);
    const data: any = {
      invoice_id: inv
    };
    this.httpService.registerInvoice(data).subscribe(
      (register: []) => {
        console.log(register);
      }
    );
  }
  showAccPanel() {
    this.reqID = this.employee.get('emp').value;
    this.httpService.getInvoices().subscribe(
      (inv: []) => {
        this.invoices = inv;
        console.log(this.invoices);
      }
    );
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully logged in'});
    document.getElementById('selectUser').style.display = 'none';
    document.getElementById('tableACC').style.display = 'block';
  }

  logoff() {
    document.getElementById('selectUser').style.display = 'block';
    document.getElementById('tableID').style.display = 'none';
    document.getElementById('tableACC').style.display = 'none';
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'You have been successfully logged off'});
  }
}
