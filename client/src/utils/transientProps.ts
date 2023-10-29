type Props = Record<string, unknown>;
type TransientProps<T> = {
  [K in keyof T as `$${K & string}`]: T[K];
};

export default function transientProps<T extends Props>(props: T) {
  return Object.keys(props).reduce((newProps, key) => {
    const TransientKey = `$${key}` as keyof TransientProps<T>;
    const value = props[key] as TransientProps<T>[keyof TransientProps<T>];

    newProps[TransientKey] = value;

    return newProps;
  }, {} as TransientProps<T>);
}
