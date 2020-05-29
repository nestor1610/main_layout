import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';


@Injectable()
export class PayrollService {

  constructor(public http: HttpClient) { }

  getPayroll(id) {
		return this.http.get(BananaConstants.urlServer + 'api/payroll/getPayroll/' + id, BananaHeader());
  }

  getAllPayroll(id) {
		return this.http.get(BananaConstants.urlServer + 'api/payroll/getAllPayroll/' + id, BananaHeader());
  }

  updatePayroll(payroll) {
    return this.http.post(BananaConstants.urlServer + 'api/payroll/updatePayroll', payroll,BananaHeader());
  }

  deletePayroll(id,table) {
    return this.http.get(BananaConstants.urlServer + 'api/payroll/deletePayroll/' + id + '/' + table, BananaHeader());
  }


  scriptsPayroll(id, name){
    return this.http.get(BananaConstants.urlServer + 'api/payroll/scriptsPayroll/' + id + '/' + name, BananaHeader());
  }



}
