import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Business = {
  __typename?: 'Business';
  acceptsOnlinePayments: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  businessLicense?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deals: Array<Deal>;
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employeeCount?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offersDelivery: Scalars['Boolean']['output'];
  offersPickup: Scalars['Boolean']['output'];
  operatingHours: Scalars['String']['output'];
  owner: User;
  phone: Scalars['String']['output'];
  socialMedia: Scalars['String']['output'];
  state: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
  yearEstablished?: Maybe<Scalars['String']['output']>;
  zipCode: Scalars['String']['output'];
};

export type CreateDealInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  finalPrice: Scalars['Float']['input'];
  highlights: Array<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  location: Scalars['String']['input'];
  maxQuantity: Scalars['Int']['input'];
  originalPrice: Scalars['Float']['input'];
  subCategory: Scalars['String']['input'];
  terms?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  validUntil: Scalars['DateTime']['input'];
};

export type DashboardAnalytics = {
  __typename?: 'DashboardAnalytics';
  activeDeals: Scalars['Int']['output'];
  totalDeals: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  totalSold: Scalars['Int']['output'];
};

export type Deal = {
  __typename?: 'Deal';
  business: Business;
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  discountPercentage: Scalars['Float']['output'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['output'];
  finalPrice: Scalars['Float']['output'];
  highlights: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  maxQuantity: Scalars['Int']['output'];
  originalPrice: Scalars['Float']['output'];
  remainingQuantity: Scalars['Int']['output'];
  savingsAmount: Scalars['Float']['output'];
  soldQuantity: Scalars['Int']['output'];
  status: DealStatus;
  subCategory: Scalars['String']['output'];
  terms?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  validUntil: Scalars['DateTime']['output'];
};

export enum DealStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Paused = 'PAUSED',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED'
}

export enum DiscountType {
  Amount = 'AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDeal: Deal;
  deleteDeal: Scalars['Boolean']['output'];
  login: AuthPayload;
  register: AuthPayload;
  resetPassword: Scalars['Boolean']['output'];
  sendPasswordResetEmail: Scalars['Boolean']['output'];
  updateBusiness: Business;
  updateDeal: Deal;
  updateDealStatus: Deal;
  updateProfile: User;
};


export type MutationCreateDealArgs = {
  input: CreateDealInput;
};


export type MutationDeleteDealArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateBusinessArgs = {
  input: UpdateBusinessInput;
};


export type MutationUpdateDealArgs = {
  id: Scalars['String']['input'];
  input: UpdateDealInput;
};


export type MutationUpdateDealStatusArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  dashboardAnalytics: DashboardAnalytics;
  deal?: Maybe<Deal>;
  me: User;
  myBusiness?: Maybe<Business>;
  myDeals: Array<Deal>;
};


export type QueryDealArgs = {
  id: Scalars['String']['input'];
};

export type RegisterInput = {
  businessAddress: Scalars['String']['input'];
  businessEmail?: InputMaybe<Scalars['String']['input']>;
  businessName: Scalars['String']['input'];
  businessPhone?: InputMaybe<Scalars['String']['input']>;
  businessType: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBusinessInput = {
  acceptsOnlinePayments?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  businessLicense?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeCount?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offersDelivery?: InputMaybe<Scalars['Boolean']['input']>;
  offersPickup?: InputMaybe<Scalars['Boolean']['input']>;
  operatingHours?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  socialMedia?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  yearEstablished?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDealInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  finalPrice?: InputMaybe<Scalars['Float']['input']>;
  highlights?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  originalPrice?: InputMaybe<Scalars['Float']['input']>;
  subCategory?: InputMaybe<Scalars['String']['input']>;
  terms?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  validUntil?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  emailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  marketingEmails?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  smsNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emailNotifications: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  marketingEmails: Scalars['Boolean']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  smsNotifications: Scalars['Boolean']['output'];
  state?: Maybe<Scalars['String']['output']>;
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type DashboardAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardAnalyticsQuery = { __typename?: 'Query', dashboardAnalytics: { __typename?: 'DashboardAnalytics', totalDeals: number, activeDeals: number, totalRevenue: number, totalSold: number } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, fullName: string, business?: { __typename?: 'Business', id: string, name: string, type: string } | null } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, fullName: string, business?: { __typename?: 'Business', id: string, name: string, type: string } | null } } };

export type SendPasswordResetEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendPasswordResetEmailMutation = { __typename?: 'Mutation', sendPasswordResetEmail: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, fullName: string, phone?: string | null, dateOfBirth?: any | null, gender?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, timezone: string, language: string, emailNotifications: boolean, smsNotifications: boolean, marketingEmails: boolean, isEmailVerified: boolean, createdAt: any, updatedAt: any, business?: { __typename?: 'Business', id: string, name: string, type: string, description: string, website?: string | null, email: string, phone: string, address: string, city: string, state: string, zipCode: string, country: string, taxId?: string | null, businessLicense?: string | null, employeeCount?: string | null, yearEstablished?: string | null, operatingHours: string, socialMedia: string, tags: Array<string>, acceptsOnlinePayments: boolean, offersDelivery: boolean, offersPickup: boolean, createdAt: any, updatedAt: any } | null } };

export type MyBusinessQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBusinessQuery = { __typename?: 'Query', myBusiness?: { __typename?: 'Business', id: string, name: string, type: string, description: string, website?: string | null, email: string, phone: string, address: string, city: string, state: string, zipCode: string, country: string, taxId?: string | null, businessLicense?: string | null, employeeCount?: string | null, yearEstablished?: string | null, operatingHours: string, socialMedia: string, tags: Array<string>, acceptsOnlinePayments: boolean, offersDelivery: boolean, offersPickup: boolean, createdAt: any, updatedAt: any, owner: { __typename?: 'User', id: string, fullName: string, email: string } } | null };

export type UpdateBusinessMutationVariables = Exact<{
  input: UpdateBusinessInput;
}>;


export type UpdateBusinessMutation = { __typename?: 'Mutation', updateBusiness: { __typename?: 'Business', id: string, name: string, type: string, description: string, website?: string | null, email: string, phone: string, address: string, city: string, state: string, zipCode: string, country: string, taxId?: string | null, businessLicense?: string | null, employeeCount?: string | null, yearEstablished?: string | null, operatingHours: string, socialMedia: string, tags: Array<string>, acceptsOnlinePayments: boolean, offersDelivery: boolean, offersPickup: boolean, updatedAt: any } };

export type MyDealsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyDealsQuery = { __typename?: 'Query', myDeals: Array<{ __typename?: 'Deal', id: string, title: string, description: string, category: string, subCategory: string, originalPrice: number, discountType: DiscountType, discountValue: number, finalPrice: number, maxQuantity: number, soldQuantity: number, remainingQuantity: number, location: string, highlights: Array<string>, terms?: string | null, validUntil: any, status: DealStatus, images: Array<string>, discountPercentage: number, savingsAmount: number, createdAt: any, updatedAt: any, business: { __typename?: 'Business', id: string, name: string } }> };

export type DealQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DealQuery = { __typename?: 'Query', deal?: { __typename?: 'Deal', id: string, title: string, description: string, category: string, subCategory: string, originalPrice: number, discountType: DiscountType, discountValue: number, finalPrice: number, maxQuantity: number, soldQuantity: number, remainingQuantity: number, location: string, highlights: Array<string>, terms?: string | null, validUntil: any, status: DealStatus, images: Array<string>, discountPercentage: number, savingsAmount: number, createdAt: any, updatedAt: any, business: { __typename?: 'Business', id: string, name: string, type: string, address: string, city: string, state: string, phone: string, email: string } } | null };

export type CreateDealMutationVariables = Exact<{
  input: CreateDealInput;
}>;


export type CreateDealMutation = { __typename?: 'Mutation', createDeal: { __typename?: 'Deal', id: string, title: string, description: string, category: string, subCategory: string, originalPrice: number, discountType: DiscountType, discountValue: number, finalPrice: number, maxQuantity: number, soldQuantity: number, location: string, highlights: Array<string>, terms?: string | null, validUntil: any, status: DealStatus, images: Array<string>, createdAt: any, updatedAt: any } };

export type UpdateDealMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateDealInput;
}>;


export type UpdateDealMutation = { __typename?: 'Mutation', updateDeal: { __typename?: 'Deal', id: string, title: string, description: string, category: string, subCategory: string, originalPrice: number, discountType: DiscountType, discountValue: number, finalPrice: number, maxQuantity: number, soldQuantity: number, location: string, highlights: Array<string>, terms?: string | null, validUntil: any, status: DealStatus, images: Array<string>, createdAt: any, updatedAt: any } };

export type DeleteDealMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteDealMutation = { __typename?: 'Mutation', deleteDeal: boolean };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, fullName: string, phone?: string | null, dateOfBirth?: any | null, gender?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, timezone: string, language: string, emailNotifications: boolean, smsNotifications: boolean, marketingEmails: boolean, updatedAt: any } };


export const DashboardAnalyticsDocument = gql`
    query DashboardAnalytics {
  dashboardAnalytics {
    totalDeals
    activeDeals
    totalRevenue
    totalSold
  }
}
    `;

/**
 * __useDashboardAnalyticsQuery__
 *
 * To run a query within a React component, call `useDashboardAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardAnalyticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardAnalyticsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>(DashboardAnalyticsDocument, options);
      }
export function useDashboardAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>(DashboardAnalyticsDocument, options);
        }
export function useDashboardAnalyticsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>(DashboardAnalyticsDocument, options);
        }
export type DashboardAnalyticsQueryHookResult = ReturnType<typeof useDashboardAnalyticsQuery>;
export type DashboardAnalyticsLazyQueryHookResult = ReturnType<typeof useDashboardAnalyticsLazyQuery>;
export type DashboardAnalyticsSuspenseQueryHookResult = ReturnType<typeof useDashboardAnalyticsSuspenseQuery>;
export type DashboardAnalyticsQueryResult = Apollo.QueryResult<DashboardAnalyticsQuery, DashboardAnalyticsQueryVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
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
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendPasswordResetEmailDocument = gql`
    mutation SendPasswordResetEmail($email: String!) {
  sendPasswordResetEmail(email: $email)
}
    `;
export type SendPasswordResetEmailMutationFn = Apollo.MutationFunction<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;

/**
 * __useSendPasswordResetEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordResetEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordResetEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordResetEmailMutation, { data, loading, error }] = useSendPasswordResetEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendPasswordResetEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>(SendPasswordResetEmailDocument, options);
      }
export type SendPasswordResetEmailMutationHookResult = ReturnType<typeof useSendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationResult = Apollo.MutationResult<SendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationOptions = Apollo.BaseMutationOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyBusinessDocument = gql`
    query MyBusiness {
  myBusiness {
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
    owner {
      id
      fullName
      email
    }
  }
}
    `;

/**
 * __useMyBusinessQuery__
 *
 * To run a query within a React component, call `useMyBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyBusinessQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyBusinessQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyBusinessQuery, MyBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyBusinessQuery, MyBusinessQueryVariables>(MyBusinessDocument, options);
      }
export function useMyBusinessLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyBusinessQuery, MyBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyBusinessQuery, MyBusinessQueryVariables>(MyBusinessDocument, options);
        }
export function useMyBusinessSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyBusinessQuery, MyBusinessQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyBusinessQuery, MyBusinessQueryVariables>(MyBusinessDocument, options);
        }
export type MyBusinessQueryHookResult = ReturnType<typeof useMyBusinessQuery>;
export type MyBusinessLazyQueryHookResult = ReturnType<typeof useMyBusinessLazyQuery>;
export type MyBusinessSuspenseQueryHookResult = ReturnType<typeof useMyBusinessSuspenseQuery>;
export type MyBusinessQueryResult = Apollo.QueryResult<MyBusinessQuery, MyBusinessQueryVariables>;
export const UpdateBusinessDocument = gql`
    mutation UpdateBusiness($input: UpdateBusinessInput!) {
  updateBusiness(input: $input) {
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
    updatedAt
  }
}
    `;
export type UpdateBusinessMutationFn = Apollo.MutationFunction<UpdateBusinessMutation, UpdateBusinessMutationVariables>;

/**
 * __useUpdateBusinessMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessMutation, { data, loading, error }] = useUpdateBusinessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBusinessMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(UpdateBusinessDocument, options);
      }
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>;
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>;
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>;
export const MyDealsDocument = gql`
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

/**
 * __useMyDealsQuery__
 *
 * To run a query within a React component, call `useMyDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyDealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyDealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyDealsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyDealsQuery, MyDealsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyDealsQuery, MyDealsQueryVariables>(MyDealsDocument, options);
      }
export function useMyDealsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyDealsQuery, MyDealsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyDealsQuery, MyDealsQueryVariables>(MyDealsDocument, options);
        }
export function useMyDealsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyDealsQuery, MyDealsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyDealsQuery, MyDealsQueryVariables>(MyDealsDocument, options);
        }
export type MyDealsQueryHookResult = ReturnType<typeof useMyDealsQuery>;
export type MyDealsLazyQueryHookResult = ReturnType<typeof useMyDealsLazyQuery>;
export type MyDealsSuspenseQueryHookResult = ReturnType<typeof useMyDealsSuspenseQuery>;
export type MyDealsQueryResult = Apollo.QueryResult<MyDealsQuery, MyDealsQueryVariables>;
export const DealDocument = gql`
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

/**
 * __useDealQuery__
 *
 * To run a query within a React component, call `useDealQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDealQuery(baseOptions: ApolloReactHooks.QueryHookOptions<DealQuery, DealQueryVariables> & ({ variables: DealQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DealQuery, DealQueryVariables>(DealDocument, options);
      }
export function useDealLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealQuery, DealQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DealQuery, DealQueryVariables>(DealDocument, options);
        }
export function useDealSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<DealQuery, DealQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<DealQuery, DealQueryVariables>(DealDocument, options);
        }
export type DealQueryHookResult = ReturnType<typeof useDealQuery>;
export type DealLazyQueryHookResult = ReturnType<typeof useDealLazyQuery>;
export type DealSuspenseQueryHookResult = ReturnType<typeof useDealSuspenseQuery>;
export type DealQueryResult = Apollo.QueryResult<DealQuery, DealQueryVariables>;
export const CreateDealDocument = gql`
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
export type CreateDealMutationFn = Apollo.MutationFunction<CreateDealMutation, CreateDealMutationVariables>;

/**
 * __useCreateDealMutation__
 *
 * To run a mutation, you first call `useCreateDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDealMutation, { data, loading, error }] = useCreateDealMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDealMutation, CreateDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDealMutation, CreateDealMutationVariables>(CreateDealDocument, options);
      }
export type CreateDealMutationHookResult = ReturnType<typeof useCreateDealMutation>;
export type CreateDealMutationResult = Apollo.MutationResult<CreateDealMutation>;
export type CreateDealMutationOptions = Apollo.BaseMutationOptions<CreateDealMutation, CreateDealMutationVariables>;
export const UpdateDealDocument = gql`
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
export type UpdateDealMutationFn = Apollo.MutationFunction<UpdateDealMutation, UpdateDealMutationVariables>;

/**
 * __useUpdateDealMutation__
 *
 * To run a mutation, you first call `useUpdateDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDealMutation, { data, loading, error }] = useUpdateDealMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDealMutation, UpdateDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateDealMutation, UpdateDealMutationVariables>(UpdateDealDocument, options);
      }
export type UpdateDealMutationHookResult = ReturnType<typeof useUpdateDealMutation>;
export type UpdateDealMutationResult = Apollo.MutationResult<UpdateDealMutation>;
export type UpdateDealMutationOptions = Apollo.BaseMutationOptions<UpdateDealMutation, UpdateDealMutationVariables>;
export const DeleteDealDocument = gql`
    mutation DeleteDeal($id: String!) {
  deleteDeal(id: $id)
}
    `;
export type DeleteDealMutationFn = Apollo.MutationFunction<DeleteDealMutation, DeleteDealMutationVariables>;

/**
 * __useDeleteDealMutation__
 *
 * To run a mutation, you first call `useDeleteDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDealMutation, { data, loading, error }] = useDeleteDealMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDealMutation, DeleteDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteDealMutation, DeleteDealMutationVariables>(DeleteDealDocument, options);
      }
export type DeleteDealMutationHookResult = ReturnType<typeof useDeleteDealMutation>;
export type DeleteDealMutationResult = Apollo.MutationResult<DeleteDealMutation>;
export type DeleteDealMutationOptions = Apollo.BaseMutationOptions<DeleteDealMutation, DeleteDealMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateUserInput!) {
  updateProfile(input: $input) {
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
    updatedAt
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;