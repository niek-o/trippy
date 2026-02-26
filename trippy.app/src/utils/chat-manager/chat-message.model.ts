export interface BaseChatMessageModel {
  message: string;
  sender: "User" | "Trippy";
}

export interface ChatMessageModelWithTags extends BaseChatMessageModel {
  type: "Tags";
  data: string[];
}

export interface StringChatMessageModel extends BaseChatMessageModel {
  type: "String";
}

export type ChatMessageModel = ChatMessageModelWithTags | StringChatMessageModel;
