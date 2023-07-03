import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { foodReviewObj } from "../models/res_model/FoodReviewModel";

//--------------------------------- Food Likes ---------------------------------

async function checkFoodLikes(foodId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Foods")
          .child(foodId)
      showDataRef.once('value').then((snapshot) =>
      {
        resolve(snapshot.val())
      })
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })
}

async function foodLike(foodId : string, menuParentId : string, resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const userProfileObj = {
        foodId : foodId,
        parentCatId : menuParentId,
        resId : resId,
        userId : userId,
        isLike : true
      }

      database().ref()
        .child("Likes")
        .child("Foods")
        .child(foodId)
        .set(userProfileObj)
        .then(() =>
        {
          resolve("isSuccessfull")
          //GetFoodData(foodId,menuParentId,foodId)
        });

    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })

}

async function removeFoodLike(foodId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      database()
        .ref()
        .child("Likes")
        .child("Foods")
        .child(foodId)
        .remove()
        .then(() =>
        {
          resolve("isSuccessfull")
        })
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })
}

async function getFoodData(foodId : string, menuParentId : string, resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const homeNewFoodRef =
        database()
          .ref()
          .child("Menu")
          .child(resId)
          .child(menuParentId)
          .child("Food")
          .child(foodId)

      homeNewFoodRef.on('value', (showDataSnap)  =>
      {
        resolve(showDataSnap.val())
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

//--------------------------------- Restaurant Likes ---------------------------------

async function getRestaurantData(resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const topResRef =
        database()
          .ref()
          .child("ResProfile")
          .child(resId)

      topResRef.on('value', (resProfileSnap)  =>
      {
        resolve(resProfileSnap.val())
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function checkResLikes(resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Restaurants")
          .child(resId)
      showDataRef.once('value').then((snapshot) =>
      {
        resolve(snapshot.val())
      })
    }
    catch (e)
    {
      console.log("CHECK_RES_LIKE_ERROR : " + e);
    }
  })
}

async function resLike(resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId: any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const userProfileObj = {
        resId : resId,
        userId: userId,
        isLike: true
      }

      database().ref()
        .child("Likes")
        .child("Restaurants")
        .child(resId)
        .set(userProfileObj)
        .then(() =>
        {
          resolve("isSuccessfull")
        });

    }
    catch (e)
    {
      console.log("RES_LIKES_ERROR : " + e);
    }
  })
}

async function removeResLike(resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      database()
        .ref()
        .child("Likes")
        .child("Restaurants")
        .child(resId)
        .remove().then(() =>
        {
          resolve("isSuccessfull")
        })
    }
    catch (e)
    {
      console.log("REMOVE_RES_ERROR : " + e);
    }
  })
}

async function addFoodQuanCart(quantity : number,parentCatId : string,resId : string,foodId : string,foodPrice : string,)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const count = quantity + 1 ;
      const userId : any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const cartRef = database().ref()
        .child("AddToCart")
        .child(userId.toString())
        .child(foodId)

      const addToCartObj = {
        quantity : count,
      }

      cartRef.update(addToCartObj)
        .then(() =>
        {
          //navigation.navigate('Main')
        });

    }
    catch (e)
    {
      console.log("ADD_TO_CART_ERROR : " + e);
    }
  })
}

async function removeFoodQuanCart(quantity : number,parentCatId : string,resId : string,foodId : string,foodPrice : string,)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const count = quantity - 1 ;
      const userId : any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const cartRef = database().ref()
        .child("AddToCart")
        .child(userId.toString())
        .child(foodId)

      const addToCartObj = {
        quantity : count,
      }

      cartRef.update(addToCartObj)
        .then(() =>
        {
          //navigation.navigate('Main')
        });

    }
    catch (e)
    {
      console.log("ADD_TO_CART_ERROR : " + e);
    }
  })
}

async function getFoodReviews(foodId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const foodReviewRef =
        database()
          .ref()
          .child("Reviews")
          .child("Food")
          .child(foodId)
      foodReviewRef.on('value', (foodReviewSnap)  =>
      {
        let foodReviewArr : Array<foodReviewObj>  = []
        // @ts-ignore
        foodReviewSnap.forEach((foodReviewChildSnap) =>
        {
          foodReviewArr.push(foodReviewChildSnap.val())
        })
        resolve(foodReviewArr)
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function getResReviews(resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const foodReviewRef =
        database()
          .ref()
          .child("Reviews")
          .child("Restaurant")
          .child(resId)
      foodReviewRef.on('value', (resReviewSnap)  =>
      {
        let resReviewArr : Array<foodReviewObj>  = []
        // @ts-ignore
        resReviewSnap.forEach((resReviewChildSnap) =>
        {
          resReviewArr.push(resReviewChildSnap.val())
        })
        resolve(resReviewArr)
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function getUserData(userId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userRef =
        database()
          .ref()
          .child("UserProfile")
          .child(userId)

      userRef.on('value', (userSnap)  =>
      {
        resolve(userSnap.val())
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function updateFoodNode(status : boolean,resId : string,parentCatId : string,foodId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      database().ref()
        .child("Menu")
        .child(resId)
        .child(parentCatId)
        .child("Food")
        .child(foodId)
        .update({ isFoodAdded : status })
        .then(() =>
        {
          resolve("isSuccessfull")
        })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function addCartNode(resId :string,parentCatId :String,foodId : string,count : number,price : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const cartRef = database().ref()
        .child("AddToCart")
        .child(userId)
        .child(foodId)

      const addToCartObj = {
        isFoodAdded : true,
        parentCatId : parentCatId,
        resId : resId,
        foodId : foodId,
        addToCartKey : cartRef.key,
        userId : userId,
        quantity : count,
        price : price,
        delivery : '12',
      }

      cartRef.set(addToCartObj)
        .then(() =>
        {
          //navigation.navigate('Main')
        });
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function removeFoodCart(addToCartKey :string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      database().ref()
        .child("AddToCart")
        .child(userId)
        .child(addToCartKey)
        .remove();
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  })
}

async function postLike(postId : string, resId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const postObj = {
        postId : postId,
        userId : userId,
        resId : resId,
        isLike : true
      }

      database().ref()
        .child("Likes")
        .child("Post")
        .child(postId)
        .child(userId)
        .set(postObj)
        .then(() =>
        {
          resolve("isSuccessfull")
          //GetFoodData(foodId,menuParentId,foodId)
        });

    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })

}

async function removePostLike(postKey : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      database()
        .ref()
        .child("Likes")
        .child("Post")
        .child(postKey)
        .child(userId)
        .remove().then(() =>
        {
          resolve("isSuccessfull")
        })
    }
    catch (e)
    {
      console.log("REMOVE_RES_ERROR : " + e);
    }
  })
}

async function checkPostLikes(postKey : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Post")
          .child(postKey)
          .child(userId)
      showDataRef.once('value').then((snapshot) =>
      {
        resolve(snapshot.val())
      })
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })
}

async function postBookmark(postId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const bookmarkRef = database().ref()
        .child("Bookmark")
        .child(postId)
        .child(userId)
      const addToCartObj = {
        postKey : postId,
        isSaved : true
      }

      bookmarkRef.set(addToCartObj)
        .then(() =>
        {

        });
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  })
}

async function checkBookmark(postKey : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Bookmark")
          .child(postKey)
          .child(userId)
      showDataRef.once('value').then((snapshot) =>
      {
        resolve(snapshot.val())
      })
    }
    catch (e)
    {
      console.log("CHECK_RES_LIKE_ERROR : " + e);
    }
  })
}

async function removeBookmark(postKey : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      database()
        .ref()
        .child("Bookmark")
        .child(postKey)
        .child(userId)
        .remove().then(() =>
        {
          resolve("isSuccessfull")
        })
    }
    catch (e)
    {
      console.log("REMOVE_RES_ERROR : " + e);
    }
  })
}


//--------------------------------- Restaurant Likes ---------------------------------

async function checkAddToCart(foodId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("AddToCart")
          .child(userId)
          .child(foodId)
      showDataRef.once('value').then((snapshot) =>
      {
        resolve(snapshot.val())
      })
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })
}

async function addToCartFood(price : string,delivery : string,foodId : string,parentCatId : string,resId : string,)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const addToCartRef = database().ref()
        .child("AddToCart")
        .child(userId)
        .child(foodId)

      const addToCartObj = {
        parentCatId : parentCatId,
        resId : resId,
        foodId : foodId,
        isFoodAdded : true,
        addToCartKey : addToCartRef.key,
        userId : userId,
        quantity : 1,
        price : price,
        delivery : delivery,
      }

      addToCartRef
        .set(addToCartObj)
        .then(() =>
        {
          resolve("isSuccessfull")
          //GetFoodData(foodId,menuParentId,foodId)
        });

    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })

}

async function removeAddToCartFood(foodId : string)
{
  return new Promise((resolve,reject) =>
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      database()
        .ref()
        .child("AddToCart")
        .child(userId)
        .child(foodId)
        .remove()
        .then(() =>
        {
          resolve("isSuccessfull")
        })
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  })
}


export default {
  checkFoodLikes,
  foodLike,
  removeFoodLike,
  getFoodData,
  getRestaurantData,
  checkResLikes,
  removeResLike,
  resLike,
  addFoodQuanCart,
  removeFoodQuanCart,
  getFoodReviews,
  getResReviews,
  getUserData,
  updateFoodNode,
  addCartNode,
  removeFoodCart,
  postLike,
  removePostLike,
  checkPostLikes,
  postBookmark,
  checkBookmark,
  removeBookmark,
  checkAddToCart,
  addToCartFood,
  removeAddToCartFood
}
