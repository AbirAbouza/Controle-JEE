import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers:any;



  customer: Customer = new Customer();

  customerFormGroup!: FormGroup;

  constructor(private http:HttpClient, private router:Router, private customerService: CustomerService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8889/CUSTOMER-SERVICE/customers").subscribe({
      next: (data)=>{
        this.customers=data;
      },
      error: (err)=>{}
    });

    this.customerFormGroup=this.fb.group({
      name  : this.fb.control(""),
      email : this.fb.control("")

    });

  }

  getBills(c: any){
    this.router.navigateByUrl("/bills/"+c.id);
  }

  saveCustomer(){
    this.customer=new Customer();
    this.customer.name=this.customerFormGroup.value.name;
    this.customer.email=this.customerFormGroup.value.email;
    this.save();
  }

  save() {
    this.customerService.createCustomer(this.customer)
      .subscribe({
        next: (data)=>{
    
          this.ngOnInit();
        },
        error: (err)=>{
          console.log(err)
        }
      });
    this.customer = new Customer();
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id)
    .subscribe({
      next: (data)=>{
     
        this.ngOnInit();
      },
      error: (err)=>{
        console.log(err)
      }
    });
  }

}