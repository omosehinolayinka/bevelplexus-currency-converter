import { gql } from "@apollo/client";

export const GET_FX_RATES = gql`
  query getFxRates(
    $sendCurrency: String!
    $destinationCurrency: String!
    $baseAmount: Float!
    $receiveType: ReceiveType!
  ) {
    getFxRate(
      input: {
        sendCurrency: $sendCurrency
        destinationCurrency: $destinationCurrency
        baseAmount: $baseAmount
        receiveType: $receiveType
      }
    ) {
      rate
      fee
      actualAmount
      convertedAmount
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $recipientId: String!
    $userId: String!
    $bankInfoId: String!
    $sendCurrency: String!
    $destinationCurrency: String!
    $baseAmount: Float!
    $transactionType: TransactionType!
    $receiveType: ReceiveType!
  ) {
    createTransaction(
      args: {
        recipientId: $recipientId
        userId: $userId
        bankInfoId: $bankInfoId
        sendCurrency: $sendCurrency
        destinationCurrency: $destinationCurrency
        baseAmount: $baseAmount
        transactionType: $transactionType
        receiveType: $receiveType
      }
    ) {
      status
      reference
      baseAmount
      createdAt
      fee
    }
  }
`;

export const GET_COUNTRY_ID = gql`
  query getCountryByCurrencyCode($currencyCode: String!) {
    getCountryByCurrencyCode(currencyCode: $currencyCode) {
      id
      name
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query getPaymentOptionsByCountry($countryId: String!) {
    getPaymentOptionsByCountry(countryId: $countryId) {
      banks {
        bankName
        accountName
        accountNumber
      }
      eTransfers {
        name
        instructions
      }
    }
  }
`;

export const queries = {
  GET_FX_RATES,
  CREATE_TRANSACTION,
  GET_COUNTRY_ID,
  GET_PAYMENT_METHODS
};
