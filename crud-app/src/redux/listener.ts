import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleChangeAction, updateAction } from "./reducer";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening(
    {
        actionCreator: toggleChangeAction,
        effect:async(actionAsyncStorage,listenerApi) => {
            listenerApi.dispatch(updateAction(actionAsyncStorage.payload))
        }
    }
)

export default listenerMiddleware