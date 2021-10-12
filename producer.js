const { Kafka } = require("kafkajs");

const message = process.argv[2];

run();

async function run() {
  if (!message) {
    console.log("No Message Entered!");
    return;
  } else {
    try {
      const kafka = new Kafka({
        clientId: "kafkaplayground",
        brokers: ["192.168.1.233:9092"],
      });

      const producer = kafka.producer();
      console.log("Connecting...");
      await producer.connect();
      console.log("Connected!");

      // if message is uppercase, partition 0, else partition 1
      const partition = message[0] < "a" ? 0 : 1;

      await producer.send({
        topic: "MyKafkaTopic",
        messages: [
          {
            value: message,
            partition: partition,
          },
        ],
      });
      console.log("Sent successfully!");
    } catch (ex) {
      console.error(ex);
    } finally {
      console.log("exiting...");
      process.exit(0);
    }
  }
}
