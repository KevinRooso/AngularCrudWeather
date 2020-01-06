import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { User } from 'src/user.model';
import { faPlus, faEdit, faTimesCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { phoneValidation } from '../Validators/phone-validator';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Username for current user
  unm =  sessionStorage.getItem("username");
  
  //variable for current user and all users
  currUser : User;
  newUser : User;
  users : User[];
  
  // font awesome icons
  faPlus = faPlus;
  faEdit = faEdit;
  faTimesCircle = faTimesCircle;
  faMinusCircle = faMinusCircle;
  
  // ngBootstrap modal reference
  modalRef : NgbModalRef; 
  
  //Add User Form Group
  addUserForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]),
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required, Validators.minLength(6)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    phone : new FormControl('',[Validators.required,phoneValidation])     
  });

  get name(){
    return this.addUserForm.get("name");
  }
  get username(){
    return this.addUserForm.get("username");
  }
  get password(){
    return this.addUserForm.get("password");
  }
  get email(){
    return this.addUserForm.get("email");
  }
  get phone(){
    return this.addUserForm.get("phone");
  }
  
  
  //Edit User Form Group
  editUserForm = new FormGroup({
    name : new FormControl(''),
    username : new FormControl(''),
    password : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl('')     
  });

  //span element for unique constraints
  unameUnique : string;
  emailUnique : string;
  phoneUnique : string;
sa
  constructor(private dashboardService : DashboardService, private modalService : NgbModal) { }

  ngOnInit() {  
    this.getCurrentUser(this.unm);
    this.showAll();
    console.log("After Login =>" + sessionStorage.getItem("id"));
  }

  getCurrentUser(unm: String){
    this.dashboardService.getUserByUname(unm).subscribe(
      res => {        
        this.currUser = res.userData;
      },
      err => {
        alert("Error occurred in retrieving current user data");
      }
    );
  }

  showAll(){
    this.dashboardService.showAllUsers().subscribe(
      res => {          
          this.users = res.userData;
          console.log(res);          
      },
      err => {
        alert("Error occurred while retrieving all user data");
      }
    )
  }

  open(content){
    this.modalRef = this.modalService.open(content, {size : 'lg'});
  }

  onSave(){
    this.modalRef.close();
  }

  onAdd(){
    this.newUser = <User> this.addUserForm.value;
    this.newUser.createdBy = this.currUser.name;
    this.dashboardService.saveUser(this.newUser).subscribe(
      res => {
        if(res.userData.username==null)
       {
        this.phoneUnique = "";
        this.emailUnique = "";
        this.unameUnique = "Username already exists"; 
       } else if(res.userData.email==null){
         this.emailUnique = "Email already exists";
         this.unameUnique = "";
         this.phoneUnique = "";
       }
        else if(res.userData.phone==null){
          this.phoneUnique = "Phone number already exists";
          this.unameUnique = "";
          this.emailUnique = "";
        }
        else{
          this.users.push(res.userData);
          this.onSave(); 
          this.modalRef.close();
         } 
      },
      err => {
        alert("Error adding new user");
      }
    );
  }

  editUser(id: number, editForm){
   this.open(editForm);
   var index = this.users.map(item=>item.id).indexOf(id);
   console.log(index);
   this.editUserForm.setValue({name:this.users[index].name,username:this.users[index].username,phone:this.users[index].phone,email:this.users[index].email,password:''});   
   console.log(this.editUserForm.value);
   sessionStorage.setItem("uid",id.toString());
  }

  onEdit(){
    this.newUser = new User();
    this.newUser = <User> this.editUserForm.value;
    this.newUser.id = Number(sessionStorage.getItem("uid"));
    var index = this.users.map(item => item.id).indexOf(this.newUser.id);
    this.newUser.modifyBy = this.currUser.name;
    console.log(this.newUser);
    this.dashboardService.editUser(this.newUser).subscribe(
      res => {
        if(res.username==null)
       {
        this.phoneUnique = "";
        this.emailUnique = "";
        this.unameUnique = "Username already exists"; 
       } else if(res.email==null){
         this.emailUnique = "Email already exists";
         this.unameUnique = "";
         this.phoneUnique = "";
       }
        else if(res.phone==null){
          this.phoneUnique = "Phone number already exists";
          this.unameUnique = "";
          this.emailUnique = "";
        }else{
        this.users.splice(index,1,res.userData);
        this.onSave();
        alert("User updated");
        }
      },
      err => {
        alert("Error updating user");
      }
    );
  }

  onDelete(id: number){
    let index = this.users.map(item=>item.id).indexOf(id);
    this.dashboardService.deleteUser(id).subscribe(
      res=>{
        console.log(res);
        this.users.splice(index,1);
        alert("User Deleted");
      },
      err=>{
        console.log("Error deleting user");
      }
    );
  }

  signOut(){
    this.dashboardService.logUserOut();
  }
  

}
