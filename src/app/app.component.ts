import { Component, OnInit } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isEmulator: boolean = false;
  constructor(
    private platform: Platform,
    private device: Device,
  ) {}

  ngOnInit(): void {
    console.log("oninit....");
    
    this.platform.ready().then(() => {
      this.checkIfEmulator();
    });
  }

  checkIfEmulator() {
    if (this.device.isVirtual) {
      this.isEmulator = true;
      console.log('Running on an emulator');
      (navigator as any).app.exitApp();
    } else {
      this.isEmulator = false;
      console.log('Running on a real device');
    }
  }
}
