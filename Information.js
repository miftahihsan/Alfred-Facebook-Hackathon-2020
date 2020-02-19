class  Information{

    static flightInformation(origin, destination, date){


        let response = [
            {
                title: origin + " to " + destination,
                image_url: "https://petersfancybrownhats.com/company_image.png",
                subtitle: "Date : " + date + "\nTime : 06:00\nDuration 00:45\nPrice : 89.99$\nFlight# : A2CDEF",
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
                subtitle: "Date : " + date + "\nTime : 08:00\nDuration 00:45\nPrice : 89.99$\nFlight# : D6CASD",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 10:00\nDuration 00:45\nPrice : 99.99$\nFlight# : L5AJGE",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 12:00\nDuration 00:45\nPrice : 120.00$\nFlight# : A1FBTH",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 14:00\nDuration 00:45\nPrice : 120.00$\nFlight# : H6JYRO",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 16:00\nDuration 00:45\nPrice : 120.00$\nFlight# : Z5DJTK",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 18:00\nDuration 00:45\nPrice : 110.50$\nFlight# : H8AHRL",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 20:00\nDuration 00:45\nPrice : 99.99$\nFlight# : T0AJRG",
                image_url: "flight.jpeg",
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
                subtitle: "Date : " + date + "\nTime : 22:00\nDuration 00:45\nPrice : 99.99$\nFlight# : R4HTYY",
                image_url: "flight.jpeg",
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