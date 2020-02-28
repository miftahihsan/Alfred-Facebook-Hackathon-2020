const Responses = require('./response');

const replies = {
  "INITIATE" : [Responses.genTextReply("Hi {{user_first_name}} ! "),
    Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of Dunder Mifflin."),
    Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
    Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Dunder Mifflin employee records"),
    Responses.genTextReply("Lets get started! \uD83D\uDE04\n")
    ],
  "MENU" : Responses.genQuickReply(
      "What do you want to do next? \n" +
      "- Ask an HR question\n- modify your calendar, make a list etc..\n- Know something from a specific company department, like finance, tech support, law etc..\n" +
      "- report stats/info to manager\n",
      [
        {
          title : "HR question 🙋",
          payload : "HR"
        },
        {
          title : "Schedules 📅",
          payload : "SCHEDULES"
        },
        {
          title : "FAQ 📚",
          payload : "FAQ"
        },
        {
          title : "Report stats/info 👩‍💻",
          payload : "REPORT_STATS"
        }
      ]
    ),
    "HR" : Responses.genQuickReply("Ok! What do you want to know about: \n" +
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
    "SCHEDULES" : Responses.genQuickReply("Would you like to work with your lists, make a new list, view/manage your calendar or view/manage your work trips?",
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
            title: "View Scheduele 📆",
            payload: "VIEW_SCHEDULE"
          },
          {
            title: "View Trips ✈",
            payload: "VIEW_TRIPS"
          }
          ]),
    "FAQ" : Responses.genQuickReply("Great! What do you want to know about?",
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
    "IT_TECH" : Responses.genQuickReply("Here are some common IT concerns you can ask about:" +
                                        "- What's my username and password?" +
                                        "- I can't login to my account" +
                                        "- My office equipment isn’t working" + 
                                        "- My office equipment doesn't have network connectivity",
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
                                        ]),
    "FINANCE"  : Responses.genQuickReply("Here are some common Finances questions you can ask:" +
                                          "- What are the current health insurance policies?" +
                                          "- When will I get a bonus?" +
                                          "- What are the rules for fines?" +
                                          "- When will I get an increment?",
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
                                          ]),
    "CORPORATE_LAW"  : Responses.genQuickReply("Here are some common Corporate Law questions you can ask:" +
                                          "- What are the new law changes introduced in the company?" +
                                          "- What are my rights as an employee in the company?" +
                                          "- What are the laws regarding issues with co workers?" +
                                          "- Can I buy shares for Dunder Mifflin as an employee?",
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
                                          ]),
      "TRAINING"  : Responses.genQuickReply("Here are some common Training and Self Improvement questions you can ask:" +
                                          "- What are the current training courses available for me?" +
                                          "- What training courses do I require to complete my current tasks?" +
                                          "- What self improvement courses do I need to take to improve my performance?",
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
                                          ]),
    "REPORT_STATS" : Responses.genQuickReply("Please Upload the attachment that you would like to send",
        [
          {
            title: "MENU",
            payload: "MENU"
          }
        ]),
    "VIEW_REMINDERS" : Responses.genTextReply("YOU HAVE NO REMINDERS"),
    "NEW_REMINDER" : Responses.genTextReply("Ok, what's the title of the list? "),
    "VIEW_SCHEDULE" : Responses.genTextReply("Ok, Here's your schedule"),
    "VIEW_TRIPS" : Responses.genTextReply("OHNO ABRAR HASNT WRITTEN YET.")


};

module.exports = {
  replies
}

