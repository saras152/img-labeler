import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MaskingService } from '../services/masking.service';
import lut from 'src/assets/images.json'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit, AfterViewInit {
  public startUrl = environment.defaultImage;
  public startNum;
  @ViewChild('url') url;
  @ViewChild('imageNumber') num;

  constructor(private maskSvc: MaskingService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.maskSvc.setImageUrl(environment.defaultImage)
    	   
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.imageNumber){
          this.updateImageByNum(params.imageNumber);
      }
    });
}
  public showMask(url?: string): void {
    if (!url) {
      url = this.url.nativeElement.value.replace(environment.imageDirectoryName, environment.maskDirectoryName);
    }
    this.maskSvc.setMaskUrl(url);
  }

  public fromUrl(): void{
    this.showMask(prompt('Enter Mask URL').valueOf().replace('imgs', 'masks').replace('?raw=true', '')
    .replace('https://github.com', 'https://raw.githubusercontent.com').replace('/blob', ''));
  }

  public updateImage(): void {
    this.maskSvc.setImageUrl(this.url.nativeElement.value);
  }

  public updateImageByNum(number?: string): void {
    let imgN = this.num.nativeElement.value.padStart(4, '0');
    if(number){
      imgN = number.padStart(4, '0');
      this.num.nativeElement.value = imgN;
    }
    let url = `${environment.imageDirectory}${lut.find(obj => obj.id === imgN).val}`;
    this.url.nativeElement.value = url;
    this.maskSvc.setImageUrl(url);
  }

}
