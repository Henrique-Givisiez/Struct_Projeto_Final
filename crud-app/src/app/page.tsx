"use client";
//import Link from "next/link";
import Head from 'next/head';
import { FiCheck, FiUserPlus, FiX } from "react-icons/fi";
import Table from "~/app/_components/table";
import Form from "~/app/_components/form";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, deleteAction } from '~/redux/reducer';
import { deleteUser, getUsers } from 'lib/route';
import { useQueryClient } from '@tanstack/react-query';




//import { LatestPost } from "~/app/_components/post";
//import { api, HydrateClient } from "~/trpc/server";

export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId )
  const queryclient = useQueryClient();
  const dispatch = useDispatch()

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const deletehandler = async () => {
    if(deleteId){
       await deleteUser(deleteId);
       await queryclient.prefetchQuery('users', getUsers)
       await dispatch(deleteAction(null))
    }
   
  }

  const cancelhandler = () => {
      console.log("cancel")
      await dispatch(deleteAction(null))

  }



  return (
    <section>
      <Head>
        <title>CRUD application</title>
      </Head>

      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center fopnt-bold py-10"> Colaboradores </h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button onClick={handler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md houver:bg-blue-700 hover:text-white flex">
              Add Colaborador <span className="px-1"> <FiUserPlus size={23}/> </span>
            </button>
          </div>
          {deleteId ? DeleteComponent({deletehandler, cancelhandler}): <></>}
        </div>


     
      {visible ? <Form></Form> : null}
      
      


      <div className="container mx-auto ">
        <Table></Table>
      </div>

      </main>
    </section>
  )

}

function DeleteComponent({deletehandler, cancelhandler}){
  <div className='flex gap-5'>
    <p>
      Tem certeza?
      <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-500'>
        Sim <span className='px-1'><FiX color='rgb(255 255 255)' size={25}/></span></button>
      <button onClick={cancelhandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-500'>
        Não<span className='px-1'><FiCheck color='rgb(255 255 255)' size={25}/></span></button>
    </p>
  </div>
}
 

