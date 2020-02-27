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
    "HR" : Responses.genQuickReply("OHNO ABRO HASNT WRITTEN YET",
        [{
        title: "MENU",
        payload: "MENU"}]),
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
    "FAQ" : Responses.genQuickReply("OHNO ABRO HASNT WRITTEN YET",
        [{
        title: "MENU",
        payload: "MENU"}]),
    "REPORT_STATS" : Responses.genQuickReply("OHNO ABRO HASNT WRITTEN YET",
        [{
        title: "MENU",
        payload: "MENU"}]),
    "VIEW_REMINDERS" : Responses.genTextReply("YOU HAVE NO REMINDERS"),
    "NEW_REMINDER" : Responses.genTextReply("Ok, what's the title of the list? "),
    "VIEW_SCHEDULE" : Responses.genTextReply("Ok, Here's your schedule"),
    "VIEW_TRIPS" : Responses.genTextReply("OHNO ABRAR HASNT WRITTEN YET.")


};

module.exports = {
  replies
}

