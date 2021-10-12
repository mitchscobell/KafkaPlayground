const Topic = require("./topic");
const Producer = require("./producer");
const Consumer = require("./consumer");
run();

async function run() {
  console.log("started");
  const topicName = "NewTopic2";
  const message = "Message!!";
  const consumerGroup = "Consumer"

  console.log(`Creating Topic ${topicName}`)
  const topic = new Topic(topicName);
  await topic.topicRun();

  console.log(`Creating Producer for topic ${topicName}`)
  const producer = new Producer(message, topicName);
  await producer.producerRun();

  const consumer = new Consumer(consumerGroup, topicName);
  await consumer.runConsumer();

  process.exit(0);
}
