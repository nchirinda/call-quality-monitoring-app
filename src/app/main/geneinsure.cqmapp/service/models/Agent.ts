import {AbstractEntity} from './AbstractEntity';
import {Supervisor} from './Supervisor';
import {User} from './User';

export class Agent extends AbstractEntity {
    number: number;
    supervisor: Supervisor;
    user: User;
}
