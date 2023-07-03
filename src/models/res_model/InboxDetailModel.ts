export type InboxDetailModel = {
  data : inboxDetailObj[]
}

export type inboxDetailObj = {
  inboxId : string,
  senderId : string,
  receiverId : string,
  msgTxt : string,
  msgType : string,
}
