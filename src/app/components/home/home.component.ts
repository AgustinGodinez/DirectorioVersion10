import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/components/models/user';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  closeResult = '';
  employeeForm:FormGroup;
  proyectForm: FormGroup;
  employeeStatus:FormGroup;
  employeeProyecto: FormGroup;
  responForm: FormGroup;
  idFirebaseActualizar:string;
  idFirebaseActualizarSatus: String;
  actualizar:boolean;

  constructor(public modalService: NgbModal, public fb:FormBuilder, private firebaseServiceService:FirebaseServiceService,private authService: AuthService) { }

  filterUsers = '';
    config:any;
     
    collection={count:0, data:[]}
   
    /*Configuracion para mostrar proyectos */
   
     configProyect:any;
     collection2 = {count2:0, data2:[]}
   
     configRespon:any;
     collection3 = {count3:0, data3:[]}

     configUser:any;
     collection4 = {count3:0, data3:[]}
     
     user: UserInterface = {
        name:'',
        email:''
     }

     public providerId: string = 'null';

     ngOnInit(): void {
       this.authService.isAuth().subscribe(user => {
         if(user){
            this.user.name = user.displayName;
            this.user.email = user.email;
            this.providerId = user.providerData[0].providerId;
            console.log('USER: ',this.user.name);
            this.filterUsers= this.user.name
            
         }
       })
       this.idFirebaseActualizar="";
       this.actualizar=false;
       

   this.config = {
        itemsPerPage:5,
        currentPage:1,
        totalItems:this.collection.data.length
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
           id:['',Validators.required],
           nombre:['', Validators.required],
           correoPersonal:['', Validators.required],
           correoCorporativo: ['', Validators.required],
           telefono: ['',Validators.required],
           fecha_nacimiento:['', Validators.required],
           proyecto_asignado:['', Validators.required],
           fecha_incorporacion:['', Validators.required],
           fecha_baja:['', Validators.required],
           responsable_directo:['', Validators.required],
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
    this.collection3.data3 = resp.map((e:any) =>{
     return{
        responsable_directo:e.payload.doc.data().responsable_directo
     }
    })
  }, 
  error =>{
   console.log(error)
  }
  );
   
   
   }
   
     pageChanged(event){
       this.config.currentPage = event;
     }


    }