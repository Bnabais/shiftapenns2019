export interface MediaModel {
  type: string;
  source: string;
}

export const emptyMediaModel: () => MediaModel = (): MediaModel => {
  return <MediaModel>{
    type: '',
    source: '',
  };
};
