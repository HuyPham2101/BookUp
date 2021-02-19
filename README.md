# Book-Up 

## Motivation 
We all know the problematic back and forth when trying to make appointments.
To solve this problem, we created Book-Up as a tool for scheduling meetings, appointments and events. 
With Book-Up all you have to do is:
1. create an offer with a desired duration
2. set your available time
3. copy & paste / send the generated link to the place/person you want

The person that opens the link will see the offer with your available time in a fancy calendar. He/She/It just has to select a timeslot for the appointment and submit the choice. 


## Installation 

In order to make the whole application work you have to clone [the backend](https://code.fbi.h-da.de/bookup/bookup-backend.git) and this project into the same directory:
```bash
+--ExampleDirectory
   |
   +---bookup-backend
   |
   +---bookup-frontend
```
Then, you have to install the `node_modules` by executing `npm i` in the `bookup-backend` directory.
Do the same for the `bookup-frontend` directory.

Finally, open a terminal for `ExampleDirectory` and execute 
```bash 
docker-compose up
```

## Features

As a **registered User** you can:

* personalize your profile
    * add a profile picture 
    if you feel comfortable
    * change your password if you want
<br>

* create an offer
    * set the duration from 10 to 90 minutes 
    in 5 minute steps
    * copy the generated link and paste it 
    where you want
<br>

* set your availability
    * for any day of the week
    * for any time you want
    * you can also disable a day by 1 click
<br>

* have an overview above
    * the offers you provide
    * your upcoming meetings
    * your past meetings
    * all meetings ever had
<br>

As an **Invitee**, after you opened the Link, you can: 

* chose any day you want for the appointment

* chose any time that is available

* enter your name and email address for further contact

* submit & schedule the appointment for the provider 

## Stage

The stageing environment of this project can be found [here](http://bookup.bando.dev/).

Test User:
email: test@gmail.com
password: test

## Screenshots

## Credits
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project is inspired by [Calendly](https://calendly.com/de).

## License
MIT License

Copyright (c) Facebook, Inc. and its affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

MIT © [Book-Up]()
