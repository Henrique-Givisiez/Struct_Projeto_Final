import { FiRefreshCcw } from "react-icons/fi";
import Success from "./success";
import Bug from "./bug";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { getUser, getUsers, updateUser } from "lib/route";
import { object } from "zod";
//import { getUsers } from "./database/controlller";

export default function UpdateUserForm({ formId, formData, setFormData }) {
    const queryClient = useQueryClient(); // ✅ Pegando a instância correta do React Query
  
    // ✅ Corrigido para React Query v5
    const { isLoading, isError, data } = useQuery({
      queryKey: ["users", formId],
      queryFn: () => getUser(formId),
    });
  
    const UpdateMutation = useMutation({
      mutationFn: (newData) => updateUser(formId, newData),
      onSuccess: async (data) => {
        console.log("Informações atualizadas!");
  
        
        queryClient.setQueryData(["users"], (oldData) =>
          oldData ? [...oldData, data] : [data]
        );
  
        
        await queryClient.prefetchQuery({
          queryKey: ["users"],
          queryFn: getUsers,
        });
      },
    });
  
  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar os dados</div>;

  // Destructuring dos dados retornados da API
  const { name, avatar, salary, date, email, status } = data || {};
  const [primeronome, sobrenome] = name ? name.split(" ") : ["", ""];

  const handleSubmit = (e) => {
    e.preventDefault();
    let userName = `${formData.primeronome ?? primeronome} ${formData.sobrenome ?? sobrenome}`;
    let updatedData = { ...data, ...formData, name: userName };

    console.log("Enviando:", updatedData);
    UpdateMutation.mutate(updatedData);
  };

  return (
    <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={primeronome}
          name="primeronome"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Primeiro Nome"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={sobrenome}
          name="sobrenome"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Sobrenome"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={email}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={salary}
          name="salario"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salário"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          defaultValue={date}
          name="data"
          className="border px-5 py-3 focus:outline-none rounded-md"
          placeholder="Data de Nascimento"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            defaultChecked={status === "Ativo"}
            onChange={setFormData}
            value="Ativo"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-900">
            Ativo
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            defaultChecked={status !== "Ativo"}
            onChange={setFormData}
            value="Inativo"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-900">
            Inativo
          </label>
        </div>
      </div>

      <button className="flex justify-center text-md w-2/6 bg-gray-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-gray-500 hover:text-gray-500">
        Update <span className="px-3"><FiRefreshCcw size={20} /></span>
      </button>
    </form>
  );
}
