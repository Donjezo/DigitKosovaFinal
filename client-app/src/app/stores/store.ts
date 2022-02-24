import { useContext, createContext } from "react";
import CommonStore from "./commonStore";
import GradesStore from "./gradesStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store{
    commonStore : CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    gradesStore: GradesStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    gradesStore: new GradesStore()
}

export const StoreContext = createContext(store);

// react hook that allows to use our stores inside our components
export function useStore() {
    return useContext(StoreContext);
}