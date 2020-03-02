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
    var id = Math.floor( Math.random() * this.replies['RAND_QUOTES'].length );
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

    // https://www.success.com/wp-content/uploads/legacy/sites/default/files/14_14.jpg
    // https://steemitimages.com/DQmPxe2AtmcDXZZPKapjoFAUUG44DEHQSNtgG8Vfx8KtRgA/8_16.jpg
    // https://www.millionfeed.com/wp-content/uploads/2017/09/motivational-quotes-about-strength-success-15051191064k8ng-700x700.jpg
    // https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcajSOcWDQRDPqH4mtRLgi0bdImtoAN1HT8APzFcscrmohX64r
    // https://steemitimages.com/DQmV5e5LjNsVpoovUPfB5QaN66WbMLZkJ1H8bpqpz62XB2C/Success%20quotes%20images%20ideas%20best%20pics%20%20(18)%20(1).jpg

    this.replies["RAND_QUOTES"] = [ 
      "https://www.success.com/wp-content/uploads/legacy/sites/default/files/14_14.jpg",
      "https://steemitimages.com/DQmPxe2AtmcDXZZPKapjoFAUUG44DEHQSNtgG8Vfx8KtRgA/8_16.jpg",
      "https://www.millionfeed.com/wp-content/uploads/2017/09/motivational-quotes-about-strength-success-15051191064k8ng-700x700.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcajSOcWDQRDPqH4mtRLgi0bdImtoAN1HT8APzFcscrmohX64r",
      "https://steemitimages.com/DQmV5e5LjNsVpoovUPfB5QaN66WbMLZkJ1H8bpqpz62XB2C/Success%20quotes%20images%20ideas%20best%20pics%20%20(18)%20(1).jpg"
    ]

    this.replies["BORED"] = [
      Responses.genTextReply("I’ve found something to cheer you up! 😄"),
      Responses.genPictureReply( getRandId(this.replies['RAND_QUOTES']) )
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

