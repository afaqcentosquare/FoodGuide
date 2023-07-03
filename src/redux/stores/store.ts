import { configureStore } from '@reduxjs/toolkit'
import AddPostSlice from '../slice/AddPostSlice'
import AddToCartSlice from '../slice/AddToCartSlice'
import CategorySlice from '../slice/CategorySlice'
import CheckoutSlice  from '../slice/CheckOutSlice'
import EditUserSlice from '../slice/EditUserSlice'
import FoodDetailSlice from '../slice/FoodDetailSlice'
import FoodReviewSlice  from "../slice/FoodReviewSlice";
import NewFoodAllSlice  from '../slice/NewFoodAllSlice'
import HomeSlice from '../slice/HomeSlice'
import InboxDetailSlice from '../slice/InboxDetailSlice'
import InboxSlice from '../slice/InboxSlice'
import ResDetailSlice from '../slice/ResDetailSlice'
import ResProfileSlice from '../slice/ResProfileSlice'
import ResReviewSlice from '../slice/ResReviewSlice'
import SearchSlice from '../slice/SearchSlice'
import SignInSlice from '../slice/SignInSlice'
import SignUpSlice from '../slice/SignUpSlice'
import UserProfileSlice from '../slice/UserProfileSlice'
import VideoSlice from '../slice/VideoSlice'
import WishlistSlice from '../slice/WishlistSlice'
import TrendFoodAllSlice from '../slice/TrendFoodAllSlice'
import OrderSlice from '../slice/OrderSlice'
import OrderDetailSlice from '../slice/OrderDetailSlice'
import BookmarkVideoSlice from '../slice/BookmarkVideoSlice'
import VideoDetailSlice from '../slice/VideoDetailSlice'
import LngSlice from '../slice/LngSlice'

export const store = configureStore({
    reducer: {
        Lng : LngSlice,
        SignUp : SignUpSlice,
        SignIn : SignInSlice,
        Home : HomeSlice,
        Category : CategorySlice,
        Search : SearchSlice,
        ResDetail  : ResDetailSlice,
        ResProfile : ResProfileSlice,
        FoodDetail : FoodDetailSlice,
        UserProfile : UserProfileSlice,
        FoodReview : FoodReviewSlice,
        Wishlist : WishlistSlice,
        AddToCart : AddToCartSlice,
        InboxDetail : InboxDetailSlice,
        Inbox : InboxSlice,
        ResReview : ResReviewSlice,
        AddPost : AddPostSlice,
        EditUser : EditUserSlice,
        Checkout : CheckoutSlice,
        Video : VideoSlice,
        NewFoodAll : NewFoodAllSlice,
        TrendFoodAll : TrendFoodAllSlice,
        Order : OrderSlice,
        OrderDetail : OrderDetailSlice,
        BookmarkVideo : BookmarkVideoSlice,
        VideoDetail : VideoDetailSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
