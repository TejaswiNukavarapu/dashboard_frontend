import React, { useEffect, useState } from 'react'
import Table from '../components/table'
import arrow from "../assets/arrow.png"
import { useNavigate } from 'react-router';
import Delete from '../assets/Teaminfo/delete.svg';
import Edit from '../assets/Teaminfo/edit.svg';

export default function Admins() {

  const [data, setData] = useState([])
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // Fetch HR users
  useEffect(() => {
    fetch("http://localhost:3000/api/users?role=HR")
      .then(res => res.json())
      .then(data => {
        console.log("this is data serach........", data)
        setData(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  // Fetch Roles (Teams)
  const Teams = async () => {
    try {
      const data = await fetch(`http://localhost:3000/api/users/roles`)
      const response = await data.json()
      console.log("team..........", response)

      // convert roles array -> table row objects
      const formatted = response.roles.map((role) => ({
        roles: role,
        employeeCount: 0,       //  will fill later if you want
        contact: "-",
        paymentCount: 0,
        _id: role               // for navigation button
      }))

      setTeam(formatted)
      console.log("team set → ", formatted)
    } catch (error) {
      console.log("error occured", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Teams()
  }, [])

  const handleDelete = (_id) => {
    console.log("delete", _id)
  }

  const handleEdit = (row) => {
    console.log("edit", row)
  }

  const columns = [
    {
      id: 'roles',
      header: 'Team Name',
      cell: (row) => (
        <button onClick={() => navigate(`/spfroles`, { state: row._id })}>
          <div className='flex jusify-center align-center item-center gap-2'>
            <p className='text-[#004aad]'>{row.roles}</p>
            <img src={arrow} alt="arrow" className='w-3 h-3' />
          </div>
        </button>
      )
    },

    {
      id: 'No. of Members',
      header: 'No. of Members',
      cell: (row) => (
        <div>{row.employeeCount}</div>
      )
    },

    { id: 'contact', header: 'Contact Number' },
    { id: 'Payment Count', header: 'Payment Count' },

    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-5 ml-5">
          <button onClick={() => handleDelete(row._id)}>
            <img src={Delete} className="w-5 h-6" />
          </button>
          <button onClick={() => { handleEdit(row) }}>
            <img src={Edit} alt="Edit" className="w-7 h-7" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <h1>Admins</h1>
      <Table data={team} columns={columns} />
    </div>
  )
}
