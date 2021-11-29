import {AbstractEntity} from './AbstractEntity';
import {AnswerType} from './enums/AnswerType';
import {Question} from './Question';

export class Answer extends AbstractEntity {
    answerType: AnswerType;
    maxPossible: number;
    maxScore: number;
    question: Question;
    score: number;
}
