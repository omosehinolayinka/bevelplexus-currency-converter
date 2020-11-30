import { gql } from "@apollo/client";

export const ALL_RECIPIENTS = gql`
  query getAllRecipient($offset: Float!, $limit: Float!) {
    getAllRecipient(offset: $offset, limit: $limit) {
      total
      recipients {
        id
        userId
        name
        email
        phoneNumber
        location
        updatedAt
        transaction {
          createdAt
          sendCurrency
          baseAmount
          destinationCurrency
          convertedAmount
        }
        bankInfo {
          id
          bank
          recipientId
          accountNumber
        }
      }
    }
  }
`;

export const SINGLE_RECIPIENT = gql`
  query recipient($id: String!) {
    recipient(id: $id) {
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
  mutation addRecipient(
    $userId: String!
    $name: String!
    $email: String!
    $phoneNumber: String!
    $location: String!
  ) {
    addRecipient(
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
      phoneNumber
      location
    }
  }
`;

export const ADD_BANK_INFO = gql`
  mutation addBankInfo(
    $recipientId: String!
    $bank: String!
    $accountNumber: String!
  ) {
    addBankInfo(
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
  SINGLE_RECIPIENT,
  NEW_RECIPIENT,
  ADD_BANK_INFO,
  UPDATED_RECIPIENT_INFO,
  UPDATED_BANK_INFO,
};

export default queries;
