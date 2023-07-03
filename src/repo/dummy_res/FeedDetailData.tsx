import data from '../../assets/dummy_data/getFeedDetailList.json'
import { FeedDetailModel } from "../../models/dummy_model/FeedDetailModel";

export const getFeedDetailData = () => {
  return data as FeedDetailModel;
};
