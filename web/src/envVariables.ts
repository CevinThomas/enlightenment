const EnvVariables = {
  API_ENDPOINTS: {
    LOGIN: "http://192.168.200.52:4000/login/cms",
    REGISTER: "http://192.168.200.52:4000/register",
    GETCATEGORIES: "http://192.168.200.52:4000/questions/allCategories",
    GETCATEGORY: "http://192.168.200.52:4000/questions?category=",
    GETGROUPSBYCATEGORY: "http://192.168.200.52:4000/questions?categoryGroup=",
    GETQUESTIONSBYGROUPNAME: "http://192.168.200.52:4000/questions?group=",
    GETQUESTIONSBYGROUPID: "http://192.168.200.52:4000/questions?groupId=",
    ADDQUESTIONS: "http://192.168.200.52:4000/add/questions",
    GETQUESTIONSBYLICENCE: "http://192.168.200.52:4000/questions/licence",
    GETUSERLICENCE: "http://192.168.200.52:4000/user/licence",
    GETQUESTIONBYID: "http://192.168.200.52:4000/questions/questionId",
    UPDATEQUESTION: "http://192.168.200.52:4000/questions/update",
    DELETEQUESTION: "http://192.168.200.52:4000/questions/delete",
    INVITEUSER: "http://192.168.200.52:4000/invite/user",
  },
};

export default EnvVariables;
