import { Client, Account } from 'appwrite';
import {APPWRITE_ENDPOINT,APPWRITE_PROJECT_ID} from '@env'
export const client = new Client();


client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export { ID } from 'appwrite';
