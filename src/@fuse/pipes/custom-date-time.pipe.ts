import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDateTime'
})
export class CustomDateTimePipe extends DatePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return super.transform(value, 'yyyy-MM-dd HH:mm:ss');
    }

}
