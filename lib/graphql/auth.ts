import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        firstName
        lastName
        fullName
        business {
          id
          name
          type
        }
      }
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        firstName
        lastName
        fullName
        business {
          id
          name
          type
        }
      }
      token
    }
  }
`;

export const SEND_PASSWORD_RESET_EMAIL_MUTATION = gql`
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      fullName
      phone
      dateOfBirth
      gender
      address
      city
      state
      zipCode
      country
      timezone
      language
      emailNotifications
      smsNotifications
      marketingEmails
      isEmailVerified
      createdAt
      updatedAt
      business {
        id
        name
        type
        description
        website
        email
        phone
        address
        city
        state
        zipCode
        country
        taxId
        businessLicense
        employeeCount
        yearEstablished
        operatingHours
        socialMedia
        tags
        acceptsOnlinePayments
        offersDelivery
        offersPickup
        createdAt
        updatedAt
      }
    }
  }
`;