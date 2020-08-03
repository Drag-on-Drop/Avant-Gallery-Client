Inspired by the need for artists to showcase their work in times of social distancing, **Gallery D'Art** is a single page application for sharing art and connecting.  

Users can create a profile and upload their artwork, which is hosted on the database and shared in the main gallery alongside all other artworks as thumbnails. Users do not need to create an account to view artworks and artists, but need an account to host art.

Clicking on an artwork directs the user to a full-size image with a download link, a description of the artwork, date posted, and a link to the artist. Clicking on the artist link directs the user to the artist’s profile page where they can see a user location, bio, and a personal thumbnail gallery. Users are also able to index all artists and update their profiles from the navigation bar.
Enjoy!

**[Deployed Server Application](https://ancient-garden-56671.herokuapp.com)** |
**[Server Repository](https://github.com/Drag-on-Drop/Avant-Gallery-Server)** |
**[Deployed Client Application](https://drag-on-drop.github.io/Avant-Gallery-Client/#/)**

**Technologies Used**
- React & React Bootstrap
- JavaScript
- Axios
- AWS S3
- CSS

**User Stories**
As an unregistered user I can see the Home Page
As an unregistered user I can view images uploaded in the database
As an unregistered user I can view images uploaded by a specific Artist
As an unregistered user I can create a User Account
As a registered/signed in User I can CRUD images
As a registered/signed in User I can edit my Profile

**Wireframes**
![Wireframes](https://github.com/Drag-on-Drop/Avant-Gallery-Client/blob/readMe/Avant%20Gallery%20Wireframes.PNG)

**Site Flow Diagram**
![Site Flow](https://github.com/Drag-on-Drop/Avant-Gallery-Client/blob/readMe/Site%20Flow.PNG)

**Unsolved Problems & Planned Features**
- Add image tags to files to allow users to find more images with the same tag
- CSS formatting, spacing & styling
- Artist profile features: artist profile picture, main pictures, carousel of featured art
- About the gallery info section
- Fix: viewing an artist profile won't always populate their work

![Entity Relationship Diagram](https://github.com/Drag-on-Drop/Avant-Gallery-Server/blob/master/Avant%20Gallery%20ERD.PNG "Entity Relationship Diagram")

**Planning, Process and Problem Solving Strategy**

We approached this project by breaking it down into a set of smaller taksks that could be completed in daily sprints which we assigned and tracked in a project plan through development. We would meet in the morning to agree on tasks and meet mid-day to guage progress and mob-program any issues anyone on the team was having. We used this approach until near the end of development when we we only had a few small issues left and we split our team of four into two groups to tackle these issues including building development of aws image upload functionality and editing user and art profiles. 

![Project Plan](https://github.com/Drag-on-Drop/Avant-Gallery-Server/blob/master/Avant%20Gallery%20Project%20Plan.PNG "Project Plan")