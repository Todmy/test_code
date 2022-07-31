const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    return getNormalizeEventPartitionKey(event);
  } else {
    const data = JSON.stringify(event);
    return createHash(data);
  }
};

function getNormalizeEventPartitionKey({ partitionKey }) {
  let candidate = partitionKey;

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }

  return candidate
}

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}
