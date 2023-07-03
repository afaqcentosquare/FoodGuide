import React from 'react' ;
import {Animated, FlatList, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {OnBoardItem} from "./OnBoardItem";
import {Paginator} from "./Paginator";
import colors from "../../../config/colors";
import {AppButton} from "../../components/AppButton";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import { GILROY, MONTSERRAT, POPPINS, Strings } from "../../../config";

type Props = {
  slideRef : React.MutableRefObject<null>,
  slideData : any,
  itemChange : any,
  config : { viewAreaCoveragePercentThreshold : number },
  currentIndex : number,
  checkLastItem : () => void,
  scrollX : Animated.Value,
  changeScreen : () => void
}


export const OnBoardingView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const onboardTxt = Strings.onBoarding;

  const changeBtnLayout = () =>
  {
    if(props.currentIndex === props.slideData.length - 1)
    {
      return (
        <View style={styles.onBoardFinishBtnContainer}>
          <AppButton
            visible={true}
            btnContStyle={[styles.onBoardFinishBtnCont,{backgroundColor:themedColors.commonBtnColor}]}
            btnTxtStyle={[styles.onBoardBtnTxt,{color:colors.colors.white}]}
            onPress={props.changeScreen}
            text={onboardTxt.onBoardFinishBtnTxt} />
        </View>
      )
    }
    else
    {
      return(
        <View style={styles.onBoardBottomContainer}>
          <View style={styles.onBoardIndicator}>
            <Paginator
              data={props.slideData}
              scrollX={props.scrollX}/>
          </View>
          <View style={styles.onBoardBtnCont}>
            <AppButton
              visible={true}
              btnContStyle={[styles.onBoardLoginBtnCont,{backgroundColor:themedColors.commonBtnColor}]}
              btnTxtStyle={[styles.onBoardBtnTxt,{color:colors.colors.white}]}
              onPress={props.checkLastItem}
              text={onboardTxt.onboardNextBtnTxt} />
          </View>
        </View>
      )
    }
  }

  return(
    <SafeAreaView style={styles.onBoardMainContainer}>
      <StatusBar backgroundColor={colors.colors.white}/>
      <View style={styles.onBoardContainer}>
        <View style={{flex:1}}>
          <FlatList
            ref={props.slideRef}
            data={props.slideData}
            horizontal={true}
            pagingEnabled={true}
            bounces={false}
            onMomentumScrollEnd={() => changeBtnLayout()}
            scrollEventThrottle={32}
            onScroll={Animated.event([{nativeEvent:{contentOffset : { x : props.scrollX}}}], {useNativeDriver : false})}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={props.itemChange}
            viewabilityConfig={props.config}
            renderItem={({item}) => <OnBoardItem item={item}/>}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
        {changeBtnLayout()}
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  onBoardMainContainer: {
    backgroundColor:colors.colors.white,
    flex : 1,
  },
  onBoardContainer : {
    backgroundColor:colors.colors.white,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  onBoardBottomContainer: {
    paddingBottom:30,
    paddingTop:30,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  onBoardFinishBtnContainer: {
    paddingBottom:30,
    paddingTop:30,
  },
  onBoardIndicator: {
    flex:1,
    paddingStart:SPACE._2xl
  },
  onBoardLoginBtnCont: {
    height:45,
    paddingStart:30,
    paddingEnd:30
  },
  onBoardBtnTxt: {
    fontFamily:MONTSERRAT.semi_bold,
    letterSpacing:2,
    fontSize:FONT_SIZE._2xs
  },
  onBoardFinishBtnCont: {
    height:45,
    paddingStart:60,
    paddingEnd:60
  },
  onBoardBtnCont: {
    paddingEnd:SPACE._2xl
  }
})
