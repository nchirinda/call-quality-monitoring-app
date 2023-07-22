import {AbstractEntity} from './AbstractEntity';

export class ReviewTarget extends AbstractEntity {
    maxPercentage: number;
    message: string;
    minPercentage: number;
}
