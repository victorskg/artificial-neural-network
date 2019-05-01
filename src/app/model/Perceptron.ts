import { Iris } from './Iris';

export class Perceptron {
    private bias = 1;
    private weigths = [];
    private epochs = 100;
    private learnRate = 0.15;
    private dataSet = Array<Iris>();
    private toTraining: number = 0;

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
        let epoch;
        let diff = 0;
        let error = true;
        this.initWeigths(4);

        for (let i = 0; i < 20; i++) {
            epoch = 0;

            while (error && epoch < this.epochs) {
                for (let j = 0; j < this.toTraining; j++) {
                    const currentData = this.dataSet[j];
                    const inputs = currentData.inputs;
                    let u = this.calculateU(inputs);
                    let result = this.activation(u);

                    if (result != currentData.numericalType) {
                        error = true;
                        diff = currentData.numericalType - result;
                        this.recalculateWeigths(diff, inputs);
                    } else {
                        error = false;
                    }
                }
            }
        }
    }

    recalculateWeigths = (val: number, inputs: number[]) => {
        for (let i = 0; i < this.weigths.length; i++) {
            const element = this.weigths[i];
            this.weigths[i] = element + this.learnRate * val * inputs[i];
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
        for (let i = this.toTraining; i < this.dataSet.length; i++) {
            const element = this.dataSet[i];
            let u = this.calculateU(element.inputs);
            let result = this.activation(u);
            this.dataSet[i].givenType = result;
        }
    }
}