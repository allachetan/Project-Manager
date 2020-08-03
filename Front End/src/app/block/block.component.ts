import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { BlockService } from './block.service';
import { BlockConnectorComponent } from '../block-connector/block-connector.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
  providers: [BlockService]
})
export class BlockComponent implements OnInit {

  public title = '';
  public description = '';
  public homeComponent: HomeComponent;

  public parentPaths: BlockConnectorComponent[] = [];
  public childPaths: BlockConnectorComponent[] = [];

  // block drag
  private drag = false;
  private lastPositionX: number;
  private lastPositionY: number;

  // add button drag
  private addButtonDrag = false;

  private addButtonInterval: any;
  private pathCreatedByAddButton: any;

  // style properties
  public boxShadow = 'none';
  public zIndex = '2';
  public addButtonX = 308;
  public addButtonY = 130;

  constructor(public blockService: BlockService) {
  }

  enableRedShadow() {
    this.boxShadow = '0 3px 14px 2px #ff7676, 0 3px 14px 2px #ff7676, 0 3px 14px 2px #ff7676, 0 3px 14px 2px #ff7676';
  }

  disableRedShadow() {
    this.boxShadow = 'none';
  }

  moveBlockUp() {
    this.zIndex = '10';
  }

  moveBlockBack() {
    this.zIndex = '2';
  }

  offsetY(newY: number) {
    this.blockService.setBlockY(this.blockService.getBlockY() + newY);
    this.blockService.updateBlock();
  }

  offsetX(newX: number) {
    this.blockService.setBlockX(this.blockService.getBlockX() + newX);
    this.blockService.updateBlock();

  }

  getAddButtonX() {
    return this.blockService.getBlockX() + this.addButtonX;
  }

  getAddButtonY() {
    return this.blockService.getBlockY() + this.addButtonY;
  }

  /*
  getX() {
    return this.element.getBoundingClientRect().left;
  }

  getY() {
    return this.element.getBoundingClientRect().top;
  }
  */

  updatePathCreatedByAddButton() {
    this.pathCreatedByAddButton.instance.child.x = this.getAddButtonX();
    this.pathCreatedByAddButton.instance.child.y = this.getAddButtonY();
    this.pathCreatedByAddButton.instance.refreshAddButtonPath();
  }

  addButtonMouseDown() {
    this.addButtonX = 308;
    this.addButtonY = 130;
    this.moveBlockUp();
    this.pathCreatedByAddButton = this.homeComponent.createPath();
    this.pathCreatedByAddButton.instance.parent.x = this.blockService.getBlockX();
    this.pathCreatedByAddButton.instance.parent.y = this.blockService.getBlockY();
    this.updatePathCreatedByAddButton();
    this.pathCreatedByAddButton.instance.movePathUp();
    let onBlock = false;
    this.addButtonInterval = setInterval(() => {
      for (const block of this.homeComponent.blocks) {
        if (block.blockService.getBlockX() - 20 <= this.getAddButtonX() && this.getAddButtonX() <= block.blockService.getBlockX() + 318
          && block.blockService.getBlockY() - 20 <= this.getAddButtonY() && this.getAddButtonY() <= block.blockService.getBlockY() + 280
          && block !== this) {
          this.pathCreatedByAddButton.instance.child.x =
            block.blockService.getBlockX();
          this.pathCreatedByAddButton.instance.child.y =
            block.blockService.getBlockY();
          this.pathCreatedByAddButton.instance.refresh();
          onBlock = true;
          block.enableRedShadow();
        } else {
          block.disableRedShadow();
        }
      }
      if (!onBlock) {
        this.updatePathCreatedByAddButton();
      }
      onBlock = false;
    }, 25);
  }

  addButtonMouseUp(reset?) {
    clearInterval(this.addButtonInterval);
    this.moveBlockBack();
    if (reset != null && reset) {
      if (this.pathCreatedByAddButton != null) {
        this.addButtonX = 308;
        this.addButtonY = 130;
        this.pathCreatedByAddButton.destroy();
      }
    } else {
      const cordX = this.getAddButtonX();
      const cordY = this.getAddButtonY();
      const x = this.blockService.getBlockX();
      const y = this.blockService.getBlockY();
      // check positions of add button and block to figure out how to place newly created block
      let check = true;
      for (const block of this.homeComponent.blocks) {
        if (block.blockService.getBlockX() - 20 <= this.getAddButtonX() && this.getAddButtonX() <= block.blockService.getBlockX() + 318
          && block.blockService.getBlockY() - 20 <= this.getAddButtonY() && this.getAddButtonY() <= block.blockService.getBlockY() + 280
          && block !== this) {
          block.disableRedShadow();
          check = false;
          let addPath = true;
          for (const path of this.parentPaths) {
            if (path.child.x === block.blockService.getBlockX() && path.child.y === block.blockService.getBlockY()) {
              addPath = false;
            }
          }
          for (const path of this.childPaths) {
            if (path.parent.x === block.blockService.getBlockX() && path.parent.y === block.blockService.getBlockY()) {
              addPath = false;
            }
          }
          if (addPath) {
            this.parentPaths.push(this.pathCreatedByAddButton.instance);
            block.childPaths.push(this.pathCreatedByAddButton.instance);
            this.pathCreatedByAddButton.instance.refresh();
            this.pathCreatedByAddButton.instance.movePathBack();
            this.pathCreatedByAddButton = null;
            this.blockService.createRelationship(this.blockService.getBlockId(), block.blockService.getBlockId());
          }
          break;
        }
      }
      if (check) {
        if (x + 318 < cordX - 4) {
          // add button is to the right of the block
          this.homeComponent.addBlock(this, cordX, cordY - 140);
          this.updatePaths();
        } else if (cordX + 24 < x) {
          // add button is to the left of the block
          this.homeComponent.addBlock(this, cordX - 318, cordY - 140);
          this.updatePaths();
        } else if (cordY + 24 < y) {
          // add button is above the block
          this.homeComponent.addBlock(this, cordX - 159, cordY - 280);
          this.updatePaths();
        } else if (cordY + 4 > y + 280) {
          this.homeComponent.addBlock(this, cordX - 159, cordY);
          this.updatePaths();
        }
        this.pathCreatedByAddButton.destroy();
      }
      this.addButtonX = 308;
      this.addButtonY = 130;
    }
  }

  // update paths
  updatePaths() {
    const x = this.blockService.getBlockX();
    const y = this.blockService.getBlockY();
    // update all paths where this block is a parent
    for (const parentPath of this.parentPaths) {
      parentPath.parent.x = x;
      parentPath.parent.y = y;
      parentPath.refresh();
    }

    // update all paths where this block is a child
    for (const childPath of this.childPaths) {
      childPath.child.x = x;
      childPath.child.y = y;
      childPath.refresh();
    }
  }


  blockClick() {
    this.homeComponent.openFullblock(this);
  }

  refreshView() {
    this.title = this.blockService.getTitle();
    this.description = this.blockService.getDescription();
  }

  loadThekids() {
    this.blockService.getRelationshipData().then((data: any[]) => {
      for (const relationship of data) {
        // tslint:disable-next-line: no-string-literal
        this.homeComponent.loadBlock(relationship['childId'], this);
      }
    });
  }

  ngOnInit() {
    this.refreshView();
  }


  startBlockDrag(event: any) {
    this.lastPositionX = event.clientX;
    this.lastPositionY = event.clientY;
    this.drag = true;
    this.moveBlockUp();
  }

  blockDrag(event: any) {
    if (this.drag) {
      event.stopPropagation();
      const clientX: number = event.clientX;
      const clientY: number = event.clientY;
      const offSetX: number = (this.lastPositionX - clientX) * (1 / this.homeComponent.zoomScale);
      const offSetY: number = (this.lastPositionY - clientY) * (1 / this.homeComponent.zoomScale);
      this.lastPositionX = clientX;
      this.lastPositionY = clientY;
      const newTop: number = (this.blockService.getBlockY() - offSetY);
      const newLeft: number = (this.blockService.getBlockX() - offSetX);
      if (newTop + 280
        <= document.getElementById('map-canvas').getBoundingClientRect().height * (1 / this.homeComponent.zoomScale) && newTop >= 0) {
        this.blockService.setBlockY(newTop);
      }
      if (newLeft + 318
        <= document.getElementById('map-canvas').getBoundingClientRect().width * (1 / this.homeComponent.zoomScale) && newLeft >= 0) {
        this.blockService.setBlockX(newLeft);
      }
      this.updatePaths();
    }
  }

  closeBlockDrag() {
    this.drag = false;
    this.updatePaths();
    this.moveBlockBack();
    this.blockService.updateBlock();
  }

  addButtonDown() {
    this.addButtonDrag = true;
    this.homeComponent.dragBlock = this;
  }

  addButtonElementDrag(event: any) {
    if (this.addButtonDrag) {
      event.stopPropagation();
      const clientX: number = (event.clientX - document.getElementById('map-canvas')
        .getBoundingClientRect().left) * (1 / this.homeComponent.zoomScale) - 10;
      const clientY: number = (event.clientY - document.getElementById('map-canvas')
        .getBoundingClientRect().top) * (1 / this.homeComponent.zoomScale) - 10;
      this.addButtonX = clientX - this.blockService.getBlockX();
      this.addButtonY = clientY - this.blockService.getBlockY();
    }
  }

  closeAddButtonDrag() {
    this.addButtonDrag = false;
  }

  preventCanvasDrag(event: any) {
    event.stopPropagation();
  }

}
