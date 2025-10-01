import { gql } from "@apollo/client";


// TRUE-MARK COURSES - MODULES - LESSONS

export const GET_COURSES = gql`
    query GetCourses {
        getCourses {
            id
            name
            description
            image
            price
            createdAt
            updatedAt
        }
    }
`;

export const GET_ENROLLED_COURSES = gql`
    query GetUserEnrolledCourses {
        getUserEnrolledCourses {
            id
            name
            description
            image
            price
            createdAt
            updatedAt
        }
    }
`;

export const GET_COURSES_MODULES = gql`
    query GetCourseModules($courseId: ID!) {
        getCourseModules(courseId: $courseId) {
            id
            name
            description
            image
            courseId
            createdAt
            updatedAt
        }
    }
`;

export const GET_COURSES_LESSONS = gql`
    query GetCourseLessions($moduleId: ID!) {
        getCourseLessions(moduleId: $moduleId) {
            id
            name
            description
            video
            courseModuleId
            createdAt
            updatedAt
        }
    }
`;




// TRUE-MARK USER FLOW
export const GET_USERS = gql`
    query GetUserInfo {
        getUserInfo {
            id
            email
            fullname
            isAdmin
            createdAt
            updatedAt
        }
    }
`;





// TRUE-MARK USER ENQUIRY

export const GET_CUSTOMER_ENQUIRY = gql`
    query GetEnquiries($page: Int, $limit: Int) {
        getEnquiries(page: $page, limit: $limit) {
            id
            name
            email
            phoneNumber
            subject
            message
            createdAt
            updatedAt
        }
    }
`;



// TRUE-MARK USER EXAMS
export const GET_CUSTOMERS_ASSESSMENT = gql`
    query GetAssignmentsByCourseId($courseId: ID!) {
        getAssignmentsByCourseId(courseId: $courseId) {
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

export const GET_ASSESSMENT = gql`
    query GetAssignment($assignmentId: ID!) {
        getAssignment(assignmentId: $assignmentId) {
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


// SUBMISSION ---

export const GET_CUSTOMER_SUBMISSION = gql`
    query GetAssignmentSubmissionsByAssignmentId($assignmentId: ID!) {
        getAssignmentSubmissionsByAssignmentId(assignmentId: $assignmentId) {
            id
            assignmentId
            userId
            score
            answers {
                id
                submissionId
                questionId
                selectedOptionId
            }
        }
    }
`;


export const GET_SUBMISSION = gql`
     query GetAssignmentSubmission($submissionId: ID!) {
        getAssignmentSubmission(submissionId: $submissionId) {
            id
            assignmentId
            userId
            score
            answers {
                id
                submissionId
                questionId
                selectedOptionId
            }
        }
    }
`;

