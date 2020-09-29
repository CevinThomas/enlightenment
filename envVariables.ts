const EnvVariables = {
    API_ENDPOINTS: {
        LOGIN: "http://localhost:3000/login",
        REGISTER: "http://localhost:3000/register",
        GETCATEGORIES: "http://localhost:3000/questions/allCategories",
        GETCATEGORY: "http://localhost:3000/questions?category=",
        GETGROUPSBYCATEGORY: "http://localhost:3000/questions?categoryGroup=",
        GETQUESTIONSBYGROUPNAME: "http://localhost:3000/questions?group=",
        GETQUESTIONSBYGROUPID: "http://localhost:3000/questions?groupId="
    }
};

export default EnvVariables;
