export interface IValidationError {
  value: string;
  property: string;
  message: {
    [key: string]: string;
  };
}
