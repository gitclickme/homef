export class DateTool {

  static num2Str(value: number|string):string{
    if( +value > 9 ) return value.toString();
    return '0'.concat(value.toString());
  }

  static date2Canonical(date:Date):string {
    let dateMonth = date.getMonth() + 1 ;
    let dateDay = date.getDate();
    return date.getFullYear().toString()+'-'+ (dateMonth < 10 ? '0'+ dateMonth: dateMonth)+ '-' + (dateDay < 10 ? '0'+ dateDay : dateDay);

  }

  static can2String (date: Date):string {

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateDay = date.getDate();
    return ' ' + daysOfWeek[date.getDay()] + ', ' + monthNames[date.getMonth()] +' ' + (dateDay < 10 ? '0' + dateDay : dateDay)  + ', ' + date.getFullYear().toString();
  }

  public static lastDayOfMonth(date: Date):number{
    var d =  new Date(date.getFullYear(), date.getMonth()+1, 0);
    return d.getDate();
  }

  public static today(){
    return this.date2Canonical(new Date());
  }

  public static beginMonthDate(date: Date):Date{
    var d =  new Date(date.getFullYear(), date.getMonth(), 1);
    return d;
  }

  public static endMonthDate(date: Date):Date{
    var d =  new Date(date.getFullYear(), date.getMonth(), this.lastDayOfMonth(date));
    return d;
  }

  public static monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  public static daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  public static shortDayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];







/*
                    const myDate = new Date("July 20, 2016 15:00:00");
                    const nextDayOfMonth = myDate.getDate() + 20;
                    myDate.setDate(nextDayOfMonth);
                    const newDate = myDate.toLocaleString();
                    */

}
