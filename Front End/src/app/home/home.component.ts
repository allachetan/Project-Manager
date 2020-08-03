import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewChildren, ViewContainerRef, Type, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

import { BlockConnectorComponent } from '../block-connector/block-connector.component';
import { BlockComponent } from '../block/block.component';
import { FullBlockComponent } from '../full-block/full-block.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('blockContainer', { static: true, read: ViewContainerRef }) blockViewContainer: ViewContainerRef;
  @ViewChild('pathContainer', { static: true, read: ViewContainerRef }) pathViewContainer: ViewContainerRef;
  @ViewChild('fullBlockContainer', { static: true, read: ViewContainerRef }) fullBlockContainer: ViewContainerRef;

  constructor(private factory: ComponentFactoryResolver, private router: Router, private authenticationService: AuthService) { }

  title = 'test-design';
  id = 0;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  // drag for map canvas
  private lastPositionX: number;
  private lastPositionY: number;
  private drag = false;

  // zoom
  zoomScale = 1;

  // dragBlock
  dragBlock: BlockComponent;

  // logout button
  logoutOpacity = '100%';
  showLogoutButton = true;
  logoutIndex = '200';

  // loading screen
  zIndex = '1000';
  private loadingTimeout: any;
  private loadingTimeoutFinished = false;
  private loadFinished = false;

  mainBlockId: number;



  public blocks: BlockComponent[] = [];

  hideLogout() {
    this.logoutOpacity = '0%';
    this.showLogoutButton = false;
    this.logoutIndex = '-100';
  }

  displayLogout() {
    this.logoutOpacity = '100%';
    this.showLogoutButton = true;
    this.logoutIndex = '200';
  }
  logout() {
    if (this.showLogoutButton) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
  }

  openFullblock(blockComponent: BlockComponent) {
    // creating full block
    const factory = this.factory.resolveComponentFactory(FullBlockComponent);
    const componentRef = this.fullBlockContainer.createComponent(factory);
    componentRef.instance.fullBlockService.setId(blockComponent.blockService.getBlockId());
    componentRef.instance.setComponentRef(componentRef);
    componentRef.instance.blockComponent = blockComponent;
  }

  createPath() {
    const factory = this.factory.resolveComponentFactory(BlockConnectorComponent);
    const componentRef = this.blockViewContainer.createComponent(factory);
    return componentRef;
  }

  // passes mosue move event to block so add button can be dragged even if cursor isn't directly on it.
  // The add button element is really small so we need this
  passMouseMove(event: any) {
    if (this.dragBlock != null) {
      this.dragBlock.addButtonElementDrag(event);
    }
  }

  loadBlock(id: number, block: BlockComponent) {
    let doesNotExist = true;
    for (const bc of this.blocks) {
      if (bc.blockService.getBlockId() === id) {
        doesNotExist = false;
        const pathFactory = this.factory.resolveComponentFactory(BlockConnectorComponent);
        const pathComponentRef = this.pathViewContainer.createComponent(pathFactory);
        bc.childPaths.push(pathComponentRef.instance);
        block.parentPaths.push(pathComponentRef.instance);
        pathComponentRef.instance.parent.x = block.blockService.getBlockX();
        pathComponentRef.instance.parent.y = block.blockService.getBlockY();
        pathComponentRef.instance.child.x = + (bc.blockService.getBlockX());
        pathComponentRef.instance.child.y = + (bc.blockService.getBlockY());
        pathComponentRef.instance.refresh();
      }
    }
    if (doesNotExist) {
      // creating new block
      const factory = this.factory.resolveComponentFactory(BlockComponent);
      const componentRef = this.blockViewContainer.createComponent(factory);
      componentRef.instance.blockService.setBlockId(id);
      componentRef.instance.homeComponent = this;
      componentRef.instance.blockService.getBlockData().then(data => {
        // tslint:disable-next-line: no-string-literal
        componentRef.instance.blockService.setBlockId(data['blockId']);
        // tslint:disable-next-line: no-string-literal
        componentRef.instance.blockService.setTitle(data['title']);
        // tslint:disable-next-line: no-string-literal
        componentRef.instance.blockService.setDescription(data['description']);
        // tslint:disable-next-line: no-string-literal
        componentRef.instance.blockService.setBlockX(data['blockX']);
        // tslint:disable-next-line: no-string-literal
        componentRef.instance.blockService.setBlockY(data['blockY']);
        // adjust background size when new component is created and has min/max bounds to accomodate more space
        this.blocks.push(componentRef.instance);
        componentRef.instance.refreshView();
        // adjust background size when new component is created and has min/max bounds to accomodate more space
        const scale = 1 / this.zoomScale;
        const mc = document.getElementById('map-canvas');
        const posX = componentRef.instance.blockService.getBlockX();
        const posY = componentRef.instance.blockService.getBlockY();
        if (posX < this.minX) {
          const difference: number = this.minX - posX;
          mc.style.width = mc.getBoundingClientRect().width * scale + difference + 'px';
          mc.style.left = mc.offsetLeft - difference * this.zoomScale + 'px';
          this.maxX += difference;
        } else if (posX > this.maxX) {
          // if newly created component has greatest x value we expand the width of the background
          document.getElementById('map-canvas').style.width = mc.getBoundingClientRect().width * scale + posX - this.maxX + 'px';
          this.maxX = posX;
        }
        if (posY < this.minY) {
          const difference: number = this.minY - posY;
          document.getElementById('map-canvas').style.height = mc.getBoundingClientRect().height * scale + difference + 'px';
          document.getElementById('map-canvas').style.top = document.getElementById('map-canvas').offsetTop
            - difference * this.zoomScale + 'px';
          this.maxY += difference;
        } else if (posY > this.maxY) {
          // if newly created component has greatest y value we expand the height of the background
          document.getElementById('map-canvas').style.height = mc.getBoundingClientRect().height * scale + posY - this.maxY + 'px';
          this.maxY = posY;
        }
        // creating and adding path
        const pathFactory = this.factory.resolveComponentFactory(BlockConnectorComponent);
        const pathComponentRef = this.pathViewContainer.createComponent(pathFactory);
        componentRef.instance.childPaths.push(pathComponentRef.instance);
        block.parentPaths.push(pathComponentRef.instance);
        pathComponentRef.instance.parent.x = block.blockService.getBlockX();
        pathComponentRef.instance.parent.y = block.blockService.getBlockY();
        pathComponentRef.instance.child.x = + (componentRef.instance.blockService.getBlockX());
        pathComponentRef.instance.child.y = + (componentRef.instance.blockService.getBlockY());
        pathComponentRef.instance.refresh();
        componentRef.instance.loadThekids();
      });
    }
  }

  addBlock(block: BlockComponent, posX: number, posY: number) {
    // creating new block
    const factory = this.factory.resolveComponentFactory(BlockComponent);
    const componentRef = this.blockViewContainer.createComponent(factory);
    // initializing new block with values
    componentRef.instance.blockService.setTitle('New Block');
    componentRef.instance.blockService.setDescription('click me to open the full view of this block');
    componentRef.instance.homeComponent = this;
    // letting the parent know that this block was created and giving it the instance
    // refreshing the view of the block
    componentRef.instance.refreshView();
    const scale = 1 / this.zoomScale;
    const mc = document.getElementById('map-canvas');
    componentRef.instance.blockService.setBlockX(posX);
    componentRef.instance.blockService.setBlockY(posY);
    // adjust background size when new component is created and has min/max bounds to accomodate more space
    if (posX < this.minX) {
      const difference: number = this.minX - posX;
      mc.style.width = mc.getBoundingClientRect().width * scale + difference + 'px';
      mc.style.left = mc.offsetLeft - difference * this.zoomScale + 'px';
      for (const bc of this.blocks) {
        bc.offsetX(difference);
        bc.updatePaths();
      }
      this.maxX += difference;
      componentRef.instance.blockService.setBlockX(componentRef.instance.blockService.getBlockX() + difference);
    } else if (posX > this.maxX) {
      // if newly created component has greatest x value we expand the width of the background
      document.getElementById('map-canvas').style.width = mc.getBoundingClientRect().width * scale + posX - this.maxX + 'px';
      this.maxX = posX;
    }
    if (posY < this.minY) {
      const difference: number = this.minY - posY;
      document.getElementById('map-canvas').style.height = mc.getBoundingClientRect().height * scale + difference + 'px';
      document.getElementById('map-canvas').style.top = document.getElementById('map-canvas').offsetTop
        - difference * this.zoomScale + 'px';
      for (const bc of this.blocks) {
        bc.offsetY(difference);
        bc.updatePaths();
      }
      componentRef.instance.blockService.setBlockY(componentRef.instance.blockService.getBlockY() + difference);
      this.maxY += difference;
    } else if (posY > this.maxY) {
      // if newly created component has greatest y value we expand the height of the background
      document.getElementById('map-canvas').style.height = mc.getBoundingClientRect().height * scale + posY - this.maxY + 'px';
      this.maxY = posY;
    }
    this.blocks.push(componentRef.instance);
    componentRef.instance.blockService.createBlock(block.blockService.getBlockId());
    // creating and adding path
    const pathFactory = this.factory.resolveComponentFactory(BlockConnectorComponent);
    const pathComponentRef = this.pathViewContainer.createComponent(pathFactory);
    componentRef.instance.childPaths.push(pathComponentRef.instance);
    block.parentPaths.push(pathComponentRef.instance);
    pathComponentRef.instance.parent.x = block.blockService.getBlockX() * scale;
    pathComponentRef.instance.parent.y = block.blockService.getBlockY() * scale;
    pathComponentRef.instance.child.x = + (componentRef.instance.blockService.getBlockX());
    pathComponentRef.instance.child.y = + (componentRef.instance.blockService.getBlockY());
    pathComponentRef.instance.refresh();
  }

  ngOnInit() {
    this.mainBlockId = this.authenticationService.getMainBlockId();
    this.loadingTimeout = setTimeout(() => {
      this.loadingTimeoutFinished = true;
      if (this.loadFinished) {
        this.zIndex = '-100';
      }
      // set position of the background so the initial block is centered on the screen
      mapCanvas.style.left = - this.blocks[0].blockService.getBlockX() + window.innerWidth / 2 - 159 + 'px';
      mapCanvas.style.top = - this.blocks[0].blockService.getBlockY() + window.innerHeight / 2 - 140 + 'px';
    }, 2500);
    const map = document.getElementById('map');
    const mapCanvas = document.getElementById('map-canvas');

    const mapWidth = window.innerWidth;
    const mapHeight = window.innerHeight;

    map.style.height = mapHeight + 'px';
    map.style.width = mapWidth + 'px';
    mapCanvas.style.height = mapHeight * 2 - 280 + 'px';
    mapCanvas.style.width = mapWidth * 2 - 318 + 'px';

    // create initial block
    const factory = this.factory.resolveComponentFactory(BlockComponent);
    const componentRef = this.blockViewContainer.createComponent(factory);
    componentRef.instance.refreshView();
    componentRef.instance.homeComponent = this;
    this.blocks.push(componentRef.instance);

    componentRef.instance.blockService.setBlockId(this.mainBlockId);

    componentRef.instance.blockService.getBlockData().then(data => {
      // tslint:disable-next-line: no-string-literal
      componentRef.instance.blockService.setBlockId(data['blockId']);
      // tslint:disable-next-line: no-string-literal
      componentRef.instance.blockService.setTitle(data['title']);
      // tslint:disable-next-line: no-string-literal
      componentRef.instance.blockService.setDescription(data['description']);
      // tslint:disable-next-line: no-string-literal
      componentRef.instance.blockService.setBlockX(data['blockX']);
      // tslint:disable-next-line: no-string-literal
      componentRef.instance.blockService.setBlockY(data['blockY']);

      this.minX = this.blocks[0].blockService.getBlockX();
      this.maxX = this.minX;
      this.minY = this.blocks[0].blockService.getBlockY();
      this.maxY = this.minY;

      mapCanvas.style.width = componentRef.instance.blockService.getBlockX() + window.innerWidth + 318 + 'px';
      mapCanvas.style.height = componentRef.instance.blockService.getBlockY() + window.innerHeight + 280 + 'px';

      componentRef.instance.refreshView();
      componentRef.instance.loadThekids();
    }).then(res => this.finishSetup());
  }

  finishSetup() {
    const mapCanvas = document.getElementById('map-canvas');

    this.loadFinished = true;
    if (this.loadingTimeoutFinished) {
      // set position of the background so the initial block is centered on the screen
      mapCanvas.style.left = - this.blocks[0].blockService.getBlockX() + window.innerWidth / 2 - 159 + 'px';
      mapCanvas.style.top = - this.blocks[0].blockService.getBlockY() + window.innerHeight / 2 - 140 + 'px';
      this.zIndex = '-100';
    }
  }


  zoom(event: any) {
    const f = event.wheelDelta / 1600;

    if (this.zoomScale + f <= 10) {
      const mc = document.getElementById('map-canvas');
      const scale = 1 / this.zoomScale;
      mc.style.transition = 'none';


      const x = (event.clientX - mc.getBoundingClientRect().left) * scale;
      const y = (event.clientY - mc.getBoundingClientRect().top) * scale;

      this.zoomScale += f;

      const newTop = mc.getBoundingClientRect().top - y * f;
      const newLeft = mc.getBoundingClientRect().left - x * f;
      const newHeight = mc.getBoundingClientRect().height * scale * this.zoomScale;
      const newWidth = mc.getBoundingClientRect().width * scale * this.zoomScale;

      if (newHeight >= window.innerHeight && newWidth >= window.innerWidth) {
        if (newTop > 0) {
          mc.style.top = '0px';
        } else if (newTop + newHeight < window.innerHeight) {
          mc.style.top = window.innerHeight - newHeight + 'px';
        } else {
          mc.style.top = mc.getBoundingClientRect().top - y * f + 'px';
        }
        if (newLeft > 0) {
          mc.style.left = '0px';
        } else if (newLeft + newWidth < window.innerWidth) {
          mc.style.left = window.innerWidth - newWidth + 'px';
        } else {
          mc.style.left = mc.getBoundingClientRect().left - x * f + 'px';
        }
        mc.style.transform = ' scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      } else {
        this.zoomScale -= f;
      }


    }
  }

  dragMouseDown(event: any) {
    this.lastPositionX = event.clientX;
    this.lastPositionY = event.clientY;
    this.drag = true;
  }

  elementDrag(event: any) {
    if (this.drag) {
      const clientX: number = event.clientX;
      const clientY: number = event.clientY;
      const offSetX: number = this.lastPositionX - clientX;
      const offSetY: number = this.lastPositionY - clientY;
      this.lastPositionX = clientX;
      this.lastPositionY = clientY;
      const element = document.getElementById('map-canvas');
      const newTop: number = element.offsetTop - offSetY;
      const newLeft: number = element.offsetLeft - offSetX;
      if (newTop + element.getBoundingClientRect().height >= window.innerHeight && newTop <= 0) {
        element.style.top = newTop + 'px';
      }
      if (newLeft + element.getBoundingClientRect().width >= window.innerWidth && newLeft <= 0) {
        element.style.left = newLeft + 'px';
      }
    }
  }

  closeDragElement() {
    if (this.drag) {
      this.drag = false;
      if (this.dragBlock != null) {
        this.dragBlock.closeAddButtonDrag();
      }
    }
    if (this.dragBlock) {
      this.dragBlock.closeAddButtonDrag();
      this.dragBlock.addButtonMouseUp(true);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    document.getElementById('map').style.height = window.innerHeight + 'px';
    document.getElementById('map').style.width = window.innerWidth + 'px';
  }
}
