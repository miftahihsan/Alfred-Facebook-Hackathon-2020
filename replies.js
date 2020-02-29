const Responses = require('./response');

class Replies {

  static userData = {};
  static user_name = "";
  static uid= 0;

  static setUID(uid){
    this.replies["NEW_REMINDER"] = Responses.genWebView(uid);
    this.uid = uid;
  }

  static setUserData(userData){
    this.userData = userData;
    if ('reminders' in userData.Item){
       this.replies["VIEW_REMINDERS"] = Responses.genReminders(this.uid, userData.Item['reminders']);
    }
    this.replies["INITIATE"] = [Responses.genTextReply("Hi "+userData['name']+" ! "),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of Dunder Mifflin."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Dunder Mifflin employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n")
    ];
  }


  static replies = {
    "INITIATE": [Responses.genTextReply("Hi "+this.userData['name']+" ! "),
      Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of Dunder Mifflin."),
      Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
      Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Dunder Mifflin employee records"),
      Responses.genTextReply("Lets get started! \uD83D\uDE04\n")
    ],
    "MENU": [Responses.genTextReply("What do you want to do next?"),
      Responses.genTextReply(
        "- Ask an HR question\n- Modify your calendar, make a list etc.."),
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
            title: "To do list 📝",
            payload: "TO_DO_LIST"
          }
        ]
      )],
    "HR": Responses.genQuickReply("Ok! What do you want to know about: \n" +
      "- HR company policy\n" +
      "- Bonus and payments\n" +
      "- Your performance stats\n" +
      "- Sick days/holidays\n",
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
        }]),
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
          title: "IT and Tech 🖥",
          payload: "IT_TECH"
        },
        {
          title: "Corporate Law 👨‍⚖️",
          payload: "CORPORATE_LAW"
        },
        {
          title: "Training and Self Improvement 🏋️‍♂️",
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
        "- What self improvement courses do I need to take to improve my performance?\n",
        [
          {
            title: "Courses available",
            payload: "COURSES_AVAILABLE"
          },
          {
            title: "Prerequisite Training",
            payload: "PREREQUISITE_TRAINING"
          },
          {
            title: "Self Improvement Courses",
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

