import { gql } from '@apollo/client'

export const CONCERT_CATEGORY_LIST_QUERY = gql`
  query ConcertCategoryList {
    concertCategoryList {
      ... on ConcertCategoryList {
        list {
          id
          title
        }
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const CONCERT_LIST_QUERY = gql`
  query ConcertList($page: Int!, $limit: Int!, $orderBy: ConcertListOrderBy!) {
    concertList(page: $page, limit: $limit, orderBy: $orderBy) {
      ... on ConcertListWithPagination {
        list {
          list {
            id
            title
            date
            createdAt
            updatedAt
          }
        }
        pagination {
          current
          count
        }
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const CONCERT_QUERY = gql`
  query Concert($concertId: String!) {
    concert(id: $concertId) {
      ... on Concert {
        id
        artist
        title
        location
        date
        concertCategory {
          id
          title
        }
        posters {
          id
          imageURL
        }
        tickets {
          id
          openDate
          seller
          sellingURL
          ticketPrices {
            id
            title
            price
            priceCurrency
          }
        }
        createdAt
        updatedAt
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const ME_QUERY = gql`
  query Me {
    me {
      ... on User {
        id
        email
        isAdmin
        createdAt
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`
