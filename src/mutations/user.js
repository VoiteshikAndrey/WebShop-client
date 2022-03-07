import {gql} from "@apollo/client";

export const CREATE_USER = gql `
    mutation createUser($input: RegisterInput) {
        createUser(input: $input) {
            data, errors
        }
    }
`;

export const LOGIN_USER = gql `
    mutation loginUser($input: LoginInput) {
        loginUser(input: $input) {
            data, errors
        }
    }
`;

export const LOGIN_WITH_GOOGLE = gql `
    mutation loginWithGoogle($input: String) {
        loginWithGoogle(input: $input) {
            data, errors
        }
    }
`;