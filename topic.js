const { Kafka } = require("kafkajs");

run();

async function run() {

  try {
    const kafka = new Kafka({
      clientId: "kafkaplayground",
      brokers: ["192.168.1.233:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected!");

    await admin.createTopics({
      topics: [
        {
          topic: "MyKafkaTopic",
          numPartitions: 2,
        },
      ],
    });

    console.log("Created Successfully!");
    await admin.disconnect();

  } catch (ex) {
    console.error(ex);
  } finally {
    process.exit(0);
  }
}
