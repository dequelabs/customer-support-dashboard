# customer-support-dashboard
Accessible version of Jira Service Desk for Deque Systems Customer Support

to run client: navigate to the project root and run 'npm start'
to run server: in new shell, navigate to the server directory and run 'node server.js'

src/App.js shows available routes. All rendered components are in the components directory.
Intended customer routes are /home (Home.js), /request (SubmitRequest.js), and /detail{requestId} (DetailView.js).
Routes for development of Jira Service Desk authentication are / for OAuth login (LogIn.js)

Data is loaded from a dev instance of Jira Customer service desk at https://dequecsddev.atlassian.net/servicedesk via proxy node server


