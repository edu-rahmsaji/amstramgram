export const allowedTypeParams = ["", "text"] as const;
export type TypeParam = typeof allowedTypeParams[number];
