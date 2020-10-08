const EnvVariables = {
    API_ENDPOINTS: {
        LOGIN: "http://192.168.200.53:4000/login",
        REGISTER: "http://192.168.200.53:4000/register",
        GETCATEGORIES: "http://192.168.200.53:4000/questions/allCategories",
        GETCATEGORY: "http://192.168.200.53:4000/questions?category=",
        GETGROUPSBYCATEGORY: "http://192.168.200.53:4000/questions?categoryGroup=",
        GETQUESTIONSBYGROUPNAME: "http://192.168.200.53:4000/questions?group=",
        GETQUESTIONSBYGROUPID: "http://192.168.200.53:4000/questions?groupId="
    }
};

export default EnvVariables;
