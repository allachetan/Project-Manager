import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private blockId: number;
  private title = '';
  private description = '';

  private blockX: any;
  private blockY: any;
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  setBlockId(id: number) {
    this.blockId = id;
  }

  getBlockId() {
    return this.blockId;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  setDescription(newDescription: string) {
    this.description = newDescription;
  }

  getDescription() {
    return this.description;
  }

  getTitle() {
    return this.title;
  }

  setBlockX(newX: any) {
    this.blockX = newX;
  }

  setBlockY(newY: any) {
    this.blockY = newY;
  }

  getBlockX() {
    return this.blockX;
  }

  getBlockY() {
    return this.blockY;
  }

  getBlockData() {
    return this.http.get(this.url + 'block/get/'
      + this.blockId).toPromise();
  }

  getRelationshipData() {
    return this.http.get(this.url + 'block/getrelationships/'
      + this.blockId).toPromise();
  }

  loadBlock() {
    this.getBlockData().then(data => {
      // tslint:disable-next-line: no-string-literal
      this.blockId = data['blockId'];
      // tslint:disable-next-line: no-string-literal
      this.title = data['title'];
      // tslint:disable-next-line: no-string-literal
      this.description = data['description'];
      // tslint:disable-next-line: no-string-literal
      this.blockX = data['blockX'];
      // tslint:disable-next-line: no-string-literal
      this.blockY = data['blockY'];
    });
  }

  updateBlock() {
    if (this.blockId != null) {
      const postData = {
        blockId: this.blockId,
        title: this.title,
        description: this.description,
        blockX: this.blockX,
        blockY: this.blockY
      };
      this.http.post(this.url + 'block/mod', postData).subscribe();
    }
  }

  createBlock(id: number) {
    const postData = {
      title: this.title,
      description: this.description,
      blockX: this.blockX,
      blockY: this.blockY
    };
    this.http.post(this.url + 'block/mod',
      postData).toPromise().then(data => {
        // tslint:disable-next-line: no-string-literal
        this.blockId = data['blockId'];
        this.createRelationship(id, this.blockId);
      });
  }

  createRelationship(parentId: number, childId: number) {
    const relationshipData = {
      // tslint:disable-next-line: object-literal-shorthand
      parentId: parentId,
      // tslint:disable-next-line: object-literal-shorthand
      childId: childId
    };
    this.http.post(this.url + 'block/addrelationship',
      relationshipData).subscribe();
  }

  deleteBlock() {
    this.http.get(this.url + 'block/delete/' + this.blockId).subscribe(
      data => {
        window.location.reload();
      });
  }


}
