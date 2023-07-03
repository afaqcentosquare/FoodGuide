import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, height, SPACE,} from "../../../config/Dimens";

type Props = {}

export const HomeBannerLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={styles.hbMainCont}>
      <View style={{marginTop:SPACE._2lg,flexDirection:'row'}}>
        <View style={styles.hbImg1Cont}>
          <Image
            style={styles.hbImg1}
            source={require('../../../assets/images/banner_img_1.png')}/>
        </View>
        <View style={styles.hbImg2MainCont}>
          <View style={styles.hbImg2Cont}>
            <Image
              style={styles.hbImg2}
              source={require('../../../assets/images/res_img.jpeg')}/>
          </View>
          <View style={styles.hbImg3Cont}>
            <Image
              style={styles.hbImg3}
              source={require('../../../assets/images/res_img.jpeg')}/>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  hbMainCont : {
    marginBottom:SPACE._2md,
    marginEnd:SPACE._2lg,
    marginStart:SPACE._2lg
  },
  hbImg1Cont : {
    flex:1,
    marginEnd:SPACE._2xs
  },
  hbImg1 : {
    flex:1,
    borderRadius:BORDER_RADIUS.lg,
    width:'100%',
    height:height / 2 * 0.45
  },
  hbImg2MainCont : {
    flex:1,
    justifyContent:'center',
    marginStart:SPACE.xs
  },
  hbImg2Cont : {
    flex:1,
  },
  hbImg2 : {
    resizeMode:'cover',
    borderRadius:BORDER_RADIUS.lg,
    width:'100%',
    height:140
  },
  hbImg3Cont : {
    flex:1,
    marginTop:SPACE._2md,
  },
  hbImg3 : {
    borderRadius:BORDER_RADIUS.lg,
    width:'100%',
    height:140
  }
})
