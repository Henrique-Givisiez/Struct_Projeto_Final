import { FiCheck }  from "react-icons/fi"


export default function Bug({message}) {
    return(
        <div className="success container mx-auto">
            <div className="flex justify-center mx-auto border border-red-200 bg-red-400 w-3/6 text-black-900 text-md my-4 py-2 text-center bg-opacity-5">
                {message} <FiCheck size={25} color={"rbg(248,113,113)"}></FiCheck>
            </div>
        </div>
    )
}