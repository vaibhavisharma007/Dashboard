import React,{useMemo} from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@mui/material'
import { useGetSalesQuery } from 'state/api'

const OverviewChart = ({isDashboard = false,view}) => {
    const theme=useTheme();
    const {data,loading, error} = useGetSalesQuery(); 
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if(!data) return [];
        const {monthlyData} = data;
        const totalSalesLine ={
            "id": "totalSales",
            "color": theme.palette.secondary.main,
            data:[],
        }
        const totalUnitsLine ={
            id:"totalUnits",
            color: theme.palette.secondary[600],
            data:[],
        };
        Object.values(monthlyData).reduce((acc,{month,totalSales,totalUnits})=>{
            const currSales=acc.sales+totalSales;
            const currUnits=acc.units+totalUnits;
            totalSalesLine.data=[
                ...totalSalesLine.data,
                {x:month, y:currSales},
            ]
            totalUnitsLine.data=[
                ...totalUnitsLine.data,
                {x:month, y:currUnits},
            ];
            return {sales:currSales,units:currUnits};
            
        },{sales:0,units:0})
        return [totalSalesLine, totalUnitsLine];
    },[data]);//eslint-disable-line react-hooks/exhaustive-deps
    
    
    if(!data || loading ) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

  return (
    
    <ResponsiveLine
        data={[view=== "sales" ? totalSalesLine : totalUnitsLine]}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto',  reverse: false }}
        theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.background.alt,
                  color: theme.palette.secondary[400],
                },
              },
            }}
        axisBottom={{ 
            format :(v)=>{
                return v.slice(0,3);
            }
            ,
             legend: isDashboard?"": "Month", legendOffset: 36 }}
        axisLeft={{ legend: isDashboard?"": `Total ${view==="sales"?"Revenue":"Units"}`, legendOffset: -60,
          tickValues:5
         }}
        curve="catmullRom"
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        enableArea={isDashboard}
        
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={
            !isDashboard &&
            [
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 30,
                translateY: -40,
                itemHeight: 22,
                symbolShape: 'circle'
            }
        ]}
    />
  )
}

export default OverviewChart