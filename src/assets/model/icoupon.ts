//[{"couponId":1,"couponCode":"FIRSTTIME","membershipID":1,"active":true,"amount":2999.00,"startDate":"2024-08-13T14:58:13.596","endDate":"2024-08-20T14:58:13.596"}]
export interface icoupon{
    couponId:number,
    couponCode:string,
    membershipID:number,
    active:boolean,
    amount:number,
    startDate:Date
    endDate:Date
}