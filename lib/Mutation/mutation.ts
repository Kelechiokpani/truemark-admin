import { gql } from "@apollo/client";

// TRUE-MARK COURSES - MODULES - LESSONS

export const CREATE_COURSE = gql`
    mutation CreateCourse($input: CourseInput!) {
        createCourse(input: $input) {
            course {
                id
                name
                description
                image
                price
                createdAt
                updatedAt
            }
            success
        }
    }
`;

export const CREATE_COURSE_MODULE = gql`
    mutation CreateCourseModule($input: CreateModuleInput!) {
        createCourseModule(input: $input) {
            courseModule {
                id
                name
                description
                image
                courseId
                createdAt
                updatedAt
            }
            success
        }
    }
`;

export const CREATE_COURSE_LESSON = gql`
    mutation CreateCourseLesson($input: CreateLessionInput!) {
        createCourseLesson(input: $input) {
            lession {
                id
                name
                description
                video
                courseModuleId
                createdAt
                updatedAt
            }
            success
        }
    }
`;


export const UPDATE_COURSE = gql`
    mutation UpdateCourse($input: UpdateCourse!) {
        updateCourse(input: $input) {
            course {
                id
                name
                description
                image
                price
                createdAt
                updatedAt
            }
            success
        }
    }
`;

export const UPDATE_COURSE_MODULE = gql`
    mutation UpdateCourseModule($input: UpdateModuleInput!) {
        updateCourseModule(input: $input) {
            courseModule {
                id
                name
                description
                image
                courseId
                createdAt
                updatedAt
            }
            success
        }
    }
`;

export const UPDATE_COURSE_LESSON = gql`
    mutation UpdateCourseLesson($input: UpdateLessionInput!) {
        updateCourseLesson(input: $input) {
            lession {
                id
                name
                description
                video
                courseModuleId
                createdAt
                updatedAt
            }
            success
        }
    }
`;




export const DELETE_COURSE = gql`
    mutation DeleteCourse($deleteCourseId: ID!) {
        deleteCourse(id: $deleteCourseId)
    }
`;

export const DELETE_COURSE_MODULE = gql`
    mutation DeleteCourseModule($deleteCourseModuleId: ID!) {
        deleteCourseModule(id: $deleteCourseModuleId)
    }
`;

export const DELETE_COURSE_LESSON = gql`
    mutation DeleteCourseLesson($deleteCourseLessonId: ID!) {
        deleteCourseLesson(id: $deleteCourseLessonId)
    }
`;




// TRUE-MARK USER FLOW

export const CREATE_USERS = gql`
    mutation CreateAccount($input: CreateAccountData!) {
        createAccount(input: $input) {
            success
            user {
                id
                email
                fullname
                isAdmin
                createdAt
                updatedAt
            }
        }
    }
`;

export const LOGIN_USERS = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            success
            user {
                id
                email
                fullname
                isAdmin
                createdAt
                updatedAt
            }
            accessToken
            refreshToken
        }
    }
`;

export const FORGOT_USERS_PASSWORD = gql`
    mutation ForgetPassword($email: String!) {
        forgetPassword(email: $email) {
            success
            message
        }
    }
`;

export const VERIFY_FORGOT_USERS_PASSWORD = gql`
    mutation VerifyForgotPassword($input: VerifyForgotPasswordInput!) {
        verifyForgotPassword(input: $input) {
            success
            message
        }
    }
`;


// TRUE-MARK ASSESSMENT MUTATION

export const CREATE__ASSESSMENT = gql`
    mutation CreateAssignment($input: CreateAssignmentInput!) {
        createAssignment(input: $input) {
            id
            courseId
            title
            description
            questions {
                id
                assignmentId
                questionText
                options {
                    id
                    questionId
                    optionText
                }
            }
        }
    }
`;


export const UPDATE_ASSESSMENT = gql`
    mutation UpdateAssignment($assignmentId: ID!, $input: UpdateAssignmentInput!) {
        updateAssignment(assignmentId: $assignmentId, input: $input) {
            id
            courseId
            title
            description
            questions {
                id
                assignmentId
                questionText
                options {
                    id
                    questionId
                    optionText
                }
                correctAnswer
            }
        }
    }
`;

export const DELETE__ASSESSMENT = gql`
    mutation DeleteAssignment($assignmentId: ID!) {
        deleteAssignment(assignmentId: $assignmentId)
    }
`;



export const UPDATE_QUESTIONS = gql`
    mutation UpdateQuestion($input: UpdateQuestionInput!, $questionId: ID!) {
        updateQuestion(input: $input, questionId: $questionId) {
            id
            assignmentId
            questionText
            options {
                id
                questionId
                optionText
            }
            correctAnswer
        }
    }
`;


export const DELETE_QUESTIONS = gql`
    mutation DeleteQuestion($questionId: ID!) {
        deleteQuestion(questionId: $questionId)
    }
`


export const UPDATE_QUESTION_OPTION = gql`
    mutation UpdateQuestionOption($optionId: ID!, $input: UpdateOptionInput!) {
        updateQuestionOption(optionId: $optionId, input: $input) {
            id
            questionId
            optionText
        }
    }
`;


export const DELETE_QUESTION_OPTIONS = gql`
    mutation DeleteQuestionOption($optionId: ID!) {
        deleteQuestionOption(optionId: $optionId)
    }
`;
