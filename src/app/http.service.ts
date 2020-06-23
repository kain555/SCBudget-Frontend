import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from './models/Employees';
import { Budget } from './models/Budget';
import { Basis } from './models/Basis';
import { Processes } from './models/Processes';
import { Invoices } from './Models/invoices';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }
    PreqID: string;
    BudgetID: string;
    ownerID: string;
    posi: string;
    url = 'http://localhost:63681/api/';

    newBL(bl: any): Observable<any> {
        return this.http.post<any>('http://localhost:63681/api/BudgetLines', bl, {
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }
    nextStep(nextProcess: any): Observable<any> {
        return this.http.post<any>('http://localhost:63681/api/ProcessStep', nextProcess, {
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }
    registerInvoice(invID: number): Observable<any> {
        return this.http.post<any>('http://localhost:63681/api/acc', invID, {
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }
    nextStepOwner(nextProcess: any): Observable<any> {
        return this.http.post<any>('http://localhost:63681/api/nextStepOwner', nextProcess, {
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }
    getBudgetInfo(BudgetID: number): any {
        let params1 = new HttpParams();
        this.BudgetID = BudgetID.toString();
        params1 = params1.append('budgetID', this.BudgetID);
        return this.http.get('http://localhost:63681/api/nextStepOwner', {params: params1});
    }
    setBudget(BudgetID: number): any {
        let params1 = new HttpParams();
        this.BudgetID = BudgetID.toString();
        params1 = params1.append('BudgetID', this.BudgetID);
        return this.http.get('http://localhost:63681/api/nextStepOwner', {params: params1});
    }
    getTotalBudget(BudgetID: number): any {
        let params1 = new HttpParams();
        this.BudgetID = BudgetID.toString();
        params1 = params1.append('BudgetID', this.BudgetID);
        return this.http.get('http://localhost:63681/api/BudgetTotal', {params: params1});
    }
    budgetMoreInfo(BudgetID: number): any {
        let params1 = new HttpParams();
        this.BudgetID = BudgetID.toString();
        params1 = params1.append('BudgetID', this.BudgetID);
        return this.http.get('http://localhost:63681/api/Budget', {params: params1});
    }
    LinesByBudget(BudgetID: number): any {
        let params1 = new HttpParams();
        this.BudgetID = BudgetID.toString();
        params1 = params1.append('BudgetID', this.BudgetID);
        return this.http.get('http://localhost:63681/api/invoices', {params: params1});
    }
    GetBudgetIDtoProcess(ownerID: number): any {
        let params1 = new HttpParams();
        this.ownerID = ownerID.toString();
        params1 = params1.append('ownerID', this.ownerID);
        return this.http.get('http://localhost:63681/api/basis', {params: params1});
    }
    invoiceByCustomer(startedBy: number): any {
        let params1 = new HttpParams();
        this.ownerID = startedBy.toString();
        params1 = params1.append('startedBy', this.ownerID);
        return this.http.get('http://localhost:63681/api/acc', {params: params1});
    }
    getEmployees(): Observable<Array<Employees>> {
        return this.http.get<Array<Employees>>('http://localhost:63681/api/employees');
    }
    showACC(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:63681/api/acc');
    }
    getPentingDirector(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/ProcessesStatus/GetPentingDirector', {params: params1});
    }

    GetPentingDirectorReg(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/ProcessesStatus/GetPentingDirectorReg', {params: params1});
    }

    GetPentingOwner(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/ProcessesStatus/GetPentingOwner', {params: params1});
    }

    GetAcceptedDirector(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/ProcessesStatus/getAcceptedDirector', {params: params1});
    }

    GetAcceptedReg(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/ProcessesStatus/GetAcceptedReg', {params: params1});
    }

    GetAcceptedOwner(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/ProcessesStatus/GetAcceptedOwner', {params: params1});
    }

    getUserByPos(position: number): any {
        let params1 = new HttpParams();
        this.posi = position.toString();
        params1 = params1.append('position', this.posi);
        return this.http.get('http://localhost:63681/api/employees', {params: params1});
    }
    getDirectors(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:63681/api/employees/GetDirectors');
    }

    getDirectorsReg(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:63681/api/employees/getDirectorsReg');
    }
    getOwners(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:63681/api/employees/getOwners');
    }
    getBasis(): Observable<Array<Basis>> {
        return this.http.get<Array<Basis>>('http://localhost:63681/api/basis');
    }
    getInvoices(): Observable<Array<Invoices>> {
        return this.http.get<Array<Invoices>>('http://localhost:63681/api/invoices');
    }
    getProjects(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:63681/api/projects');
    }

    newBudget(budgets: Budget): Observable<Budget> {
        return this.http.post<Budget>('http://localhost:63681/api/basis', budgets, { // 353
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }

    getBudgets(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:63681/api/budget/getBudgetNotStarted');
    }

    newProcess(process: Processes): Observable<Processes> {
        return this.http.post<Processes>('http://localhost:63681/api/newProcess', process, {
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }
    newInvoice(invoice: any): Observable<any> {
        return this.http.post<any>('http://localhost:63681/api/Invoices', invoice, {
            headers: new HttpHeaders().append('Content-Type', 'application/json')});
    }
    getLinesbyBudget(reqID: number): any {
        let params1 = new HttpParams();
        this.PreqID = reqID.toString();
        params1 = params1.append('reqID', this.PreqID);
        return this.http.get('http://localhost:63681/api/Lines', {params: params1});
    }
    getLines(): any {
        return this.http.get<Array<any>>('http://localhost:63681/api/Lines');
    }
}
