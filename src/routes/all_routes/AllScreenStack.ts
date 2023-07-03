import { createStackNavigator } from '@react-navigation/stack';
import { foodObj } from "../../models/res_model/MenuModel";
import { addToCartObj } from "../../models/res_model/AddToCartModel";
import { postObj } from "../../models/res_model/PostModel";
import { orderObj } from "../../models/res_model/OrdersModel";


export type AllScreenStackParamList = {
    Splash : undefined,
    OnBoarding : undefined,
    SignIn : undefined,
    SignUp : undefined,
    UserProfile : undefined,
    PhoneNumber : undefined,
    OtpVerify : undefined,
    Main : undefined,
    Search : undefined,
    NewFoodAll : undefined,
    TrendFoodAll : undefined,
    ResDetail : { res_id : string,res_name : string },
    FoodDetail : { food_info : foodObj },
    InboxDetail : { resId : string },
    FoodReviewDetail : { foodInfo : foodObj },
    AddResReview : {resId :string},
    AddToCart : undefined,
    EditProfile : undefined,
    Order : undefined,
    Address : undefined,
    Favourites : undefined,
    PrivacyPolicy : undefined,
    TermAndCondition : undefined,
    About : undefined,
    Settings : undefined,
    Checkout : {orderList : Array<addToCartObj>},
    ConfirmOrder : undefined,
    Video : { item : string },
    Comments : {postData : postObj},
    OrderDetail : { orderData : orderObj,orderTotal : number },
    VideoDetail : undefined,
    ResVideoDetail : undefined,
    BookmarkVideo : undefined,
    FoodVideo : { foodVideoUrl : string }
}

export const AllScreenStack = createStackNavigator<AllScreenStackParamList>();

