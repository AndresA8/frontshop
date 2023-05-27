import { View, Text, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function ListCustomer() {
    const [data, setData] = useState([]);
    const getCustomers = async () => {
        const respose = await axios.get(`http://127.0.0.1:3000/api/clientes`)
        setData(respose.data)

    }

    useEffect(() => {
        //getCustomers();
        //console.log(data);
    })


    return (
        <View style={styles.container}>
            <Button
                style={{ backgroundColor: 'red', marginLeft:10, marginBottom:10, marginTop:10 }}
                icon="view-list"
                mode="contained"
                onPress={getCustomers}>
                Listar Clientes
            </Button>
            <Text>Aqui se mostraran los clientes</Text>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                 <Text style={{backgroundColor:'#5DADE2', borderRadius:10, padding:10, textAlign:'center', marginTop:5}}> {item.nombre} {item.apellidos} 
                 </Text>}
            
            />
        </View>
    )
}