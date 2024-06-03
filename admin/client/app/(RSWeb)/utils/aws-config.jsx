
import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
var {
    COGNITO_USER_POOL_ID,
    COGNITO_USER_POOL_ID,
    COGNITO_REGION
} = process.env;




AWS.config.update({
    region: 'eu-north-1',
    secretAccessKey: '192otj6am8drfmht3cr6ht53rlcm7pvjoinfdvkk2drss72e93ni',

    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-north-1_XlMc0cPA1',
    }),
});


const userPool = new CognitoUserPool({
    UserPoolId: 'eu-north-1_XlMc0cPA1',
    ClientId: '336kot00qu96ft1ehf4j4pqmui',
});


export { userPool } 