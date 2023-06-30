# ChatLeap
ChatLeap is a social networking application similar to Twitter. It consists of a REST API  and a client-side web application.

## Link to App
https://chatleap.onrender.com
#### If you don't want to create an account, you can use the following guest login details:
email: anonimowy@gmail.com <br>
password: 12345678

## Table of contents
- [Technologies used in the project](#technologies-used-in-the-project)
- [Features](#features)
- [App screenshots](#app-screenshots)
- [Running the Application Using Docker](#running-the-application-using-docker)
- [Contact](#contact)

## Technologies used in the project:
- <b>Frontend:</b> <br>
[![](https://skills.thijs.gg/icons?i=react,ts,sass,xd,&theme=dark)](https://skills.thijs.gg)
- <b>Backend:</b> <br>
[![](https://skills.thijs.gg/icons?i=js,nodejs,express,mongo,&theme=dark)](https://skills.thijs.gg)
- <b>Deployment:</b> <br>
[![](https://skills.thijs.gg/icons?i=docker,&theme=dark)](https://skills.thijs.gg)

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

## App screenshots
### Register form
![landing_page](/Screens/RegisterForm.png)
### Login form
![landing_page](/Screens/LoginForm.png)
![landing_page](/Screens/LoginForm2.png)
### Main
![login_page](/Screens/Main.png)
![login_page](/Screens/Main2.png)
![login_page](/Screens/Main3.png)
### Update post
![login_page](/Screens/UpdatePost.png)
### Update comment
![login_page](/Screens/UpdateComment.png)
### Friends
![login_page](/Screens/Friends.png)
### User Page
![login_page](/Screens/UserPage.png)
### Setings
![login_page](/Screens/Settings.png)
![login_page](/Screens/Settings2.png)
## Mobile
![login_page](/Screens/MobileMain.png)
![login_page](/Screens/MobileMenu.png)

## Running the Application Using Docker
To get started with ChatLeap, follow these steps:
1.	Make sure you have Docker installed on your computer. You can download Docker from https://www.docker.com/products/docker-desktop and follow the instructions for your operating system.

2.	Open terminal

3.	Navigate to the folder you want to clone repository

4.	Clone the repository: 
	
        git clone https://github.com/Kacper-Stepien/ChatLeap.git
        
3. Navigate to the project's root folder:

      	cd ChatLeap
	
4. Open the .env file located in the same directory as the docker-compose.yml file. You can modify the values of the API_PORT, CLIENT_PORT, JWT_SECRET, and JWT_EXPIRES_IN variables according to your preferences. Save the file after making the changes.

		API_PORT=8000
		CLIENT_PORT=3000

		JWT_SECRET=kFld34pdse/fdfoeqpaFXaa4.$oldmgurITw-d34
		JWT_EXPIRES_IN=1d
      
5. Run the application using Docker Compose. In a terminal, while in the project's root directory, execute the following command:

      	docker-compose up -d
	
	This will build and run three containers: mongodb (database), api (backend), and client (frontend). The -d option signifies running the containers in detached mode, allowing them to run in the background.

6. After successfully starting the containers, the application will be accessible at http://localhost:<CLIENT_PORT>, where <CLIENT_PORT> is the value of the CLIENT_PORT variable from the .env file (by default is 3000). Open a web browser and navigate to that address to see the application.

       http://localhost:<CLIENT_PORT>
       

## Contact
If you have any questions or feedback regarding ChatLeap, please contact me at kacper2007x48@gmail.com

Happy ChatLeaping!
