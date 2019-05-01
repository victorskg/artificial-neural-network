import { Component } from '@angular/core';
import { Iris } from "./model/Iris";
import { Perceptron } from './model/Perceptron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  iris: Array<Iris>;
  fileReader = undefined;
  perceptron: Perceptron;
  title = 'Rede Neural Artificial';

  interceptFile = (file: File) => {
    this.fileReader = new FileReader();
    this.fileReader.onload = this.loadFile;
    this.fileReader.readAsText(file);
  }

  run = () => {
    console.log('running');
    this.perceptron.training();
    this.perceptron.guess();
    console.log(this.iris);
  }

  private loadFile = () => {
    this.iris = [];
    const iris = this.fileReader.result.split('/');
    iris.forEach(e => {
      const irisParams = e.split(',');
      const irisObject = new Iris(
        parseFloat(irisParams[0]), 
        parseFloat(irisParams[1]), 
        parseFloat(irisParams[2]), 
        parseFloat(irisParams[3]), 
        irisParams[4]);
      this.iris.push(irisObject)
    });
    this.shuffle(this.iris);
    this.perceptron = new Perceptron(100, 0.15, this.iris);
  }

  private shuffle = (array: any[]) => {
    array.sort(() => Math.random() - 0.5);
  }
}
