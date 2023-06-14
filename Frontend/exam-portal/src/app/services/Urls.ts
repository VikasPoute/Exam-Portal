const BASE_URL = "http://localhost:8080";

const urlList = {
  authenticator: {
    GENERATE_TOKEN: `${BASE_URL}/generate-token`,
    CURRENT_USER: `${BASE_URL}/current-user`,
  },
  category: {
    ADD_CATEGORY: `${BASE_URL}/category/add-category`,
    GET_CATEGORY: `${BASE_URL}/category/get-category/`,
    GET_ALL_CATEGORIES: `${BASE_URL}/category/all-categories`,
    UPDATE_CATEGORY: `${BASE_URL}/category/update-category`,
    DELETE_CATEGORY: `${BASE_URL}/category/delete-category/`,
  },
  options: {
    ADD_OPTION: `${BASE_URL}/option/add-option`,
    UPDATE_OPTION: `${BASE_URL}/option/update-option`,
    GET_OPTION_BY_QUESTION_ID: `${BASE_URL}/option/get-option`,
    DELETE_OPTION_BY_QUESTION_ID: `${BASE_URL}/option/delete-option`,
  },
  questions: {
    ADD_QUESTION: `${BASE_URL}/question/add-question`,
    UPDATE_QUESTION: `${BASE_URL}/question/update-question`,
    GET_ALL_QUESTIONS: `${BASE_URL}/question/get-all-questions`,
    GET_QUESTION: `${BASE_URL}/question/get-question`,
    DELETE_QUESTION: `${BASE_URL}/question/delete-question`,
  },
  quiz: {
    ADD_QUIZ: `${BASE_URL}/quiz/add-quiz`,
    UPDATE_QUIZ: `${BASE_URL}/quiz/update-quiz`,
    GET_ALL_QUIZZES: `${BASE_URL}/quiz/all-quizzes`,
    GET_QUIZ: `${BASE_URL}/quiz/get-quiz`,
    DELETE_QUIZ: `${BASE_URL}/quiz/delete-quiz`,
  },
  user: {
    CREATE_USER: `${BASE_URL}/user/`,
    GET_USER: `${BASE_URL}/user`,
    DELETE_USER: `${BASE_URL}/user`,
    UPDATE_USER: `${BASE_URL}/user`,
  },
};

export default urlList
