import { Iris } from './Iris';
import { Util } from './Util';

export class Perceptron {
    private bias = 1;
    private weigths = [];
    private epochs = 100;
    private _accuracy = 0;
    private _abstract = [];
    private learnRate = 0.15;
    private toTraining: number = 0;
    private util: Util = new Util();
    private dataSet = Array<Iris>();


    constructor(epochs?: number, learnRate?: number, dataSet?: Array<Iris>) {
        this.epochs = epochs;
        this.learnRate = learnRate;
        this.dataSet = dataSet;
        this.toTraining = parseInt((dataSet.length * (0.8)).toFixed());
    }

    activation = (u: number): number => {
        if (u > 0) return 1
        else return 0;
    }

    initWeigths = (size: number) => {
        this.bias = parseInt((Math.random() * 10).toFixed());
        for (let i = 0; i < size; i++) {
            this.weigths[i] = parseInt((Math.random() * 10).toFixed());
        }
    }

    training = () => {
        let epoch = 0;
        this.abstractValue = [];
        this.initWeigths(4);

        while (epoch < this.epochs) {
            let diff = 0;
            this.abstract.push({ message: `Época: ${epoch}`, weigth: this.weigths });

            for (let j = 0; j < this.toTraining; j++) {
                const currentData = this.dataSet[j];
                const inputs = currentData.inputs;
                let u = this.calculateU(inputs);
                let result = this.activation(u);

                if (result !== currentData.expectedType) {
                    diff = currentData.expectedType - result;
                    this.recalculateWeigths(diff, inputs);
                }
            }

            epoch++;
            this.util.shuffle(this.dataSet);
        }
    }

    recalculateWeigths = (val: number, inputs: number[]) => {
        for (let i = 0; i < this.weigths.length; i++) {
            const element = this.weigths[i];
            this.weigths[i] = (element + this.learnRate * val * inputs[i]);
        }
    }

    calculateU = (inputs: number[]): number => {
        let u = 0;

        for (let i = 0; i < inputs.length; i++) {
            u += inputs[i] * this.weigths[i];
        }
        u += this.bias;

        return u;
    }

    guess = () => {
        const classifieds = [];
        for (let i = this.toTraining; i < this.dataSet.length; i++) {
            const element = this.dataSet[i];
            let u = this.calculateU(element.inputs);
            let result = this.activation(u);
            this.dataSet[i].givenType = result;
            classifieds.push(this.dataSet[i])
        }

        this._accuracy = this.util.calculateAccuracy(classifieds);
    }


    public get accuracy(): number {
        return this._accuracy
    }


    public get abstract(): any[] {
        return this._abstract;
    }

    
    public set abstractValue(v : []) {
        this._abstract = v;
    }
    
}