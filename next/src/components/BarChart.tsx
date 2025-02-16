import React from 'react'

const BarChart = () => {
    // constant data for testing
    const balance = 100;
    const maxAmount = 100;

    // calculate length of bar
    const leftWidth = balance < 0 ? Math.min(Math.abs(balance) / maxAmount * 50, 50) : 0;
    const rightWidth = balance > 0 ? Math.min(balance / maxAmount * 50, 50) : 0;

    return (
        <div className='w-full relative'>
            <div className='absolute' style = {{
                    height: '20px',
                    width: `${leftWidth}%`,
                    left: `50%`,
                    backgroundColor: "red",
                    transition: "width 0.3s ease",
                    transform: 'translateX(-100%)'
                }}
            ></div>
            <div className='absolute' style = {{
                    height: '20px',
                    width: `${rightWidth}%`,
                    left: `50%`,
                    backgroundColor: "green",
                    transition: "width 0.3s ease",
                }}
            ></div>
            <span
            className='absolute left-1/2 transform -translate-x-1/2'>
            {balance < 0 ? `Owes $${Math.abs(balance)}` : `Owed $${balance}`}
            </span>
        </div>
    );
} ;

export default BarChart;