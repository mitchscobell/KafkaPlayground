const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "kafkaplayground",
      brokers: ["192.168.1.233:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "Consumer Group",
    });

    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected!");

    await consumer.subscribe({
      topic: "MyKafkaTopic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(`Received Message: ${result.message.value} on partition ${result.partition}`);
      },
    });
  } catch (ex) {
    console.error(ex);
  } finally {
    
  }
}
