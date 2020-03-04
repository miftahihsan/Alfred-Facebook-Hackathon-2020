class course{

    static enrollList(){


        let response = [
            {
                title: "Artificial intelligence",
                image_url: "https://teach.udemy.com/wp-content/uploads/2016/02/og-default.png",
                subtitle: "Course coordinator : Andrew NG",
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
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://www.itln.in/itlnbackend/assets/uploads/iim-calcutta-to-offer-supply-chain-analytics-course-on-coursera.jpg",
                "default_action": {
                    "type": "web_url",
                    "url": "https://petersfancybrownhats.com/view?item=103",
                    "webview_height_ratio": "tall",
                },
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
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://teach.udemy.com/wp-content/uploads/2016/02/og-default.png",
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
                subtitle: "Course coordinator : Andrew NG",
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
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://teach.udemy.com/wp-content/uploads/2016/02/og-default.png",
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