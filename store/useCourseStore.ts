import { create } from "zustand";
import { CourseList } from "@/types/blog";

type ExtendedCourse = CourseList & {
  status?: "not-paid" | "paid";
};




type CourseState = {
  // course
  selectedCourse: CourseList | null;
  setSelectedCourse: (course: CourseList) => void;
  clearSelectedCourse: () => void;




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





export const useCourseStore = create<CourseState>((set) => ({

  selectedCourse: null,

  cart: [],
  wishlist: [],
  paidCourses: [],


  setSelectedCourse: (course) => set({ selectedCourse: course }),
  clearSelectedCourse: () => set({ selectedCourse: null }),

  addToCart: (course) =>
    set((state) => {
      // prevent duplicates
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

  markAsPaid: (id) =>
    set((state) => ({
      paidCourses: [...state.paidCourses, ...id],
    })),


}));
