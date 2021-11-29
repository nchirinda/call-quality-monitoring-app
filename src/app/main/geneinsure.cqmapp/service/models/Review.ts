import {AbstractEntity} from './AbstractEntity';
import {Agent} from './Agent';
import {Answer} from './Answer';
import {ReviewTarget} from './ReviewTarget';
import {Customer} from './Customer';

export class Review extends AbstractEntity {
    agent: Agent;
    answers: Answer[];
    callRecordingReference: string;
    callReference: string;
    customer: Customer;
    maxPossibleScore: number;
    percentageScore: number;
    reviewDate: Date;
    reviewTarget: ReviewTarget;
    totalScore: number;
}
