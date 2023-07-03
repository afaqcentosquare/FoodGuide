import data from '../../assets/dummy_data/getHomeMainList.json'
import { HomeMainModel } from "../../models/res_model/HomeMainModel";

export const getHomeMainListRes = () => {
  return data as HomeMainModel;
};
