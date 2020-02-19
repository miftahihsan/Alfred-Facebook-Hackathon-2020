class  Information{

    static flightDetails( userData ){
        
        var flightNumber = ["A4FHTK", "G4RTGH", "Z5HHJH", "L5HYLF"];

        // var oriInit = userData['origin'].charAt(0) + userData['origin'].charAt( ( userData['origin'].length() / 2 ) ) + userData['origin'].charAt(userData['origin'].length() - 1);
        // var desInit = userData['destination'].charAt(0) + userData['destination'].charAt( ( userData['destination'].length() / 2 ) ) + userData['destination'].charAt(userData['destination'].length() - 1);

        console.log( "HERE!!!!!!!!!!!!!!" );
        console.log( userData['origin'] );
        

        let response = {
            // message: {
                attachment: {
                  type: "template",
                  payload: {
                    template_type: "airline_checkin",
                    intro_message: "Check-in is available now.",
                    locale: "en_US",        
                    pnr_number: "ABCDEF",
                    checkin_url: "www.google.com",  
                    flight_info: [
                      {
                        flight_number: "f001",
                        departure_airport: {
                          airport_code: "oriInit",
                          city: userData['origin'],
                          terminal: "T4",
                          gate: "G8"
                        },
                        arrival_airport: {
                          airport_code: "desInit",
                          city: userData['destination'],
                          terminal: "T4",
                          gate: "G8"
                        },
                        flight_schedule: {
                          boarding_time: "2016-01-05T15:05",
                          departure_time: "2016-01-05T15:45",
                          arrival_time: "2016-01-05T17:30"
                        }
                      }
                    ]
                  }
                }
            // }   
        }

        return response;

    }

    static flightInformation(origin, destination, date){


        let response = [
            {
                title: origin + " to " + destination,
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                subtitle: "Date : " + date + "\nTime : 06:00\nDuration 00:45\nPrice : 89.99$",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 08:00\nDuration 00:45\nPrice : 89.99$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 10:00\nDuration 00:45\nPrice : 99.99$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 12:00\nDuration 00:45\nPrice : 120.00$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 14:00\nDuration 00:45\nPrice : 120.00$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 16:00\nDuration 00:45\nPrice : 120.00$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 18:00\nDuration 00:45\nPrice : 110.50$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 20:00\nDuration 00:45\nPrice : 99.99$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                        type: "postback",
                        title: "Book Flight!",
                        payload: "Book Flight",
                    }
                ],
            },
            {
                title: origin + " to " + destination,
                subtitle: "Date : " + date + "\nTime : 22:00\nDuration 00:45\nPrice : 99.99$",
                image_url: "https://s3-us-west-2.amazonaws.com/www.whitewall.site/flight.jpeg",
                buttons: [
                    {
                    type: "postback",
                    title: "Book Flight!",
                    payload: "Book Flight",
                    }
                ],
            },
            
        ]

        return response;
    }

}

module.exports = Information;