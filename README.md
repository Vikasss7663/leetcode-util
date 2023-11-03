## Leetcode Daily Challenge
This is node.js mail server which periodically send emails
to the user with Leetcode Daily Challenge and Official 
Solution if Present.

### How to setup
1. run `npm install` command
2. create .env file and paste below environment variables

- MAIL_USERNAME = '<GMAIL@gmail.com>'
- MAIL_PASSWORD = '<GMAIL_PASSWORD>'
- OAUTH_CLIENTID = '<OAUTH_CLIENTID>'
- OAUTH_CLIENT_SECRET = '<OAUTH_CLIENT_SECRET>'
- OAUTH_REFRESH_TOKEN = '<OAUTH_REFRESH_TOKEN>'

3. `npm run debug`
4. Now your server is up and running and port 3000