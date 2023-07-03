export type InboxDetailModel = {
  data : inboxObj[]
}

export type inboxObj = {
  inboxId : string,
  senderId : string,
  receiverId : string,
  msgTxt : string,
}
