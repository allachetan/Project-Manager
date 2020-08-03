import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FullBlockService {

  private id: number;
  private title = 'Loaded Title';
  private description = '     This is my description for the loaded title. I wonder what the font size should be. ' +
    'I am thinking maybe 15? Idk I will just check what it was before and compare it to that. Actually NVM. These font' +
    ' sizes don’t really have to be universal between the block and the fully loaded block thats just extra a f. Like' +
    ' bruh it would be diff cuz the loaded block dimensions are diff any way. Lol I just tried the font size of 15. ' +
    'Smallest thing I have ever seen oh hell nah. Im settling on 20 cuz it looks somewhat decent. But tbh wtf is this' +
    ' font. It doesn’t make sense to use a font like this in a corporate environment that this thing is really ment for.' +
    ' Who cares its not like I am pushing this into production or anything so we will stick with it. I wonder if a database' +
    ' can even hold this much text. Bruh I need somethign to finish this line and gg ez.';
  private blockX: any;
  private blockY: any;

  constructor(private http: HttpClient) { }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getTitle() {
    return this.title;
  }

  public setTitle(newTitle: string) {
    this.title = newTitle;
  }

  public getDescription() {
    return this.description;
  }

  public setDescription(newDescription: string) {
    this.description = newDescription;
  }

  getBlockData() {
    return this.http.get('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/block/get/' + this.id).toPromise();
  }

  loadBlock() {
    return this.getBlockData().then(data => {
      // tslint:disable-next-line: no-string-literal
      this.id = data['blockId'];
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
    if (this.id != null) {
      const postData = {
        blockId: this.id,
        title: this.title,
        description: this.description,
        blockX: this.blockX,
        blockY: this.blockY
      };
      this.http.post('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/block/mod', postData).subscribe();
    }
  }


}
