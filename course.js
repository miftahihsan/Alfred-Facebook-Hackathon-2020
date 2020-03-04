class course{

    static preReq(){
        let response = [
            {
                title: "Python Basics",
                image_url: "https://img-cdn.tnwcdn.com/image/tnw?filter_last=1&fit=1280%2C640&url=https%3A%2F%" + 
                    "2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2015%2F06%2FUdacity.jpg&signature=89b32eb68e1e8b18381ac3a109ae56d1",
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
                title: "Java Basics",
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://img-cdn.tnwcdn.com/image/tnw?filter_last=1&fit=1280%2C640&url=https%3A%2F%" + 
                    "2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2015%2F06%2FUdacity.jpg&signature=89b32eb68e1e8b18381ac3a109ae56d1",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Facebook Blue Print : Digitas",
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://scontent.fdac6-1.fna.fbcdn.net/v/t39.2365-6/22366900_490556584651372_4020976192428441600_n.gif?_nc_cat=107&_nc_sid=ad8a9d&_nc_eui2=AeH903XR-7ktzZXjT9SDL0PywrvilVMvF1y_4NMCFdJPoJS2y-v1AiUw6Q0iQglwUiCHrat16eLLz9OKYyZtYDeWzCUTqodxBYBjmZINCW7_yg" + 
                        "&_nc_ohc=1Qvv_h7BZaAAX99qtxQ&_nc_ht=scontent.fdac6-1.fna&oh=1e201eeb9c41ca389b8dd09bfebcd7b6&oe=5E852EBC",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Facebook Blue Print : adQuadrant",
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://scontent.fdac6-1.fna.fbcdn.net/v/t39.2365-6/22256259_1397896093656268_2567923717501878272_n.gif?_nc_cat=102&_nc_sid=ad8a9d&_nc_eui2=AeEkp3X3BN9FsJ48MboUkTH0ZnTkONarm6L25CpQQMOi2cWSHfdiq84Y5kF_A8AGByr49a-WNcANYKCCEfJrv9ag9OvTa6422EYgigxKVAmLdg&_" + 
                        "nc_ohc=ne9WordiD78AX_fBW60&_nc_ht=scontent.fdac6-1.fna&oh=3e8a445b2bc266606ea86a29951bb4b7&oe=5E814EBE",
                buttons: [
                    {
                        type: "postback",
                        title: "Enroll Now!",
                        payload: "ENROLL",
                    }
                ],
            },
            {
                title: "Facebook Blue Print : Healing Waters",
                subtitle: "Course coordinator : Andrew NG",
                image_url: "https://scontent.fdac6-1.fna.fbcdn.net/v/t39.2365-6/18280380_255665961572167_5865628924817440768_n.png?_nc_cat=111&_nc_sid=ad8a9d&_nc_eui2=AeGjM9tiG80VnE_TpbF8rX5uZtn26aEYqMdoxTCEj126r3PqylyIitaadnSyjTLUgNaxvFUHY6wvIIyZgNQ4dlYOcUchCOhE27mpe9qKF3l1aQ&_nc_ohc" + 
                        "=4cBDanLBEtwAX9iNM1c&_nc_ht=scontent.fdac6-1.fna&oh=98262f34dd9e12bbeac500144fb70d00&oe=5E85A666",
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