interface Props{
    onClick:()=>void;
    disabled?:boolean;
}
export default function SubmitButton({onClick,disabled}:Props){
    return(
        <button onClick={onClick} disabled={disabled} className="bg-black text-white rounded-xl px-5 py-3">
            Submit Answer
        </button>
    )
}