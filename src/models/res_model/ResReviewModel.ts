export type ResReviewModel = {
  data : resReviewObj[]
}

export type resReviewObj = {
  resReviewKey: string
  rating: number
  review: string
  userId: string,
  resId : string
}
