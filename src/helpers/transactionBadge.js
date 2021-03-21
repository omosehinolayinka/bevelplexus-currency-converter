export const getBadge = (status) => {

  switch (status) {

    case "InProgress":
      return {
        badge: "badge warning",
        status: "In Progress"
      };

    case "FundInTransit":
      return {
        badge: "badge warning",
        status: "In Transit"
      };

    case "AwaitingUserPayment":
      return {
        badge: "badge warning",
        status: "Pending"
      };

    case "UserPaymentReceived":
      return {
        badge: "badge warning",
        status: "Received"
      };

    case "FundTransferFailed":
      return {
        badge: "badge error",
        status: "Failed"
      };

    case "FundTransferCanceled":
      return {
        badge: "badge default",
        status: "Cancelled"
      };

    case "TransferCompleted":
      return {
        badge: "badge success",
        status: "Completed"
      };

    default:
      return {
        badge: "badge default",
        status: "Unknown"
      };
  }
};