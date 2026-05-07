interface Props{
    onClick:()=>void;
}
export default function SubmitButton({onClick}:Props){
    return(
        <button onClick={onClick} className="bg-black text-white rounded-xl px-5 py-3">
            Submit Answer
        </button>
    )
}