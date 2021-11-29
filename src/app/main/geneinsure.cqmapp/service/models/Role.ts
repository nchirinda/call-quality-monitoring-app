import {AbstractEntity} from './AbstractEntity';
import {RoleType} from './enums/RoleType';

export class Role extends AbstractEntity {
    description: string;
    name: RoleType;
}
