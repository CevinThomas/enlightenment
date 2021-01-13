const EnvVariables = {
  API_ENDPOINTS: {
    LOGIN: "http://192.168.200.54:4000/login",
    REGISTER: "http://192.168.200.54:4000/register",
    GETCATEGORIES: "http://192.168.200.54:4000/questions/allCategories",
    GETCATEGORY: "http://192.168.200.54:4000/questions?category=",
    GETGROUPSBYCATEGORY:
      "http://192.168.200.54:4000/groups/getGroupsByCategory",
    GETCATEGORIESBYSUBJECTCHOSEN:
      "http://192.168.200.54:4000/categories/getCategoriesBySubject",
    GETQUESTIONSBYGROUPNAME: "http://192.168.200.54:4000/questions/group",
    GETQUESTIONSBYGROUPID: "http://192.168.200.54:4000/questions/groupId",
    GETCATEGORIESBYLICENCE:
      "http://192.168.200.54:4000/questions/allCategoriesByLicence",
    GETAREABYLICENCE: "http://192.168.200.54:4000/areas/getAreasByLicence",
    GETSUBJECTSBYAREACHOSEN:
      "http://192.168.200.54:4000/questions/allSubjectsByArea",
    SAVERESULTS: "http://192.168.200.54:4000/questions/saveresults",
    GETINVITES: "http://192.168.200.54:4000/invites/get",
    HANDLEINVITES: "http://192.168.200.54:4000/invites/handle",
    GETRESULTS: "http://192.168.200.54:4000/results/getResults",
    DELETERESULTS: "http://192.168.200.54:4000/questions/deleteresult",
    GETGROUPINFO: "http://192.168.200.54:4000/groups/getGroupInfo",
  },
};

export default EnvVariables;
