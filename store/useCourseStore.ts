import { create } from "zustand";
import { AssessmentList, CourseList } from "@/types/blog";
import { persist } from "zustand/middleware";

type ExtendedCourse = CourseList & {
  status?: "not-paid" | "paid";
};


type CourseState = {
  // course
  selectedCourse: CourseList | null;
  setSelectedCourse: (course: CourseList) => void;
  clearSelectedCourse: () => void;


  // course
  selectedAssessment: AssessmentList | null | any;
  setSelectedAssessment: (assessment: AssessmentList | any) => void;
  clearSelectedAssessment: () => void;




  // cart
  cart: ExtendedCourse[];
  wishlist: ExtendedCourse[];
  paidCourses: number[];

  addToCart: (course: ExtendedCourse) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  addToWishlist: (course: ExtendedCourse) => void;
  removeFromWishlist: (id: number) => void;

  markAsPaid: (ids: number[]) => void;
};





export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      selectedCourse: null,
      selectedAssessment: null,

      cart: [],
      wishlist: [],
      paidCourses: [],

      setSelectedCourse: (course) => set({ selectedCourse: course }),
      clearSelectedCourse: () => set({ selectedCourse: null }),


      setSelectedAssessment: (assessment) => set({ selectedAssessment: assessment }),
      clearSelectedAssessment: () => set({ selectedAssessment: null }),


      addToCart: (course) =>
        set((state) => {
          if (state.cart.find((c) => c.id === course.id)) return state;
          return { cart: [...state.cart, course] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (course) =>
        set((state) => {
          if (state.wishlist.find((c) => c.id === course.id)) return state;
          return { wishlist: [...state.wishlist, course] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((c) => c.id !== id),
        })),

      markAsPaid: (ids) =>
        set((state) => ({
          paidCourses: [...state.paidCourses, ...ids],
        })),
    }),
    {
      name: "course-storage", // localStorage key
      partialize: (state) => ({
        selectedCourse: state.selectedCourse,
        selectedAssessment: state.selectedAssessment,
        cart: state.cart,
        wishlist: state.wishlist,
        paidCourses: state.paidCourses,
      }),
    }
  )
);
