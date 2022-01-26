import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AssessHotelComponent } from './components/assess-hotel/assess-hotel.component';
import { HeaderComponent } from './components/header/header.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule, Routes } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {GalleriaModule} from 'primeng/galleria';
import { ReactiveFormsModule } from '@angular/forms';
import {GMapModule} from 'primeng/gmap';
import {CarouselModule} from 'primeng/carousel';
import { HomeComponent } from './components/home/home.component';
import { TouristDestinationDetailComponent } from './components/tourist-destination-detail/tourist-destination-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import {OrderListModule} from 'primeng/orderlist';


const app: Routes = [
  {
    path: '', redirectTo: '/hotel', pathMatch: 'full'
  },
  { path: 'hotel', component: HotelComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'assess/:id', component: AssessHotelComponent },
  { path: 'home', component: HomeComponent },
  { path: 'TouristDestinationDetail/:id', component: TouristDestinationDetailComponent },
  { path: 'admin', component: AdminComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    AssessHotelComponent,
    HeaderComponent,
    HotelComponent,
    HotelDetailsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TouristDestinationDetailComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    GMapModule,
    CheckboxModule,
    RatingModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    GalleriaModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    CarouselModule,
    OrderListModule,
    FileUploadModule,
    RouterModule.forRoot(app),
    AngularFireModule.initializeApp(environment.firebaseConfig)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
