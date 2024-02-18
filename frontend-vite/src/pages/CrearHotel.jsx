import './CrearHotel.css'

import React, { useEffect, useState } from 'react';
// importar hot toaster
import toast, { Toaster } from 'react-hot-toast';


const CrearHotel = () => {
    const [name, setName] = useState('');
    const [adress, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [parking, setParking] = useState(false);
    const [pool, setPool] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [air, setAir] = useState(false);
    const [gym, setGym] = useState(false);
    const [spa, setSpa] = useState(false);

    useEffect(() => {
        // Verificar si el usuario es un administrador al cargar la página
        const isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin === "true") {
          // Si el usuario es un administrador, obtener las reservas de todos los usuarios
          console.log ("El usuario es un administrador");
          handleSubmit();
        } else {
          // Si el usuario no es un administrador, redirigir a otra página o mostrar un mensaje de acceso denegado
          console.log("Acceso denegado");
        }
      }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === '') {
        document.getElementById('inputNombreHotel').style.borderColor = 'red';
      } else if (adress === '') {
        document.getElementById('inputDireccionHotel').style.borderColor = 'red';
      } else if (city === '') {
        document.getElementById('inputCiudadHotel').style.borderColor = 'red';
      } else if (stars === 0) {
        document.getElementById('inputEstrellasHotel').style.borderColor = 'red';
      } else if (description === '') {
        document.getElementById('inputDescripcionHotel').style.borderColor = 'red';
      } else if (price === 0) {
        document.getElementById('inputPrecioHotel').style.borderColor = 'red';
      } else if (rooms === 0) {
        document.getElementById('inputHabitacionesHotel').style.borderColor = 'red';
      } else {
    try {
        const response = await fetch( 'http://localhost:8090/hotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, adress, city, stars: parseInt(stars), description, price: parseFloat(price), rooms: parseInt(stars), parking, pool, wifi, air, gym, spa }),
        }
            )
        if (response.ok) {
            console.log('Hotel creado');
            toast.success('Hotel creado');
            setTimeout(() => {
                navigate('/home');
            }, 2000); // Redirige después de 2 segundos a la página de inicio
        } else {
            toast.error('Hotel inválido');
            console.log('Hotel inválido');
        }
    } catch (error) {
        console.log(error);
    }
    }


    // Enviar datos al backend



    
  };

  return (
    <div className='genereal'>  
      <form onSubmit={handleSubmit} className='hotel'>
        <div className='nombre'>
          <label>Nombre:</label>
          <input 
          type="text"
           name="name"
            value={name} 
            onChange={(e) => setName(e.target.value)}  />
        </div>
        <div className='direccion'>
          <label>Dirección:</label>
          <input 
          type="text" 
          name="address" 
          value={adress} 
          onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className='ciudad'>
          <label>Ciudad:</label>
          <input 
          type="text" 
          name="city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} />
        </div>

        <div className='descripcion'>
          <label>Descripción:</label>
          <input
          name="description"
           value={description} 
           onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className='estellas'>
          <label>Estrellas:</label>
          <input 
          type="number"
           name="stars" 
           value={stars}
            onChange={(e) => setStars(e.target.value)} />
        </div>
      
          <div className='precio'>
          <label>Precio:</label>
          <input
           type="number" 
           name="price" 
           value={price} 
           onChange={(e) => setPrice(e.target.value)} />
          </div>

      
          <div className='habi'>
          <label>Habitaciones:</label>
          <input 
          type="number"
           name="rooms"
            value={rooms} 
            onChange={(e) => setRooms(e.target.value)} />
          </div>
        
          <div className='aminities'>
          <label>Parking:</label>
          <input
            type="checkbox"
            name="parking"
            checked={parking}
            onChange={(e) => setParking(e.target.checked)}
          />
        
        
          <label>Piscina:</label>
          <input 
          type="checkbox"
           name="pool" 
           checked={pool} 
           onChange={(e) => setPool(e.target.checked)} />
        
      
          <label>Wifi:</label>
          <input 
          type="checkbox" 
          name="wifi" 
          checked={wifi}
            onChange={(e) => setWifi(e.target.checked)} />
        
        
          <label>Aire acondicionado:</label>
          <input
           type="checkbox" 
           name="air" 
           checked={air} 
           onChange={(e) => setAir(e.target.checked)} />
        
        
          <label>Gimnasio:</label>
          <input 
          type="checkbox"
           name="gym" 
           checked={gym} 
           onChange={(e) => setGym(e.target.checked)} />
        
        
          <label>Spa:</label>
          <input
           type="checkbox" 
           name="spa"
            checked={spa} 
            onChange={(e) => setSpa(e.target.checked)} />
        

        </div>
        <div className='botonS' >
          <button type="submit">Crear Hotel</button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CrearHotel;
