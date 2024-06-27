import { Component, OnInit } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Platform } from '@ionic/angular';
// @ts-ignore
import * as fridadetect from  '../../plugins/com.gemini.fridadetect/www/FridaDetectWrapper';
// @ts-ignore
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // isEmulator: boolean = true;
  constructor(
    private platform: Platform,
    private device: Device,
  ) {}

  ngOnInit(): void {
    console.log("oninit....");
    this.platform.ready().then(() => {
      this.checkFridaDetection();
    }); 
  }

  checkFridaDetection() {
    fridadetect.fridadetect("0", (result: string) => {
        console.log('result-' + result);
        this.showSuccessAlert()
      }, (error: string) => {
        console.log('result-error' + error);
        this.showErrorAlert(error);
    })
  }

  showErrorAlert(text: string) {
    Swal.fire({
      title: 'Error!',
      text: text,
      icon: 'error',
      confirmButtonText: 'OK'
    }).then((result: any) => {
      if (result.isConfirmed) {
        fridadetect.closeapp("0", (result: string) => {
          console.log('result-' + result);
          }, (error: string) => {
          console.log('result-error' + error);
        })
      }
    });
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Device is secure!!',
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }
}
