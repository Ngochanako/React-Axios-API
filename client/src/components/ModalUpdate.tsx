import React from 'react'
import Button from 'react-bootstrap/Button';
type props={
    student:{
        id:number,
        name:string,
        email:string,
        address:string,
        phone:string,
        create_at:string,
        status:boolean,
    }
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    createStudent:(e:React.FormEvent)=>void,
    notConfirmAdd:()=>void,
}
export default function ModalUpdate({student,handleChange,createStudent,notConfirmAdd}:props) {
  return (
    <div className='modal'>
      <form action="" className='formModal'>
            <input required onChange={handleChange} name='name' type="text" placeholder='Name' value={student.name} />
            <input required onChange={handleChange} name='email' type="email" placeholder='Email' value={student.email} />
            <input required onChange={handleChange} name='address' type="text" placeholder='Address' value={student.address}/>
            <input required onChange={handleChange} name='phone' type="text" placeholder='Phone' value={student.phone}/>
            <input required onChange={handleChange} name='create_at' type="date" placeholder='Create_at'value={student.create_at} />
            <Button onClick={(e)=>createStudent(e)} variant="warning" type='submit'>Submit</Button>{' '}
            <Button onClick={notConfirmAdd} variant="danger">Cancel</Button>{' '}
        </form>
    </div>
  )
}

