const Responses = require('./response');
const Course = require('./course');

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
       this.replies["VIEW_REMINDERS"] = [
         Responses.genReminders(this.uid, userData.Item['reminders']),
         Responses.genQuickReply(
           "Or change previous reminders",
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
           ])

       ];
    }

    this.replies['HR_POLICIES'] = [
      Responses.genTextReply("You can say something like"),
      Responses.genTextReply("\“I’d like to read the sexual harassment guidelines\”"),
      Responses.genTextReply("and I’ll search the HR handbook and get the relevant information to you!")
    ];

    this.replies['ANNOUNCEMENT'] = [
      Responses.genTextReply("We have delivered a message to every one that you called for a meeting"),
    ];

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
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          },
          {
            title: "Communicate 📝",
            payload: "COMMUNICATE"
          }
        ]
      )
    ];

    this.replies["RAND_OFFICE_FACTS"] = [
      "Tuesday is the most productive day of the week.",
      "Listening to the right music while working helps people get things done faster.",
      "Adults who regularly get 7.5 to 9 hours of sleep per night are up to 20% more productive.",
      "Drinking sufficient amount of water/liquid can increase your daily productivity by 14%.",
      "Workers spend more than 25% of their day in reading and answering emails. If they check emails at set points in the day," + 
      " it will increase their productivity.",
      "Laughter boosts your immune system by enhancing your antibodies (which help fight infections) and increasing your immune cell" +
      " count. This helps reduce your chances of illness and missing out on work.",
      "Organizations with high employee engagement outperform those with low employee engagement by 202%.",
      "70% of employees say that motivation and morale would improve massively with managers saying thank you more.",
      "Worried that office humour will lead to distraction? Studies show increased humour in the workplace does not detract from people’s" + 
      " productivity or their ability to complete tasks that require concentration.",
      "Highly engaged business teams result in 21% greater profitability. ",
      "Monday is the most common sick day. Except in Australia, apparently, where the most common sick day is Tuesday.",
      "In the mid 2000s, the Netherlands became the first industrialized country to drop its work week hours to below 30 hours.",
      "The average office chair with wheels travels about 12.5km per year.",
      "61% of employees are more productive when the dress code is relaxed.",
      "68% of Australian businesses have embraced activity-based working within their workplaces.",
      "Laughter increases blood flow by 22 percent and stress decreases blood flow by 35 percent.",
      "A glimpse of green makes people more creative."
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
      Responses.genTextReply( this.getRandId(this.replies['RAND_OFFICE_FACTS']) ),
      Responses.genPictureReply( this.getRandId(this.replies['RAND_SUCCESS_QUOTES']) ),
      Responses.genQuickReply("What do you want to do next?",
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
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          },
          {
            title: "Communicate 📝",
            payload: "COMMUNICATE"
          }
        ]
      )
    ];

    this.replies["HOLIDAYS"] = [
      Responses.genTextReply("You have " + this.userData.Item['sick_leave'] + " sick days and " + this.userData.Item['holiday_left'] +
                                          " leave days remaining for this year" ),
      Responses.genTextReply("Here is a list of all the holidays for the year" ),
      Responses.genTextReply("- New Year’s Day, January 1st \n\n- Martin Luther King, Jr. Birthday January, 3rd Monday \n\n" + 
                            "- President's Day, February 3rd Monday\n\n- Memorial Day May, Last Monday" ),
      Responses.genTextReply("- Independence Day, July 4th \n\n- Labor Day September, 1st Monday\n\n- Columbus Day October, 2nd Monday"),
      Responses.genTextReply("- Veteran's Day, November\n\n- Thanksgiving Day, 4th Thursday of November\n\n- Day after Thanksgiving, 4th Friday of November"),
      Responses.genTextReply("- Christmas Eve, December 24th\n\n- Christmas December, 25th\n\n- New Year’s Eve, December 31st , half-day"),
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
      Responses.genTextReply("If you Ask for a Live Agent, your conversation will be handed over."),
      Responses.genTextReply("It will take them a while to get back to your queries."),
      Responses.genQuickReply("Note : You wont be able to get back to the bot unless the admin allows you to do so.",
        [
          {
            title: "Ask for Live Agent 👨",
            payload: "LIVE_YES"
          },
          {
            title: "No Thank You",
            payload: "LIVE_NO"
          },
        ]
      )
    ]

    this.replies['LIVE_YES'] = [
      Responses.genTextReply("Your conversation has now been handed over to a live agent"),
      Responses.genTextReply("Make sure to ask your question for them to get notified also, please be patient and wait for them to get back to you."),
    ]
    
    this.replies['LIVE_NO'] = [
      Responses.genQuickReply("What do you want to do next?",
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
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          },
          {
            title: "Communicate 📝",
            payload: "COMMUNICATE"
          }
        ]
      )
    ]
  }


  static replies = {
    "WELCOME_BACK" : [
      Responses.genTextReply("Welcome Back!"),
      Responses.genTextReply("Hope your issue was solved!"),
      Responses.genQuickReply(
        "What do you want to do next?",
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
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          },
          {
            title: "Communicate 📝",
            payload: "COMMUNICATE"
          },
        ]
      )
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
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          },
          {
            title: "Communicate 📝",
            payload: "COMMUNICATE"
          },
        ]
      )],
    "COMMUNICATE" : Responses.genQuickReply("Do you want to report stats/info to manager, make an announcement or ask for a live conversation with the admins?",
        [
          {
            title: "Report stats/info 👩‍💻",
            payload: "REPORT_STATS"
          },
          {
            title: "Announcement 📣",
            payload: "ANNOUNCEMENT"
          },
          {
            title: "Live Chat 👨",
            payload: "LIVE"
          }
        ]
    ),
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
    "COURSES_AVAILABLE" : [Responses.genTextReply("Here is a list of all the courses that you can apply for!!"),
      {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": Course.enrollList()
          }
        }
      },
      Responses.genQuickReply(
        "What would you like to do next?",
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
          ]
        )
    ],
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
    "TRAINING": [
      Responses.genTextReply("Here are some common Training and Self Improvement questions you can ask:"),
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
          ]
        )
      ],
    "REPORT_STATS": [Responses.genTextReply("Please Upload the sales records that you would like to send"),
      Responses.genQuickReply("The document will be transferred to the manager, David Wallace",
        [
          {
            title: "MENU",
            payload: "MENU"
          }
        ])],
    // "TO_DO_LIST" : Responses.genTextReply
    "VIEW_REMINDERS": Responses.genQuickReply(
      "Looks like your schedule is free! You have no reminders.",
      [
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
    "NEW_REMINDER": [
      Responses.genWebView(this.uid),
      Responses.genQuickReply(
        "Or manage other reminders",
        [
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
        ])],
    "VIEW_SCHEDULE": Responses.genTextReply("Ok, Here's your schedule"),
    "VIEW_TRIPS": Responses.genTextReply("OHNO ABRAR HASNT WRITTEN YET.")
  };

  static policy = {
    "MISSION" : [
      Responses.genTextReply("Provide safe, reliable energy with excellent customer service at the lowest reasonable" +
      " cost.")
    ],
    "VISION" : [
      Responses.genTextReply("Enrich our customers’ lives by providing energy services in a safe, reliable," +
        " affordable, sustainable manner while exploring new avenues to benefit our" + 
        " community."),
    ],
    "HARASSMENT" : [
      Responses.genTextReply("We will not tolerate any form of harassment of employees by anyone including" +
      " Supervisors,"),
      Responses.genTextReply("Department Directors, Managers, other employees, or customers."),
      Responses.genTextReply("We are committed to providing a workplace free of sexual harassment as well as" +
      " harassment based upon such factors as race, color, religion, sex, national origin "),
      Responses.genTextReply("ancestry, age, medical condition, sexual orientation, gender identity or expression," +
      " marital status, disability, "),
      Responses.genTextReply("or veteran status. we strongly disapproves of, and will not" +
      " tolerate, harassment of employees by Supervisors, Department Directors, Managers, or" + 
      " co-workers."),
      Responses.genTextReply("we will also attempt to protect employees from harassment by non-" + 
      " employees in the workplace."),
    ],
    "TRAINING_COURSES" : [
      Responses.genTextReply("All employees will follow us’ Travel Policy and Procedures for the payment and/or" +
      " reimbursement "),
      Responses.genTextReply("of expenses as it relates to attending external seminars, workshops and" +
      " training courses."),
      Responses.genTextReply("Employees who are required to attend any work-related seminar," +
      " training session, workshop, etc. "),
      Responses.genTextReply("must receive prior written approval from their" + 
      " Department Director, who will inform the "),
      Responses.genTextReply("Human Resources Supervisor if an employee"+ 
      " must leave before the program is over."),
    ],
    "ETHICS" : [
      Responses.genTextReply("The Utility Board of the City of Key West d/b/a our Energy Services has" + 
      " adopted "),
      Responses.genTextReply("a Code of Ethics for its employees. This Code of Ethics is substantially similar to" +
      " the Code of Ethics adopted by "),
      Responses.genTextReply("the State of Florida for state, county, and city elected" +
      "officials, officers and employees."),
    ],
    "CUSTOMER_RELATIONS" : [
      Responses.genTextReply("Each employee is our representative. Whether dealing in person, on the telephone," +
      " or by mail (electronic or via USPS) "),
      Responses.genTextReply("the customers’ and the public’s impression of us is" +
      " the impression given by each employee interaction."),
      Responses.genTextReply("As our representative, an"+
      " employee should be courteous and maintain a business-like manner "),
      Responses.genTextReply("whenever dealing" + 
      " with customers, the public, or fellow employees."),
    ],
    "UNIFORMS" : [
      Responses.genTextReply("Personal appearance is a powerful business tool. A neat professional appearance is a" +
      " requirement."),
      Responses.genTextReply("It is expected that all employees will exercise good judgment and dress" + 
      " appropriately for their jobs and not constitute a safety hazard."),
      Responses.genTextReply("Interpretation of this code will be left up to the Department Director."),
    ],
    "REHABILITATION" : [
      Responses.genTextReply("Any employee who has a drug or alcohol dependency problem who voluntarily," +
      " before an incident occurs that results in a drug "),
      Responses.genTextReply("and/or alcohol test, brings it to" + 
      " the attention of his/her Supervisor, Department Director or the Director of HR & Communications, may be allowed to enter and"),
      Responses.genTextReply(" complete an appropriate  rehabilitation program approved by us at the employee's own expense."),
    ],
    "PARKING" : [
      Responses.genTextReply("We provides parking for its employees and assigns parking spaces to all employees" +
      " working in its Service Building."),
      Responses.genTextReply("If our employee parking lot is full, employees must find alternate parking at their own expense."),
      Responses.genTextReply("Employees may not park on any of our property unless designated for employee parking employees as needed."),
    ],
    "DISCRIMINATION" : [
      Responses.genTextReply("We will post all notices required by state, federal or local law relating to discrimination." +
      "Exceptions that apply to many federal"),
      Responses.genTextReply(" and state discrimination laws include those for bona fide occupational qualifications, bona fide seniority" +
      " systems, employee benefit"),
      Responses.genTextReply(" plans, or merit systems (provided that these differences are not a result of an intention to unlawfully discriminate)."),
    ],
    "MEDICAL" : [
      Responses.genTextReply("It is the policy of ours to grant up to 12 weeks of family and medical leave during any" +
      " 12-month period to eligible employees, in accordance with the Family and Medical Leave"),
      Responses.genTextReply("Act of 1993 (FMLA) and amendments thereof, and up to 26 weeks of leave in any 12-month period in compliance" + 
      " with the expansion of FMLA under The Support for Injured Servicemembers Act of 2007."),
    ],
    "LEAVE" : [
      Responses.genTextReply("An employee requesting FMLA leave must complete an \“Application for Family and Medical Leave Request Form\”" + 
      " from the Human Resources office."),
      Responses.genTextReply("The completed application must state the reason for the leave, the expected/requested" + 
      " duration of the leave, and the starting and expected ending dates of the leave."),
      Responses.genTextReply("Following receipt of a leave request, we will notify an employee about whether the requested leave" + 
      " has been approved and the terms for the leave on an \“Employer Response to Employee Request for Family and Medical Leave\” form."),
    ],
    "TAX" : [
      Responses.genTextReply("When a garnishment or tax levy is served on us, the employee shall be contacted by the HR & Communications Office"),
      Responses.genTextReply("or other individual to whom the responsibility has been delegated. The employee shall be asked to try to" + 
      " make an arrangement with the creditor or tax agency"),
      Responses.genTextReply(" is to make direct payments to satisfy the indebtedness. If an agreement is reached, the employee must" + 
      " ask the creditor to issue a written release to us."),
    ],
    "PAY" : [
      Responses.genTextReply("Advance payment of earned wages or salaries may be made in an emergency or" +
              " when an employee's regular payday falls within his or her vacation period or leave of absence."),
      Responses.genTextReply("Except in cases of emergency, requests for advance payment of wages or salaries must be made at" +
      " least two weeks in advance. Such requests must be initiated by the Supervisor."),
      Responses.genTextReply("Employees will be paid by direct deposit to the financial institution(s) of their choice."),
      Responses.genTextReply("A paycheck will only be issued in cases of pending direct deposit pre-note, resulting from" + 
      " initial direct deposit set up or subsequent bank/deposit account change."),
      Responses.genTextReply("Paychecks that employees do not claim within two (2) weeks of the date of issue must be returned to the payroll section."),
      Responses.genTextReply("Employees should report checks lost or otherwise missing to the payroll section" + 
            " immediately so a stop-payment order may be initiated."),
      Responses.genTextReply("The Accounting & Analysis Supervisor will determine when and if a new check should be issued to replace a" +
            " lost or missing check."),
      Responses.genTextReply("Employees will cash paychecks on their personal time"),
      Responses.genTextReply("Payday is every other Friday (bi-weekly) unless otherwise specified by Management."),
    ],
    "PRIVACY" : [
      Responses.genTextReply("we respect the privacy of its employees; however, as a public entity, we must comply with Florida's Public Records Law."),
      Responses.genTextReply("If a request is made for information from an employee’s personnel file, we must comply; however,"),
      Responses.genTextReply("if time permits, Human Resources will attempt to contact the employee to advise them of said request."),
    ],
    "SMOKING" : [
      Responses.genTextReply("We have a non-smoking, nicotine/tobacco-free campus. No smoking or nicotine/tobacco products are allowed on our’" +
      " properties, or in its buildings or vehicles."),
      Responses.genTextReply("Nicotine/tobacco products include cigarettes, cigars, e-cigarettes, vaporizers, chewing tobacco, snuff," + 
      " and any other similar products."),
      Responses.genTextReply("Smoking is not permitted in any public building."),
    ],
    "PERFORMANCE" : [
      Responses.genTextReply("Positive Performance Coaching steps will always be used when trying to correct a performance problem."),
      Responses.genTextReply("However, employees who do not correct their deficiencies after being counseled may be disciplined up" + 
      " to and including termination for poor job performance"),
    ],
    "MISCONDUCT" : [
      Responses.genTextReply("Employees may be disciplined up to and including termination for misconduct"),
    ],
    "ATTENDANCE" : [
      Responses.genTextReply("In addition to the rules stated above, employees may be disciplined up to and including termination for" + 
      " failing to observe the companies policies"),
    ],
     "SUSPENSION:" : [
      Responses.genTextReply("An employee may be suspended with or without pay as a disciplinary action. Following" +
                            " an Administrative Review Hearing the General Manager & CEO"),
      Responses.genTextReply("will take into consideration any recommendations made by Supervisors, Directors and/or the Director of HR & Communications"),
      Responses.genTextReply(" as well as taking into consideration the employees personnel records, including past disciplinary actions."),
      Responses.genTextReply("Depending on the seriousness of the reason(s), an employee can be suspended with or without pay until" +
                            " the Administrative Review hearing is held and the outcome is determined."),
    ],
    "TERMINATION" : [
      Responses.genTextReply("We will consider an employee to have voluntarily terminated his or her employment if an employee fails to follow the" + 
      " companies policies"),
    ],  
    "TRAVEL" : [
      Responses.genTextReply("The most current travel policy can be located in each department by seeing the Department Staff"),
      Responses.genTextReply(" Assistant and/or the HR & Communications Office. Any employee traveling on our business must follow our Travel Policy"),
    ],
    "COMPENSATION" : [
      Responses.genTextReply("All employees of ours are covered by Workers’ Compensation Insurance in the event of injuries or accidents while at work."),
      Responses.genTextReply("This insurance provides for compensation for medical expenses and for a percentage of wages lost due to accidents or illnesses" +
      " occurring while you are on the job."),
    ],
    "VIOLENCE" : [
      Responses.genTextReply("Our policy is to strive to maintain a work environment free from intimidation, threats, or violent acts."),
      Responses.genTextReply("This includes, but is not limited to, intimidating, threatening or hostile behaviors, physical abuse, vandalism," + 
                " arson, sabotage, use of weapons,"),
      Responses.genTextReply(" carrying weapons onto our property, or any other act, which, in Management’s opinion, is inappropriate to the workplace."),
      Responses.genTextReply("In addition, offensive comments regarding violent events and/or behavior are not tolerated."),
    ]     
  };

}



module.exports = Replies

