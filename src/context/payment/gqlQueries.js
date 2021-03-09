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

export const GET_ALL_COUNTRIES = gql`
  query getAllCountry {
    getAllCountry {
      name
      id
      countryCode
      currencyCode
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
    getPaymentChannelByCountryId(countryId: $countryId) {
      paymentType
      header
      paymentProperties {
        label
        value
      }
    }
  }
`;

export const queries = {
  GET_FX_RATES,
  CREATE_TRANSACTION,
  GET_COUNTRY_ID,
  GET_PAYMENT_METHODS,
};
