import data from '../../assets/dummy_data/getResReviewList.json'
import { ResProfileModel } from "../../models/dummy_model/ResProfileModel";

export const getResProfileData = () => {
  return data as ResProfileModel;
};
