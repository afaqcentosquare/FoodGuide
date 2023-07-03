export type FoodReviewModel = {
  data : foodReviewObj[]
}

export type foodReviewObj = {
  foodReviewKey: string
  rating: number
  review: string
  userId: string,
  foodId : string
}
