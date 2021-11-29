import {AbstractEntity} from './AbstractEntity';
import {ContactDetail} from './ContactDetail';
import {Role} from './Role';

export class User extends AbstractEntity {
    active: boolean;
    contactDetail: ContactDetail;
    firstName: string;
    lastName: string;
    password: string;
    roles: Role[];
    username: string;
    verified: boolean;
}
