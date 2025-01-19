const Logger = (param: any) => (store: any) => (next: any) => (action: any) => {
  return action;
};
export default Logger;