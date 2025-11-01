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


export const ADMIN_GET_ALL_USERS = gql`
    query GetUsers($page: Int!, $limit: Int!) {
        getUsers(page: $page, limit: $limit) {
            users {
                id
                email
                fullname
                isAdmin
                createdAt
                updatedAt
            }
            totalPages
            currentPage
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
export const GET_ASSESSMENTS = gql`
    query GetAssignmentByCourseId($courseId: ID!) {
        getAssignmentByCourseId(courseId: $courseId) {
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
export const GET_USER_SUBMISSION = gql`
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
                correctAnswer
            }
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



export const GET_ANALYTICS = gql`
    query GetAdminStats {
        getAdminStats {
            totalUsers
            totalCourses
            totalAssignments
            totalEnquiries
            totalPayments
            totalPaidCourses
        }
    }

`



export const GET_ALL_TRANSACTION = gql`
    query GetPaymentsForAdmin($page: Int, $pageSize: Int) {
        getPaymentsForAdmin(page: $page, pageSize: $pageSize) {
            payments {
                id
                amount
                paymentReference
                status
                courseId
                userId
                createdAt
                updatedAt
                user {
                    id
                    email
                    fullname
                    isAdmin
                    createdAt
                    updatedAt
                }
                course {
                    id
                    name
                    description
                    image
                    price
                    createdAt
                    updatedAt
                }
            }
            total
            page
            pageSize
        }
    }
`

