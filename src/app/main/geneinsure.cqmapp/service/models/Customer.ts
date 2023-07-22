import {AbstractEntity} from './AbstractEntity';
import {Review} from './Review';
import {User} from './User';

export class Customer extends AbstractEntity {
    number: number;
    reviews: Review[];
    user: User;
}
