# **WHAT**

We're proposing to build a front-end/backend tool for the StarCraft II API hosted by Blizzard Entertainment's Battle.net. Our project will allow users to retrieve information regarding player rankings on the SC2 ladder including region, ladder division and rank.

The general idea is to take user input from the front-end web page, send that request via http to the API, use the API callback to populate/update our database, return a properly formatted sql query from our database.
There are four main components for this project:

* (1) Interaction with and documentation of the Blizzard API (Blizzard's API (Javascript))
* (2) Front-end webpage (HTML, Javascript/Angular/Bootstrap) 
* (3) Server to communicate with Blizzard API/database/front-end (Javascript/Express)
* (4) Database storage of responses to requests to the Blizzard API (MariaDB)

For the first component, we'll need to develop an understanding of the various API endpoints and their interactions, the user input format, and callback data format. 
 We will need to set up an account with Blizzard's developer program and give them information about the project that we intend to create, such as the title of our project and the URL which we will be using to send requests to the API.
 
For the second component, we'll need to create a functional webpage and interface to allow users to intuitively and easily access the desired data. The primary challenge here is going to be coordinating the input from the user with the information that we want to obtain from the API and from our databases. 
 Another significant portion is going to be properly formatting the HTML and CSS of the website to work as intended without being confusing to the user. Intend to use angular and bootstrap as demonstrated in class.
 
For the third component, we'll need to accomplish the following: 
-setup a connection to the database for reading/writing data
-create handlers for API requests/responses 
-create/store the required local files that support server functionality

For the fourth component, we'll need to figure out how to integrate the API callback with the mysql database to work for storage and records, and how to do that repeatedly and get the right information into the right tables. 
This will probably be the easiest part of the project to implement. Here's an example of the structure we're considering:
 -- Database Structure -- (subject to change as API calls are implemented/normalization is added to tables)
 Column Data: (| Player_ID(s) | Player_Name(s) | Rank | Team | Division | Region | Game_Type |) NOTE - (s) indicates records for team-gametypes. 
 Tables: REGION (Region, Division) LADDER_DIVISION (Division, Game_Type, Team, Rank), TEAM (Team, Rank, Game_type, Player_ID, Player_Name)    
                    
 Data normalization will be a challenge here, particularly if we end up implementing multiple gametypes and ladders. Figuring out how to optimally store the data/build proper foreign-key/primary key relationships will be interesting as there is room for a lot of redundancy. 
 The current proposed structure is not normalized, and will need to be when proper tables are created.
***
# **WHO**
 **Kyle - Implementation** 
  
  Front-end - **_10pts total_**
  
   * Design/Style - _5pts_
   * Functionality - _5pts_
  
  Blizzard API - **_15pts total_**
  
   * Documentation/Usage - _5pts_ 
   * API request handlers - _5pts_
   * API callback handlers (make responses database friendly) - _5pts_
 ***
 **Spencer - Implementation** 
  
  Backend - **_10pts total_**
  
   * Table design - _5pts_
   * Proper structure - (normalization, foreign/primary keys, etc.) - _10pts_
  
  Server - **_15pts total_**
  
   * Functionality - _5pts_
   * Correct handling of client http requests/responses - _5pts_
 
