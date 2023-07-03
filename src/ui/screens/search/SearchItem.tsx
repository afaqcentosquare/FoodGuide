import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { searchObj } from "../../../models/res_model/SearchModel";
import database from "@react-native-firebase/database";
import Helper from "../../../helper/Helper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Fonts } from "../../../config";

type Props = {
  item : searchObj
}

type searchNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SearchItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<searchNavProp>();
  const {themedColors} = usePreferredTheme();
  const { resImg,name,rating,location } = props.item;
  const { resId } = props.item;
  const [checkSearchResLike,setCheckSearchResLike] = useState(false);

  function checkSearchLikes(resId : string)
  {
    Helper.checkResLikes(resId)
      .then((result : any) =>
      {
        if (result == null)
        {
          searchResLikes(resId)
        }
        else
        {
          removeSearchResLike(resId)
        }
      })
  }

  function getSearchResLikes(resId : string)
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Restaurants")
          .child(resId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setCheckSearchResLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("SEARCH_RES_ERROR : " + e);
    }
  }

  function searchResLikes(resId : string)
  {
    Helper.resLike(resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getSearchResLikes(resId)
        }
      })
  }

  function removeSearchResLike(resId : string)
  {
    Helper.removeResLike(resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          searchResLikes(resId)
        }
      })
  }

  useEffect(() =>
  {
    getSearchResLikes(resId)
  },[])

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('ResDetail',{res_id : resId,res_name:name})}
      activeOpacity={0.6}
      style={styles.searchItemMainCont}>
      <View style={styles.searchItemSubCont}>
        <View style={styles.searchItemImgCont}>
          {resImg !== '' ?
            <Image
              style={styles.searchItemImg}
              source={{ uri: resImg }} /> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={24}
              name={"images"}/>}
        </View>
        <TouchableOpacity
          onPress={() => checkSearchLikes(resId)}
          activeOpacity={0.6}
          style={[styles.searchHeartIconCont,{backgroundColor:themedColors.iconBgColor}]}>
          {checkSearchResLike ?
            <MaterialCommunityIcons
              size={15}
              color={themedColors.red}
              name={"cards-heart"}/> :
            <MaterialCommunityIcons
              color={themedColors.primaryIconColor}
              size={15}
              name={"cards-heart-outline"}/>}
        </TouchableOpacity>
        <View style={[styles.searchItemNameCont,{backgroundColor:themedColors.transparent}]}>
          <View>
            <AppText
              style={[styles.searchItemNameTxt,{color:themedColors.white}]}
              numberOfLine={1}
              text={name != '' ? name : ''}/>
          </View>
          <View style={styles.searchItemTxtCont}>
            <View>
              <Ionicons
                color={themedColors.white}
                size={15}
                name={"location"}/>
            </View>
            <View style={styles.searchItemLocTxtCont}>
              <AppText
                style={[styles.searchItemLocTxt,{color:themedColors.white}]}
                numberOfLine={1}
                text={location != '' ? location : ''}/>
            </View>
          </View>
          <View style={styles.searchItemStarCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.searchItemRateTxtCont}>
              <AppText
                style={[styles.searchItemRateTxt,{color:themedColors.white}]}
                text={rating != 0 ? rating.toFixed(1) : "0.0"}/>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  searchItemMainCont : {
    flex:1,
    maxWidth:'50%',
  },
  searchItemSubCont : {
    flex:1,
    margin:SPACE.sm,
    borderRadius:BORDER_RADIUS.lg,
  },
  searchItemImgCont : {
    flex:1
  },
  searchItemImg : {
    width:'100%',
    resizeMode:'cover',
    borderRadius:BORDER_RADIUS.lg,
    height:300
  },
  searchHeartIconCont : {
    marginEnd:SPACE._2md,
    marginTop:SPACE._2md,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    height:25,
    width:25,
    position:'absolute',
    top:0,
    right:0,
  },
  searchItemNameCont : {
    position:'absolute',
    bottom:SPACE.sm,
    left:SPACE.sm,
    right:SPACE.sm,
    borderRadius:BORDER_RADIUS.lg,
    marginTop:SPACE._2lg,
    paddingTop:SPACE.sm,
    paddingBottom:SPACE.sm,
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
  },
  searchItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  searchItemLocTxtCont : {
    flex:1,
    marginStart:SPACE._2xs,
  },
  searchItemLocTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  searchItemStarCont : {
    alignItems:'center',
    flexDirection:'row'
  },
  searchItemRateTxtCont : {
    flex:1,
    marginStart:SPACE._2xs,
  },
  searchItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  searchItemTxtCont : {
    flex:1,
    alignItems:'center',
    flexDirection:'row'
  },
})
