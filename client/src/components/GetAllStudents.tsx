import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Input from 'react-bootstrap/InputGroup';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
type Student={
    id:number,
    name:string,
    email:string,
    address:string,
    phone:string,
    create_at:string,
    status:boolean,
}
export default function GetAllStudents() {
    //initialization
    const [activeModal,setActiveModal]=useState<boolean>(false);
    const [activeModalAdd,setActiveModalAdd]=useState<boolean>(false);
    const [typeSubmit,setTypeSubmit]=useState<string>("add")
    const [students,setStudents]=useState<Student[]>([]);
    const [student,setStudent]=useState<Student>({
        id:Math.floor(Math.random()*100000),
        name:'',
        email:'',
        address:'',
        phone:'',
        create_at:'',
        status:true, 
    })
    //function reset form
    const reset=()=>{
        setStudent({
            id:Math.floor(Math.random()*100000),
            name:'',
            email:'',
            address:'',
            phone:'',
            create_at:'',
            status:true, 
        })
    }
    //pagination
    //Initialization
    const [currentPage,setCurrentPage]=useState<number>(1);
    const pages:number[]=[1,2,3];
    
    const totalPages:number=3 
    const handlePage=(page:number)=>{       
        setCurrentPage(page)       
    }
    
     // function load Data from API
     const loadData=()=>{
        axios.get(`http://localhost:1200/students?_page=${currentPage}&_per_page=2`)
        .then(res=>setStudents(res.data.data))
        .catch(err=>console.log(err)
        )
    }
    useEffect(()=>{
        
        loadData();
    },[currentPage]);
    //get Student Info by Id
    const getStudentById=(id:number)=>{
        axios.get(`http://localhost:1200/students/${id}`)
        .then(res=>console.log(res.data))
        .then(err=>console.log('Không tìm thấy')
        )
    }
    //delete Student by Id
    const removeStudentbyId=()=>{
        axios.delete(`http://localhost:1200/students/${student.id}`)
        .then(res=>setStudents(res.data))
        .catch(err=>console.log(err)
        )
        setActiveModal(false)
    }
    // Update Student whenever change Input
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const name=e.target.name;
        const value=e.target.value;
        setStudent({...student,[name]:value});
    }
    //open modal Add
    const openModalAdd=()=>{
        setActiveModalAdd(true);
    }
    //close modal Add
    const notConfirmAdd=()=>{
        setActiveModalAdd(false);
        reset();
    }
    // add new Product
    const createStudent=(e:React.FormEvent)=>{
        e.preventDefault();
        // case type Submit is "Add"
        if(typeSubmit==='add'){
            // call API 'post'
            axios.post('http://localhost:1200/students',student)
            .then(res=>setStudents(res.data))
            .catch(err=>console.log(err)
            )
        }else{
            axios.put(`http://localhost:1200/students/${student.id}`)
            .then(res=>setStudents(res.data))
            .catch(err=>console.log(err))
        }
    }
    // update Student by Id
    const updateStudentById=(id:number)=>{
        setActiveModalAdd(true);
        axios.get(`http://localhost:1200/students/${id}`)
        .then(res=>setStudent(res.data))
        .catch(err=>console.log(err)
        )
        setTypeSubmit("update")
    }
    //confirm Modal Del
    const openModal=(idStudent:number)=>{
       setStudent({...student,id:idStudent});
       setActiveModal(true);
    }
    //not confirm Modal Del
    const notConfirmDel=()=>{
        reset();
        setActiveModal(false);
    }
    return (
    <div style={{padding:'20px'}}>
         {activeModal && <ModalDelete confirmDel={removeStudentbyId} notConfirmDel={notConfirmDel}/>}
        {activeModalAdd && <ModalUpdate student={student} createStudent={createStudent} handleChange={handleChange} notConfirmAdd={notConfirmAdd}/>}
         <Button  style={{marginTop:'20px'}} onClick={openModalAdd} variant="warning">Thêm mới</Button>
      <Table striped bordered hover  style={{marginTop:'20px'}}>
      <thead>
        <tr>
            <th></th>
          <th>STT</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Create_at</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student,index)=>(
            <tr key={student.id}>
                <td><Input.Checkbox aria-label="" /></td>
                <td>{index+1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>{student.create_at}</td>
                <td style={{color:student.status?'green':'red'}}>{student.status?'Đang hoạt động':'Ngừng hoạt động'}</td>
                <td>
                <Button variant="success">Chặn</Button>{' '}
                <Button onClick={()=>updateStudentById(student.id)} variant="warning">Sửa</Button>{' '}
                <Button onClick={()=>openModal(student.id)} variant="danger">Xóa</Button>{' '}
                </td>
            </tr>
        ))}
      </tbody>
    </Table>
    <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
         <div>Hiển thị 2/5 bản ghi</div>
         <div> 
            <Button variant="outline-primary" disabled={currentPage==1}>Trước</Button>{' '}
            {pages.map(page => (
          <Button
            onClick={() => {
              handlePage(page);
            }}
            variant="outline-secondary"
            active={page === currentPage}
          >
            {page}
          </Button>
           ))}
            <Button variant="outline-danger" disabled={totalPages==currentPage} >Sau</Button>{' '}
         </div>
    </div>
    </div>
  )
}
