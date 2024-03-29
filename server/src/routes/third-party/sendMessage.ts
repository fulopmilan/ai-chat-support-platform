import { Request, Response } from "express";
import { Bot } from "../../configs/db.config";
import { BotData } from "../../models/Bot";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

type Document<T> = {
    pageContent: T;
    metadata: {
        loc: object;
    };
};

const sendMessage = async (req: Request, res: Response) => {
    const prompt = "Answer this as a human: " + req.body.chatHistory[req.body.chatHistory.length - 1];

    const botId = req.query.botId;

    const document: BotData | null = await Bot.findOne({ botKey: botId });
    if (!document)
        return "Bot not found";

    const botName = document.botName;

    try {
        //imports the context from the database
        const contextArray: Document<string>[] = (document.context || []).map(context => ({
            pageContent: context.pageContent,
            metadata: {
                loc: context.metadata.loc,
            },
        }));

        const embeddings = new OpenAIEmbeddings();
        const vectorStore = await FaissStore.fromDocuments(contextArray, embeddings);

        const model = new OpenAI({ temperature: 0 });
        const chain = new RetrievalQAChain({
            combineDocumentsChain: loadQAStuffChain(model),
            retriever: vectorStore.asRetriever({ k: 1 }),
            returnSourceDocuments: true,
        });

        const response = await chain.call({
            query: prompt,
        });

        res.json({ botName, message: response.text });
    }
    catch (err) {
        res.json({ botName, message: `Error on the server side + ${err}` });
    }
}

export default sendMessage;
