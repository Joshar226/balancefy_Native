import { getExpenses } from '@/src/api/ExpenseAPI'
import ExpenseCard from '@/src/components/expenses/ExpenseCard'
import ExpensesForm from '@/src/components/expenses/ExpensesForm'
import Spinner from '@/src/components/Spinner'
import { globalStyles } from '@/src/styles/styles'
import { formatCurrency } from '@/src/utils/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Expenses() {
const queryClient = useQueryClient()
  
  useEffect(() => {
    queryClient.removeQueries({queryKey: ['expense']})
  }, [])
  
  const {data, isLoading} = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <View style={globalStyles.appContent}>
        <LinearGradient
        colors={['#b80000', '#ff4242']}
        style={globalStyles.appViewType}
        >
        <Text style={globalStyles.appTextType}>Total Expenses</Text>
        <Text style={globalStyles.appTextType}>{formatCurrency(total)}</Text>
        </LinearGradient>

        <LinearGradient
        colors={['#b80000', '#ff4242']}
        style={[globalStyles.appViewType, globalStyles.appForm]}
        >
        <ExpensesForm />
        </LinearGradient>
        
        <FlatList 
        data={data}
        renderItem={({item}) => <ExpenseCard item={item}/>}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        />
    </View>
  )
}
