
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from '../styles/styles';
import axios from 'axios';

export default function Customer() {

const [isError, setIserror] = useState(false);
const [message, setMessage] = useState('');
const [idSearch, setIdsearch] = useState('')

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
      defaultValues: {
        firstName: '',
        lastName: ''
      }
    });
    const onSave =  async data =>{
      let nombre = data.firstName;
      let apellidos = data.lastName;
      const response =await axios.post(`http://127.0.0.1:3000/api/clientes`,{
        nombre,
        apellidos,
      });
      setIserror(false)
      setMessage("Cliente agregado correctamente...");
      setTimeout(() =>{
        setMessage("")
      },2000)
      reset();
      //console.log(data)
    };
      const onSearch = async() => {
        const respose = await axios.get(`http://127.0.0.1:3000/api/clientes/${idSearch}`);
        if(!respose.data.error){// encuentra el idsearch
          setValue("firstName", respose.data.nombre);
          setValue("lastName", respose.data.apellidos);
          setMessage(' ');
          setIserror(false);
        }
        else{
          setIserror(true);
          setMessage('El id del cliente no existe. Intenta con otro...')
        }
      };

      const onUpdate = async (data) => {
        const respose = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`,{
        nombre:data.firstName,
        apellidos:data.lastName,
        });
        setIserror(false);
        setMessage("Cliente actualizado correctamente...");
        setTimeout(() =>{
        setMessage("")
      },2000)
      reset();
      console.log(data)
    };

    const onDelete = async (data) => {
      if(confirm(`Esta seguro de eliminar el cliente ${data.firstName} ${data.lastName}?`)){
        const respose =await axios.delete(`http://127.0.0.1:3000/api/clientes/${idSearch}`)
        setIserror(false)
        setMessage("Cliente eliminado correctamente");
          setTimeout(() => {
            setMessage("")
            reset();
          }, 2000);
      }
    }

  return (
    <View style={styles.container}>
      <Text>Actualizacion de Clientes</Text>
      <TextInput
      style={{margintop:5, marginBottom:5}}
      label= "Id del Cliente"
      mode="outlined"
      value={idSearch}
      onChangeText={idSearch => setIdsearch(idSearch)}
      />
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            mode="outlined"
            style={{marginTop:10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{color:'red'}}>El nombre es obligatorio.</Text>}

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            style={{marginTop:10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text style={{color:'red'}}>El nombre es obligatorio.</Text>}
      <Text style={{color: isError ? 'red' : 'green'}}>{message}</Text>
      <View style={{marginTop:20, flexDirection:'row'}}>
      <Button
       icon="content-save"
       mode="contained" 
       onPress={handleSubmit(onSave)}>
    Guardar
      </Button>

      <Button
      style={{backgroundColor:'orange', marginLeft:10}}
       icon="card-search-outline"
       mode="contained" 
       onPress={onSearch}
       >
    Buscar
      </Button>
      
      </View>

      <View style={{marginTop:20, flexDirection:'row'}}>
      <Button
       style={{backgroundColor:'gray', marginLeft:10}}
       icon="pencil-outline"
       mode="contained" 
       onPress={handleSubmit(onUpdate)}>
    Actulizar
      </Button>

      <Button
       style={{backgroundColor:'red', marginLeft:10}}
       icon="delete-outline"
       mode="contained" 
       onPress={handleSubmit(onDelete)}>
    Eliminar
      </Button>
      </View>   

    </View>
  );
}


