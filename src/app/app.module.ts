import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoicesComponent } from './invoices/invoices.component';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { HttpService } from './http.service';
import { ProcessRegComponent } from './processes/process-reg/process-reg.component';
import { ProcessOwnerComponent } from './processes/process-owner/process-owner.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetComponent } from './budget/budget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { IListComponent } from './i-list/i-list.component';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import { BudgetInfoComponent } from './budget-info/budget-info.component';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    NewBudgetComponent,
    ProcessRegComponent,
    ProcessOwnerComponent,
    BudgetsComponent,
    BudgetComponent,
    IListComponent,
    BudgetInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiSelectModule,
    MessageModule,
    MessagesModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserModule,
    TableModule,
    DialogModule,
    DataViewModule,
    DropdownModule,
    AgGridModule.withComponents([])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
