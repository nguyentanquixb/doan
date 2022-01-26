import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { formatDate } from '@angular/common';
import { finalize, switchMap } from "rxjs/operators";
import { AssessHotelService } from 'src/app/services/assess-hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-assess-hotel',
  templateUrl: './assess-hotel.component.html',
  styleUrls: ['./assess-hotel.component.css'],
  providers: [MessageService]
})
export class AssessHotelComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  id: any;
  hotelId: any;

  filename: string | undefined
  uploadedFiles: any[] = [];
  isSuccessful = false;
  selectedImage: any = null;
  idhotel: any

  i: any

  checkshowdialog: boolean = true;

  constructor(
    private assessHotelService: AssessHotelService,

    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute, public config: DynamicDialogConfig,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.hotelId = this.route.snapshot.paramMap.get('id');

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
      this.id = user.id;
      console.log(this.id);
    }
    id: this.config.data.id;
    this.onUpload;

    this.check();
  }



  hotelAssess = {
    comment: '',
    fk_user: '',
    hotelId: '',
  };
  response = {
    id: '',

  };
  submitted = false
  saveHotelAssess() {

    const data = {
      comment: this.hotelAssess.comment,
      userId: this.id,
      hotelId: this.hotelId,
    };
    this.assessHotelService.create(data)
      .subscribe(
        response => {
          console.log(response);
          for (this.i = 0; this.i < this.uploadedFiles.length; this.i++) {
            const nameImg = this.getCurrentDateTime() + this.uploadedFiles[this.i].name;
            const fileRef = this.storage.ref(nameImg);
            this.storage.upload(nameImg, this.uploadedFiles[this.i]).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  const dataimg = {
                    hotelAssessmentId: response,
                    img: url,
                  };
                  console.log(url)
                  this.assessHotelService.createimg(dataimg)
                    .subscribe(
                      responseimg => {
                        console.log(responseimg);
                        this.submitted =true;
                       
                      },
                      error => {
                        console.log(error);
                      });
                });
                
              })
      
            ).subscribe();
          }     
        },
        error => {
          console.log(error);
      });
      this.submitted =true;
     
     
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-us');
  }

  check(){
    if(this.submitted ==true)
     this.ref.close(this.checkshowdialog);
  }
  onUpload(event: { files: any; }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}







