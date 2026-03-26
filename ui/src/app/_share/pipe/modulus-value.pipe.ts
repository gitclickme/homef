import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modulus'
})
export class ModulusValuePipe implements PipeTransform {

  transform(value: number): string {
    let outputString:string = 'text-primary';
    if(value < 0)
    outputString = 'text-danger';
    return outputString ;
  }

}

