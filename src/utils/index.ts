const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const createMp3File = async ({
  vocabulary,
}: {
  vocabulary: string;
}): Promise<void> => {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY_OPEN_AI,
  });
  const speechFile = path.join(`./mp3/${vocabulary}.mp3`);
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: vocabulary,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  console.log(speechFile);
};

export { createMp3File };
