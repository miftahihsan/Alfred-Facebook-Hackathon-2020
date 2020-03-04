class course{

    static enrollList(){


        let response = [
            {
                title: "Artificial intelligence",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvUbB8UwBJKZchFjBjJcfcoIfLZd63x4qJzq2RGD-X3PtpKQHg",
                subtitle: "",
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
                subtitle: "",
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
                subtitle: "",
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
                subtitle: "",
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
                subtitle: "",
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