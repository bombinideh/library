export default function nonNullData(data: any) {
  return Object.keys(data).reduce(
    (obj, key) => {
      const value = data[key as keyof typeof data];

      if (value) obj[key as keyof typeof obj] = value;

      return obj;
    },
    {} as typeof data,
  );
}
