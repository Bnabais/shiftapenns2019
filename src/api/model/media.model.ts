export interface MediaModel {
  gif: string;
  audio: string;
}

export const emptyMediaModel: () => MediaModel = (): MediaModel => {
  return <MediaModel>{
    gif: '',
    audio: '',
  };
};
