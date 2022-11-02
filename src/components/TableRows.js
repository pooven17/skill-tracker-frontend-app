import React from 'react';

function TableRows({rowsData, deleteTableRows, handleChange}) {
    return(
        
        rowsData.map((data, index)=>{
            const {skillName, expertiseLevel}= data;
            return(
                <tr key={index}>
                <td>
               <input type="text" value={skillName} onChange={(evnt)=>(handleChange(index, evnt))} name="skillName" className="form-control"/>
                </td>
                <td><input type="text" value={expertiseLevel}  onChange={(evnt)=>(handleChange(index, evnt))} name="expertiseLevel" className="form-control"/> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;