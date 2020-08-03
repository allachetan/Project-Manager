import { Component, OnInit, HostListener } from '@angular/core';
import { FullBlockService } from './full-block.service';
import { BlockComponent } from '../block/block.component';

@Component({
  selector: 'app-full-block',
  templateUrl: './full-block.component.html',
  styleUrls: ['./full-block.component.css']
})
export class FullBlockComponent implements OnInit {

  // css properties
  fullBlockWidth: string;
  fullBlockHeight: string;
  titleLineWidth: string;
  fullBlockContentHeight: string;

  // reference to this component
  private componentRef;

  // refernce to block
  blockComponent: BlockComponent;

  // loading screen
  zIndex = '100';
  private loadingTimeout: any;
  private loadingTimeoutFinished = false;
  private loadFinished = false;
  loadingBackground = '#ffffff';

  deleteButtonOpacity = '100%';

  constructor(public fullBlockService: FullBlockService) { }

  ngOnInit() {
    if (this.blockComponent.homeComponent.mainBlockId === this.blockComponent.blockService.getBlockId()) {
      this.deleteButtonOpacity = '0%';
    }
    this.loadingTimeout = setTimeout(() => {
      this.loadingTimeoutFinished = true;
      if (this.loadFinished) {
        this.zIndex = '-1000';
        this.loadingBackground = '#f3f3f3';
      }
    }, 500);
    this.fullBlockHeight = window.innerHeight - 80 + 'px';
    this.fullBlockWidth = window.innerWidth - 80 + 'px';
    this.titleLineWidth = window.innerWidth - 80 - 40 + 'px';
    this.fullBlockContentHeight = window.innerHeight - 80 - 90 + 'px';
    this.fullBlockService.loadBlock().then(data => {
      this.loadFinished = true;
      if (this.loadingTimeoutFinished) {
        this.zIndex = '-1000';
        this.loadingBackground = '#f3f3f3';
      }
    }
    );
    this.blockComponent.homeComponent.hideLogout();
  }

  setComponentRef(componentRef) {
    this.componentRef = componentRef;
  }

  contentUpdated(event) {
    event.preventDefault();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.fullBlockHeight = window.innerHeight - 80 + 'px';
    this.fullBlockWidth = window.innerWidth - 80 + 'px';
    this.titleLineWidth = window.innerWidth - 80 - 40 + 'px';
    this.fullBlockContentHeight = window.innerHeight - 80 - 90 + 'px';

  }

  deleteButtonClick() {
    if (this.blockComponent.homeComponent.mainBlockId !== this.blockComponent.blockService.getBlockId()) {
      this.blockComponent.blockService.deleteBlock();
    }
  }

  closeButtonClick() {
    this.blockComponent.homeComponent.displayLogout();
    this.blockComponent.refreshView();
    this.componentRef.destroy();
  }

  titleExit(innerHtml) {
    this.fullBlockService.setTitle(innerHtml);
    this.fullBlockService.updateBlock();
    this.blockComponent.blockService.setTitle(this.fullBlockService.getTitle());
  }

  descriptionExit(innerHtml) {
    this.fullBlockService.setDescription(innerHtml);
    this.fullBlockService.updateBlock();
    this.blockComponent.blockService.setDescription(this.fullBlockService.getDescription());
  }

}
