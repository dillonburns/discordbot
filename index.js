require('dotenv').config()

// discord
const Discord = require('discord.js')
const client = new Discord.Client()

// micro dependencies
const { send } = require('micro')
const { router, get } = require('microrouter')

// funcs
const fuckify = text => {
  let fuckedText = ''

  text.split('').forEach(char => {
    let fuckedChar = Math.random() > 0.5
      ? char.toUpperCase()
      : char.toLowerCase()
    fuckedText += fuckedChar
  })

  return fuckedText
}

// main bot stuff
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.member.user.username !== 'dillbot') {
    let fuckified = fuckify(msg.content)
    msg.channel.send(fuckified)
  }
})

client.login(process.env.BOT_TOKEN)

// deployment specific stuff
const nopages = (req, res) => send(res, 404,
  '<a href="https://discordapp.com/oauth2/authorize?client_id=545059075159752704&scope=bot">invite dillbot</a>')

module.exports = router(
  get('/*', nopages)
)
