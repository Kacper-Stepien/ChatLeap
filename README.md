# ChatLeap
ChatLeap is a social networking application similar to Twitter. It consists of a REST API  and a client-side web application.

## Technologies used in the project:
- <b>Frontend:</b> <br>
[![](https://skills.thijs.gg/icons?i=react,ts,sass,xd,&theme=dark)](https://skills.thijs.gg)
- <b>Backend:</b> <br>
[![](https://skills.thijs.gg/icons?i=js,nodejs,express,mongo,&theme=dark)](https://skills.thijs.gg)

## Features:
- <b>Account creation:</b> Users can create an account, and the account information is stored securely in the database. Passwords are encrypted to ensure data security.

- <b>Login:</b> Users can log in to their accounts using their credentials.

- <b>Post Creation:</b> Users can create posts with a length ranging from 3 to 250 characters.

- <b>Post Editing:</b> Logged-in users can edit the content of their own posts.

- <b>Post Deletion:</b> Logged-in users have the ability to delete their own posts.

- <b>Commenting:</b> Users can add comments to any post. Comments must have a length ranging from 3 to 150 characters.

- <b>Comment Editing:</b> Logged-in users can edit their own comments.

- <b>Comment Deletion:</b> Logged-in users can delete their own comments.

- <b>Liking Posts:</b> Users can like or unlike posts. Clicking the "like" button adds or removes a like from the post. Users can only like a post once.

- <b>User Listing:</b> There is a page that displays a list of all users who have an account in the application (except the currently logged-in user).

- <b>User Profile:</b> Clicking on a user in the user list or on their name, photo, or nickname anywhere in the application redirects the user to the respective user's profile page. The user profile page displays the user's information and all their posts.

- <b>Theme Customization:</b> Users can change the application's theme between "dark" and "light" modes.

- <b>Accent Color Selection:</b> Users can choose one of five accent colors (Indigo, Teal, Orange, Pink, Green) to customize certain elements such as buttons.

- <b>Persistence:</b> User preferences, including the selected theme and accent color, are saved in the browser's LocalStorage to persist across sessions.

- <b>Persistent Login:</b> After logging in, the user's token and profile data are stored in the browser's LocalStorage, allowing the user to stay logged in even after refreshing the page.

- <b>Responsiveness:</b> The application is fully responsive and renders correctly on devices with a minimum width of 300px.

## Getting started
To get started with ChatLeap, follow these steps:
1.	Install Node.js
2.	Clone the repository: 
	
        git clone https://github.com/Kacper-Stepien/ChatLeap.git
        
3. Set up the backend:
- Open terminal
- Navigate to the folder you clone repository
- Navigate to the backend driectory:

      cd api
 
- Install dependencies:
  
      npm install
 
- Start the backend server:

      npm start
      
4. Set up frontend:
- Open another terminal tab
- Navigate to the folder you clone repository
- Navigate to the frontend driectory:

      cd client

- Start frontend development server:

      npm start
5. Access the application by opening your browser and visitinig:

       htttp://localhost:<port>


## Contact
If you have any questions or feedback regarding ChatLeap, please contact me at kacper2007x48@gmail.com

Happy ChatLeaping!
