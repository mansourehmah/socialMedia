export type ResponseType<T> = {
  message: string;
  success: boolean;
  data?: T;
};
