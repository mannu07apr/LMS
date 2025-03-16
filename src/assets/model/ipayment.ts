export interface ipayment{
    paymentId: number;
    userid: number;
    userCode:string;
    membershipid: number;
    paidamount: number;
    dateOfPayment: Date;
    paymentMode: string;
    partOrFull: string;
    transactionID: string;
    referenceNo: string;
    imageName: string;
}