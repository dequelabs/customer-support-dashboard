# customer-support-dashboard
Accessible version of Jira Service Desk for Deque Systems Customer Support

to run client: navigate to the project root and run 'npm start'
to run server: navigate to the server directory and run 'node server.js'

src/App.js shows available routes. All rendered components are in the components directory.
Intended customer routes are /home (Home.js), /request (SubmitRequest.js), and /detail{requestId} (DetailView.js).
Routes for development of Jira Service Desk are / for OAuth login (LogIn.js) and /view for api token based JSD requests (ViewRequests.js)

Information is NOT loaded from the JSD api. JSON data is stored in the assets folder and served with an express node server, then fetched in /services/api.js
