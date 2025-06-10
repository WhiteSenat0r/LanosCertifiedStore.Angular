export interface HasIdAndName {
  id: string;
  name: string;
}

export function isHasIdAndName(obj: unknown): obj is HasIdAndName {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as any).name === 'string'
  );
}
