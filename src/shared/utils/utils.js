exports.extractDataIfUnique = data => {
    if (data.length && data.length === 1) {
      return data[0];
    }
    return data;
  };