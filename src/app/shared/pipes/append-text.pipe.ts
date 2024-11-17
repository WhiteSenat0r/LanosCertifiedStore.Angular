import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendText'
})
export class AppendTextPipe implements PipeTransform {

  transform(value: number | string, text: string = ''): string {
    if (value === null) return '';

    return `${value}` + `${text}`;
  }

}
