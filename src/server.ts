import {
   apiGet
} from "./function";
import {
   Telegraf,
   Context
} from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf < Context > (process.env.BOT_TOKEN);

bot.command("ask", async ctx => {
   const message = ctx.message.text;
   const resposta = await apiGet( {
      message: message
   });
   const newResposta = resposta.replace(/[-*_()[\]~>#+=|{}.!]/g, '\\$&').replaceAll(/"/g, "\\\"");
   await ctx.telegram.sendMessage(ctx.chat.id, newResposta, {
      parse_mode: 'MarkdownV2'
   });
});

bot.launch()
.then(() => {
   console.log('Bot is up and running');
})
.catch((error) => {
   console.error('Failed to launch bot', error);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));