/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type AuthenticateEmailAuthRequestData = EmailAuthRequest | HttpError;

export type AuthenticateEmailAuthRequestInput = {
  authcode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Concert = {
  __typename?: 'Concert';
  artist?: Maybe<Scalars['String']['output']>;
  concertCategory: ConcertCategory;
  createdAt: Scalars['String']['output'];
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  posters?: Maybe<Array<Maybe<ConcertPoster>>>;
  tickets?: Maybe<Array<Maybe<ConcertTicket>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ConcertCategory = {
  __typename?: 'ConcertCategory';
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type ConcertCategoryData = ConcertCategory | HttpError;

export type ConcertCategoryList = {
  __typename?: 'ConcertCategoryList';
  list?: Maybe<Array<Maybe<ConcertCategory>>>;
};

export type ConcertCategoryListData = ConcertCategoryList | HttpError;

export type ConcertData = Concert | HttpError;

export type ConcertList = {
  __typename?: 'ConcertList';
  list?: Maybe<Array<Maybe<Concert>>>;
};

export type ConcertListData = ConcertListWithPagination | HttpError;

export type ConcertListOrderBy = {
  createdAt: Scalars['String']['input'];
};

export type ConcertListWithPagination = {
  __typename?: 'ConcertListWithPagination';
  list?: Maybe<ConcertList>;
  pagination?: Maybe<Pagination>;
};

export type ConcertPoster = {
  __typename?: 'ConcertPoster';
  id: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
};

export type ConcertTicket = {
  __typename?: 'ConcertTicket';
  id: Scalars['String']['output'];
  openDate: Scalars['String']['output'];
  seller: Scalars['String']['output'];
  sellingURL: Scalars['String']['output'];
  ticketPrices: Array<ConcertTicketPrice>;
};

export type ConcertTicketPrice = {
  __typename?: 'ConcertTicketPrice';
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  priceCurrency: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CreateConcertCategoryInput = {
  title: Scalars['String']['input'];
};

export type CreateConcertConcertTicketInput = {
  openDate: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  sellingURL: Scalars['String']['input'];
  ticketPrices: Array<CreateConcertConcertTicketPricesInput>;
};

export type CreateConcertConcertTicketPricesInput = {
  price: Scalars['Float']['input'];
  priceCurrency: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateConcertData = Concert | HttpError;

export type CreateConcertInput = {
  artist: Scalars['String']['input'];
  concertCategoryId: Scalars['Int']['input'];
  date: Scalars['String']['input'];
  location: Scalars['String']['input'];
  posterURLs: Array<Scalars['String']['input']>;
  tickets: Array<CreateConcertConcertTicketInput>;
  title: Scalars['String']['input'];
};

export type CreateConcertPosterData = ConcertPoster | HttpError;

export type CreateConcertPosterInput = {
  concertId: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
};

export type CreateEmailAuthRequestInput = {
  email: Scalars['String']['input'];
};

export type CreateUserData = HttpError | User;

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
};

export type EmailAuthRequest = {
  __typename?: 'EmailAuthRequest';
  authcode: Scalars['String']['output'];
  authenticated?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type HttpError = {
  __typename?: 'HttpError';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type LoginData = HttpError | UserWithAuthToken;

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateEmailAuthRequest?: Maybe<AuthenticateEmailAuthRequestData>;
  createConcert?: Maybe<CreateConcertData>;
  createConcertCategory?: Maybe<ConcertCategoryData>;
  createConcertPoster?: Maybe<CreateConcertPosterData>;
  createEmailAuthRequest?: Maybe<EmailAuthRequest>;
  createUser?: Maybe<CreateUserData>;
  login?: Maybe<LoginData>;
  removeConcert?: Maybe<RemoveConcertData>;
  updateConcert?: Maybe<UpdateConcertData>;
  updateConcertPoster?: Maybe<UpdateConcertPosterData>;
  updateConcertTicket?: Maybe<UpdateConcertTicketData>;
};


export type MutationAuthenticateEmailAuthRequestArgs = {
  input: AuthenticateEmailAuthRequestInput;
};


export type MutationCreateConcertArgs = {
  input: CreateConcertInput;
};


export type MutationCreateConcertCategoryArgs = {
  input: CreateConcertCategoryInput;
};


export type MutationCreateConcertPosterArgs = {
  input: CreateConcertPosterInput;
};


export type MutationCreateEmailAuthRequestArgs = {
  input: CreateEmailAuthRequestInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveConcertArgs = {
  input: RemoveConcertInput;
};


export type MutationUpdateConcertArgs = {
  input: UpdateConcertInput;
};


export type MutationUpdateConcertPosterArgs = {
  input: UpdateConcertPosterInput;
};


export type MutationUpdateConcertTicketArgs = {
  input: UpdateConcertTicketInput;
};

export type Pagination = {
  __typename?: 'Pagination';
  count: Scalars['Int']['output'];
  current: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  concert?: Maybe<ConcertData>;
  concertCategory?: Maybe<ConcertCategoryData>;
  concertCategoryList?: Maybe<ConcertCategoryListData>;
  concertList?: Maybe<ConcertListData>;
  me?: Maybe<UserData>;
  user?: Maybe<UserData>;
};


export type QueryConcertArgs = {
  id: Scalars['String']['input'];
};


export type QueryConcertCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryConcertListArgs = {
  limit: Scalars['Int']['input'];
  orderBy: ConcertListOrderBy;
  page: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RemoveConcertData = HttpError | RemovedConcert;

export type RemoveConcertInput = {
  id: Scalars['String']['input'];
};

export type RemovedConcert = {
  __typename?: 'RemovedConcert';
  id: Scalars['String']['output'];
};

export type UpdateConcertData = Concert | HttpError;

export type UpdateConcertInput = {
  artist: Scalars['String']['input'];
  concertCategoryId: Scalars['Int']['input'];
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  location: Scalars['String']['input'];
  posterURLs?: InputMaybe<Array<Scalars['String']['input']>>;
  tickets?: InputMaybe<Array<CreateConcertConcertTicketInput>>;
  title: Scalars['String']['input'];
};

export type UpdateConcertPosterData = ConcertPoster | HttpError;

export type UpdateConcertPosterInput = {
  id: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateConcertTicketData = ConcertTicket | HttpError;

export type UpdateConcertTicketInput = {
  id: Scalars['String']['input'];
  openDate?: InputMaybe<Scalars['String']['input']>;
  seller?: InputMaybe<Scalars['String']['input']>;
  sellingURL?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  passwordSalt?: Maybe<Scalars['String']['output']>;
};

export type UserData = HttpError | User;

export type UserWithAuthToken = {
  __typename?: 'UserWithAuthToken';
  authToken: AuthToken;
  user: User;
};
