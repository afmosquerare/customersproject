import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from '../assets/styles/styles';
import axios from 'axios';
import { useState } from 'react';


export default function Customer() {
  // configuración del formulario
   
  const URL = 'http://127.0.0.1:3000/api'
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const [idSearch, setIdSearch] = useState('')

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = data => console.log(data);

  function showMessage(message,time=2000){
    setMessage(message);
    setTimeout(() => {
      setMessage('')
    }, time);
  }

  const onSave = async(data) =>{
    const { firstName, lastName} = data;
    const nombre = firstName;
    const apellidos = lastName;
    const response = await axios.post(`${URL}/clientes`,{
      nombre,
      apellidos
    })
    if(response){
      setHasError(false);
      showMessage('Se guardó el cliente');
    }
    else{
      setHasError(true);
      showMessage('No se guardó el cliente.')
    }
  }

  const onSearch = async() => {
   const response = await axios.get(`${URL}/clientes/${idSearch}`);
   if(!response.data.error){
    console.log(response.data);
    setHasError(false);
    showMessage('Se buscó el cliente');
    setValue("firstName", response.data.nombre);
    setValue("lastName", response.data.apellidos);
  }
  else{
    setHasError(true);
    showMessage('El id del cliente no existe...')
  }

  }

  const onUpdate = async(data) => {
    const { firstName, lastName} = data;
    const nombre = firstName;
    const apellidos = lastName;
    const response = await axios.put(`${URL}/clientes/${idSearch}`,{
      nombre,
      apellidos
    })
    if(!response.error){
      setHasError(false);
      showMessage('Se actualizó el cliente');
    }
    else{
      setHasError(true);
      showMessage('No se actualizó el cliente.')
    }
  }

  const onDelete = async()=> {
    if(confirm('Are you sure you want to delete this client?')){
      if(idSearch != ''){
        const response = await axios.delete(`${URL}/clientes/${idSearch}`)
        console.log(response);
        if(!response.data.error){
          setHasError(false);
          showMessage('Se eliminó el cliente');
        }
        else{
          setHasError(true);
          showMessage('No se encontró el cliente.')
        }
      }
      else{
        setHasError(true);
        showMessage('¿Qué id se supone que voy a buscar?')
      }

    }
  }


  return (
    <View style={styles.container}>
      <Text>Actualización de Clientes</Text>
      <TextInput mode="outlined" style={{ marginTop: 10, width:200  }} label="Id del cliente a buscar" value={idSearch} onChangeText={id => setIdSearch(id)}></TextInput>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            mode="outlined"
            style={{ backgroundColor: 'powderblue', width:200 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            style={{ marginTop: 10, width:200  }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligatorio</Text>}
      <Text style={{color:hasError ? 'red' : 'green'}}>{message}</Text>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="content-save" 
          mode="contained" onPress={handleSubmit(onSave)}>
          Guardar
        </Button>
        <Button 
          style={{backgroundColor:'orange',marginLeft:10}}
          icon="card-search-outline" 
          mode="contained" onPress={() => onSearch()}>
          Buscar
        </Button>
      </View>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="pencil-outline" 
          mode="contained" onPress={handleSubmit(onUpdate)}>
          Actualizar
        </Button>
        <Button 
          style={{backgroundColor:'red',marginLeft:10}}
          icon="delete-outline" 
          mode="contained" onPress={onDelete}>
          Eliminar
        </Button>
      </View>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="view-list" 
          mode="contained" onPress={() => console.log('Pressed')}>
          Listar
        </Button>
        
      </View>
    </View>
  );
}


