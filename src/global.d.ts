interface Window {
  tronLink?: {
    ready: boolean;
    tronWeb: any;
    request: (args: { method: string }) => Promise<any>;
  };
}
