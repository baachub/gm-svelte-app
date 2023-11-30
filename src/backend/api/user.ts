import { genSaltSync, hashSync, compareSync } from "bcryptjs";

function hashPassword(password: string) {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}

// Function to check if the user is already present in the other user base
async function checkUserPresent(email: string) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data = await response.json();
        const userExists = data.some((user: { [x: string]: string; }) => user['email'] === email);
        return userExists;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

// Function to handle user registration
export async function registerUser (email: string, name: string, password: string) {
    try {
        const userExists = await checkUserPresent(email);

        if (!userExists) {
            throw new Error('User is not present in the userbase hence cannot be registered.');
        }

        const hashedPassword = hashPassword(password);

        const response = await fetch('https://batuhan-acar.hasura.app/v1/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'DWaYOswxizy193GWw0nEsMMdRvq5efNXqgjP9v1BnHIxSdl6NhtOA3L8bEtYHBqE'
            },
            body: JSON.stringify({
                query: `
                    mutation InsertUsers($email: String, $name: String, $password: String) {
                        insert_Users(objects: {email: $email, name: $name, password: $password}) {
                            affected_rows
                            returning {
                                id
                                email
                                name
                                password
                            }
                        }
                    }
                `,
                variables: {
                    email: email,
                    name: name,
                    password: hashedPassword,
                },
            }),
        });
        
        const data = await response.json();

        if (data['errors']) {
            if (data['errors'][0]['message'].includes('Users_email_key')) {
                throw new Error('User with this email already exists.');
            }
        }

        return data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

// Function to handle user login
export async function userLogin (email: string, password: string) {
    try {
        const response = await fetch('https://batuhan-acar.hasura.app/v1/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'DWaYOswxizy193GWw0nEsMMdRvq5efNXqgjP9v1BnHIxSdl6NhtOA3L8bEtYHBqE'
            },
            body: JSON.stringify({
                query: `
                    query GetUserByEmail($email: String!) {
                        Users(where: { email: { _eq: $email } }) {
                            email
                            password
                        }
                    }
                `,
                variables: {
                    email: email
                },
            }),
        });

        const data = await response.json();
        console.log(data);
        const userData = data['data']['Users'];

        if (userData.length === 0) {
            console.error('Email is incorrect.');
            throw new Error('Email is incorrect.');
        } else if (userData.length === 1) {
            const hashedPasswordFromDB = userData[0]['password'];

            if (!compareSync(password, hashedPasswordFromDB)) {
                console.error('Password is incorrect.');
                throw new Error('Password is incorrect.');
            }

            console.log('Login successful!');
            return true;
        } else {
            console.error('Authentication error! Contact support.');
            throw new Error('Authentication error! Contact support.');
        }

    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}