
export type CourseList = {
  id: number;
  name: string;
  description?: string;
  image?: any;
  price?: string;
  video?: any;
  publishedAt?: string;
  status?: 'not-paid' | 'paid';
};


export type Course = {
  title: string;
  type: 'free' | 'paid';
  description: string;
  mainImage?: any;
  price?: number;
  assessmentId?:any
  oldPrice?: number;
  slug?: string;
}




// export type AssessmentList = {
//   id: string;
// }
//
//
// export type Assessment = {
//   id:string
// }


export type Option = {
  __typename: string;
  id: string;
  questionId: string;
  optionText: string;
};

export type Question = {
  __typename: string;
  id: string;
  assignmentId: string;
  questionText: string;
  options: Option[];
  correctAnswer: string;
};

export type Assessment = {
  __typename: string;
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
};

export type AssessmentList = Assessment | any[];
