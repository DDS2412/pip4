import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Point} from '../models/point';
import {PointServiceService} from '../services/point-service.service';
import {NgForm, NgModel} from '@angular/forms';


@Component({
  selector: 'canvas-comp',
  templateUrl :'./canvas.component.html',
  styleUrls: ['./../css/canvas.component.css']
})
export class CanvasComponent implements OnInit{
  x: string;
  numbers: string[] = ['-2','-1.5','-1','-0.5','0','0.5','1','1.5','2'];
  output: any[];

  searchX(event) {
    this.output = this.numbers.filter(c => c.includes(event.query));
    this.newPoint.x = event.query;
  }

  searchR(event) {
    this.output = this.numbers.filter(c => c.includes(event.query));
    this.rchange(event.query);
  }

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 300;
  @Input() public height = 300;

  newPoint: Point;
  senderPoint: Point;

  context: CanvasRenderingContext2D;

  points: Point[];

  constructor(private pointService: PointServiceService) { }

  ngOnInit() {
    this.newPoint = new Point();
    this.newPoint.r = 1;

    this.senderPoint = new Point();

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.getAllPoints();
  }

  getAllPoints(){
    this.pointService.getAllPoints().subscribe(
      data =>{
        this.points = data;
        this.draw(this.newPoint.r);
        this.redrawAllPoints(this.newPoint.r);
      });
  }

  addNewPoint(point: Point){
    this.pointService.
    addNewPoint(point).
    subscribe(
      data => {
        this.points = data;
        this.drawPoint(point.x, point.y, point.isHit);
      });
  }

  rchange(r: number) {
    var regexp = new RegExp('^[1-2]{1}((\\.){1}(0|5)?)?\\s*$|^(0\\.5)\\s*$');
    if(!regexp.test(r.toString())) {
      r = 1;
    }
    this.newPoint.r = r;
    this.draw(r);
    this.redrawAllPoints(r);
  }

  redrawAllPoints(r){
    for (let i = 0; i < this.points.length; i++) {
      let x = this.points[i].x;
      let y = this.points[i].y;
      let boolArea = this.checkColor(x, y, r);
      this.drawPoint(x, y, boolArea);
    }
  }

  checkColor(x,y,R) {
    if(x<=0 && y<=0 && x*x+y*y<=R*R){
      return true;
    }
    if(x>=0 && y>=0 && y<=(-1*x+0.5*R)){
      return true;
    }
    if(x>=0 && y<=0 && x<=R && y >= -R/2){
      return true;
    }
    return false;
  }

  onSubmit() {
    this.addNewPoint(this.newPoint);
  }

  public clickGraphic($event){
    this.senderPoint.r = this.newPoint.r;
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    let br = canvasEl.getBoundingClientRect()

    let left = br.left;
    let top = br.top;

    let x = ($event.clientX-left) / (br.right - br.left) * 300;
    let y = ($event.clientY-top) / (br.bottom - br.top) * 300;

    this.senderPoint.x = this.senderPoint.r * (x - 150) / 130;
    this.senderPoint.y = this.senderPoint.r * (150 - y) / 130;

    this.senderPoint.isHit = this.isArea(this.senderPoint.x, this.senderPoint.y, this.senderPoint.r);
    this.addNewPoint(this.senderPoint);
  }

  public draw(r: number) {
    this.context.clearRect(0, 0, this.width, this.height);

    //прямоугольник
    this.context.beginPath();
    this.context.rect(150, 150, 130, 65);
    this.context.closePath();
    this.context.strokeStyle = "blue";
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.stroke();

    // сектор
    this.context.beginPath();
    this.context.moveTo(150, 150);
    this.context.arc(150, 150, 130, Math.PI, Math.PI/2, true);
    this.context.closePath();
    this.context.strokeStyle = "blue";
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.stroke();

    //треугольник
    this.context.beginPath();
    this.context.moveTo(150, 150);
    this.context.lineTo(150, 85);
    this.context.lineTo(215, 150);
    this.context.lineTo(150, 150);
    this.context.closePath();
    this.context.strokeStyle = "blue";
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.stroke();

    this.context.strokeStyle = "black";
    this.context.fillStyle = "black";
    this.context.stroke();

    //отрисовка осей
    this.context.beginPath();
    this.context.font = "10px Verdana";
    this.context.moveTo(150, 0); this.context.lineTo(150, 300);
    this.context.moveTo(150, 0); this.context.lineTo(145, 15);
    this.context.moveTo(150, 0); this.context.lineTo(155, 15);
    this.context.fillText("Y", 160, 10);
    this.context.moveTo(0, 150); this.context.lineTo(300, 150);
    this.context.moveTo(300, 150); this.context.lineTo(285, 145);
    this.context.moveTo(300, 150); this.context.lineTo(285, 155);
    this.context.fillText("X", 290, 135);

    // деления X
    this.context.moveTo(145, 20); this.context.lineTo(155, 20); this.context.fillText(String(r), 160, 20);
    this.context.moveTo(145, 85); this.context.lineTo(155, 85); this.context.fillText(String(r / 2), 160, 78);
    this.context.moveTo(145, 215); this.context.lineTo(155, 215); this.context.fillText(String(-(r / 2)), 160, 215);
    this.context.moveTo(145, 280); this.context.lineTo(155, 280); this.context.fillText(String(-r), 160, 280);
    // деления Y
    this.context.moveTo(20, 145); this.context.lineTo(20, 155); this.context.fillText(String(-r), 20, 170);
    this.context.moveTo(85, 145); this.context.lineTo(85, 155); this.context.fillText(String(-(r / 2)), 70, 170);
    this.context.moveTo(215, 145); this.context.lineTo(215, 155); this.context.fillText(String(r / 2), 215, 170);
    this.context.moveTo(280, 145); this.context.lineTo(280, 155); this.context.fillText(String(r), 280, 170);

    this.context.closePath();
    this.context.strokeStyle = "black";
    this.context.fillStyle = "black";
    this.context.stroke();
  }

  public drawPoint(x: number, y: number, isArea: boolean){
    x = x * 130 / this.newPoint.r + 150;
    y = 150 - y * 130 / this.newPoint.r;
    this.context.beginPath();
    this.context.rect(x, y, 4, 4);
    this.context.closePath();
    if(isArea){
      this.context.strokeStyle = "green";
      this.context.fillStyle = "green";
    } else {
      this.context.strokeStyle = "red";
      this.context.fillStyle = "red";
    }
    this.context.fill();
    this.context.stroke();
  }

  public isArea(x: number, y: number, r:number) {
    if(x<=0 && y<=0 && x*x+y*y<=r*r){
      return true;
    }
    if(x>=0 && y>=0 && y<=(-1*x+0.5*r)){
      return true;
    }
    if(x>=0 && y<=0 && x<=r && y >= -r/2){
      return true;
    }
    return false;
  }
}
