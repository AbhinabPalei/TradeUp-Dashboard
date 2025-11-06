import { useState,useEffect } from "react";

import axios from "axios";

// import { holdings } from "../data/data";


const Holdings = () => {
 
  const[allHoldings,setAllHoldings] = useState([]);

  useEffect(()=>{
  axios.get("https://tradeup-backend.onrender.com/allHoldings").then((res)=>{
    console.log(res.data)
    setAllHoldings(res.data);
  })
  },[]);

  return (
    <>
      <h3 className="title">Holding ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur.val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isprofit = curValue - stock.avg * stock.qty > 0.0;
            const profClass = isprofit ? "profit" :"loss";
            const dayClass = stock.isLoss ? "loss":"profit";
            
            return(
              <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
            <td>{stock.avg.toFixed(2)}</td>
            <td>{stock.price.toFixed(2)}</td>
            <td>{curValue.toFixed(2)}</td>
            <td className={profClass}>
              {(curValue - stock.avg * stock.qty).toFixed(2)}
            </td>
            <td className={profClass}>{stock.net}</td>
            <td className={dayClass}>{stock.day}</td>
          </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,765.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>
            31,765.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5>
            1,600.40<span>(+5.10%)</span>{" "}
          </h5>
          <p>P&Lt</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
