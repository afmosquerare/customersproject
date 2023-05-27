import { View, Text, FlatList } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { styles } from "../assets/styles/styles";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ListCustomer() {
  const URL = "http://127.0.0.1:3000/api";
  const [data, setData] = useState([]);
  const getCustomers = async () => {
    const response = await axios.get(`${URL}/clientes`);
    setData(response.data);
  };
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <View style={[styles.container, { justifyContent: "flex-start" }]}>
      <Button style={{width:200}}icon="view-list" mode="contained" onPress={getCustomers}>
        LISTAR CLIENTES
      </Button>
      <Text style={{ fontSize: 32 }}>Listado de clientes</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={{ fontSize: 20, backgroundColor:'#f1f1f1' }}>
                <hr></hr>
                Nombre: {item.nombre} Apellidos: {item.apellidos}
              </Text>
            </View>
          );
        }}
      ></FlatList>

      {/*  {
      data.map((item, index) => (
        <View key={index}>
          <Text style={{fontSize:20}}>
            <hr></hr>
            Nombre: {item.nombre} Apellidos: {item.apellidos}
          </Text>
        </View>
      ))
      } */}
    </View>
  );
}
