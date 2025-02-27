"use client";

import { useReducer } from "react"
import { FiPlus } from "react-icons/fi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addUser, getUsers } from "lib/route";


export default function AddUserForm(formData, setFormData) {

    const queryClient = useQueryClient()
    const addMutation = useMutation({
      mutationFn: addUser, 
      onSuccess: () => {
        queryClient.prefetchQuery('users', getUsers)
      },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(formData).length == 0) return console.log("Formulário vazio");
        let{primeronome,sobrenome, email, salario, data, status } = formData;

        const model = {
            name: `${primeronome} ${sobrenome}`,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg`,
            email, 
            salary: `${salario}`, 
            date: `${data}`, 
            status: status ?? "Ativo"
        }

        addMutation.mutate(model)
    }

    //if(object.keys(formData).length > 0) return <Bug message={"Error"}></Bug>
    if(addMutation.isLoading) return <div>Carregando!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return <Success message={"Adicionado com sucesso"}></Success>

    

    return(
        <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="primeronome" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="PrimeiroNome"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="sobrenome" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Sobrenome"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="salario" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Salário"/>
            </div>
            <div className="input-type">
                <input type="date" onChange={setFormData} name="data" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Nascimento"/>
            </div>


            <div className="flex gap-10 items-center"> 
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Ativo" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 aling-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-900">
                        Ativo
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Inativo" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 aling-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block text-gray-900">
                        Inativo
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
             Add <span className="px-1"><FiPlus size={24}></FiPlus></span>
            </button>
        </form>
    )
}