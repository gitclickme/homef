import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: number): string {
    let outputString:string = 'bi bi-calendar-check';
    if(value == 0)
    outputString = 'bi bi-calendar';
    return outputString ;
  }
}

@Pipe({
  name: 'titleActive'
})
export class TitleActivePipe implements PipeTransform {

  transform(value: number): string {
    let outputString:string = 'active';
    if(value == 0)
    outputString = 'no active';
    return outputString ;
  }
}



@Pipe({
  name: 'titleClosed'
})
export class titleClosedPipe implements PipeTransform {

  transform(value: number): string {
    let outputString:string = 'closed budget';
    if(value == 0)
    outputString = 'open budget';
    return outputString ;
  }
}
@Pipe({
  name: 'closed'
})
export class ClosedPipe implements PipeTransform {

  transform(value: number): string {
    let outputString:string = 'bi bi-folder';
    if(value == 0)
    outputString = 'bi bi-folder-symlink';
    return outputString ;
  }
}
