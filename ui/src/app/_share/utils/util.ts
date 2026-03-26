export class Util {

  static serialize( obj:Object ) {
    let str = Object.keys(obj).reduce((a:string[], k:string, next=0)=>{
        a.push(k + '=' + (Object.values(obj)[next]?.toString() || ''));
        next++;
        return a;
    }, []).join('&');
    return str;
  }
}
