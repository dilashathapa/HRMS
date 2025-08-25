import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native-web";

const employee = ()=> {
const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setEmployees(res?.data.data);
        console.log(res?.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };
    useEffect (() => {
      fetchEmployees();
    }, []);

    const handleDelete = async (_id) => {
      const token = await AsyncStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:8000/employee/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees((prev) => prev.filter((emp) => emp._id !== _id));
        alert("Employee deleted successfully!")
      } catch (error) {
        console.error("Error deleting employee:", error);
        //alert("Something went wrong while deleting.");
      }
    };

  return (
    <View className = "flex-1 flex-col p-5 gap-y-2">
      {employees.length > 0 &&
        employees.map ((item) => (
          <View className = "w-full h-[70px] flex-row shadow-md rounded-md items-center p-3">
            <View className = "flex flex-col gap-1 w-[70%]">
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>

            <View className = "flex flex-row justify-between w-[30%]">
              <TouchableOpacity className = "w-[60px] bg-blue-500 rounded-sm text-center py-1 text-white">Edit</TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDelete(item._id)}
              className = "w-[60px] bg-red-500 rounded-sm text-center py-1 text-white">Delete</TouchableOpacity>
            </View>
          </View>
        ))}
    </View>
  );
}
export default employee