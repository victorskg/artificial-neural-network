import { Component } from '@angular/core';
import { Iris } from "./model/Iris";
import { Perceptron } from './model/Perceptron';
import { Util } from './model/Util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  iris: Array<Iris>;
  fileReader = undefined;
  perceptron: Perceptron;
  util: Util = new Util();
  selectedType = undefined;
  title = 'Rede Neural Artificial';
  classifications = [
    {
      label: 'SETOSA CONTRA OUTRAS',
      value: 'Iris-setosa'
    },
    {
      label: 'VERSICOLOR CONTRA OUTRAS',
      value: 'Iris-versicolor'
    },
    {
      label: 'VIRGINICA CONTRA OUTRAS',
      value: 'Iris-virginica'
    }
  ]

  interceptFile = (file: File) => {
    this.fileReader = new FileReader();
    this.fileReader.onload = this.loadFile;
    this.fileReader.readAsText(file);
  }

  run = () => {
    this.util.shuffle(this.iris);
    this.perceptron = new Perceptron(100, 0.15, this.iris);

    this.perceptron.training();
    this.perceptron.guess();
    
    console.log(this.perceptron.abstract);
    console.log(this.perceptron.accuracy);
  }

  private loadFile = () => {
    this.iris = [];
    const iris = this.fileReader.result.split('/');

    iris.forEach(e => {
      const irisParams = e.split(',');
      if (irisParams.length === 5) {
        const irisObject = new Iris(
          parseFloat(irisParams[0]), 
          parseFloat(irisParams[1]), 
          parseFloat(irisParams[2]), 
          parseFloat(irisParams[3]), 
          irisParams[4],
          this.selectedType);
        this.iris.push(irisObject)
      }
    });
  }

  disableExectueButton = (): boolean => {
    return !this.selectedType || !this.iris;
  }
}
