/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';



export default function AirTables( {paramsWeather, valuesWeather, paramsPollutant, valuesPollutant} ) {
  return (
    <>
        <div className='flex flex-col w-full lg:w-max md:flex-row md:my-5 lg:mt-20'>
            <TableContainer component={Paper}
                sx={{
                    borderRadius: '3px', 
                    height: 'fit-content',
                    overflowX: 'hidden',
                    width: '100%'
                    }}
                    className='max-w-full w-auto md:max-w-fit md:w-full my-5 md:my-0 md:mr-10 mr-0'>
                <Table>
                    <TableBody>
                        {paramsWeather.map((paramWeather, index) => (
                            <TableRow key={index} 
                            sx={{
                                borderBottom: index === paramsWeather.length - 1 ? 'none' : '1px solid rgb(17, 24, 39, 0.3)'
                            }}>
                                <TableCell className='bg-neon-cyan'
                                sx={{
                                    textTransform: 'uppercase', 
                                    fontFamily: 'Encode Sans Expanded, sans-serif', 
                                    fontWeight: '600', 
                                    textAlign: 'center',
                                    color: 'rgb(17, 24, 39)',
                                    border: 'transparent'
                                }}>{paramWeather}</TableCell>

                                <TableCell className='bg-zinc-50'
                                sx={{
                                    textTransform: 'uppercase', 
                                    fontFamily: 'Encode Sans Expanded, sans-serif', 
                                    textAlign: 'center',
                                    color: 'rgb(17, 24, 39)',
                                    border: 'transparent'
                                }}>{valuesWeather[index]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} 
                sx={{ 
                    borderRadius: '3px', 
                    height: 'fit-content',
                    overflowX: 'hidden',
                    width: '100%'
                    }}
                    className='max-w-full w-auto md:max-w-fit md:w-full'>
                <Table>
                    <TableBody>
                        {paramsPollutant.map((paramPollutant, index) => (
                            <TableRow key={index} 
                            sx={{
                                borderBottom: index === paramsPollutant.length - 1 ? 'none' : '1px solid rgb(17, 24, 39, 0.3)'
                            }}>
                                <TableCell className='bg-neon-cyan'
                                sx={{
                                    textTransform: 'uppercase', 
                                    fontFamily: 'Encode Sans Expanded, sans-serif', 
                                    fontWeight: '600', 
                                    textAlign: 'center',
                                    color: 'rgb(17, 24, 39)',
                                    border: 'transparent'
                                }}>{paramPollutant}</TableCell>

                                <TableCell className='bg-zinc-50'
                                sx={{
                                    textTransform: 'uppercase', 
                                    fontFamily: 'Encode Sans Expanded, sans-serif', 
                                    textAlign: 'center',
                                    color: 'rgb(17, 24, 39)',
                                    border: 'transparent'
                                }}>{valuesPollutant[index]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    </>
  )
}
