import React from 'react'

const BarChart = () => {
    // constant data for testing
    const balance = -50;
    
    // change bar color 
    const barColour = balance < 0 ? 'red' : 'green';

    // calculate length of bar
    const barWidth = Math.min(Math.abs(balance), 100); // prevent from exceeding $100

    return (
        <div>
            <div
                style = {{
                    height: '20px',
                    width: '%{barWidth}%',
                    backgroundColor: barColour,
                    marginBottom: 10,
                }}
            ></div>
            <span>{balance < 0 ? `Owes ${Math.abs(balance)}` : `Owed ${balance}`}</span>
        </div>
    );
} ;

export default BarChart;