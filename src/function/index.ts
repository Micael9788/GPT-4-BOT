import axios from "axios";
import {
   z
} from "zod";

type IApiGetProps = {
   message: string;
}

const messageSchema = z.object(
   {
      message: z.string().nonempty("digite algo").min(3)
   }
);

export const apiGet = async ({
   message
}: IApiGetProps) => {
   try {

      messageSchema.parse({
         message
      });

      const response = await axios.post("https://api.openai.com/v1/chat/completions",
         {
            model: "gpt-4",
            messages: [{
               role: "system",
               content: "Você é um bot que responde sobre qualquer coisa"
            },
               {
                  role: "user",
                  content: message
               }],
            max_tokens: 400
         },
         {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'seu token aqui'
         }
      );

      return response.data.choices[0].message.content;

   } catch (error) {
      if (error instanceof z.ZodError) {
         return error.errors[0].message;
      }
      if (error instanceof AxiosError) {
         return error.response.data.message;
      }
   }
}