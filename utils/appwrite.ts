import { Client, Account,Databases,Storage } from 'appwrite';
import {APPWRITE_ENDPOINT,APPWRITE_PROJECT_ID} from '@env'

export const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export { ID } from 'appwrite';
