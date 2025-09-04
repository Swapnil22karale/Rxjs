export interface Istudent{
    fName : string;
    lName : string;
    email : string;
    contact : number;
    stdId : string
}

export interface IstdRes{
    [key : string] : Istudent
}