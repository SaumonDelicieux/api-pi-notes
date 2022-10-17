export interface INote {
  folderId: string;
  userId: string;
  title: string;
  text: string;
  state: string;
  creationDate: Date;
  lastUpdateDate: Date;
}