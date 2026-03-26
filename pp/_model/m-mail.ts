import { enumAction } from "../shared/actionEnum";

export class MMail{
    
    from:string = '';
    to:string = '';
    cC :string = '';
    bcC: string = '';

    subject:string = '';
    text: string = '';
    html: string = '';
    attachment: any[] = [];

    templateId: number = -1;
    mailData: any ;

}


export class  MMail2Delivery{
    idOrder:number = -1;
    productionDate:string = '';
    idAction: enumAction = enumAction.delivery;
}