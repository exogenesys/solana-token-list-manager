function encodeData(data) {
  return Buffer.from(JSON.stringify(data, null, 2), "utf8").toString("base64");
}

function decodeData(data) {
  return JSON.parse(Buffer.from(data, "base64").toString("utf8"));
}

function insertNewToken(newToken, json) {
  let tokenArray = json.tokens;
  tokenArray.push(newToken);
  json.tokens = tokenArray;
  return json;
}

function isValidString(str, max = 1000, min = 0) {
  return (
    str && typeof str === "string" && str.length >= min && str.length <= max
  );
}

function isValidNumber(number) {
  return number && typeof number === "number";
}

function isValidArrayOfStrings(array) {
  return (
    typeof array === "object" &&
    array.reduce(
      (previousValue, currentValue) => typeof currentValue === "string"
    )
  );
}

function isValidObjectOfStrings(object) {
  return (
    typeof object === "object" &&
    Object.values(object).reduce(
      (previousValue, currentValue) => typeof currentValue === "string"
    )
  );
}

function validateToken(token) {
  try {
    let validToken = {
      chainId: 101,
      address: "",
      symbol: "",
      name: "",
      decimals: 9,
      logoURI: "",
      tags: [],
      extensions: {},
    };

    if (isValidNumber(Number(token.chainId)))
      validToken.chainId = Number(token.chainId);
    else throw new Error("invalid token attribute chainId");

    if (isValidString(token.address)) validToken.address = token.address;
    else throw new Error("invalid token attribute address");

    if (isValidString(token.symbol, 10, 3)) validToken.symbol = token.symbol;
    else throw new Error("invalid token attribute symbol");

    if (isValidString(token.name, 20, 1)) validToken.name = token.name;
    else throw new Error("invalid token attribute name");

    if (isValidNumber(Number(token.decimals)))
      validToken.decimals = Number(token.decimals);
    else throw new Error("invalid token attribute decimals");

    if (isValidString(token.logoURI)) validToken.logoURI = token.logoURI;

    if (isValidString(token.tags)) {
      const parsedTags = JSON.parse(token.tags);
      if (isValidArrayOfStrings(parsedTags)) {
        validToken.tags = parsedTags;
      }
    }

    if (isValidString(token.extensions)) {
      const parsedExtensions = JSON.parse(token.extensions);
      if (isValidObjectOfStrings(parsedExtensions)) {
        validToken.extensions = parsedExtensions;
      }
    }

    return validToken;
  } catch (error) {
    console.log(error);
    throw new Error("invalid token: unknown error");
  }
}

module.exports = { insertNewToken, validateToken, encodeData, decodeData };
