const { deterministicPartitionKey } = require("./deterministicPartitionKey");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given null input", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("Returns the same partition key if pass event with partition key", () => {
    const event = {
      partitionKey: "d7d6204c49ba62f96a80023d558aeaf9955d10ecfab1e4c71a7de4ac024b416255e0e27ae274d1923038d37fa4830f509cf132b068939e106a53958e07561511"
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns the same partition key if pass event with partition key", () => {
    const event = {
      partitionKey: "d7d6204c49ba62f96a80023d558aeaf9955d10ecfab1e4c71a7de4ac024b416255e0e27ae274d1923038d37fa4830f509cf132b068939e106a53958e07561511"
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns stringified partition key if passed event has not a string partition key", () => {
    const event = {
      partitionKey: 32
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("32");
  });

  it("Normalizes string partition key length to the max allowed", () => {
    const event = {
      partitionKey: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    const encryptedKey = "0e861535e9a92bc92266bb94769ef034af43ec35ccdaf2b9e4ed57cdf92cf40f318b62a1df766106fec3263f1371484794793d1571fabad052df43ad2e4d72c3"
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(encryptedKey);
  });

  it("Turns random string to deterministic partition key", () => {
    const event = "random key"
    const encryptedKey = "2e793c17528f917c69f6ccfce40099890d2e7785d5aeb1500756a7607bc81ef41c61e8f4d41d84c1146e466bec2e7cb58d009b0c940621b280c6dfb7d2b82af0";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(encryptedKey);
  });

  it("Turns random integer to deterministic partition key", () => {
    const event = 42
    const encryptedKey = "4e94ccd8d7dc0381681ba14408f5a4f7a9834d0101b1e21db1396f9bf431c852a5a3eabd3aeb6195ff3d490625a6ea75d0a7fc3761b20e1fdbc57bd0758286dc"
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(encryptedKey);
  });
});
