import { useState, useEffect } from "react";
import { FiTrash, FiEdit3, FiCheck, FiEdit } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userSlice";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEdit = (id, name, email) => {
    setEditableUserId(id);
    setEditableUserName(name);
    setEditableUserEmail(email);

  }

  const updateHandler = async(id) => {
    try{
        await updateUser({
            userId : id,
            name : editableUserName,
            email : editableUserEmail,
        })

        setEditableUserId(null)
        refetch()

    }catch(error){
        toast.error(error.data.Message || error.eror)

    }

  }

  const deleteHandler = async(id) => {
    if(window.confirm("Do you want to delete user?")){
        try{
            await deleteUser(id)
        }catch(error){
            toast.error(error?.data?.Message || error.error)
        }

    }

  }

  return (
    <div className="p-4 text-center">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row ">
          <AdminMenu/>
          <table className="w-full  md:w-4/5 mx-[10rem]">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}> 
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{editableUserId === user._id ? (
                        <div className="flex items-center">
                            <input type="text" value={editableUserName} 
                            onChange={(e) =>setEditableUserName(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            />
                            <button onClick={() => updateHandler(user._id)}
                                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg  ">
                                    <FiCheck className="ml-[1rem]"/>
                                    </button>
                        </div>
                    ): (
                        <div className="flex items-center">
                            {user.name} {" "}
                            <button onClick={() => toggleEdit(user._id, user.name, user.email)}>
                                <FiEdit3/>
                            </button>
                        </div>
                    )}
                    </td>
                    <td className="px-4 py-2">
                        {editableUserId === user._id ? (
                            <div className="flex items-center">
                                <input type="text" 
                                value={editableUserEmail} 
                                onChange={(e) => setEditableUserEmail(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                />
                                <button onClick={() => updateHandler(user._id)}
                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                        <FiCheck />
                                    </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                 <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                <button onClick={() => toggleEdit(user._id, user.name, user.email)}>
                                    <FiEdit className="ml-[1rem]"/>
                                </button>
                            </div>
                        ) }
                    </td>
                    <td className="py-2 px-4 ">
                        {user.isAdmin ? (
                            <FiCheck style={{color: 'green'}}/>
                        ) : (
                            <FaTimes style={{color : "red"}} />
                        )}

                    </td>
                    <td>
                        {!user.isAdmin && (
                            <div className="flex">
                                <button onClick={() => deleteHandler(user._id)}
                                    className="bg-red-500 hover:bg-red-900 text-white py-2 px-4 font-bold rounded">
                                        <FiTrash />
                                    </button>
                            </div>
                        )}
                    </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
