// {
//     success: true,
//     message: "",
//     data: {}
// }

interface successOnePayload<T> {
  success: true;
  message: string;
  data: T;
}

export const responseSuccessOne = <T>(
  message: string = "SUCCESS",
  data: T,
): successOnePayload<T> => ({
  success: true,
  message,
  data,
});

// {
//     success: true,
//     message: "",
//     data: [{}],
//     pagination: {total: , page: , limit: , totalPages: }
// }

interface paginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

interface successManyPaload<T> {
  success: true;
  message: string;
  data: T[];
  pagination: paginationMeta;
}

export const responseSuccessMany = <T>(
  message: string = "SUCCESS",
  data: T[],
  meta: paginationMeta,
): successManyPaload<T> => ({
  success: true,
  message,
  data,
  pagination: { ...meta, totalPages: Math.ceil(meta.total / meta.limit) },
});

// {
//     success: false,
//     message: "",
//     error: {} || unkown
// }

interface ErrorPayload {
  success: false;
  message: string;
  error?: unknown;
}

export const responseError = (
  message: string,
  error?: unknown,
): ErrorPayload => ({
  success: false,
  message,
  ...(error !== undefined && error),
});
