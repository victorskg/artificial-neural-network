import { Iris } from './Iris';

export class Util {
    shuffle = (array: any[]) => {
        array.sort(() => Math.random() - 0.5);
    }

    calculateAccuracy = (array: Iris[]) => {
        let hits = 0;
        for (const iris of array) {
            if (iris.givenType === iris.expectedType) hits++;
        }

        return hits / array.length;
    }
}