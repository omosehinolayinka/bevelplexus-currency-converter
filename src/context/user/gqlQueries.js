import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      userType
      userVerification {
        isEmailVerified
        isIdentityVerified
        isPhoneNumberVerified
        isSchoolEnrollmentVerified
      }
    }
  }
`;

export const queries = {
  GET_USER
}