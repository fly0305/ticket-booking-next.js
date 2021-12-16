# Movie Ticket Booking

<ul>
  <li><a href="#project-overview">Project Overview</a></li>
  <li><a href="#working-demo">Working demo</a></li>
  <li><a href="#run-server-in-local">Run server in local</a></li>
  <li><a href="#project-description">Project Description</a></li>
  <li><a href="#screen-shots">Screen Shots</a></li>
</ul>

## Project Overview
Ticket booking web application built using React
and Next.js, uses React context for state management and 
Material-UI for UI components.

<img width="800" alt="cover-pic" src="https://user-images.githubusercontent.com/26500550/146298323-76633a8f-d577-4884-b86f-4d4be68634bf.png">

## Working demo

<a href="https://ticket-booking-ram-sankar.vercel.app">Movie Ticket Booking Site</a>

## Run server in local

Clone the project, cd into the project directory

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Description
A user can book tickets or customize/block the seats. First the user 
has to select a movie and it's theater, then he can customize the
rows and columns and modify the seating arrangement according to 
the theater. 

While booking tickets, booked seats
are marked in grey color and selected seats are marked in green color
later the user can proceed to confirm his booking. Confirmation window 
will be enabled only for 5 seconds, once 5 seconds are lapsed the
user has to select the seats again and continue the process.

## Screen Shots
<img width="800" alt="home" src="https://user-images.githubusercontent.com/26500550/146297644-d0eb87c8-46a6-4ca4-9251-3c9881ea8121.png">
<img width="800" alt="details" src="https://user-images.githubusercontent.com/26500550/146297237-00327f86-fc34-431a-9fc0-3b08148ba068.png">
<img width="800" alt="customize" src="https://user-images.githubusercontent.com/26500550/146297406-eb97f213-2380-48fb-a7ae-86b54965199c.png">
<img width="800" alt="seat-selection" src="https://user-images.githubusercontent.com/26500550/146297447-626b5b6c-d562-460f-b4e5-4410342e15a1.png">
<img width="800" alt="confirm-booking" src="https://user-images.githubusercontent.com/26500550/146297481-df281112-4280-4ccf-8623-5c579fe30831.png">
<img width="800" alt="seat-selection2" src="https://user-images.githubusercontent.com/26500550/146297691-46da0ddc-115d-459b-962d-ba2d8853b84a.png">
