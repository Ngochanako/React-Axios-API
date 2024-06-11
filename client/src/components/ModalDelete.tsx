import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
type props={
    confirmDel:()=>void,
    notConfirmDel:()=>void,
}
export default function ModalDelete({confirmDel,notConfirmDel}:props) {

  return (
    <div className='modal'>
        <div className='formModal'>
      <h3>Are you sure want to delete?</h3>
      <div>
      <Button onClick={confirmDel}  variant="warning">OK</Button>{' '}
      <Button onClick={notConfirmDel} variant="danger">Cancel</Button>{' '}
      </div>
      </div>
    </div>
  )
}
