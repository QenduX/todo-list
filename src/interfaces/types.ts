interface ITodo {
    id: number;
    description: string;
    isReady: boolean;
}

interface IOption {
    value: string;
    title: string;
}

type TSearchValue = string;
type TInputValue = string;


export { type ITodo, type IOption, type TSearchValue, type TInputValue };