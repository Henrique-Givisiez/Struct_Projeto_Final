"use client"; // ⬅️ Isso transforma o componente em um Client Component

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { getUsers } from "lib/route"; // ⬅️ Corrigido para `getUsers` (não `getUser`)
import { useQuery } from "@tanstack/react-query";
import {useSelector, useDispatch} from 'react-redux'
import { toggleChangeAction, updateAction, deleteAction} from "~/redux/reducer";


export default function Table() {
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers, //buscar todos os usuários
  });

  if (isLoading) return <div>Colaborador está carregando...</div>;
  if (isError) return <div>Erro: {error?.message}</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-16 py-2">Nome</th>
          <th className="px-16 py-2">Email</th>
          <th className="px-16 py-2">Salário</th>
          <th className="px-16 py-2">Nascimento</th>
          <th className="px-16 py-2">Status</th>
          <th className="px-16 py-2">Ações</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data?.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ _id, name, avatar, email, salary, date, status }) {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()
 
  const onUpdate = () => {
    dispatch(toggleChangeAction(_id))
    if(visible){
      dispatch(updateAction(_id))
    }
    const onDelete = () => {
      if(!visible){
        dispatch(deleteAction(_id))
      }
    }
  }
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={avatar || "#"}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {name || "Desconhecido"}
        </span>
      </td>
      <td className="px-16 py-2">{email}</td>
      <td className="px-16 py-2">{salary || "Desconhecido"}</td>
      <td className="px-16 py-2">{date || "Desconhecido"}</td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              status === "Ativo" ? "bg-green-500" : "bg-red-700"
            } text-white px-5 py-1 rounded`}
          >
            {status || "Desconhecido"}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <FiEdit size={25} color={"rgb(34,197,94)"} />
        </button>
        <button className="cursor" onClick={onDelete}>
          <FiTrash2 size={25} color={"rgb(244,63,94)"} />
        </button>
      </td>
    </tr>
  );
}
