// ViolationEntity.js
export class ViolationEntity {
    constructor(json) {
      this.bills = json.bills ? BillEntity.parseBillEntity(json.bills) : [];
      this.plaque = json.plaque ? new CarPlaqueEntity(json.plaque) : null;
      this.totalPrice = json.totalPrice;
      this.totalPaperId = json.totalPaperId;
      this.totalPaymentId = json.totalPaymentId;
      this.vehicleType = json.vehicleType;
      this.wallet = json.wallet;
    }
  }
  
  export class CarPlaqueEntity {
    constructor(json) {
      this.digit2 = json['2digit'];
      this.alphabet = json.alphabet;
      this.digit3 = json['3digit'];
      this.digit5 = json['5digit'];
      this.iran = json.iran;
    }
  }
  
  export class BillEntity {
    constructor(json) {
      this.uniqueId=json.uniqueId;
      this.serial = json.serial;
      this.date = json.date;
      this.violationOccureTime = json.violationOccureTime;
      this.amount = json.amount;
      this.billId = json.billId;
      this.payId = json.payId;
      this.type = json.type;
      this.violationTypeId = json.violationTypeId;
      this.description = json.description;
      this.location = json.location;
      this.hasImage = json.hasImage;
      this.vehicleImage = json.vehicleImage;
      this.plateImage = json.plateImage;
    }
  
    static parseBillEntity(jsonArray) {
      return jsonArray.map(json => new BillEntity(json));
    }
  }
  