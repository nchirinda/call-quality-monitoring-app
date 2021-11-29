import {AbstractEntity} from './AbstractEntity';
import {User} from './User';

export class Supervisor extends AbstractEntity {
    number: number;
    user: User;
}
