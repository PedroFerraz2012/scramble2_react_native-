The main propose of this project is to use React-Native and Microservices.
For that, this App is presenting:
-	The application installed, full functioning, demonstrating react components, such as buttons, lists, images, navigation, use of states, hooks, map, etc, also the device operations like camera and local storage.

The Database used is MongoDB, accessed throgh an Express Server. Because they aren't deployed, both need to be executed:
- The App installed in the phone: react-native run android. But first needs two things: a)set the computer environment for react-native, android, iOS; b) finding your computer IP and save it in components/api.js

-	The Server, it is in another repository: this will be the back end, making the bridge among the App and other third-party APIS, which in my case is the storage, using MongoDB. Other features, like storing files or manipulating them, will be done inside the server.
The App working, in my intention was building a sort of puzzle game, using scrambling JavaScript, slicing the image, and scrambling each piece to interact at least two people. But this game I will conclude in the future, for matter of the meantime to finish this project as an assessment. Then, I am simplifying it a bit:
First of all, demonstration security and encryption, to use the microservice, users need to be signed in, the server answers with an encrypted token key from third-party also the user id, to be used in all interactions. So, the app has Sign Up, Sign In and Forgot Password pages for it.
The main features split in two:
-	Picking a picture: shooting a picture or getting from user’s gallery, storing in the server and Database.
-	List Pictures: shows all users and their pictures from Database. There will be buttons for the current user delete their own pictures, also an input to guess the password that the other users added and then to unscramble them and be able to see their actual picture.
