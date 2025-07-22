import React,{ useMemo} from 'react'
import { Box,useTheme } from '@mui/material'

import Header from 'components/Header'
import { useGetSalesQuery } from 'state/api'

import { ResponsiveLine } from '@nivo/line';
const Monthly = () => {
  const {data}=useGetSalesQuery();
  const theme = useTheme();

  const formattedData=useMemo(()=>{
    
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
        Object.values(monthlyData).forEach(({month,totalSales,totalUnits})=>{
            totalSalesLine.data=[
              ...totalSalesLine.data,
              {x:month, y:totalSales},
            ];
            totalUnitsLine.data=[
             ...totalUnitsLine.data,
              {x:month, y:totalUnits},
            ];
} );

        const formattedData=[totalSalesLine, totalUnitsLine];
        return formattedData;
    
  },[data]);//eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
        {data?(
          <ResponsiveLine
                  data={formattedData}
                  margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
                  color={{datum:"color"}} // datum color prop is used to set the color of the data points based on the category they belong to
                  axisBottom={{ 
                      format :(v)=>{
                          return v.slice(0,3);
                      }
                      ,
                       legend:"Month", legendOffset: 60 }}
                  axisLeft={{ legend: "Total", legendOffset: -50 }}
                  // curve="catmullRom"
                  enableGridX={false}
                  enableGridY={false}
                  pointSize={10} 
                  
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'seriesColor' }}
                  pointLabelYOffset={-12}
                  enableTouchCrosshair={true}
                  useMesh={true}
                  legends={
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
        ):(
          <div>Loading...</div>
        )}
      </Box>
    </Box>
  )
}

export default Monthly