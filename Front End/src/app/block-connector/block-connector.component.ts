import { Component, OnInit, ElementRef, setTestabilityGetter } from '@angular/core';

@Component({
  selector: 'app-block-connector',
  templateUrl: './block-connector.component.html',
  styleUrls: ['./block-connector.component.css']
})
export class BlockConnectorComponent implements OnInit {

  constructor(private elRef: ElementRef) { }

  height = 382;
  width = 280;

  public parent = { x: 150, y: 285 };
  public child = { x: 850, y: 685 };

  movePathUp() {
    this.elRef.nativeElement.getElementsByClassName('Block_Connector')[0].style.zIndex = '9';
  }

  movePathBack() {
    this.elRef.nativeElement.getElementsByClassName('Block_Connector')[0].style.zIndex = '1';
  }

  refreshAddButtonPath() {
    // adjust svg location and dimensions based on where add button is relative to its block
    const svg = this.elRef.nativeElement.getElementsByClassName('Block_Connector')[0];
    const path = this.elRef.nativeElement.getElementsByClassName('Path')[0];
    // checking if block is to the left of the add button
    if (this.parent.x + 318 < this.child.x - 4) {
      svg.style.left = this.parent.x + 318 + 'px';
      this.width = this.child.x - this.parent.x - 318;
      // checking to see if path should be going downwards or upwards
      if (this.parent.y + 140 <= this.child.y) {
        // down
        svg.style.top = this.parent.y + 140 - 3 + 'px';
        this.height = this.child.y - this.parent.y - 140 + 10;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 3 Q ' + this.width / 2 + ' 3 ' + this.width / 2 + ' ' +
          (this.height / 2 + 3) + ' T ' + this.width + ' ' + (this.height + 3) + '');
      } else {
        // up
        svg.style.top = this.child.y + 10 - 3 + 'px';
        this.height = this.parent.y + 140 - this.child.y - 10;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 ' + (this.height + 3) + ' Q ' + this.width / 2 + ' ' + (this.height + 3) + ' ' + this.width / 2 + ' '
          + (this.height / 2 + 3) + ' T ' + this.width + ' 3');
      }
      // checking to see if block is to the right of the add button
    } else if (this.child.x + 24 < this.parent.x) {
      svg.style.left = this.child.x + 20 + 'px';
      this.width = this.parent.x - this.child.x - 20;
      // checking to see if path should be going downwards or upwards
      if (this.parent.y + 140 <= this.child.y) {
        // down
        svg.style.top = this.parent.y + 140 - 3 + 'px';
        this.height = this.child.y - this.parent.y - 140 + 10;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 ' + (this.height + 3) + ' Q ' + this.width / 2 + ' ' + (this.height + 3) + ' ' + this.width / 2 + ' '
          + (this.height / 2 + 3) + ' T ' + this.width + ' 3');
      } else {
        // up
        svg.style.top = this.child.y + 10 - 3 + 'px';
        this.height = this.parent.y + 140 - this.child.y - 10;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 3 Q ' + this.width / 2 + ' 3 ' + this.width / 2 + ' ' +
          (this.height / 2 + 3) + ' T ' + this.width + ' ' + (this.height + 3) + '');
      }
      // checking to see if block is below the add button
    } else if (this.child.y < this.parent.y) {
      svg.style.top = this.child.y + 20 + 'px';
      this.height = this.parent.y - this.child.y - 20;
      // checking to see if connector should be going left or right
      if (this.child.x < this.parent.x + 159) {
        // left
        svg.style.left = this.child.x + 10 - 3 + 'px';
        this.width = this.parent.x + 159 - this.child.x - 10;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 0 Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' ' + (this.height) + '');
      } else {
        // right
        svg.style.left = this.parent.x + 159 - 3 + 'px';
        this.width = this.child.x + 10 - this.parent.x - 159;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 ' + this.height + ' Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' 0');
      }
      // block must be above add button
    } else {
      svg.style.top = this.parent.y + 280 + 'px';
      this.height = this.child.y - this.parent.y - 280;
      // checkign to see if the connector should be going towards the left or right
      if (this.child.x < this.parent.x + 159) {
        // left
        svg.style.left = this.child.x + 10 - 3 + 'px';
        this.width = this.parent.x + 159 - this.child.x - 10;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 ' + this.height + ' Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' 0');
      } else {
        // right
        svg.style.left = this.parent.x + 159 - 3 + 'px';
        this.width = this.child.x + 10 - this.parent.x - 159;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 0 Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' ' + (this.height) + '');

      }
    }
  }

  refresh() {
    // adjust svg location and dimensions
    const svg = this.elRef.nativeElement.getElementsByClassName('Block_Connector')[0];
    const path = this.elRef.nativeElement.getElementsByClassName('Path')[0];
    // checking if parent block is to the left of the child block
    if (this.parent.x + 318 < this.child.x) {
      svg.style.left = this.parent.x + 318 + 'px';
      this.width = this.child.x - this.parent.x - 318;
      // checking to see if the connector should be going downwards or upwards
      if (this.parent.y <= this.child.y) {
        // down
        svg.style.top = this.parent.y + 140 - 3 + 'px';
        this.height = this.child.y - this.parent.y;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 3 Q ' + this.width / 2 + ' 3 ' + this.width / 2 + ' ' +
          (this.height / 2 + 3) + ' T ' + this.width + ' ' + (this.height + 3) + '');
      } else {
        // up
        svg.style.top = this.child.y + 140 - 3 + 'px';
        this.height = this.parent.y - this.child.y;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 ' + (this.height + 3) + ' Q ' + this.width / 2 + ' ' + (this.height + 3) + ' ' + this.width / 2 + ' '
          + (this.height / 2 + 3) + ' T ' + this.width + ' 3');
      }
      // checking to see if parent block is to the right of the child block
    } else if (this.child.x + 318 < this.parent.x) {
      svg.style.left = this.child.x + 318 + 'px';
      this.width = this.parent.x - this.child.x - 318;
      // checking to see if the connector should be going downwards or upwards
      if (this.child.y <= this.parent.y) {
        // up
        svg.style.top = this.child.y + 140 - 3 + 'px';
        this.height = this.parent.y - this.child.y;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 3 Q ' + this.width / 2 + ' 3 ' + this.width / 2 + ' ' +
          (this.height / 2 + 3) + ' T ' + this.width + ' ' + (this.height + 3) + '');
      } else {
        // down
        svg.style.top = this.parent.y + 140 - 3 + 'px';
        this.height = this.child.y - this.parent.y;
        svg.style.height = this.height + 6 + 'px';
        svg.style.width = this.width + 'px';
        // adjust path
        path.setAttribute('d', 'M 0 ' + (this.height + 3) + ' Q ' + this.width / 2 + ' ' + (this.height + 3) + ' ' + this.width / 2 + ' '
          + (this.height / 2 + 3) + ' T ' + this.width + ' 3');
      }
      // checking to see if the parent block is below the child block
    } else if (this.child.y + 280 < this.parent.y) {
      svg.style.top = this.child.y + 280 + 'px';
      this.height = this.parent.y - this.child.y - 280;
      // checkign to see if the connector should be going towards the left or right
      if (this.child.x <= this.parent.x) {
        // left
        svg.style.left = this.child.x + 159 - 3 + 'px';
        this.width = this.parent.x - this.child.x;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 0 Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' ' + (this.height) + '');
      } else {
        // right
        svg.style.left = this.parent.x + 159 - 3 + 'px';
        this.width = this.child.x - this.parent.x;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 ' + this.height + ' Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' 0');
      }
      // parent block must be above child block
    } else {
      svg.style.top = this.parent.y + 280 + 'px';
      this.height = this.child.y - this.parent.y - 280;
      // checkign to see if the connector should be going towards the left or right
      if (this.parent.x <= this.child.x) {
        // left
        svg.style.left = this.parent.x + 159 - 3 + 'px';
        this.width = this.child.x - this.parent.x;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 0 Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' ' + (this.height) + '');
      } else {
        // right
        svg.style.left = this.child.x + 159 - 3 + 'px';
        this.width = this.parent.x - this.child.x;
        svg.style.height = this.height + 'px';
        svg.style.width = this.width + 6 + 'px';
        path.setAttribute('d', 'M 3 ' + this.height + ' Q 3 ' + this.height / 2 + ' ' + (this.width / 2 + 3) + ' ' +
          (this.height / 2) + ' T ' + (this.width + 3) + ' 0');
      }
    }

  }

  ngOnInit() {
    this.refresh();
  }

}
