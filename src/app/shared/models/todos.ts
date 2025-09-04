export interface Itodos{
    filter(arg0: (todo: Itodos) => boolean): any;
    title : string;
    id:number;
    userId :number;
    completed : boolean    
}