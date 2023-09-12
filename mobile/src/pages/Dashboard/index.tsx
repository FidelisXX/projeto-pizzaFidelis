import React, {useContext, useState} from 'react';
//import React, {useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

//importe de navegação de paginas
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {StackParamsList} from '../../routes/app.routes'

import {api} from '../../services/api'

//import {AuthContext} from '../../contexts/AuthContext'

export default function Deshboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

   // const {signOut} = useContext(AuthContext)

    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === ''){
            return;
        }
            const response = await api.post('/order',{
                table: Number(number)
            })
            navigation.navigate('Order', {number: number, order_id: response.data.id})

            setNumber('')


        //precisa fazer a requisição e abrir mesa na proxima tela 
        

    }

    return(
        <SafeAreaView style={styles.container}>
           <Text style={styles.title}>Novo Pedido</Text>

           <TextInput 
           placeholder="Numero da mesa"
           placeholderTextColor="#f0f0f0"
           style={styles.input}
           keyboardType="numeric"
           value={number}
           onChangeText={setNumber}
           />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    title:{
        fontSize:30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#fb8b0b',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 17,
        color: '#101026',
        fontWeight: 'bold'
    }
})