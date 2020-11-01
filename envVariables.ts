const EnvVariables = {
  API_ENDPOINTS: {
    LOGIN: "http://192.168.200.53:4000/login",
    REGISTER: "http://192.168.200.53:4000/register",
    GETCATEGORIES: "http://192.168.200.53:4000/questions/allCategories",
    GETCATEGORY: "http://192.168.200.53:4000/questions?category=",
    GETGROUPSBYCATEGORY: "http://192.168.200.53:4000/questions/categoryGroup",
    GETQUESTIONSBYGROUPNAME: "http://192.168.200.53:4000/questions?group=",
    GETQUESTIONSBYGROUPID: "http://192.168.200.53:4000/questions/groupId",
    SAVERESULTS: "http://192.168.200.53:4000/questions/saveresults",
    GETINVITES: "http://192.168.200.53:4000/invites/get",
    HANDLEINVITES: "http://192.168.200.53:4000/invites/handle",
  },
};

export default EnvVariables;
