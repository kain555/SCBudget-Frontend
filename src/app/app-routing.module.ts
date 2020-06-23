import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ProcessOwnerComponent } from './processes/process-owner/process-owner.component';
import { ProcessRegComponent } from './processes/process-reg/process-reg.component';
import { BudgetInfoComponent } from './budget-info/budget-info.component';
import { BudgetComponent } from './budget/budget.component';
import { IListComponent } from './i-list/i-list.component';


const routes: Routes = [
  {path: 'invoices', component: InvoicesComponent},
  {path: 'newBudget', component: NewBudgetComponent},
  {path: 'budgets', component: BudgetsComponent},
  {path: 'nBudget', component: NewBudgetComponent},
  {path: 'pOwner', component: ProcessOwnerComponent},
  {path: 'pReg', component: ProcessRegComponent},
  {path: 'budgetInfo', component: BudgetInfoComponent},
  {path: 'budget', component: BudgetComponent},
  {path: 'iList', component: IListComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
