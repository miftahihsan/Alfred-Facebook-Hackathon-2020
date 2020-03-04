class course{

    static enrollList(){


        let response = [
            {
                title: "Artificial intelligence",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvUbB8UwBJKZchFjBjJcfcoIfLZd63x4qJzq2RGD-X3PtpKQHg",
                subtitle: "Date : " + date + "\nTime : 06:00\nDuration 00:45\nPrice : 89.99$",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Machine learning",
                subtitle: "Date : " + date + "\nTime : 08:00\nDuration 00:45\nPrice : 89.99$",
                image_url: "https://www.itln.in/itlnbackend/assets/uploads/iim-calcutta-to-offer-supply-chain-analytics-course-on-coursera.jpg",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Algorithms and data structures",
                subtitle: "Date : " + date + "\nTime : 10:00\nDuration 00:45\nPrice : 99.99$",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvUbB8UwBJKZchFjBjJcfcoIfLZd63x4qJzq2RGD-X3PtpKQHg",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Data Analysis",
                subtitle: "Date : " + date + "\nTime : 12:00\nDuration 00:45\nPrice : 120.00$",
                image_url: "https://vectorlogoseek.com/wp-content/uploads/2019/05/datacamp-vector-logo.png",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Advanced Database",
                subtitle: "Date : " + date + "\nTime : 14:00\nDuration 00:45\nPrice : 120.00$",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvUbB8UwBJKZchFjBjJcfcoIfLZd63x4qJzq2RGD-X3PtpKQHg",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            }
            
        ]

        return response;
    }

}

module.exports = course;