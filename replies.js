const Responses = require('./response');

const replies = {
  "initiate" : [Responses.genTextReply("Hi {{user_first_name}}! "),
    Responses.genTextReply("I am an advanced bot designed to be your personal assistant here in the offices of Dunder Mifflin."),
    Responses.genTextReply("I'm also designed to be your very own HR manager. That means you can ask me things you'd normally have to ask your HR department. If the question is too difficult for me I can redirect you to an HR representative for further help."),
    Responses.genTextReply("In order to best serve your needs, I’ve already gathered some basic info about you from the Dunder Mifflin employee records"),
    Responses.genTextReply("Lets get started! \uD83D\uDE04\n")
    ],
  "menu" : Responses.genQuickReply(
      "What do you want to do next? \n" +
      "- Ask an HR question\n- modify your calendar, make a list etc..\n- Know something from a specific company department, like finance, tech support, law etc..\n" +
      "- report stats/info to manager\n", [{
        title : "HR question",
        payload : "HR"
      },{
        title : "Schedules",
        payload : "schedules"
      }]
      )
};

module.exports = {
  replies
}

