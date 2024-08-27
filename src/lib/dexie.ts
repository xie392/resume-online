import Dexie, { Table } from "dexie";

export class Storage extends Dexie {
  private_messages!: Table<any>;
  //   group_messages!: Table<Message>;
  //   chat_list!: Table<ChatData>;
  //   request_list!: Table<RequestData>;
  //   contact_list!: Table<ContactData>;
  //   groups_list!: Table<GroupData>;
  //   gropus_members!: Table<GroupMemberData>;

  constructor(name: string, version: number = 1) {
    super(name);
    this.version(version).stores({
      private_messages:
        "&msg_id, dialog_id, content, type, sender_id, receiver_id",
      group_messages:
        "&msg_id, dialog_id, content, type, sender_id, receiver_id, group_id",
      chat_list: "&dialog_id, dialog_name, dialog_avatar, top_at, last_message",
      request_list: "&request_id, dialog_id", // TODO: add more fields
      contact_list: "&user_id", // TODO: add more fields
      groups_list: "&group_id", // TODO: add more fields
      gropus_members: "++id, group_id, user_id", // TODO: add more fields
    });
  }
}
