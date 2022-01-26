import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelImageService } from 'src/app/services/hotel-image.service';
import { AssessHotelService } from 'src/app/services/assess-hotel.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AssessHotelComponent } from '../assess-hotel/assess-hotel.component';
import { Galleria } from 'primeng/galleria';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { LoginComponent } from '../login/login.component';

declare var google: any;
@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
  providers: [DialogService, MessageService]
})
export class HotelDetailsComponent implements OnInit, OnDestroy {

  hotels: any;
  images: any;
  imagesasess: any;
  hotelAssess: any;
  users: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  id: number;
  elem: HTMLElement | undefined;
  ref: DynamicDialogRef | undefined;
  // galleria
  showThumbnails: boolean | undefined;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  @ViewChild('galleria')
  galleria!: Galleria;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  responsiveOptionsAssess = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

  //gmap
  options: any;
  overlays!: any[];
  dialogVisible!: boolean;
  markerTitle!: null;
  selectedPosition: any;
  infoWindow: any;
  draggable!: boolean;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private hotelImageService: HotelImageService,
    private tokenStorageService: TokenStorageService,
    private assessHotelService: AssessHotelService,
    private dialogService: DialogService,
    private messageService: MessageService,
 
    private cd: ChangeDetectorRef,//img
    @Inject(DOCUMENT) private document: any

  ) {
    this.id = this.route.snapshot.params['id'];
    ;
  }
 

  logout(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.getImage(this.id);
    this.GetImgAssess();
    this.gethotel(this.id);
    this.GetAllHotelAssess(this.id);
    this.bindDocumentListeners();
    this.elem = document.documentElement;

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
    this.infoWindow = new google.maps.InfoWindow();
    

  }

  gethotel(id: number) {
    this.hotelService.get(id)
      .subscribe(
        data => {
          this.hotels = data;
          this.options = {
            center: { lat: this.hotels.lat, lng: this.hotels.lng },
            zoom: this.hotels.zoom
          };
          this.overlays = [ 
            new google.maps.Marker({ position: { lat: this.hotels.lat, lng: this.hotels.lng }, title: this.hotels.name }),
            new google.maps.Polygon({
              paths: [
                { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
              ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
            }),
            new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
            new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
          ];
        },
        error => {
          console.log(error);
        });

  }

  getImage(id: number) {
    this.hotelImageService.getImages(id).subscribe(
      data => {
        this.images = data;
      },
      error => {
        console.log(error);
      });
  }

  GetImgAssess() {
    this.assessHotelService.getAll()
      .subscribe(
        data => {
          this.imagesasess = data;
        },
        error => {
          console.log(error);
        });
  }

  showAssess() {
    this.ref = this.dialogService.open(AssessHotelComponent, {
      data: {
        id: this.id,
      },
      width: '80%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      dismissableMask: true

    });
    this.ref.onClose.subscribe((product: boolean) => {
      this.reloadPage();
      if (product) {
        this.messageService.add({ severity: 'success', summary: 'Đánh giá thành công' });
      }
    });

  }
  showLogin() {
    this.ref = this.dialogService.open(LoginComponent, {
      data: {
        id: this.id,
      },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      dismissableMask: true

    });

  }
  reloadPage(): void {
    window.location.reload();
  }

  // galleria  primeng 
  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }

    this.cd.detach();
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector(".p-galleria");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    else if (elem['mozRequestFullScreen']) { /* Firefox */
      elem['mozRequestFullScreen']();
    }
    else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    }
    else if (elem['msRequestFullscreen']) { /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
    this.cd.detectChanges();
    this.cd.reattach();
  }
  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    }

  }
  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener("fullscreenchange", this.onFullScreenListener);
    document.addEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.addEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.addEventListener("msfullscreenchange", this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener("fullscreenchange", this.onFullScreenListener);
    document.removeEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("msfullscreenchange", this.onFullScreenListener);
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
    if (this.ref) {
      this.ref.close();
    }
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }

  val2 =4
  GetAllHotelAssess(id: number) {
    this.assessHotelService.getAllHotelAssess(id)
      .subscribe(
        data => {
          this.hotelAssess = data;
        },
        error => {
          console.log(error);
        });
  }
  //gmap
  handleMapClick(event: { latLng: any; }) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: { overlay: { getTitle: (() => any); getPosition: () => any; }; map: { setCenter: (arg0: any) => void; }; }) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.messageService.add({ severity: 'info', summary: 'Marker Selected', detail: title });
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Shape Selected', detail: '' });
    }
  }
  zoomIn(map: { setZoom: (arg0: any) => void; getZoom: () => number; }) {
    map.setZoom(map.getZoom() + 1);
  }
  handleDragEnd(event: { overlay: { getTitle: () => any; }; }) {
    this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
}

}

