import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/components/models/user';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { UserdbService } from 'src/app/services/userdb.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss'],
})
export class DirectorioComponent implements OnInit {
  closeResult = '';
  submitted = false;
  employeeForm:FormGroup;
  proyectForm: FormGroup;
  employeeStatus:FormGroup;
  employeeProyecto: FormGroup;
  responForm: FormGroup;
  employeeAddForm:FormGroup;
  idFirebaseActualizar:string;
  idFirebaseActualizarSatus: String;
  actualizar:boolean;

  users: UserInterface[];


  constructor(
    public modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService,
    private authService: AuthService,
    private userdb:UserdbService,
    private router:Router
  ) {}

  filterPost = '';
  filterProyectos = '';

  filterActivo = '';
  filterAdmin = '';
  config: any;
  config2: any;
  collection = { count: 0, data: [] };

  public userRol: any = null;
  public userUid: any = null;
 

  configProyect:any;
  collection2 = {count2:0, data2:[]}

  configRespon:any;
  collection3 = {count3:0, data3:[]}

  ngOnInit(): void {
    this.getCurrentUser();
    this.userdb.getUsers().subscribe((res)=>{
      this.users=res
    })
    this.idFirebaseActualizar = '';
    this.actualizar = false;
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length,
    };
    this.config2 = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length,
    };

    this.configProyect = {
      itemsPerPage2:5,
      currentPage2:1,
      totalItems2:this.collection2.data2.length
    };

    this.configRespon = {
      itemsPerPage2:5,
      currentPage2:1,
      totalItems2:this.collection3.data3.length
    };



    this.employeeForm = this.fb.group({
      id:Math.random().toString(36).substr(2,18),
      nombre:['', Validators.required],
      correoPersonal:['', [Validators.required, Validators.email]],
      correoCorporativo: ['', [Validators.required, Validators.email]],
      telefono: ['',Validators.required],
      fecha_nacimiento:['', Validators.required],
      proyecto_asignado:['', Validators.required],
      fecha_incorporacion:['', Validators.required],
      fecha_baja:['', Validators.required],
      responsable_directo:['', Validators.required],
      Nombre_familiar:['', Validators.required],
      Telefono_familiar:['', Validators.required],
      activo:['', Validators.required],

  });


  this.employeeStatus = this.fb.group({
    activo:['', Validators.required],

});

 this.employeeProyecto = this.fb.group({
    proyecto_asignado:['', Validators.required]
 })

 this.proyectForm = this.fb.group({
  proyecto_asignado2:['', Validators.required]
})

this.responForm = this.fb.group({
  responsable_directo:['', Validators.required]
  })

    //Obtener los valores 
this.firebaseServiceService.getEmployee().subscribe(resp=>{
  this.collection.data = resp.map((e:any) =>{
    return{
     id:e.payload.doc.data().id,
     nombre:e.payload.doc.data().nombre,
     correoPersonal: e.payload.doc.data().correoPersonal,
     correoCorporativo: e.payload.doc.data().correoCorporativo,
     telefono:e.payload.doc.data().telefono,
     fecha_nacimiento:e.payload.doc.data().fecha_nacimiento,
     proyecto_asignado:e.payload.doc.data().proyecto_asignado,
     fecha_incorporacion:e.payload.doc.data().fecha_incorporacion,
     fecha_baja:e.payload.doc.data().fecha_baja,
     responsable_directo:e.payload.doc.data().responsable_directo,
     Nombre_familiar:e.payload.doc.data().Nombre_familiar,
     Telefono_familiar:e.payload.doc.data().Telefono_familiar,
     activo:e.payload.doc.data().activo,
     idFirebase:e.payload.doc.id,
    }
  })
 },
  error=>{
    console.error(error)
  }
 );

 
 
 
 this.firebaseServiceService.getProyect().subscribe(resp =>{  
    this.collection2.data2 = resp.map((a:any) =>{
     return{
       proyecto_asignado2:a.payload.doc.data().proyecto_asignado2
     }
    })
 }, 
 error =>{
   console.log(error)
 }
 );


 this.firebaseServiceService.getResponsable().subscribe(resp =>{  
  this.collection3.data3 = resp.map((a:any) =>{
   return{
      responsable_directo:a.payload.doc.data().responsable_directo
   }
  })
}, 
error =>{
 console.log(error)
}
);


  }

  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe((userRole) => {
          this.userRol = Object.assign({}, userRole?.roles).rol;


        });
      }
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  pageChanged2(event) {
    this.config2.currentPage = event;
  }


 

  cambiarStatus(event) {}

  eliminar(item: any): void {
    this.firebaseServiceService.deleteEmployee(item.idFirebase);
  }

  //Agregar empleado
  guardarEmpleado(): void {
    this.firebaseServiceService
      .createEmployee(this.employeeForm.value)
      .then((resp) => {
        this.employeeForm.reset();
        this.modalService.dismissAll();
      })
      .catch((error) => {
        console.error(error);
      });


  }

  //Agregar proyecto
guardarProyecto():void{
  this.firebaseServiceService.createProyecto(this.proyectForm.value).then(resp =>{
    this.proyectForm.reset();
    this.modalService.dismissAll();
  }).catch(error =>{
     console.error(error)
  });
}
closeClick(){
this.proyectForm.reset();
this.modalService.dismissAll();
}

//Agregar responsable directo
guardarResponsable():void{
  this.firebaseServiceService.createResponsable(this.responForm).then(resp =>{
    this.responForm.reset();
    this.modalService.dismissAll();
  }).catch(error =>{
     console.error(error)
  });
}

  actualizarEmpleado() {
    if (this.idFirebaseActualizar) {
      this.firebaseServiceService
        .updateEmployee(this.idFirebaseActualizar, this.employeeForm.value)
        .then((resp) => {
          this.employeeForm.reset();
          this.modalService.dismissAll();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } 
//BOTÓN CERRAR
  botonClose(){
    if (this.idFirebaseActualizar) {
      this.firebaseServiceService
        .updateEmployee(this.idFirebaseActualizar, this.employeeForm.value)
        .then((resp) => {
          this.employeeForm.reset();
          this.modalService.dismissAll();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  actualizarStatus(){
    if(this.idFirebaseActualizar){
      this.firebaseServiceService.updateEmployee(this.idFirebaseActualizar,this.employeeStatus.value).then(resp=>{
        this.employeeStatus.reset();
        this.modalService.dismissAll();
      }).catch(error=>{
        console.log(error);
      })
    }
   
   }

  openEditar(content, item: any) {
    //llenar form para activar
    this.idFirebaseActualizar = item.idFirebase;
    this.actualizar = true;
    if(this.actualizar = true){
      this.employeeForm.setValue({
        id:item.id,
        nombre:item.nombre,
        correoPersonal:item.correoPersonal,
        correoCorporativo:item.correoCorporativo,
        telefono:item.telefono,
        fecha_nacimiento:item.fecha_nacimiento,
        proyecto_asignado:item.proyecto_asignado,
        fecha_incorporacion:item.fecha_incorporacion,
        fecha_baja:item.fecha_baja,
        responsable_directo:item.responsable_directo,
        Nombre_familiar:item.Nombre_familiar,
        Telefono_familiar: item.Telefono_familiar,
        activo:item.activo
      });
    }else{
      this.actualizar = false;
    }

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }


  open(content) {
    this.actualizar = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEmpleado(contentAdd){
    this.actualizar = false;
    this.modalService
      .open(contentAdd, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

  }


  openResponsable(content4) {
    this.actualizar = false;
    this.modalService
      .open(content4, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openProyecto(content3){
    this.actualizar = false;
    this.modalService
      .open(content3, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onPreUpdateUser(user:UserInterface): void{
    if(user.id){
      this.userdb.updateuser(user)
      Notiflix.Loading.standard('Cargando...')
    }
    this.router.navigate(['directorio']);
    Notiflix.Loading.remove(2000);
  
   }

   //Modificar status

 editarStatus(content2, item:any){
  //llenar form para activar
  
  this.employeeStatus.setValue({
    activo:item.activo
  });
  this.idFirebaseActualizar = item.idFirebase;
  this.actualizar=true;
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  },(reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });   
  
  }
   openModal(content2) {
     this.actualizar=false;
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 

  //Agregar nuevo proyecto
  editarProyecto(content3,item: any){
  
    this.actualizar=true;
    this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });   
    
    }
     openModal2(content3) {
       this.actualizar=false;
      this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

}
