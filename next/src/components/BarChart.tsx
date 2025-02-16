import React from 'react'

const BarChart = () => {
    // constant data for testing
    const balance = 22;
    const maxAmount = 100;

    // calculate length of bar
    const leftWidth = balance < 0 ? Math.min(Math.abs(balance) / maxAmount * 50, 50) : 0;
    const rightWidth = balance > 0 ? Math.min(balance / maxAmount * 50, 50) : 0;

    return (
        <div className='bar-chart w-full relative'>
            <div className='center-line z-10' style={{
                    position: 'absolute',
                    height: '26px',
                    width: '2px',
                    left: '50%',
                    backgroundColor: 'black',
                    transform: 'translateX(-50%)'
                }}
            ></div>
            {/* <div className='absolute' style={{
                    height: '2px',
                    width: '100%',
                    top: '12px', // Center the horizontal line vertically within the bars
                    backgroundColor: 'gray',
                    transform: 'translateY(-50%)'
                }}
            ></div> */}
            <div className='bar left-bar' style = {{
                    position: 'absolute',
                    height: '20px',
                    width: `${leftWidth}%`,
                    left: `50%`,
                    top: '3px',
                    borderRadius: '5px',
                    backgroundColor: 'red',
                    transition: "width 0.3s ease",
                    transform: 'translateX(-100%)',
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',        
                }}
            ></div>
            <div className='absolute' style = {{
                    position: 'absolute',
                    height: '20px',
                    width: `${rightWidth}%`,
                    left: `50%`,
                    top: '3px',
                    borderRadius: '5px',
                    backgroundColor: "green",
                    transition: "width 0.3s ease",
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px'
                }}
            ></div>
            <span
            className='absolute left-1/2 transform -translate-x-1/2'>
            {/* {balance < 0 ? `Owes $${Math.abs(balance)}` : `Owed $${balance}`} */}
            </span>
        </div>
    );
} ;

export default BarChart;