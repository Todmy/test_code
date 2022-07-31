# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. I have moved constants to the upper scope since I don't want JS interpreter to create these constants each time I call `deterministicPartitionKey`
2. I have renamed the function since the `dpk` is not the clear name of a file. While somebody will work with this code it will be hard for him/her to identify the file's purpose based on its' name
3. I have moved the functionality that works with `crypto` and creates hash to a separate function with the name `createHash` since it would be nice to have it separately. This kind of functionality can be changed over time. Also, due to SOLID, it would be nice to separate it based on a different function responsibility
4. At the start of execution of the `deterministicPartitionKey` I have decided to break the function execution if the `event` is empty. It will optimize the code since we don't need to pass the rest of it because we already know the answer.
5. I have detected the two main flows:
  - we pass to the function an `event` object (an object that contains `partitionKey`)
  - we pass to the function a random value
6. Based on the above point I split the flow and created `getNormalizeEventPartitionKey` function that is responsible for the normalization of the `event` object
7. I have considered the flow with a random object as simple, so I haven't moved it to a separate function, since it can make the code more complicated