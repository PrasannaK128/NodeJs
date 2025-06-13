import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services.service';
import { DashboardData } from '../../dashboard-data';
import { FormsModule } from '@angular/forms';
import { Router, RouterConfigOptions } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  data: DashboardData[] = [];
  formData: DashboardData = new DashboardData;

  msg: string = '';
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.formData.passport = input.files[0];
    }
  }


  constructor(private ser: ServicesService, private router: Router) { }
  isAddFormVisible = false;
  isUpdateFormVisible = false;
  isDeleteFormVisible = false;

  showAddForm() {
    if (this.isAddFormVisible) {
      this.isAddFormVisible = false;

    }
    else {
      this.isAddFormVisible = true;

    }
    this.isUpdateFormVisible = false;
    this.isDeleteFormVisible = false;
  }

  showUpdateForm() {
    if (this.isUpdateFormVisible) {
      this.isUpdateFormVisible = false;

    }
    else {
      this.isUpdateFormVisible = true;

    }
    this.isAddFormVisible = false;
    this.isDeleteFormVisible = false;
  }

  showDeleteForm() {
    if (this.isDeleteFormVisible) {
      this.isDeleteFormVisible = false;

    }
    else {
      this.isDeleteFormVisible = true;

    }
    this.isAddFormVisible = false;
    this.isUpdateFormVisible = false;
  }

  ngOnInit(): void {
    this.fun1();
  }

  fun1() {
    this.ser.getDashboard().subscribe({
      next: (res) => {
        this.data = res.employees;
        this.totalPages = Math.ceil(res.total / 5);
        console.log('coming data!!!!11', this.data);

      },
      error: (err) => {
        console.error('Error fetching dashboard data', err);
      }
    });
  }
  addEmployee() {
    this.ser.addEmp(this.formData).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.resetFormData();
        console.log("This is response", res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  resetFormData() {
    this.formData = new DashboardData();
  }

  updateEmployee() {
    this.ser.updateEmo(this.formData).subscribe({
      next: (res) => {

        this.isUpdateFormVisible = false;
        this.resetFormData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  deleteEmployee() {
    this.ser.deleteEmp(this.formData).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.fun1();

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login'])

  }








  /* Pagination and Sorting */
  currentPage: number = 1;
  totalPages: number = 10;
  sortBy: string = 'id';
  order: string = 'ASC'


  nextPage() {
    if (this.currentPage <= this.totalPages) {
      this.currentPage++;

    }
    this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });


  }
  idSort() {
    this.sortBy = 'id'
    if (this.order == 'ASC') {
      this.order = 'DESC'
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
sortDataDepartment() {
  if(this.order=='asc')
  {
    this.order='desc';
  }
  else{
    this.order='asc';
  }
  this.sortBy='department';
   this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });
}
sortDataSalary() {
   if(this.order=='asc')
  {
    this.order='desc';
  }
  else{
    this.order='asc';
  }
this.sortBy='salerey';
 this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });
}
sortDataCompany() {
   if(this.order=='asc')
  {
    this.order='desc';
  }
  else{
    this.order='asc';
  }
this.sortBy='companyname'
 this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });
}
sortDataEmail() {
   if(this.order=='asc')
  {
    this.order='desc';
  }
  else{
    this.order='asc';
  }
this.sortBy='email'
 this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });
}
sortDataName() {
   if(this.order=='asc')
  {
    this.order='desc';
  }
  else{
    this.order='asc';
  }
this.sortBy='name'
 this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });

}
sortDataId() {
   if(this.order=='asc')
  {
    this.order='desc';
  }
  else{
    this.order='asc';
  }
  
  this.sortBy='id'
 this.ser.bundle(this.currentPage, this.sortBy, this.order).subscribe({
      next: (res) => {
        this.data = res.employees;
      },
      error: (err) => {
        console.log(err);
      }
    });}


 






}




