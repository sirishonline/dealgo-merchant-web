import { gql } from '@apollo/client';

export const MY_DEALS_QUERY = gql`
  query MyDeals {
    myDeals {
      id
      title
      description
      category
      subCategory
      originalPrice
      discountType
      discountValue
      finalPrice
      maxQuantity
      soldQuantity
      remainingQuantity
      location
      highlights
      terms
      validUntil
      status
      images
      discountPercentage
      savingsAmount
      createdAt
      updatedAt
      business {
        id
        name
      }
    }
  }
`;

export const DEAL_QUERY = gql`
  query Deal($id: String!) {
    deal(id: $id) {
      id
      title
      description
      category
      subCategory
      originalPrice
      discountType
      discountValue
      finalPrice
      maxQuantity
      soldQuantity
      remainingQuantity
      location
      highlights
      terms
      validUntil
      status
      images
      discountPercentage
      savingsAmount
      createdAt
      updatedAt
      business {
        id
        name
        type
        address
        city
        state
        phone
        email
      }
    }
  }
`;

export const CREATE_DEAL_MUTATION = gql`
  mutation CreateDeal($input: CreateDealInput!) {
    createDeal(input: $input) {
      id
      title
      description
      category
      subCategory
      originalPrice
      discountType
      discountValue
      finalPrice
      maxQuantity
      soldQuantity
      location
      highlights
      terms
      validUntil
      status
      images
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_DEAL_MUTATION = gql`
  mutation UpdateDeal($id: String!, $input: UpdateDealInput!) {
    updateDeal(id: $id, input: $input) {
      id
      title
      description
      category
      subCategory
      originalPrice
      discountType
      discountValue
      finalPrice
      maxQuantity
      soldQuantity
      location
      highlights
      terms
      validUntil
      status
      images
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_DEAL_MUTATION = gql`
  mutation DeleteDeal($id: String!) {
    deleteDeal(id: $id)
  }
`;

export const UPDATE_DEAL_STATUS_MUTATION = gql`
  mutation UpdateDealStatus($id: String!, $status: DealStatus!) {
    updateDealStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;