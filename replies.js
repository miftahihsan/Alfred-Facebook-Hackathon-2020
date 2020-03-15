const Responses = require('./response');
const Course = require('./course');

class Replies {

  static userData = {};
  static uid= 0;

  static setUID(uid){
    this.replies["NEW_REMINDER"] = Responses.genWebView(uid);
    this.replies["COMPLAINT"] = [
      Responses.genTextReply("Remember, your complaints/reports are completely anonymous."),
        Responses.genTextReply("Only I’ll know that you’ve submitted this complaint and no one else, not even your superiors! 🤫"),
      Responses.genComplaintForm(uid)
    ];

    // then change the state to COMPLAINT_MODE


    this.uid = uid;
  }

  static randomNumber(limit){
    return Math.floor( Math.random() * limit );
  }

  static supportTicketGenerator(){
    var ticket = "";
    var limit = 10;
    for(var i = 0; i < limit; i++){
      ticket += this.randomNumber(limit - 1);
    }
    return ticket;
  }

  static button = {
    // "btn" : Responses.genTextReply("BLA")
    "MENU_BTN" : [
      {
        "type": "postback",
        "title": "Administrative tasks 👩‍💼",
        "payload": "ADMINISTRATIVE_TASKS"
      },
      {
        "type": "postback",
        "title": "Personal tasks 📓",
        "payload": "PERSONAL_TASKS"
      },
      {
        "type": "postback",
        "title": "What do you do ❓",
        "payload": "WHAT_CAN_YOU_DO"
       }
    ],
    "PERSONAL_TASKS_BTN" : [
        {
          title: "Meetings/Reminders 📅",
          payload: "SCHEDULES"
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
          title: "I'm bored! 🙍‍♂️",
          payload: "BORED"
        }
    ],
    "SCHEDULES_BTN" : [
      {
        title: "Set-up Meeting 📣",
        payload: "ANNOUNCEMENT_WHO"
      },
      {
        title: "View Meeting 📆",
        payload: "VIEW_SCHEDULE"
      }, 
      {
        title: "Create Reminder 🗒",
        payload: "NEW_REMINDER"
      },
      {
        title: "View Reminders 📝",
        payload: "VIEW_REMINDERS"
      },
    ],
    "ADMINISTRATIVE_BTN" : [
      {
        title: "Report stats/info 👩‍💻",
        payload: "REPORT_STATS"
      },
      {
        title : "Submit a complaint 😕" ,
        payload: "COMPLAINT"
      },
      {
        title : "Knowledge 🧠" ,
        payload: "KNOWLEDGE"
      },
    ],
    "TRAINING_BTN" : [
      {
        title: "Courses available 📚",
        payload: "COURSES_AVAILABLE"
      },
      {
        title: "Courses required 🙇‍♂️",
        payload: "PREREQUISITE_TRAINING"
      },
      {
        title: "Improvement Courses 🏋️‍♂️",
        payload: "SELF_IMPROVEMENT_COURSES"
      }
    ],
    "IT_BTN" : [
      {
        title: "Credentials ? 🔑",
        payload: "USER_NAME_PASSWORD"
      },
      {
        title: "Can't login 👨‍💻",
        payload: "CANT_LOGIN"
      },
      {
        title: "Faulty equipment ⚡",
        payload: "EQUIPMENT_NOT_WORKING"
      },
      {
        title: "No Network! 🌐",
        payload: "NO_NETWORK"
      }
    ],

    "CORPORATE_LAW_BTN" : [
        {
          title: "New Laws ⚖️",
          payload: "NEW_LAWS"
        },
        {
          title: "Employee Rights 🤜",
          payload: "EMPLOYEE_RIGHTS"
        },
        {
          title: "Laws ⚖️",
          payload: "LAWS_CO_WORKERS"
        },
        {
          title: "Buy Shares 📈",
          payload: "BUY_SHARES"
        },
    ]

  };

  static setInitiate(userData){
    this.replies["INITIATE"] = [Responses.genTextReply("Hi "+userData['name']+" ! "),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of ABC company."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Company's employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n"),
     Responses.genTextReply("\u2022 You can swipe up from the bottom of the chat to go to the menu.\n\n\u2022 From there Click on Administrative tasks button to Submit a Complaint, know about Company Policies and Training Courses, Submit Stats to your manager and more.\n\n\u2022 Click on the Personal tasks button to Setup/View Meetings and Reminders, Ask about Holidays,Pay and Bonuses, see your Performance Stats and more.",
        this.button["MENU_BTN"]
      ),
    ];
  }

  static getRandId(list){
    var id = Math.floor( Math.random() * list.length );
    //console.log("id============================================= " + id);
    //console.log("id============================================= " + list[id]);
    return list[id];
  }

  static setUserData(userData){
    this.userData = userData;
    if ('reminders' in userData.Item){
       this.replies["VIEW_REMINDERS"] = [Responses.genReminders(userData.Item['uid'], userData.Item['reminders']),
         Responses.genQuickReply(
           "You can create and manage multiple reminder lists",
           [
            {
              title: "View Reminders 📝",
              payload: "VIEW_REMINDERS"
            },
            {
              title: "Set-up Meeting 📣",
              payload: "ANNOUNCEMENT_WHO"
            },
            {
              title: "Create Reminder 🗒",
              payload: "NEW_REMINDER"
            },
            {
              title: "View Meeting 📆",
              payload: "VIEW_SCHEDULE"
            }
          ])];
    }
    else {
      this.replies["VIEW_REMINDERS"] = [
        Responses.genTextReply("I didn't find any reminders! Tap create reminder to create one:) "),
        Responses.genQuickReply(
          "",
          [
            {
              title: "View Reminders 📝",
              payload: "VIEW_REMINDERS"
            },
            {
              title: "Set-up Meeting 📣",
              payload: "ANNOUNCEMENT_WHO"
            },
            {
              title: "Create Reminder 🗒",
              payload: "NEW_REMINDER"
            },
            {
              title: "View Meetings 📆",
              payload: "VIEW_SCHEDULE"
            }
          ])

    ]
    }


    this.replies['HR_POLICIES'] = [
      Responses.genTextReply("Here are the policies you can ask me about: "),
      Responses.genTextReply("\“company health insurance, customer relations or ethics policies\”"),
      Responses.genTextReply("\“policies against workplace violence, discrimination or sexual harassment\”"),
      Responses.genTextReply("\“Employee Termination or Suspension policies\”"),
      Responses.genTextReply("\“Employee Privacy policies\”"),
      Responses.genTextReply("\“Policies for admitting employees into rehab\”"),
      Responses.genTextReply("Or You can ask me these questions any time simply by saying for instance \"What are the sexual harassment guidelines?\""),
      Responses.genTextReply("I’ll search the HR handbook and get the relevant information to you!")
    ];

    this.replies['TIME_11:00_AM'] = [
      Responses.genQuickReply("We have delivered a message to every one that you called for a meeting",
        this.button["SCHEDULES_BTN"]
      ),
    ];
    this.replies['TIME_1:00_PM'] = [
      Responses.genQuickReply("We have delivered a message to every one that you called for a meeting",
        this.button["SCHEDULES_BTN"]
      ),
    ];
    this.replies['TIME_3:30_PM'] = [
      Responses.genQuickReply("We have delivered a message to every one that you called for a meeting",
        this.button["SCHEDULES_BTN"]
      ),
    ];

    this.replies['ANNOUNCEMENT_TIME'] = [Responses.genTextReply("Select a time from below"),
      Responses.genQuickReply("Or type in your preferred time",
      [
        {
          title: "11:00-AM",
          payload: "TIME_11:00_AM"
        },
        {
          title: "1:00-PM",
          payload: "TIME_1:00_PM"
        },
        {
          title: "3:30-PM",
          payload: "TIME_3:30_PM"
        },
      ]),
    ];

    this.replies['ANNOUNCEMENT_WHO'] = [
      Responses.genQuickReply("With whom should I setup the meeting with?",
       [
        {
          title: "Team",
          payload: "ANNOUNCEMENT_TIME"
        },
        {
          title: "Branch",
          payload: "ANNOUNCEMENT_TIME"
        },
        {
          title: "Department",
          payload: "ANNOUNCEMENT_TIME"
        }])];

    this.replies["INITIATE"] = [Responses.genTextReply("Hi "+userData['name']+" ! "),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of ABC company."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the company's employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n"),
      Responses.genTextReply("\u2022 You can swipe up from the bottom of the chat to go to the menu.\n\n\u2022 From there Click on Administrative tasks button to Submit a Complaint, know about Company Policies and Training Courses, Submit Stats to your manager and more.\n\n\u2022 Click on the Personal tasks button to Setup/View Meetings and Reminders, Ask about Holidays,Pay and Bonuses, see your Performance Stats and more.",
        this.button["MENU_BTN"]
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
      "https://scontent.fdac6-1.fna.fbcdn.net/v/t1.0-9/88237137_2807387819336875_4966096484786241536_n.jpg?_nc_cat=1&_nc_sid=110474&_" + 
      "nc_eui2=AeEhTZSydBvlNAegxlKq4zkWKVfIPCpJONAmQ8gngjmiQl6hpdTlddIbn84FDFfQhHN8SIt7BfeUI0GnKCvd0YqRA_jEmmJrDeg6QjCNtTq_Yg&_nc_ohc=tG" + 
      "iQOCAxUUwAX_WRB7p&_nc_ht=scontent.fdac6-1.fna&oh=cb684a2834587f11afb68c2169914cea&oe=5E916A69",

      "https://scontent.fdac6-1.fna.fbcdn.net/v/t1.0-9/88097439_2805536576188666_8486403026645417984_n.jpg?_nc_cat=104&_nc_sid=110474&_nc" + 
      "_eui2=AeHHl7CW836UIjnrmVFEYaeQpTIE2oDHVq1rQwYzCwvHXoSEq59JybdX6_A-SSe2dBp_2iaCJrXA6KUWlUyza6GD0YsTVsvUBOlq011teeopsw&_nc_ohc=MGJA9V3-" + 
      "mQwAX9gtSG-&_nc_ht=scontent.fdac6-1.fna&oh=a050faa66402bba276ecd284adb73623&oe=5E91D9F8",

      "https://scontent.fdac6-1.fna.fbcdn.net/v/t1.0-9/88993058_2800732466669077_6515014253257162752_n.jpg?_nc_cat=106&_nc_sid=110474&_nc_eui2=" + 
      "AeHMjKcWtrXmqk1pFzJ6AeFUrqda28rZhPtEGCA4ngf-vRDQqs7nA3a-LfL5tdX4GeMs4MxcUHtevHFvKbsaTL9tN5DW-0-VajGBJ76iY69n5A&_nc_ohc=7vYV_KgWeBoAX-RZyrd&" + 
      "_nc_ht=scontent.fdac6-1.fna&oh=1cb86e6e75532a22fa0ed5384d6ee81b&oe=5E96E8EF",

      "https://scontent.fdac6-1.fna.fbcdn.net/v/t1.0-9/87790368_2794587080616949_855643337464479744_n.jpg?_nc_cat=100&_nc_sid=110474&_nc_eui2=AeFE" + 
      "bBUROqvQknOXMkROc2ri231EJpb8Od19wDozr6tlAp4dQgFxWQE3JQ2Bsbjb8FoNHj-mBIGqtQTmjul07LD-RLZl5F50lzGDN2PUH_Y6lg&_nc_ohc=dLxiLMAzYJwAX99xf1P&_nc_ht" + 
      "=scontent.fdac6-1.fna&oh=e8c7c4c689a622b2b45ad6b5c7c43840&oe=5E921661",

      "https://scontent.fdac6-1.fna.fbcdn.net/v/t1.0-9/87476203_2790068917735432_2792994774204809216_n.jpg?_nc_cat=108&_nc_sid=110474&_nc_eui2=AeEjGL" + 
      "9O0KsS45fIw2ytUXNjBBJu4HrWXesgUUCfItfR11m9O3SzEqK7kpT0CqW4n8k55MzHRFprieVOboRX70LTLWLJqgFxeFoHZkAvBtkGQA&_nc_ohc=RGNC2NOxYb0AX_nQQqQ&_nc_ht=scont" + 
      "ent.fdac6-1.fna&oh=8ad1f5978bcc45691c949d468ade22b4&oe=5E941644",

      "https://scontent.fdac6-1.fna.fbcdn.net/v/t1.0-9/88000342_10158141199968506_3207240719181807616_o.jpg?_nc_cat=101&_nc_sid=1480c5&_nc_eui2=AeFx19Kg" + 
      "8xZvAel_VOpqJcdGENicyrFNIqe75wOKSIHiIfqHReRYj1vJYTC0VD3273ACP9s59N2evef4dDuptbHVCYFYp5rQ12834yTEqhcVmA&_nc_ohc=wvoTYkWryQAAX-AMbwY&_nc_ht=scontent." +
      "fdac6-1.fna&oh=21299a8cd260748a5fcc33a3cb1286d0&oe=5E9833CB"
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
        this.button["PERSONAL_TASKS_BTN"]
      )
    ];

    this.replies["PERSONAL_TASKS"] = [
      Responses.genQuickReply("What would you like to do?",
        this.button["PERSONAL_TASKS_BTN"]
      )
    ];   

    this.replies["ADMINISTRATIVE_TASKS"] = [
      Responses.genQuickReply("What would you like to do?",
      [
        {
          title: "Report stats/info 👩‍💻",
          payload: "REPORT_STATS"
        },
        {
          title : "Submit a complaint 😕" ,
          payload: "COMPLAINT"
        },
        {
          title : "Knowledge 🧠" ,
          payload: "KNOWLEDGE"
        },
      ])
    ];

    this.replies["KNOWLEDGE"] = [
      Responses.genQuickReply("What do you want to know about?",
      [
        {
          title: "Company policies 🤔",
          payload: "HR_POLICIES"
        },
        {
          title: "Training 🏋️‍♂️",
          payload: "TRAINING"
        },
        {
          title: "IT and Tech 🖥️",
          payload: "IT_TECH"
        },
        {
          title: "Corporate Law 👨‍⚖️",
          payload: "CORPORATE_LAW"
        },
      ])
    ];

    this.replies["HOLIDAYS_ASK_FOR_TIME"] = [
      Responses.genTextReply("When do you want to take your leave?")
    ];

    this.replies["HOLIDAYS_APPLY"] = [
      Responses.genQuickReply("I've submitted your application to the HR department! 😀",
      this.button["PERSONAL_TASKS_BTN"]
      )
    ];

    this.replies["HOLIDAYS"] = [
      Responses.genTextReply("You have " + this.userData.Item['sick_leave'] + " sick days and " + this.userData.Item['holiday_left'] +
                                          " leave days remaining for this year" ),
      Responses.genTextReply("Here are a few upcoming holidays:" ),
      Responses.genTextReply("\u2022 Memorial Day May, Last Monday\n\n\u2022 Independence Day, July 4th \n\n\u2022 Labor Day September, 1st Monday" ),
      Responses.genQuickReply("You can apply for a leave at any time just by saying “Apply for a leave from 30 March to 30 April”!",
        this.button["PERSONAL_TASKS_BTN"]
      )
    ];

    this.replies['BONUS_QUERIES'] = [
      Responses.genTextReply("I’ll list your remaining bonuses for this year below. Have a look! "),
      Responses.genQuickReply("\u2022 Christmas: "+this.userData.Item["holiday_bonus"]+"\n" +
        "\u2022 Sales Bonus: "+this.userData.Item['bonus']+"",
          this.button["PERSONAL_TASKS_BTN"]
        )
    ];

    this.replies['BONUS_PAYMENTS'] = [
      Responses.genTextReply("I’ll list your remaining bonuses for this year below. Have a look! "),
      Responses.genTextReply("\u2022 Christmas: "+this.userData.Item["holiday_bonus"]+"\n" +
                             "\u2022 Sales Bonus: "+this.userData.Item['bonus']+""),
      Responses.genTextReply("You have "+this.userData.Item['due_salary']+" monthly salary payments left this year."),
      Responses.genQuickReply("You can directly ask about payments and bonuses simply by asking" + 
                              "\“How much bonuses am i entitled to this year?\” or \"How much do I get this year in salaries?\"",
      
        this.button["PERSONAL_TASKS_BTN"]                            
      )
    ];

    this.replies['SALARIES'] = [
      Responses.genTextReply("You have "+this.userData.Item['due_salary']+" monthly salary payments left this year."),
      Responses.genQuickReply("You can directly ask about payments and bonuses simply by asking" +
                              "\“How much bonuses am i entitled to this year?\” or \"How much do I get this year in salaries?\"",
      
        this.button["PERSONAL_TASKS_BTN"]
                              
      )
    ];

    this.replies["PERFORMANCE_STATS"] = [
      Responses.genTextReply("You’ve made "+this.userData.Item['sales_made']+" sales this month, generating $20,000 in company revenue!"),
      Responses.genTextReply("You’ve crossed the minimum required sales target for this quarter, increasing this year’s bonus to " + 
                              this.userData.Item['bonus']+"!!"),
      Responses.genPictureReply("https://s3-us-west-2.amazonaws.com/www.whitewall.site/bizbotteuxdeux/assets/eye_heart_emoji.png?fbcl"+
      "id=IwAR3rLcb3hHj9gjTghpWjO8o3EAZI7L6Ub12Z7nb0RgfJtoYsxvlD4LThr1M"),
      Responses.genQuickReply("Great job!! 👏👏",
        this.button["PERSONAL_TASKS_BTN"]
      )
    ];

    this.replies["USER_NAME_PASSWORD"] = [
      Responses.genTextReply("I've sent a token to the IT department regarding your issue : Username and password"),
      Responses.genTextReply("They will be in contact with you very shortly"),
      Responses.genQuickReply("Support Ticket Issued : " + this.supportTicketGenerator() , 
        this.button["IT_BTN"]
      ),
    ],
    this.replies["CANT_LOGIN"] = [
      Responses.genTextReply("I've sent a token to the IT department regarding your issue : Can't login"),
      Responses.genTextReply("They will be in contact with you very shortly"),
      Responses.genQuickReply("Support Ticket Issued : " + this.supportTicketGenerator() , 
        this.button["IT_BTN"]
      ),
    ],
    this.replies["EQUIPMENT_NOT_WORKING"] = [
      Responses.genTextReply("I've sent a token to the IT department regarding your issue : Faulty equipment"),
      Responses.genTextReply("They will be in contact with you very shortly"),
      Responses.genQuickReply("Support Ticket Issued : " + this.supportTicketGenerator() , 
        this.button["IT_BTN"]
      ),
    ],
    this.replies["NO_NETWORK"] = [
      Responses.genTextReply("I've sent a token to the IT department regarding your issue : No Network!"),
      Responses.genTextReply("They will be in contact with you very shortly"),
      Responses.genQuickReply("Support Ticket Issued : " + this.supportTicketGenerator() , 
        this.button["IT_BTN"]
      ),
    ],

    /*this.replies["COMPLAINT"] = [
      Responses.genTextReply("Remember, your complaints/reports are completely anonymous." +
      "Only I’ll know that you’ve submitted this complaint and no one else, not even your superiors! 🤫"),
      Responses.genQuickReply("Who's the complaint against",
      [
        {
          title: "Employee 👨",
          payload: "COMPLAINT_EMPLOYEE"
        },
        {
          title: "Department 🏢",
          payload: "COMPLAINT_DPT"
        },
      ])
    ];*/

    this.replies["COMPLAINT"] = [
      Responses.genTextReply("Remember, your complaints/reports are completely anonymous." +
      "Only I’ll know that you’ve submitted this complaint and no one else, not even your superiors! 🤫"),
      Responses.genQuickReply("Who's the complaint against",
      [
        {
          title: "Employee 👨",
          payload: "COMPLAINT_EMPLOYEE"
        },
        {
          title: "Department 🏢",
          payload: "COMPLAINT_DPT"
        },
      ])
    ];

    // then change the state to COMPLAINT_MODE



    this.replies["COMPLAINT_INSTRUCTION"] = [
      Responses.genTextReply("Ok! Tell me what the complaint is. Just say \"Done\", when you're done with the complaint!"),
    ];

    this.replies["LIVE_CHAT"] = [
      Responses.genTextReply("If you Ask for a Live Agent, your conversation will be handed over to a real human."),
      Responses.genTextReply("It may take a while for a human to get to your queries."),
      Responses.genQuickReply("Note : You wont be able to communicate with the bot (aka me) via text unless the admin allows you to do so.",
        [
          {
            title: "Ask for Live Agent 👨",
            payload: "LIVE_YES"
          },
          {
            title: "No Thank You! ❌",
            payload: "LIVE_NO"
          },
        ]
      )
    ];

    this.replies['LIVE_YES'] = [
      Responses.genTextReply("Your conversation has now been handed over to a live agent"),
      Responses.genTextReply("Make sure to ask your question for them to get notified. They won't respond as fast as I do, so please be patient and wait for them to get back to you. "),
    ];
    
    this.replies['LIVE_NO'] = [
      Responses.genQuickReply("What do you want to do next?",
        this.button["MENU_BTN"]
      )
    ];
  }

  static replies = {
    "newpayloadforbutton" : [
      this.button['btn']
    ],

    "COMPLAINT_SUCCESS" : [
      Responses.genPictureReply("https://media.giphy.com/media/ngrHy21B4yfZK/200w_d.gif"),
      Responses.genTextReply("I'm sorry you had to go through that unpleasant experience."),
      Responses.genQuickReply("I've logged your complaint successfully. It'll be processed as soon as possible! 😃",
        this.button["ADMINISTRATIVE_BTN"]
      )
    ],
    "LIVE_MODE" : [
      Responses.genTextReply("You are currently in live mode. Please be patient while and wait for the admin to get back to you 😀.")
    ],
    "WELCOME_BACK" : [
      Responses.genTextReply("Welcome Back!"),
      Responses.genTextReply("Hope your issue was solved!"),
      Responses.genQuickReply(
        "What do you want to do next?",
        this.button["MENU_BTN"]
      )
    ],
    "INITIATE": [Responses.genTextReply("Hi There!"),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of ABC company."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the company employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n")
    ],
    "WHAT_CAN_YOU_DO": [Responses.genTextReply("Hi!"),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of ABC company."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("\u2022 You can swipe up from the bottom of the chat to go to the menu.\n\n\u2022 From there Click on Administrative tasks button to Submit a Complaint, know about Company Policies and Training Courses, Submit Stats to your manager and more.\n\n\u2022 Click on the Personal tasks button to Setup/View Meetings and Reminders, Ask about Holidays,Pay and Bonuses, see your Performance Stats and more."),
      Responses.genQuickReply(
        "If you are still confused and want to know more, I can connect you to a human agent",
        [{
          title: "Live Chat 👨",
          payload: "LIVE_CHAT"
        },
        {
          title: "No Thank You! ❌",
          payload: "LIVE_NO"
        },]
      )
    ],
    "MENU": [
      Responses.genQuickReply("What do you want to do next?",
        [
          {
            title: "HR tasks 👔",
            payload: "HR"
          },
          {
            title: "Meeting/List 📅",
            payload: "SCHEDULES"
          },
          {
            title: "Communicate 📝",
            payload: "COMMUNICATE"
          },
          {
            title: "Info 📚",
            payload: "FAQ"
          },
          {
            title: "I'm bored! 🙍‍♂️",
            payload: "BORED"
          }

        ]
      )
    ],
    "COMMUNICATE" : Responses.genQuickReply("Would you like to report stats/info to manager or ask for a live conversation with the admins?",
        [
          {
            title: "Report stats/info 👩‍💻",
            payload: "REPORT_STATS"
          },
          {
            title: "Live Chat 👨",
            payload: "LIVE_CHAT"
          }
        ]
    ),
    "HR": [Responses.genTextReply("Ok! What do you want to know about: "),
      Responses.genTextReply( "\u2022 HR company policy\n\n" +
        "\u2022 Your performance stats\n\n" +
        "\u2022 Sick days/holidays\n\n"),
      Responses.genQuickReply("\u2022 Bonus and payments\n\n" +
      "\u2022 Submit a complaint",
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
      ])],
    "SCHEDULES": Responses.genQuickReply(
      "Would you like to work with your lists," +
      " make a new list, view/manage your calendar",
        this.button["SCHEDULES_BTN"]
      ),
    "FAQ": Responses.genQuickReply("Great! What do you want to know about?",
      [
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
    "SELF_IMPROVEMENT_COURSES" : [
      Responses.genTextReply("Here is a list of all the courses that you can apply for!!"),
      {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": Course.selfImprovement()
          }
        }
      },
      Responses.genQuickReply(
        "What would you like to do next?",
          this.button["TRAINING_BTN"]
      )
    ],
    "COURSES_AVAILABLE" : [
      Responses.genTextReply("Here is a list of all the courses that you can apply for!!"),
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
          this.button["TRAINING_BTN"]
      )
    ],
    "PREREQUISITE_TRAINING" : [
      Responses.genTextReply("Here is a list of all the courses that you can apply for!!"),
      {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": Course.preReq()
          }
        }
      },
      Responses.genQuickReply(
        "What would you like to do next?",
          this.button["TRAINING_BTN"]
      )
    ],
    "IT_TECH": [Responses.genTextReply("Here are some common IT concerns you can ask about:"),
      Responses.genTextReply("\u2022 What's my username and password?\n\n" +
        "\u2022 I can't login to my account"),
      Responses.genQuickReply("\u2022 My office equipment isn’t working\n\n" +
        "\u2022 My office equipment doesn't have network connectivity",
          this.button["IT_BTN"]
        )],
    "HEALTH_INSURANCE" : [
      Responses.genTextReply("The company has a wide variety of health insurance packages to choose from."),
      Responses.genTextReply("All employees here are covered by the default insurance."),
      Responses.genQuickReply("However you may choose to change your health insurance any time.",
      [
        {
          title: "Health insurance 🏥",
          payload: "HEALTH_INSURANCE"
        },
        {
          title: "Paid vacation 🏖️",
          payload: "BONUS"
        },
        {
          title: "Rules for fines 🧾",
          payload: "FINE_RULES"
        },
        {
          title: "Increment 💰",
          payload: "INCREMENT"
        },
      ]),
    ],
    "FINE_RULES" : [
      Responses.genQuickReply("As of now we do not have any policy to fine employees.",
      [
        {
          title: "Health insurance 🏥",
          payload: "HEALTH_INSURANCE"
        },
        {
          title: "Paid vacation 🏖️",
          payload: "BONUS"
        },
        {
          title: "Rules for fines 🧾",
          payload: "FINE_RULES"
        },
        {
          title: "Increment 💰",
          payload: "INCREMENT"
        },
      ]),
    ],
    "INCREMENT" : [
      Responses.genTextReply("Performance Ratings as a Criteria: Increments will be linked to individual performances." + 
      "The most ideal /common method of assessing the performance of each individual is Categorization:"),
      Responses.genTextReply("A, B, C, D, E or 1, 2, 3, 4, 5 on a scale of 1(Lowest) -> 5(Highest) or 1(Lowest) -> 10 (Highest)"),
      Responses.genTextReply("In both the above A is highest & 5 is Highest (Outstanding or Excellent Performance category) & E & 1 are the least (Poor Performers)"),
      Responses.genTextReply("Candidates who are assessed as Outstanding / Excellent fall under͞Consistently Exceeds Expectations Category."+
      "Such employees qualify for Recognition & Rewards & Poor Performers fall under ͞Below Expectations category."),
      Responses.genQuickReply("The above recommended policy is a guideline as such the same is subject to review /change from time to time.",
      [
        {
          title: "Health insurance 🏥",
          payload: "HEALTH_INSURANCE"
        },
        {
          title: "Paid vacation 🏖️",
          payload: "BONUS"
        },
        {
          title: "Rules for fines 🧾",
          payload: "FINE_RULES"
        },
        {
          title: "Increment 💰",
          payload: "INCREMENT"
        },
      ]),
    ],
    "BONUS" : [
      Responses.genTextReply("Employees who take FMLA leave will not lose any previous accrued seniority or employment benefits" + 
      " (including the longevity bonus, safety incentive, and holiday pay), and those benefits will continue to accrue during the FMLA leave."),
      Responses.genTextReply("Leave accruals will be based according to the Management Handbook and/or our Contract."),
      Responses.genTextReply("If an employee fails to return to work after the expiration of the leave, the employee may be required to" +
      " reimburse us for payment of health insurance premiums during the FMLA leave."),
      Responses.genQuickReply("Reimbursement will not be required if the employee does not return to work because of a serious health" + 
      " condition or other circumstances beyond the employee’s control.",
      [
        {
          title: "Meeting/List 📅",
          payload: "SCHEDULES"
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
          title: "I'm bored! 🙍‍♂️",
          payload: "BORED"
        }
      ]),
    ],
    "FINANCE": [Responses.genTextReply("Here are some common Finances questions you can ask:"),
      Responses.genQuickReply(
        "\u2022 Tell me about paid vacations!\n\n" +
        "\u2022 What are the rules for fines?\n\n" +
        "\u2022 When will I get a raise?\n\n",
        [
          {
            title: "Health insurance 🏥",
            payload: "HEALTH_INSURANCE"
          },
          {
            title: "Paid vacation 🏖️",
            payload: "BONUS"
          },
          {
            title: "Rules for fines 🧾",
            payload: "FINE_RULES"
          },
          {
            title: "Increment 💰",
            payload: "INCREMENT"
          },
        ])],
    "NEW_LAWS" : [
      Responses.genTextReply("As a part of its commitment to safeguard the health of its employees, to provide a safe" +
      " place for its employees to work, and to promote a drug-free community, we have established this policy on the use" +
      " or abuse of alcohol and drugs by its employees."),
      Responses.genTextReply("Substance abuse, while at work or otherwise, seriously endangers the safety of employees as well" +
      " as the general public, and creates a variety of workplace problems including increased injuries"),
      Responses.genTextReply("on the job, absenteeism, increased health care and benefit costs, theft, decreased morale, decreased" + 
      " productivity, and a decline in the quality of services provided."),
      Responses.genTextReply("This policy is established to detect and remove users and abusers of drugs and alcohol. It is also our " + 
      " policy to prevent the use and/or presence of these substances"),
      Responses.genQuickReply("in the workplace and to assist employees in overcoming any dependence on drugs and/or alcohol", 
        this.button["CORPORATE_LAW_BTN"]
      ),
    ],
    "EMPLOYEE_RIGHTS" : [
      Responses.genTextReply("Employment law covers all rights and obligations within the employer-employee relationship," + 
      " including not only current employees but also former employees and job applicants."),
      Responses.genTextReply("In most states, employees are afforded privacy in the workplace. This employee right applies" + 
      " to personal possessions, including handbags or briefcases, storage lockers accessible only by the employee, and private mail addressed only to employee."),
      Responses.genTextReply("Employees may also have a right to privacy in their telephone conversations or voicemail messages. However, employees have very" + 
      " limited rights to privacy in their e-mail messages and Internet usage while using the employer's computer system."),
      Responses.genTextReply("Other important employee rights include:"),
      Responses.genTextReply("\u2022 Right to be free from discrimination and harassment of all types"),
      Responses.genTextReply("\u2022 Right to be free from retaliation for filing a claim or complaint against an employer (these" + 
      " are sometimes called \"whistleblower\" rights)"),
      Responses.genQuickReply("\u2022 Right to fair wages for work performed.",
        this.button["CORPORATE_LAW_BTN"]
      )
    ],
    "LAWS_CO_WORKERS" : [
      Responses.genTextReply("So what should employees understand about protecting the privacy of other employees? Well, that’s a big question without a simple answer."),
      Responses.genTextReply("At the very least, it is important that employers write and distribute clearly written policies about who is authorized to access such " + 
      "information, the requirement to maintain the privacy of the information, and the systems or processes employees need to follow to protect it."),
      Responses.genQuickReply("Also, it’s a good idea to include the obligation to protect the privacy of employee information in whatever confidentiality agreement" + 
      " employees are required to sign as a condition of employment.",
      this.button["CORPORATE_LAW_BTN"]
      )
    ],
    "BUY_SHARES" : [
      Responses.genTextReply("Through the course of time, Business Law has evolved in the field of the division and flexibility in transferability " + 
      "of the ownership of a company. Each shareholder is considered an owner of the company. The degree of ownership depends on the number of shares" + 
      " each individual buys."),
      Responses.genTextReply("Any kind of shares can be issued in accordance with the company’s articles of association. The articles of association" + 
      " are a set of guidelines, which provide the rules for buying, selling and transferring different types of shares. "),
      Responses.genQuickReply("The articles of association also mention the types of shares, which could be transacted by the company. Ordinary shares " + 
      "constitute the biggest amount of shares, but special types of shares like the alphabet shares also exist.",
        this.button["CORPORATE_LAW_BTN"]
      )
    ],
    "CORPORATE_LAW": [
      Responses.genTextReply("Here are some common Corporate Law questions you can ask:"),
      Responses.genTextReply("\u2022 What are the new law changes introduced in the company?\n\n" +
        "\u2022 What are my rights as an employee in the company?"),
      Responses.genQuickReply("\u2022 What are the laws regarding issues with co workers?\n\n" +
        "\u2022 Can I buy shares for Wayne Enterprises as an employee?\n\n",
          this.button["CORPORATE_LAW_BTN"]
        )
      ],
    "TRAINING": [
      Responses.genTextReply("Here are some common Training and Self Improvement questions you can ask:"),
      Responses.genQuickReply(
        "\u2022 What are the current training courses available for me?\n\n" +
        "\u2022 What training courses do I require to complete my current tasks?\n\n" +
        "\u2022 What self improvement courses do I need to take to improve my performance metrics?",
          this.button["TRAINING_BTN"]
        )
      ],
    "REPORT_STATS": [
      Responses.genTextReply("Please Upload the sales records that you would like to send"),
      Responses.genTextReply("The document will be transferred to your manager")
    ],
    "DISCARD_REPORT" : [
      Responses.genQuickReply("Your Attachments have been discarded successfully!", 
        this.button["ADMINISTRATIVE_BTN"]
      )
    ],
    "REPORT_STATS_ATTACHMENT": [
      Responses.genQuickReply("You can upload more documents if you want. You can also choose to go through or discard the documents that you have uploaded" + 
      " by pressing the buttons below",
      [
        {
          title: "Submit Report 📊",
          payload: "SUBMIT_REPORT"
        },
        {
          title: "Discard Report 🗑️",
          payload: "DISCARD_REPORT"
        },
      ]),
    ],
    "REPORT_STATS_ERROR_MSG": [
      Responses.genTextReply("Please Upload a document file as an attachment and not text.")
    ],
    "VIEW_REMINDERS": Responses.genQuickReply(
      "Looks like you have no reminders!",
        this.button["SCHEDULES_BTN"]
      ),
    "NEW_REMINDER": [
      Responses.genWebView(this.uid),
      Responses.genQuickReply(
        "Or manage other reminders",
        this.button["SCHEDULES_BTN"]    
      )
      ],
    "VIEW_SCHEDULE": [
      Responses.genTextReply("Looks like you have nothing to do!"),
      Responses.genPictureReply("https://s3-us-west-2.amazonaws" + 
      ".com/www.whitewall.site/bizbotteuxdeux/assets/thinking.png?fbc" + 
      "lid=IwAR3lHMv3pEPSAglCNhN6S2h2XvGNRl_G9SG_8FN3hCbCa48PUp-33PJzo70"),
      Responses.genTextReply("I'll ask your manager to assign you more tasks :3"),
      Responses.genPictureReply("https://s3-us-west-2.amazonaws.com/www.whitewall.site/bizbotteuxdeux/assets/monkey" + 
        "_smirk.png?fbclid=IwAR01UxGdDfPXhuTgLE6oh0LJirwmpEh0anBEWoh03lCZSBloIenFsGN8uP4"),
      Responses.genQuickReply(
        "What do you want to do next?",
        this.button["SCHEDULES_BTN"]
      )
    ],
    "ENROLL" : Responses.genQuickReply("You have been enrolled to the following course",
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
    "APOLOGIZE" : Responses.genTextReply("I'm sorry, I didn't quite understand that")
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
      " Supervisors, "),
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
      Responses.genTextReply("All employees will follow our Travel Policy and Procedures for the payment and/or" +
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
      Responses.genTextReply("Our company has adopted"),
      Responses.genTextReply("a Code of Ethics for its employees. This Code of Ethics is substantially similar to" +
      " the Code of Ethics adopted by "),
      Responses.genTextReply("the State for state, county, and city elected" +
      "officials, officers and employees."),
    ],
    "CUSTOMER_RELATIONS" : [
      Responses.genTextReply("Each employee is our representative. Whether dealing in person, on the telephone," +
      " or by mail (electronic or via USPS) "),
      Responses.genTextReply("the customer's and the public’s impression of us is" +
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
    //REHABILITATION
    "REHAB" : [
      Responses.genTextReply("Any employee who has a drug or alcohol dependency problem who voluntarily," +
      " before an incident occurs that results in a drug "),
      Responses.genTextReply("and/or alcohol test, brings it to" + 
      " the attention of his/her Supervisor, Department Director or the Director of HR & Communications, may be allowed to enter and"),
      Responses.genTextReply(" complete an appropriate rehabilitation program approved by us at the employee's own expense."),
    ],
    "PARKING" : [
      Responses.genTextReply("We provides parking for its employees and assigns parking spaces to all employees" +
      " working in its Service Building."),
      Responses.genTextReply("If our employee parking lot is full, employees must find alternate parking at their own expense."),
      Responses.genTextReply("Employees may not park on any of our property unless designated for employee parking employees as needed."),
    ],
    "DISCRIMINATION" : [
      Responses.genTextReply("The laws enforced by EEOC makes it unlawful for Federal agencies to discriminate against employees and job applicants " +
      " on the bases of race, color, religion, sex, national origin, disability, or age."),
      Responses.genTextReply("A person who files a complaint or participates in an investigation of an EEO complaint, or who opposes an employment practice" +
      " made illegal under any of the laws that EEOC enforces is protected from retaliation."),
      Responses.genTextReply("The Equal Pay Act of 1963 protects men and women from sex-based wage discrimination in the payment of wages or benefits, who" + 
      " perform substantially equal work in the same establishment. See EEOC guidance on equal pay and compensation discrimination"),
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
      Responses.genTextReply("We respect the privacy of its employees; however, as a public entity, we must comply with the State's Public Records Law."),
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
     "SUSPENSION" : [
      Responses.genTextReply("An employee may be suspended with or without pay as a disciplinary action. Following" +
                            " an Administrative Review Hearing the General Manager & CEO"),
      Responses.genTextReply("will take into consideration any recommendations made by Supervisors, Directors and/or the Director of HR & Communications"),
      Responses.genTextReply(" as well as taking into consideration the employees personnel records, including past disciplinary actions."),
      Responses.genTextReply("Depending on the seriousness of the reason(s), an employee can be suspended with or without pay until" +
                            " the Administrative Review hearing is held and the outcome is determined.")
    ],
    "TERMINATION" : [
      Responses.genTextReply("We will consider an employee to have voluntarily terminated his or her employment if an employee fails to follow the" + 
      " companies policies")
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



module.exports = Replies;

