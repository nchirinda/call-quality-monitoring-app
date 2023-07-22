import {AbstractEntity} from './AbstractEntity';
import {AnswerType} from './enums/AnswerType';
import {QuestionCategory} from './QuestionCategory';

export class Question extends AbstractEntity {
    answerType: AnswerType;
    number: number;
    questionCategory: QuestionCategory;
    text: string;
}
