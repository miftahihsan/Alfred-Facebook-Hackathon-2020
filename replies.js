const Responses = require('./response');

class Replies {

  static userData = {};
  static user_name = "";
  static uid= 0;

  static setUID(uid){
    this.replies["NEW_REMINDER"] = Responses.genWebView(uid);
    this.uid = uid;
  }

  static getRandId(list){
    var id = Math.floor( Math.random() * list.length );
    console.log("id============================================= " + id);
    console.log("id============================================= " + list[id]);
    return list[id];
  }

  static setUserData(userData){
    this.userData = userData;
    if ('reminders' in userData.Item){
       this.replies["VIEW_REMINDERS"] = Responses.genReminders(this.uid, userData.Item['reminders']);
    }

    this.replies['HR_POLICIES'] = [
      Responses.genTextReply("You can say something like"),
      Responses.genTextReply("\“I’d like to read the sexual harassment guidelines\”"),
      Responses.genTextReply("and I’ll search the HR handbook and get the relevant information to you!")
    ]

    this.replies["INITIATE"] = [Responses.genTextReply("Hi "+userData['name']+" ! "),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of Dunder Mifflin."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Dunder Mifflin employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n"),
      Responses.genTextReply("- Ask an HR question\n\n- Modify your calendar, make a list etc.."),
      Responses.genTextReply("- Know something from a specific company department, like finance, tech support, law etc..\n"),
      Responses.genQuickReply(
        "- Report stats/info to manager\n",
        [
          {
            title: "HR question 🙋",
            payload: "HR"
          },
          {
            title: "Schedules 📅",
            payload: "SCHEDULES"
          },
          {
            title: "FAQ 📚",
            payload: "FAQ"
          },
          {
            title: "Report stats/info 👩‍💻",
            payload: "REPORT_STATS"
          },
          {
            title: "Live Chat",
            payload: "LIVE"
          },
          {
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          }
        ]
      )
    ];

    this.replies["RAND_HAPPY_PICTURES"] = [
      "https://lndnxprss.files.wordpress.com/2013/03/tumblr_mciwejzfqf1r14f5po1_500.jpg",
      "https://www.nirapadnews.com/english/wp-content/uploads/2015/01/Happy-funny-smiley-monkey.png",
      "https://data.whicdn.com/images/29999481/original.jpg",
      "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/29/2015/01/iStock_000005542321_Medium.jpg",
      "https://thumbs.dreamstime.com/b/happy-cat-closeup-portrait-funny-smile-cardboard-young-blue-background-102078702.jpg"
    ];

    this.replies["RAND_FUNNY_GIFS"] = [
      "https://media.giphy.com/media/xUPGcxtF0XweuykLVS/giphy.gif",
      "https://1.bp.blogspot.com/-p2HQb1F5owk/WLojv1Q8lDI/AAAAAAANzGY/QFihFXDJ4Ocgq_85eKBA7ix4AekGqoC1QCLcB/s1600/AW386481_00.gif",
      "https://i.pinimg.com/originals/b5/0e/e4/b50ee4bc436cafccddf6c0b99b0add4e.gif",
      "https://media.giphy.com/media/37R3fbYQpWQ7m2WOsF/giphy.gif",
      "https://i.pinimg.com/originals/85/31/1f/85311f39e674454dfc7fc12fd6ce01d7.gif"
    ];

    this.replies["RAND_SUCCESS_QUOTES"] = [ 
      "https://ih1.redbubble.net/image.177668254.3654/flat,750x1000,075,f.u2.jpg",
      "https://cdn4.vectorstock.com/i/1000x1000/36/58/stay-positive-work-hard-motivational-quote-for-vector-23593658.jpg",
      "https://i.pinimg.com/736x/c9/98/ea/c998ea1d120959472a3a28cf8d821fec.jpg",
      "https://www.success.com/wp-content/uploads/legacy/sites/default/files/new3.jpg",
      "https://blog.zoominfo.com/wp-content/uploads/2018/02/quote-1.png",
      "https://cdn2.vectorstock.com/i/1000x1000/91/91/work-hard-stay-positive-motivational-quotes-vector-21679191.jpg",
      "https://i.pinimg.com/originals/0b/60/fa/0b60fa088d19f0d825a22677585bc637.jpg"
    ];

    this.replies["BORED"] = [
      Responses.genPictureReply( this.getRandId(this.replies['RAND_HAPPY_PICTURES']) ),
      Responses.genTextReply("Also, here’s something to get you going back up again!!"),
      Responses.genPictureReply( this.getRandId(this.replies['RAND_FUNNY_GIFS']) ),
      Responses.genTextReply("Studies suggest that the simple act of walking around in the office" + 
                              "and talking to other employees you might be close with can drastically improve moods and increase productivity!"),
      Responses.genPictureReply( this.getRandId(this.replies['RAND_SUCCESS_QUOTES']) ),
    ];

    this.replies["HOLIDAYS"] = [
      Responses.genTextReply("You have " + this.userData.Item['sick_leave'] + " sick days and " + this.userData.Item['holiday_left'] +
                                          " leave days remaining for this year" ),
      Responses.genQuickReply("You can apply for a leave at any time just by saying “Apply for a leave from 30 March to 30 April”!",
        [
          {
            title: "HR policies 🤔",
            payload: "HR_POLICIES"
          },
          {
            title: "Performance Stats 🔖",
            payload: "PERFORMANCE_STATS"
          },
          {
            title: "Upcoming Holidays 🎄",
            payload: "HOLIDAYS"
          },
          {
            title : "Bonus & Payments 💵" ,
            payload: "BONUS_PAYMENTS"
          },
          {
            title : "Submit a complaint 😕" ,
            payload: "COMPLAINT"
          }
        ]
      )
    ];

    this.replies['BONUS_PAYMENTS'] = [
      Responses.genTextReply("I’ll list your remaining bonuses for this year below. Have a look! "),
      Responses.genTextReply("- Christmas: "+this.userData.Item["holiday_bonus"]+"\n" +
                             "- Sales Bonus: "+this.userData.Item['bonus']+""),
      Responses.genTextReply("You have "+this.userData.Item['due_salary']+" monthly salary payments left this year."),
      Responses.genQuickReply("You can directly ask about payments and bonuses simply by asking" + 
                              "\“How much bonuses am i entitled to this year?\” or \"How much do I get this year in salaries?\"",
        [
          {
            title: "HR policies 🤔",
            payload: "HR_POLICIES"
          },
          {
            title: "Performance Stats 🔖",
            payload: "PERFORMANCE_STATS"
          },
          {
            title: "Upcoming Holidays 🎄",
            payload: "HOLIDAYS"
          },
          {
            title : "Bonus & Payments 💵" ,
            payload: "BONUS_PAYMENTS"
          },
          {
            title : "Submit a complaint 😕" ,
            payload: "COMPLAINT"
          }
        ])
    ];

    this.replies["PERFORMANCE_STATS"] = [
      Responses.genTextReply("You’ve made "+this.userData.Item['sales_made']+" sales this month, generating $20,000 in company revenue!"),
      Responses.genTextReply("You’ve crossed the minimum required sales target for this quarter, increasing this year’s bonus to " + 
                              this.userData.Item['bonus']+"!!"),
      Responses.genQuickReply("Great job!! 👏👏",
      [
        {
          title: "HR policies 🤔",
          payload: "HR_POLICIES"
        },
        {
          title: "Performance Stats 🔖",
          payload: "PERFORMANCE_STATS"
        },
        {
          title: "Upcoming Holidays 🎄",
          payload: "HOLIDAYS"
        },
        {
          title : "Bonus & Payments 💵" ,
          payload: "BONUS_PAYMENTS"
        },
        {
          title : "Submit a complaint 😕" ,
          payload: "COMPLAINT"
        }
      ])
    ];

    this.replies["COMPLAINT"] = [
      Responses.genTextReply("Remember, your complaints/reports are completely anonymous." + 
      "Only I’ll know that you’ve submitted this complaint and no one else, not even your superiors! 😎"),
      Responses.genTextReply("Please tell us about your experience in details or upload a complaint file as an attachment" + 
      " so that we can perform proper investigation and take necessary actions as soon as possible"),
      Responses.genTextReply("Press the button when you are done"),
    ];

    this.replies["LIVE"] = [
      Responses.genTextReply("Your conversation has been handed over to the page Admin"),
      Responses.genTextReply("Please be patient 🕐 and wait for them to attend to your queries"),
    ]
  }


  static replies = {
    "WELCOME_BACK" : [
      Responses.genTextReply("Welcome Back!"),
      Responses.genTextReply("Hope your Issue was solved")
    ],
    "INITIATE": [Responses.genTextReply("Hi "+this.userData['name']+" ! "),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of Dunder Mifflin."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Dunder Mifflin employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n")
    ],
    "MENU": [Responses.genTextReply("What do you want to do next?"),
      Responses.genTextReply("- Ask an HR question\n\n- Modify your calendar, make a list etc.."),
      Responses.genTextReply("- Know something from a specific company department, like finance, tech support, law etc..\n"),
      Responses.genQuickReply(
        "- Report stats/info to manager\n",
        [
          {
            title: "HR question 🙋",
            payload: "HR"
          },
          {
            title: "Schedules 📅",
            payload: "SCHEDULES"
          },
          {
            title: "FAQ 📚",
            payload: "FAQ"
          },
          {
            title: "Report stats/info 👩‍💻",
            payload: "REPORT_STATS"
          },
          {
            title: "Live Chat",
            payload: "LIVE"
          },
          {
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          }
        ]
      )],
    "HR": Responses.genQuickReply("Ok! What do you want to know about: \n" +
      "- HR company policy\n" +
      "- Your performance stats\n" +
      "- Sick days/holidays\n" +
      "- Bonus and payments\n" +
      "- Submit a complaint\n",
      [
        {
          title: "HR policies 📚",
          payload: "HR_POLICIES"
        },
        {
          title: "Performance Stats 🔖",
          payload: "PERFORMANCE_STATS"
        },
        {
          title: "Upcoming Holidays 🎄",
          payload: "HOLIDAYS"
        },
        {
          title : "Bonus & Payments 💵" ,
          payload: "BONUS_PAYMENTS"
        },
        {
          title : "Submit a complaint 😕" ,
          payload: "COMPLAINT"
        }
      ]),
    "HOLIDAYS" : [
      Responses.genTextReply("You have " + this.userData['sick_leave'] + " sick days and " + this.userData['holiday_left'] +
                                          " leave days remaining for this year" ),
      Responses.genTextReply("You can apply for a leave at any time just by saying “Apply for a leave from 30 March to 30 April”!")               
    ],
    "SCHEDULES": Responses.genQuickReply(
      "Would you like to work with your lists, \n" +
      "make a new list, view/manage your calendar \n" +
      "or view/manage your work trips?",
      [
        {
          title: "View Reminders 📝",
          payload: "VIEW_REMINDERS"
        },
        {
          title: "Make a new Reminder 🗒",
          payload: "NEW_REMINDER"
        },
        {
          title: "View Schedule 📆",
          payload: "VIEW_SCHEDULE"
        },
        {
          title: "View Trips ✈",
          payload: "VIEW_TRIPS"
        }
      ]),
    "FAQ": Responses.genQuickReply("Great! What do you want to know about?",
      [
        {
          title: "Finances 💰",
          payload: "FINANCE"
        },
        {
          title: "IT and Tech 🖥️",
          payload: "IT_TECH"
        },
        {
          title: "Corporate Law 👨‍⚖️",
          payload: "CORPORATE_LAW"
        },
        {
          title: "Training 🏋️‍♂️",
          payload: "TRAINING"
        },
      ]),
    "IT_TECH": [Responses.genTextReply("Here are some common IT concerns you can ask about:"),
      Responses.genQuickReply(
        "- What's my username and password?\n" +
        "- I can't login to my account\n" +
        "- My office equipment isn’t working\n" +
        "- My office equipment doesn't have network connectivity\n",
        [
          {
            title: "Username and password?",
            payload: "USER_NAME_PASSWORD"
          },
          {
            title: "Can't login",
            payload: "CANT_LOGIN"
          },
          {
            title: "Equipment not working!",
            payload: "EQUIPMENT_NOT_WORKING"
          },
          {
            title: "No Network!",
            payload: "NO_NETWORK"
          },
        ])],
    "FINANCE": [Responses.genTextReply("Here are some common Finances questions you can ask:"),
      Responses.genQuickReply(
        "- What are the current health insurance policies?\n" +
        "- When will I get a bonus?\n" +
        "- What are the rules for fines?\n" +
        "- When will I get an increment?\n",
        [
          {
            title: "Current health insurance policies?",
            payload: "HEALTH_INSURANCE"
          },
          {
            title: "Bonus",
            payload: "BONUS"
          },
          {
            title: "Rules for fines",
            payload: "FINE_RULES"
          },
          {
            title: "Increment",
            payload: "INCREMENT"
          },
        ])],
    "CORPORATE_LAW": [Responses.genTextReply("Here are some common Corporate Law questions you can ask:"),
      Responses.genQuickReply(
        "- What are the new law changes introduced in the company\n?" +
        "- What are my rights as an employee in the company?\n" +
        "- What are the laws regarding issues with co workers?\n" +
        "- Can I buy shares for Dunder Mifflin as an employee?\n",
        [
          {
            title: "New Laws",
            payload: "NEW_LAWS"
          },
          {
            title: "Employee Rights",
            payload: "EMPLOYEE_RIGHTS"
          },
          {
            title: "Laws",
            payload: "LAWS_CO_WORKERS"
          },
          {
            title: "Buy Shares",
            payload: "BUY_SHARES"
          },
        ])],
    "TRAINING": [Responses.genTextReply("Here are some common Training and Self Improvement questions you can ask:"),
      Responses.genQuickReply(
        "- What are the current training courses available for me?\n" +
        "- What training courses do I require to complete my current tasks?\n" +
        "- What self improvement courses do I need to take to improve my performance metrics?\n",
        [
          {
            title: "Courses available",
            payload: "COURSES_AVAILABLE"
          },
          {
            title: "Prerequisite",
            payload: "PREREQUISITE_TRAINING"
          },
          {
            title: "Improvement Courses",
            payload: "SELF_IMPROVEMENT_COURSES"
          }
        ])],
    "REPORT_STATS": [Responses.genTextReply("Please Upload the sales records that you would like to send"),
      Responses.genQuickReply("The document will be transferred to the manager, David Wallace",
        [
          {
            title: "MENU",
            payload: "MENU"
          }
        ])],
    // "TO_DO_LIST" : Responses.genTextReply
    "VIEW_REMINDERS": Responses.genTextReply("YOU HAVE NO REMINDERS"),
    "NEW_REMINDER": Responses.genWebView(this.uid),
    "VIEW_SCHEDULE": Responses.genTextReply("Ok, Here's your schedule"),
    "VIEW_TRIPS": Responses.genTextReply("OHNO ABRAR HASNT WRITTEN YET.")
  };

}



module.exports = Replies

