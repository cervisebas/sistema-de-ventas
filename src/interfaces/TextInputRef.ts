export interface TextInputRef {
  blur(): void;
  focus(): void;
  clear(): void;
  isFocused(): boolean;
  setNativeProps(nativeProps: object): void;
  setSelection(start: number, end: number): void;
}
