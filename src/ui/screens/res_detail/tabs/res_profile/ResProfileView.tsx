import React, { useEffect, useState } from "react";
import { FlatList,View } from "react-native";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { ResProfileItem } from "./ResProfileItem";
import { getResProfileData } from "../../../../../repo/dummy_res/ResProfileData";

type Props = {}

export const ResProfileView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const [resProfileList,setResProfileList] = useState<any>([])

  useEffect(() =>
  {
    setResProfileList(JSON.parse(JSON.stringify(getResProfileData().data)));
  },[])

  return(
    <View>
      <FlatList
        data={resProfileList}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index}) =>
          <ResProfileItem
            item={item}
            length={resProfileList?.length}
            index={index}/>}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})
