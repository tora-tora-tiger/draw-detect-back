function ok<T>(data: T) {
  return {
    isSuccess: true,
    data,
  };
}

export { ok };
