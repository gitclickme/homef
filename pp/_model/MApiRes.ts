export class MApiRes{
    trace: Trace = new Trace();
    dataList: any[] = [];
    data: any;

}

class Trace{
    retCode:number = 1;
    retMsg: string = '';
}
