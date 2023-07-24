require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js')
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

const db = process.env.DB_URI;

(async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(db, {
            // keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Connected to database.');

        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(error)
    }


})();