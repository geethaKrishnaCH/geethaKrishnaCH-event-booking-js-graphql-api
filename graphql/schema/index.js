import { buildSchema } from "graphql";

const graphqlSchema = buildSchema(`

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!,
        email: String!,
        password: String,
        createdEvents: [Event!]
    } 

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type AuthResponse {
        userId: ID!
        token: String!
        expiresIn: Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthResponse
        events: [Event!]!
        bookings: [Booking!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event!
        createUser(userInput: UserInput): User!
        createBooking(eventId: String!): Booking!
        cancelBooking(bookingId: String!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default graphqlSchema;
