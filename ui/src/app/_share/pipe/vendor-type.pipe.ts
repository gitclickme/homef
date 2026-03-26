import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorType'
})
export class VendorTypePipe implements PipeTransform {

  transform(value: number): string {
    let outputString: string = 'input';
    switch (value) {
      case 1:
        outputString = 'input';
        break;
      case 2:
        outputString = 'output';
        break;
      case 3:
        outputString = 'input-output';
        break;
      default:
        outputString = '';
    }
    return outputString;
  }

}
