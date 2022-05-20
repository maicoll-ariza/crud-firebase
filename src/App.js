import './App.css';
import {firebase} from './firebase'
import swal from 'sweetalert';
import React from 'react';

function App() {
  const [nombre,setNombre]=React.useState('')
  const [nickname,setNickname]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [id,setId]=React.useState('')
  const [lista,setLista]=React.useState([])

  React.useEffect(()=>{
   const obtenerDatos=async()=>{
      try {
        const db= firebase.firestore()
        const data= await db.collection('database-usuarios').get()
        const arrayData= data.docs.map(doc=>({id:doc.id,...doc.data()}))
        console.log(arrayData);
        setLista(arrayData)
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos()
  }, [])
  
  const guardarDatos= async (e)=>{
    e.preventDefault()
    //validaciones
    for (let index = 0; index < lista.length; index++) {
      if (lista[index].nickname===nickname) {
       swal({
         title: "Error",
         text: "No se puede repetir NICKNAME en la tabla",
         icon:"error",
       })
       return
      } 
    }
    if (nickname.trim().length===0 || nombre.trim().length===0||apellido.trim().length===0) {
      swal({
        title: "¡Ops, campos vacios!",
        text: "Asegurate de rellenar todos los campos",
        icon: "error",
      })
    } else if(/\d/.test(nombre)){
      swal({
        title: "¡Ops, valores errados!",
        text: "No se permite numeros en el campo de Nombre",
        icon: "error",
      })
    }else if(/\d/.test(apellido)) {
      swal({
        title: "¡Ops, valores errados!",
        text: "No se permite numeros en el campo de Apellido",
        icon: "error",
      })
    }else {
      try {
        const db=firebase.firestore()
        const nuevoUsuario={
          nickname, nombre, apellido
        }
        const dato= await db.collection('database-usuarios').add(nuevoUsuario)
        setLista([
          ...lista,
          {...nuevoUsuario, id:dato.id}
        ])
        swal({
          title: "¡Valores agregados correctamente!",
          icon: "success"
        })
      } catch (error) {
        console.log(error);
      }
      setApellido('')
      setNickname('')
      setNombre('')
    }
   

  }
  const eliminarDato= async(id)=>{
    swal({
      title: "¿Estás seguro?",
      text: "¡Una vez hecho, no podrás devolver esta acción!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        try {
          const db=firebase.firestore()
          db.collection('database-usuarios').doc(id).delete()
          const newLista= lista.filter((elemento)=>elemento.id!==id)
          setLista(newLista)
        } catch (error) {
          console.log(error);
        }
        swal({
          title: "¡Datos eliminados!",
          icon: "success",
          timer: 2000,
        });
      } 
    });
    
  }
  return (
    <div className='App'>
      <div className='container-form'>
        <h1>Crud en react js con firebase</h1>
        <form onSubmit={guardarDatos} className='form'>
          <div className='container-input'>
            <input type='text' 
              placeholder='Ingrese Nickname'
              className='input'
              onChange={(e)=>{setNickname(e.target.value)}}
              value={nickname}
              />
            <input type='text' 
              placeholder='Ingrese nombre'
              className='input'
              onChange={(e)=>{setNombre(e.target.value)}}
              value={nombre}
              />
              <input type='text' 
              placeholder='Ingrese apellido'
              className='input'
              onChange={(e)=>{setApellido(e.target.value)}}
              value={apellido}
              />
          </div>
          <button className='btn-agregar' type='submit'>Agregar datos</button>
        </form>
      </div>
        <div className='container-table'>
          <h2>Tabla</h2>
          <table className='table-asignacion'>
        <thead>
            <tr>
                <th>Nickname</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>ID</th>
                <th>Acción</th>

            </tr>
        </thead>
        <tbody>
              {lista.map(
                (elemento)=>(
                  <tr className="" key={elemento.id}>
                    <td>{elemento.nickname}</td>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.apellido}</td>
                    <td>{elemento.id}</td> 
                    <td><button 
                    className='btn-eliminar'
                    onClick={()=>eliminarDato(elemento.id)}
                    >Eliminar</button></td>
                  </tr>

                )
              )
              } 
        </tbody>
    </table>
        </div>
    </div>
  );
}

export default App;
