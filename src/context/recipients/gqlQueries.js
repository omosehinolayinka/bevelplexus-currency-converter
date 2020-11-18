import { gql } from "@apollo/client";

export const ALL_RECIPIENTS = gql`
  query getAllRecipient {
    getAllRecipient {
      id
      userId
      name
      email
      phoneNumber
      location
      updatedAt
      bankInfo {
        id
        bank
        recipientId
        accountNumber
      }
    }
  }
`;

export const NEW_RECIPIENT = gql`
  mutation addRecipient {
    addRecipient(
      recipientArgs: {
        userId: "923ekqje92"
        name: "Hello"
        email: "29eudnd"
        phoneNumber: "21031839"
        location: "dnajdn"
      }
    ) {
      id
      userId
      name
      email
      phoneNumber
      location
      bankInfo {
        id
        recipientId
        accountNumber
        bank
      }
    }
  }
`;

export const ADD_BANK_INFO = gql`
  mutation addBankInfo {
    addBankInfo(
      bankInfoArgs: {
        recipientId: "57ffbcc8-3901-4cff-b6a5-9bd923f1e2f2"
        bank: "Stanbic IBTC bank"
        accountNumber: "2028931018"
      }
    ) {
      id
      recipientId
      bank
      accountNumber
    }
  }
`;

export const UPDATED_RECIPIENT_INFO = gql`
  mutation updateRecipient(
    $recipientId: String!
    $userId: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
    $location: String!
  ) {
    updateRecipient(
      recipientId: $recipientId
      recipientArgs: {
        userId: $userId
        name: $name
        email: $email
        phoneNumber: $phoneNumber
        location: $location
      }
    ) {
      id
      userId
      name
      email
      location
      phoneNumber
      updatedAt
      bankInfo {
        id
        bank
        accountNumber
      }
    }
  }
`;

export const UPDATED_BANK_INFO = gql`
  mutation updateBankInfo(
    $bankInfoId: String!
    $recipientId: String!
    $bank: String!
    $accountNumber: String!
  ) {
    updateBankInfo(
      bankInfoId: $bankInfoId
      bankInfoArgs: {
        recipientId: $recipientId
        bank: $bank
        accountNumber: $accountNumber
      }
    ) {
      id
      recipientId
      bank
      accountNumber
    }
  }
`;

export const queries = {
  ALL_RECIPIENTS,
  NEW_RECIPIENT,
  ADD_BANK_INFO,
  UPDATED_RECIPIENT_INFO,
  UPDATED_BANK_INFO
}

export default queries