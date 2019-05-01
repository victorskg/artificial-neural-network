export class Iris {
    constructor(
        sepalLength: number,
        sepalWidth: number,
        petalLength: number,
        petalWidth: number,
        type: string) {
        this.sepalLength = sepalLength;
        this.sepalWidth = sepalWidth;
        this.petalLength = petalLength;
        this.petalWidth = petalWidth;
        this.type = type;
        this.inputs = [this.sepalLength, this.sepalWidth, this.petalLength, this.petalWidth]
        this.numericalType = 'Iris-setosa' === type ? 1 : 0;
    }

    sepalLength: number
    sepalWidth: number
    petalLength: number
    petalWidth: number
    type: string
    inputs: number[]
    numericalType: number
    givenType: number
}