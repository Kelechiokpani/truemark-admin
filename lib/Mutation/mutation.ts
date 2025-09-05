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


