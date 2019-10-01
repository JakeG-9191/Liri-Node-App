# Liri-Node-App
A Language Interpretation and Recognition Interface

# Application Information
LIRI is designed to provide information to the user based on a pre-defined search paramter as well as specific inputs by the user. There are currently four pre-defined searches that can be completed by the user, including "concert-this", "spotify-this-song", "movie-this" and "do-what-it-says". 

The first three allow the user to enter the search parameter and then thier own search term, such as "concert-this" Clutch (which will search for events pertaining to the band Clutch) or "movie-this" Interstellar (which will provide information on the movie Interstellar).

If the user fails to enter thier own search terms after the pre-defined search is selected, default information for "movie-this" (Mr. Robot) and "spotify-this-song" (The Sign - Ace of Base) have been built in.

The final pre-defined search paramter, "do-what-it-says", will search for text within a random.txt file and perform the desired search based on the text. By default, this is set to use the pre-defined search parameter "spotify-this-song" with an additional search of "I want it That Way". This text can be changed by the user, and within the command line they can run "do-what-it-says" for new information.

Finally, there is a function that logs all entries made by the user, this is found within the Log.txt file. Each predefined search parameter, as well as those additional search parameters provided by users, is stored in a cohesive format within this file. 
