import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Signup } from './signup';
import { Observable } from 'rxjs';
import { DashboardData } from './dashboard-data';
import { ObjectEncodingOptions } from 'fs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }
  url='http://localhost:1000/signup'
  url1='http://localhost:1000/login'
  url2='http://localhost:1000/dashboard'
  url3='http://localhost:1000/addEmp'
  url4='http://localhost:1000/updateEmp'
  url5='http://localhost:1000/deleteEmp'
  postData(sign:Signup):Observable<any>
  {
    console.log('Upcoming data',sign) 
    return this.http.post(this.url,sign);
  }
  getData(sign:Signup):Observable<any>
  {
    return this.http.post(this.url1,sign);
  }
  getDashboard():Observable<any>{
    return this.http.get(this.url2);
}
  addEmp(formData: DashboardData) {
  const uploadData = new FormData();
  uploadData.append('name', formData.name);
  uploadData.append('email', formData.email);
  uploadData.append('password', formData.password);
  uploadData.append('companyname', formData.companyname);
  uploadData.append('salerey', formData.salerey.toString());
  uploadData.append('department', formData.department);
  
  
  if (formData.passport) {
    uploadData.append('passport', formData.passport);
  }

  return this.http.post(this.url3, uploadData);
}

 updateEmo(data: DashboardData): Observable<any> {
  const uploadData = new FormData();
  uploadData.append('id', data.id?.toString() || '');
  uploadData.append('name', data.name || '');
  uploadData.append('email', data.email || '');
  uploadData.append('password', data.password || '');
  uploadData.append('companyname', data.companyname || '');
  uploadData.append('salerey', data.salerey !== undefined && data.salerey !== null ? data.salerey.toString() : '');
  uploadData.append('department', data.department || '');

  if (data.passport) {
    uploadData.append('passport', data.passport);
  }

  return this.http.put(this.url4, uploadData);
}


deleteEmp(data: DashboardData): Observable<any> {
  return this.http.delete(this.url5, {body:data});  
}

bundle(currentpage:number,sortBy:string,order:string):Observable<any>
{
  console.log("Method called") 
  const params = new HttpParams()
    .set('page', currentpage)
    .set('sortBy', sortBy)
    .set('order', order);

    return this.http.get(this.url2,{params});
}

}