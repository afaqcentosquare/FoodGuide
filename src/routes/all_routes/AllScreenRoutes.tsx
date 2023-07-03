import React, {FC} from "react";
import { AllScreenStack } from "./AllScreenStack";
import SplashController from "../../ui/screens/splash/SplashController";
import SignInController from "../../ui/screens/sign_in/SignInController";
import OnBoardingController from "../../ui/screens/onboarding/OnBoardingController";
import SignUpController from "../../ui/screens/sign_up/SignUpController";
import { MainScreen } from "../../ui/screens/main/MainScreen";
import FoodDetailController from "../../ui/screens/food_detail/FoodDetailController";
import ResDetailController from "../../ui/screens/res_detail/ResDetailController";
import AddToCartController from "../../ui/screens/add_to_cart/AddToCartController";
import SearchController from "../../ui/screens/search/SearchController";
import NewFoodAllController from "../../ui/screens/new_food_all/NewFoodAllController";
import EditProfileController from "../../ui/screens/edit_profile/EditProfileController";
import OrderController from "../../ui/screens/order/OrderController";
/*import AddressController from "../../ui/screens/address/AddressController";*/
import WishlistController from "../../ui/screens/wishlist/WishlistController";
import PrivacyPolicyController from "../../ui/screens/privacy_policy/PrivacyPolicyController";
import TermAndConditionController from "../../ui/screens/term_and_condition/TermAndConditionController";
/*import AboutController from "../../ui/screens/about/AboutController";*/
import SettingsController from "../../ui/screens/settings/SettingsController";
import InboxDetailController from "../../ui/screens/inbox_detail/InboxDetailController";
/*import PhoneNumberController from "../../ui/screens/phone_number/PhoneNumberController";
import OtpVerifyController from "../../ui/screens/otp_verify/OtpVerifyController";*/
import UserProfileController from "../../ui/screens/user_profile/UserProfileController";
import AddResReviewController from "../../ui/screens/add_res_review/AddResReviewController";
import CheckoutController from "../../ui/screens/checkout/CheckoutController";
import ConfirmOrderController from "../../ui/screens/confirm_order/ConfirmOrderController";
import FoodReviewDetailController from "../../ui/screens/food_review_detail/FoodReviewDetailController";
import VideoController from "../../ui/screens/video/VideoController";
import CommentController from "../../ui/screens/comment/CommentController";
import TrendFoodAllController from "../../ui/screens/trend_food_all/TrendFoodAllController";
import OrderDetailController from "../../ui/screens/order_detail/OrderDetailController";
import VideoDetailController from "../../ui/screens/video_detail/VideoDetailController";
import ResVideoDetailController from "../../ui/screens/res_video_detail/ResVideoDetailController";
import BookmarkVideoController from "../../ui/screens/bookmark_videos/BookmarkVideoController";
import FoodVideoController from "../../ui/screens/food_video/FoodVideoController";

type Props = {}

export const AllScreenRoutes : FC<Props> = ({}) =>
{
    return(
        <AllScreenStack.Navigator
            initialRouteName={"Splash"}>

          <AllScreenStack.Screen
            name={"Splash"}
            component={SplashController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"OnBoarding"}
            component={OnBoardingController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"SignIn"}
            component={SignInController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"SignUp"}
            component={SignUpController}
            options={{headerShown: false}}/>

         {/* <AllScreenStack.Screen
            name={"PhoneNumber"}
            component={PhoneNumberController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"OtpVerify"}
            component={OtpVerifyController}
            options={{headerShown: false}}/>*/}

          <AllScreenStack.Screen
            name={"UserProfile"}
            component={UserProfileController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Main"}
            component={MainScreen}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Search"}
            component={SearchController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"ResDetail"}
            component={ResDetailController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"NewFoodAll"}
            component={NewFoodAllController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"FoodDetail"}
            component={FoodDetailController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"AddToCart"}
            component={AddToCartController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"EditProfile"}
            component={EditProfileController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Order"}
            component={OrderController}
            options={{headerShown: false}}/>

          {/*<AllScreenStack.Screen
            name={"Address"}
            component={AddressController}
            options={{headerShown: false}}/>*/}

          <AllScreenStack.Screen
            name={"Favourites"}
            component={WishlistController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"PrivacyPolicy"}
            component={PrivacyPolicyController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"TermAndCondition"}
            component={TermAndConditionController}
            options={{headerShown: false}}/>

         {/* <AllScreenStack.Screen
            name={"About"}
            component={AboutController}
            options={{headerShown: false}}/>*/}

          <AllScreenStack.Screen
            name={"Settings"}
            component={SettingsController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"InboxDetail"}
            component={InboxDetailController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"FoodReviewDetail"}
            component={FoodReviewDetailController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"AddResReview"}
            component={AddResReviewController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Checkout"}
            component={CheckoutController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"ConfirmOrder"}
            component={ConfirmOrderController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Video"}
            component={VideoController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"Comments"}
            component={CommentController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"TrendFoodAll"}
            component={TrendFoodAllController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"OrderDetail"}
            component={OrderDetailController}
            options={{headerShown: false}}/>

          <AllScreenStack.Screen
            name={"VideoDetail"}
            component={VideoDetailController}
            options={{headerShown: false}}/>

              <AllScreenStack.Screen
                name={"ResVideoDetail"}
                component={ResVideoDetailController}
                options={{headerShown: false}}/>

              <AllScreenStack.Screen
                name={"BookmarkVideo"}
                component={BookmarkVideoController}
                options={{headerShown: false}}/>

              <AllScreenStack.Screen
                name={"FoodVideo"}
                component={FoodVideoController}
                options={{headerShown: false}}/>

        </AllScreenStack.Navigator>
    )
}
