// Define the violation model
 class Violation {
    constructor(serial, date, violationOccureTime, amount, billId, payId, type, violationTypeId, description, uniqueId, location, hasImage, vehicleImage, plateImage) {
      this.serial = serial;
      this.date = date;
      this.violationOccureTime = violationOccureTime;
      this.amount = amount;
      this.billId = billId;
      this.payId = payId;
      this.type = type;
      this.violationTypeId = violationTypeId;
      this.description = description;
      this.uniqueId = uniqueId;
      this.location = location;
      this.hasImage = hasImage;
      this.vehicleImage = vehicleImage;
      this.plateImage = plateImage;
    }
  }
  
  class Plaque {
    constructor(digit3, digit5) {
      this.digit3 = digit3;
      this.digit5 = digit5;
    }
  }
  
  class ViolationResponse {
    constructor(bills, plaque, totalPrice, totalPaperId, totalPaymentId, vehicleType, wallet) {
      this.bills = bills;
      this.plaque = plaque;
      this.totalPrice = totalPrice;
      this.totalPaperId = totalPaperId;
      this.totalPaymentId = totalPaymentId;
      this.vehicleType = vehicleType;
      this.wallet = wallet;
    }
  }

  class ViolationSumResponse {
    constructor(Amount, BillID, plaque, ComplaintCode, ComplaintStatus, PaymentID, vehicleType, wallet) {
      this.Amount = Amount;
      this.BillID = BillID;
      this.plaque = plaque;
      this.ComplaintCode = ComplaintCode;
      this.ComplaintStatus = ComplaintStatus;
      this.PaymentID = PaymentID;
      this.vehicleType = vehicleType;
      this.wallet = wallet;
    }
  }
  export { Violation, Plaque, ViolationResponse, ViolationSumResponse };